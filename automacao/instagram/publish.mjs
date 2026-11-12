#!/usr/bin/env node
// Publica posts no Instagram pela API oficial da Meta (Instagram Graph API).
// Sem dependências: precisa só de Node 18+.
//
//   node automacao/instagram/publish.mjs accounts
//       Lista as contas do Instagram que o token enxerga (nome, @ e ID).
//
//   node automacao/instagram/publish.mjs publish --account engeblind \
//        --post marketing/carrossel-porta-blindada/post.json
//       Ensaio: confere imagens, legenda e limite diário. NÃO publica.
//
//   ... mesmo comando com --confirm
//       Publica de verdade.
//
//   --skip-image-check  pula a checagem local das URLs (quando a máquina que roda
//                       o script não alcança o site, mas a Meta alcança).
//
// Em ambiente com proxy HTTPS (ex.: sessão na nuvem), rode o Node com
// NODE_USE_ENV_PROXY=1 para o fetch respeitar o HTTPS_PROXY.
//
// Contas ficam em automacao/instagram/accounts.json. O token nunca vai para o
// repositório: cada conta aponta para o nome de uma variável de ambiente.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HOST = process.env.IG_API_HOST || "https://graph.facebook.com";
const VERSION = process.env.IG_API_VERSION || ""; // ex.: v21.0. Vazio = padrão do app.
const BASE = VERSION ? `${HOST}/${VERSION}` : HOST;

const MAX_ITEMS = 10;
const MAX_CAPTION = 2200;
const MAX_HASHTAGS = 30;

function fail(msg) {
  console.error(`\n✖ ${msg}\n`);
  process.exit(1);
}

function parseArgs(argv) {
  const out = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith("--")) out._.push(a);
    else if (argv[i + 1] && !argv[i + 1].startsWith("--")) out[a.slice(2)] = argv[++i];
    else out[a.slice(2)] = true;
  }
  return out;
}

function loadAccounts() {
  const file = path.join(HERE, "accounts.json");
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function tokenFor(envName) {
  const token = process.env[envName];
  if (!token) fail(`Variável de ambiente ${envName} não definida. Exporte o token antes de rodar.`);
  return token;
}

async function api(method, pathname, token, params = {}) {
  const url = new URL(`${BASE}/${pathname}`);
  const init = { method, headers: { Authorization: `Bearer ${token}` } };
  if (method === "GET") {
    for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  } else {
    init.body = new URLSearchParams(params);
  }
  const res = await fetch(url, init);
  const body = await res.json().catch(() => ({}));
  if (!res.ok || body.error) {
    const e = body.error || {};
    throw new Error(
      `${method} /${pathname} → HTTP ${res.status}: ${e.message || "erro desconhecido"}` +
        (e.code ? ` (código ${e.code}${e.error_subcode ? "/" + e.error_subcode : ""})` : ""),
    );
  }
  return body;
}

// ── accounts ───────────────────────────────────────────────────────────────
async function cmdAccounts(args) {
  const token = tokenFor(args["token-env"] || "IG_ACCESS_TOKEN");
  let next = "me/accounts";
  let params = { fields: "name,instagram_business_account{id,username}", limit: "100" };
  const rows = [];
  while (next) {
    const page = await api("GET", next, token, params);
    for (const p of page.data || []) {
      rows.push({
        pagina: p.name,
        instagram: p.instagram_business_account ? "@" + p.instagram_business_account.username : "(sem Instagram vinculado)",
        igUserId: p.instagram_business_account?.id || "",
      });
    }
    const after = page.paging?.next ? page.paging?.cursors?.after : null;
    next = after ? "me/accounts" : null;
    params = { ...params, after };
  }
  if (!rows.length) fail("O token não enxerga nenhuma Página. Confira os ativos atribuídos a ele.");
  console.table(rows);
  console.log("Copie o igUserId de cada conta para automacao/instagram/accounts.json.");
}

// ── publish ────────────────────────────────────────────────────────────────
function loadPost(postFile) {
  const post = JSON.parse(fs.readFileSync(postFile, "utf8"));
  const dir = path.dirname(postFile);
  let caption = post.caption || "";
  const captionFile = path.join(dir, caption);
  if (caption && !caption.includes("\n") && fs.existsSync(captionFile)) {
    caption = fs.readFileSync(captionFile, "utf8").trim();
  }
  return { caption, images: post.images || [] };
}

async function checkImage(url) {
  try {
    const res = await fetch(url, { method: "HEAD" });
    const type = res.headers.get("content-type") || "";
    if (!res.ok) return `HTTP ${res.status}`;
    if (!type.includes("image/jpeg")) return `tipo ${type || "desconhecido"} (a API exige JPEG)`;
    return null;
  } catch (e) {
    return `inacessível (${e.cause?.code || e.message})`;
  }
}

async function waitReady(id, token) {
  for (let i = 0; i < 30; i++) {
    const { status_code } = await api("GET", id, token, { fields: "status_code" });
    if (status_code === "FINISHED") return;
    if (status_code === "ERROR" || status_code === "EXPIRED") throw new Error(`Contêiner ${id} ficou em ${status_code}.`);
    await new Promise((r) => setTimeout(r, 2000));
  }
  throw new Error(`Contêiner ${id} não ficou pronto em 60 s.`);
}

async function cmdPublish(args) {
  if (!args.account || !args.post) fail("Uso: publish --account <nome> --post <post.json> [--confirm]");
  const accounts = loadAccounts();
  const account = accounts[args.account];
  if (!account) fail(`Conta "${args.account}" não existe em accounts.json. Disponíveis: ${Object.keys(accounts).join(", ")}`);

  const { caption, images } = loadPost(args.post);
  const problems = [];
  if (images.length < 1 || images.length > MAX_ITEMS) problems.push(`São ${images.length} imagens; o permitido é de 1 a ${MAX_ITEMS}.`);
  if (caption.length > MAX_CAPTION) problems.push(`Legenda com ${caption.length} caracteres; o máximo é ${MAX_CAPTION}.`);
  const hashtags = (caption.match(/#[\p{L}\p{N}_]+/gu) || []).length;
  if (hashtags > MAX_HASHTAGS) problems.push(`${hashtags} hashtags; o máximo é ${MAX_HASHTAGS}.`);

  console.log(`\nConta:    ${args.account} (igUserId ${account.igUserId || "NÃO PREENCHIDO"})`);
  console.log(`Formato:  ${images.length > 1 ? `carrossel com ${images.length} imagens` : "imagem única"}`);
  console.log(`Legenda:  ${caption.length} caracteres, ${hashtags} hashtags\n`);
  for (const [i, url] of images.entries()) {
    const err = args["skip-image-check"] ? null : await checkImage(url);
    console.log(`  ${err ? "✖" : "✔"} ${String(i + 1).padStart(2, "0")} ${url}${err ? "  → " + err : ""}`);
    if (err) problems.push(`Imagem ${i + 1}: ${err}`);
  }
  if (!account.igUserId) problems.push("igUserId vazio em accounts.json (rode o comando `accounts`).");

  if (problems.length) fail("Não dá para publicar ainda:\n  - " + problems.join("\n  - "));

  if (!args.confirm) {
    console.log("\nEnsaio concluído sem problemas. Nada foi publicado.");
    console.log("Para publicar de verdade, repita o comando com --confirm.\n");
    return;
  }

  const token = tokenFor(account.tokenEnv || "IG_ACCESS_TOKEN");
  const ig = account.igUserId;
  let creationId;

  if (images.length === 1) {
    creationId = (await api("POST", `${ig}/media`, token, { image_url: images[0], caption })).id;
  } else {
    const children = [];
    for (const [i, url] of images.entries()) {
      const { id } = await api("POST", `${ig}/media`, token, { image_url: url, is_carousel_item: "true" });
      await waitReady(id, token);
      children.push(id);
      console.log(`  contêiner ${i + 1}/${images.length} pronto`);
    }
    creationId = (await api("POST", `${ig}/media`, token, { media_type: "CAROUSEL", children: children.join(","), caption })).id;
  }
  await waitReady(creationId, token);
  const published = await api("POST", `${ig}/media_publish`, token, { creation_id: creationId });
  const info = await api("GET", published.id, token, { fields: "permalink" }).catch(() => ({}));
  console.log(`\n✔ Publicado. ID ${published.id}${info.permalink ? "\n  " + info.permalink : ""}\n`);
}

const args = parseArgs(process.argv.slice(2));
const commands = { accounts: cmdAccounts, publish: cmdPublish };
const run = commands[args._[0]];
if (!run) fail("Comandos: accounts | publish --account <nome> --post <post.json> [--confirm]");
run(args).catch((e) => fail(e.message));
