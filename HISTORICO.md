# Histórico da agência

## 2026-11-11 · Montagem da automação de redes sociais

**Feito**
- Meta: usuário do sistema **MegaBrain** (DDWEB BM 01) com token que nunca expira, no app
  DDWEB ZAP API. Permissões: publicar e comentar no Instagram, Páginas, anúncios, WhatsApp.
  Falta `instagram_manage_messages` (direct): o Márcio optou por não refazer o token agora.
- Token salvo no ambiente da sessão (host `graph.facebook.com`).
- Cloudflare: R2 ativado, bucket `ddweb-midia`, Worker público `ddweb-midia` que serve a
  mídia para a Meta. Token salvo no ambiente (host `api.cloudflare.com`).
- Contas conectadas: @ddweb.digital e @engeblind (esta via compartilhamento de parceiro
  do Engeblind BM 02).
- Testado com sucesso no @ddweb.digital: story, feed, comentário, Reels (arte e vídeo real),
  vídeo editado com textos + story-chamada, e exclusão de posts pela API.

**Decisões**
- Mídia sempre hospedada no R2 (não no site, não em Drive).
- Vídeos sempre convertidos antes de publicar (ver receita no manual).
- Música: só faixas com licença comercial, instrumentais para clientes de indústria,
  na pasta `musicas/` do bucket. O Claude não baixa música sozinho.
- Para "compartilhar Reels no story", usar story-chamada (a API não tem a função).
- Uma conversa por cliente, sempre no mesmo ambiente (onde estão os tokens).

- Sistema antigo `ddweb-social` (painel.ddweb.com.br/social): o Márcio limpou os
  agendamentos; a automação via Claude + API vai substituí-lo.
- Repositório `ddweb-agencia` criado como central de operação da agência (memória,
  clientes, automação), separado dos sistemas.

**Pendências**
- Verificação da empresa DDWEB MARKETING DIGITAL LTDA em análise (enviada com CNH).
  Endereço do CNPJ é escritório virtual sem acesso; atualizar após regularização.
- Análise do app pela Meta: necessária para operar contas de clientes em escala.
- Script `automacao/instagram/publish.mjs` só publica feed/carrossel; story, Reels,
  conversão de vídeo e upload no R2 ainda são feitos por comandos manuais (ver manual).
- Montar calendário mensal + tarefa agendada de publicação.
- Pasta `musicas/` no bucket ainda vazia.
- `ddweb-social` tem o banco SQLite (`data/ddweb-social.db`) versionado no Git; se tiver
  senhas/tokens, tirar do histórico e trocar as credenciais (tratar em conversa própria).
- Usuário do sistema "MegaBrain" tem nome pouco claro; opcional renomear.
