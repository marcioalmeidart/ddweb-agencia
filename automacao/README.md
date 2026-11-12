# Automação de redes sociais (DDWEB)

Manual para qualquer sessão do Claude que vá publicar, editar ou agendar posts dos
clientes da DDWEB no Instagram/Facebook. Leia inteiro antes de agir.

## Regras

- **Nunca publique sem confirmação explícita do usuário** para aquele post (mostre
  mídia + legenda antes). Teste = conta `ddweb`; clientes reais só com "pode publicar".
- Apagar post também só com pedido explícito.
- Nunca peça token no chat. Os tokens já estão salvos no ambiente (ver abaixo).

## Credenciais (já configuradas no ambiente)

O proxy da sessão injeta o token automaticamente. Envie `Authorization: Bearer proxy-injected`
(o valor é substituído pelo proxy). Se a sessão não estiver no mesmo ambiente, as
chamadas dão 401/403: peça ao usuário para abrir a conversa no ambiente certo.

| Host | O que é |
|---|---|
| `graph.facebook.com` | Token do usuário do sistema **MegaBrain** (DDWEB BM 01), nunca expira |
| `api.cloudflare.com` | Token "DDWEB Midia" (R2 + Workers) |

Node: rode com `NODE_USE_ENV_PROXY=1` para o `fetch` usar o proxy.

## IDs (não são segredos)

| Item | Valor |
|---|---|
| Portfólio central (DDWEB BM 01) | `1489268519398217` |
| App Meta | DDWEB ZAP API `27458773820431823` (modo desenvolvimento) |
| Conta de anúncios DDWEB DIGITAL | `act_3376591222514438` |
| Graph API | usar `https://graph.facebook.com/v25.0` |
| Cloudflare account | `a0c1d38668531a1653c921e148f46b8d` |
| Bucket R2 | `ddweb-midia` |
| URL pública da mídia | `https://ddweb-midia.ddweb-midia.workers.dev/<chave>` |

Contas do Instagram cadastradas: `automacao/instagram/accounts.json`.
Listar o que o token enxerga: `NODE_USE_ENV_PROXY=1 IG_ACCESS_TOKEN=proxy-injected node automacao/instagram/publish.mjs accounts`

## Organização do bucket

```
<cliente>/            material bruto enviado pelo usuário (fotos, vídeos)
<cliente>/AAAA-MM/    mídia já tratada e publicada (gerada pelo Claude)
musicas/              faixas licenciadas para uso comercial (instrumentais)
```

API do R2 (listar / baixar / enviar):
- `GET  /client/v4/accounts/<acc>/r2/buckets/ddweb-midia/objects?prefix=<cliente>/`
- `GET  .../objects/<chave>` baixa o arquivo
- `PUT  .../objects/<chave>` com `Content-Type` correto envia

## Receitas que funcionam (testadas em nov/2026)

Publicar = criar contêiner `POST /{ig-user-id}/media` → esperar `status_code=FINISHED`
(`GET /{container}?fields=status_code,status`) → `POST /{ig-user-id}/media_publish`
com `creation_id`.

| Formato | Campos do contêiner |
|---|---|
| Feed (imagem) | `image_url`, `caption` — JPEG, proporção entre 4:5 e 1.91:1 (use 1080×1350) |
| Carrossel | um contêiner por item com `is_carousel_item=true`, depois `media_type=CAROUSEL`, `children`, `caption` |
| Story (imagem/vídeo) | `media_type=STORIES` + `image_url` ou `video_url` (1080×1920) |
| Reels | `media_type=REELS`, `video_url`, `caption`, `share_to_feed=true` |
| Comentário | `POST /{media-id}/comments` com `message` |
| Apagar | `DELETE /{media-id}` |

### Vídeo: preparar sempre antes de subir

A Meta recusa vídeos fora do padrão (erros 2207076/2207077). Converta sempre:

```
ffmpeg -i entrada -vf "fps=30,scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,format=yuv420p" \
  -c:v libx264 -profile:v high -level 4.1 -g 30 -b:v 6000k -maxrate 7000k -bufsize 14000k \
  -c:a aac -ar 48000 -ac 2 -b:a 128k -movflags +faststart saida.mp4
```

- **Áudio:** faixa totalmente muda é rejeitada. Se não houver áudio, use música
  licenciada ou ruído quase inaudível (`anoisesrc=color=pink:amplitude=0.002`).
- Vídeo de celular/câmera pode vir deitado (rotação nos metadados): o ffmpeg corrige sozinho.
- Textos sobre o vídeo: gerar PNG transparente com Playwright e sobrepor com `overlay`.
  Manter textos no terço de cima (a parte de baixo fica coberta pelos botões do Reels).

### Limitações conhecidas da API

- Não existe "compartilhar Reels no story" nem figurinhas (link, menção, post).
  Alternativa: publicar um **story-chamada** com trecho do vídeo + texto "Reels novo no perfil".
- Não dá para usar a biblioteca de músicas do Instagram: a música vai embutida no
  arquivo e precisa ter licença comercial (pasta `musicas/`).
- Direct: o token atual **não** tem `instagram_manage_messages`.
- Limite: 100 publicações por conta a cada 24h.

## Cliente novo

1. O cliente compartilha a Página e o Instagram com o portfólio `1489268519398217` (parceiro).
2. No DDWEB BM 01: Usuários do sistema → MegaBrain → Atribuir ativos (acesso parcial basta).
3. Rodar o comando `accounts`, adicionar o `igUserId` em `accounts.json`.
4. Criar a pasta `<cliente>/` no bucket.

Pendências: verificação da empresa DDWEB em análise; para operar contas de terceiros em
escala, o app ainda precisa passar pela análise da Meta.
