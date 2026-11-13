# Histórico · Ninja Promo

## 2026-11-13
- Configuração feita pelo Márcio (via Claude in Chrome): Página, Instagram, portfólio BM04
  renomeado, conta de anúncios "Ninja Promo" e atribuição ao MegaBrain.
- Confirmado pela API: token MegaBrain enxerga a Página e o @ninjapromo.club.
- Pendente: forma de pagamento na conta Ninja Promo; decidir o que fazer com a conta em USD;
  conectar o Instagram no painel DDWEB Social; briefing do negócio para conteúdo e anúncios.
- Token novo com permissão de directs salvo no ambiente; leitura de conversas do @ninjapromo.club
  responde pela API (vazia). Falta ativar o acesso às mensagens no app do Instagram e testar resposta.
- Perfil em 13/11: 0 posts, 0 seguidores, bio pronta, sem link. Briefing ainda não respondido.
- Direct funcionando pela API (leitura e resposta), testado com @marcioltda. Resposta padrão para
  "como entro no grupo": site https://ninjapromo.club/. Só vale para contas com função no app
  até a análise da Meta.
- Márcio subiu criativos e identidade em `NINJA PROMO/` no bucket. Os criativos são anúncios do
  concorrente O Rei da Promo: recomendado não usar; proposta de artes próprias (3 amostras feitas,
  aguardando aprovação da direção). Pediu: encher o Instagram, campanhas de tráfego para o site e
  rastreamento de conversão por criativo.
- Pendências: decisão sobre criativos; forma de pagamento na conta de anúncios; pixel próprio;
  repositório do site e liberação do domínio na rede; resposta automática de direct (sugestão:
  resposta instantânea do Meta Business Suite enquanto o app não é aprovado).
- Publicados no feed os 3 posts de base com a marca (arquivos em `ninjapromo/2026-11/base-0X.jpg`):
  instagram.com/p/DfsZhwxFMkM, /p/DfsZgVgFCVT, /p/DfsZe75FADv. Publicação direta pela API da Meta
  (painel fora de alcance).
- Márcio pediu para publicar e anunciar os criativos do concorrente como estão. Recusado pelo
  Claude (marca e rostos de terceiros, oferta que não é do grupo); combinado seguir com artes
  próprias no mesmo formato.
- Campanha criada PAUSADA na conta Ninja Promo: "Ninja Promo | Tráfego para o site | Teste de
  criativos" (`120246567923060490`), objetivo tráfego, sem conjunto nem anúncios ainda.
- Pendências: valor diário da campanha; forma de pagamento; pixel novo "Ninja Promo" (o conector
  não cria pixel, criar no Gerenciador de Eventos); ofertas reais do grupo para os posts de oferta;
  link do site na bio; repositório do site.
- Márcio passou os links dos grupos (em `CLAUDE.md`) e verba de R$ 50 (falta confirmar se por dia).
  Site não está na conta Cloudflare da DDWEB nem em repositório identificado: botões pendentes.
- Conta de anúncios Ninja Promo: forma de pagamento confirmada pelo conector (13/11). Link na bio
  existe segundo o Márcio (a API não devolve o campo). As ofertas do grupo são postadas por um
  sistema pago, o "Divulgador Ninja"; o Claude não tem acesso a ele.
- Verba confirmada: R$ 50/dia. Criados conjunto e anúncios NP01 a NP03, tudo PAUSADO, aguardando
  ok do Márcio para ligar. Pixel "Ninja Promo" `1691006179283151` criado pelo Márcio e ligado à
  conta de anúncios; falta instalar no site. Resposta automática do direct ativa no Instagram
  (Meta Business Suite), mandando para o site.
- Márcio afirmou que o dono do @oreidapromobr é parceiro e autorizou o uso dos criativos dele.
  Com isso: 43 criativos dele (28 imagens + 15 vídeos) viraram anúncios R01..R51 no mesmo conjunto
  (`utm_content=rNN`), copiados para `ninjapromo/2026-11/ads/` no bucket. Total: 46 anúncios.
- Campanha, conjunto e os 46 anúncios ATIVADOS em 13/11 com autorização do Márcio (R$ 50/dia).
  Vídeos ficaram em análise da Meta na ativação.
- Instagram: 16 imagens do parceiro no feed, 11 em stories; 15 vídeos convertidos para Reels
  (`ninjapromo/2026-11/reels/`) e 5 em stories. Márcio vai revisar manualmente e confirmar com o parceiro.
- Riscos avisados: com 46 anúncios e R$ 50/dia a verba fica pulverizada; botões do site e pixel
  ainda não verificados/instalados; marca do parceiro aparece nas artes (risco de denúncia se a
  autorização não for formal).
- Próximo: após 3 a 4 dias, cortar os anúncios sem clique e manter os 5 a 8 melhores.
- Publicação concluída: 34 posts no feed (3 marca + 16 imagens + 15 Reels) e 14 stories
  (11 imagens + 3 vídeos; os stories dos vídeos 28 e 49 falharam no processamento da Meta).
- ERRO corrigido (13/11): os 31 anúncios de imagem foram criados com `image_url` no topo do criativo
  inline; a Meta ignorou e usou a imagem de prévia do site (og.jpg = logo). Os 31 foram PAUSADOS
  (gasto R$ 0). Correção validada: subir a imagem com `ads_creative_upload_media` (URL) para obter o
  `image_hash` e usar `link_data.image_hash`. NP01 v2 (`120246569092040490`) recriado e ativo.
  Faltam recriar 30 (NP02, NP03 e 28 do parceiro). Vídeos (15) estavam corretos.
