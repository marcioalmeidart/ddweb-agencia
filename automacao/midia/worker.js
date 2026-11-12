// Worker "ddweb-midia": serve publicamente, só leitura, os arquivos do bucket R2
// "ddweb-midia". É daqui que a Meta baixa as artes e vídeos das publicações.
// O envio de arquivos NÃO passa por aqui: é feito pela API da Cloudflare
// (automacao/midia/upload.mjs), que exige o token da conta.
//
// URL pública: https://ddweb-midia.ddweb-midia.workers.dev/<cliente>/<arquivo>

export default {
  async fetch(request, env) {
    if (request.method !== "GET" && request.method !== "HEAD") {
      return new Response("Método não permitido", { status: 405, headers: { Allow: "GET, HEAD" } });
    }

    const key = decodeURIComponent(new URL(request.url).pathname.slice(1));
    if (!key || key.endsWith("/")) return new Response("Não encontrado", { status: 404 });

    // Sempre entrega o arquivo inteiro (200), sem respostas parciais: é o
    // formato que o importador de vídeo da Meta aceita sem surpresas.
    const object = await env.BUCKET.get(key);
    if (!object) return new Response("Não encontrado", { status: 404 });

    const headers = new Headers();
    object.writeHttpMetadata(headers);
    headers.set("etag", object.httpEtag);
    headers.set("content-length", String(object.size));
    headers.set("cache-control", "public, max-age=86400");
    const status = 200;

    return new Response(request.method === "HEAD" ? null : object.body, { status, headers });
  },
};
