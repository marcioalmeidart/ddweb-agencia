# Cliente: Ninja Promo

Empresa nova do Márcio (criada em nov/2026). Grupo de promoções: o ninja acha ofertas e cupons e
manda nos grupos. O Instagram serve de vitrine (quem somos, o que fazemos) e leva ao site
https://ninjapromo.club/ , onde a pessoa escolhe entrar no grupo do WhatsApp ou do Telegram.
Objetivo de posts e anúncios: clique no site e entrada no grupo.

## Identidade
- Logo: mascote ninja azul com faixa amarela, amarelo `#FFE600` + azul `#1227B8`, letras gordas.
- Arquivos no bucket: `NINJA PROMO/Identidade Visual/` (logo com e sem fundo).

## Contas
- Página: Ninja Promo (`1496570020203869`)
- Instagram: @ninjapromo.club (`igUserId` 17841461131782161), atribuído ao MegaBrain
- Portfólio: NINJA PROMO BM04 (`603461367041993`), o antigo "Chegou Pagou BM 04" renomeado
- Contas de anúncios no portfólio:
  - Ninja Promo `act_1976550973700421` (BRL), **sem forma de pagamento** em 13/11/2026
  - Chegou Pagou `act_1018383392625938` (BRL, ativa, com pagamento)
  - `act_2195431648077783` em **USD**, sem nome e sem pagamento (provavelmente criada por engano)

## Grupos (destino final, botões do site)
- Telegram: https://t.me/+53eezTASOZhhZTZh
- WhatsApp: https://chat.whatsapp.com/E6w8R7enPPy6SK5nst1Eyo

## Ofertas
- Postadas automaticamente nos grupos pelo sistema pago "Divulgador Ninja" (sem acesso pelo Claude).

## Direct
- Site oficial / entrada no grupo: https://ninjapromo.club/ . Resposta padrão para quem pergunta
  como entrar: mandar o site (decisão do Márcio, 13/11/2026).

## Material
- Bruto: pasta `NINJA PROMO/` no bucket `ddweb-midia` (com espaço e maiúsculas) · Pronto: `ninjapromo/AAAA-MM/`
- `NINJA PROMO/Criativos/`: 43 arquivos únicos (28 imagens, 15 vídeos) **baixados da Biblioteca de
  Anúncios do concorrente "O Rei da Promo" (@oreidapromobr)**. Trazem a marca, o @ e os preços dele
  e rostos de terceiros. Servem só de referência de formato; não publicar nem anunciar.

## Anúncios (situação em 13/11/2026)
- O token MegaBrain não tem acesso às contas de anúncios do BM04; usar o conector META_ADS.
- Conta Ninja Promo `act_1976550973700421` com cartão cadastrado (confirmado em 13/11/2026).
- Campanha pausada: `120246567923060490` (tráfego para o site). Conjunto `120246568100260490`:
  Brasil aberto, cliques no link, R$ 50/dia. Anúncios NP01, NP02, NP03 (as 3 artes de base), com
  `utm_content=np0X` no link. Criar anúncio pelo `ads_create_ad` com criativo inline (o
  `ads_create_creative` recusa `url_tags`).
- Pixel próprio: "Ninja Promo" `1691006179283151` (criado 13/11/2026, ainda sem código no site).
- Pixels no BM04: "Pixel de BM - Chegou Pagou" `339881245030870` (sem disparo desde 2024) e
  "Milanesi" `290733152731086`. Não usar esses dois.
- Repositório do site ninjapromo.club: não identificado; `ninjapromo.club` bloqueado na rede do ambiente.
