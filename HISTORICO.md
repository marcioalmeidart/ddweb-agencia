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

- Ligação com o painel: criada a API do agente no `ddweb-central` (branch
  `claude/api-agente`). Posts criados pelo Claude entram como agendados no DDWEB Social,
  sem aprovação; o Márcio acompanha pelo painel e pede correções quando precisar.

- 2026-11-13: cliente novo **Ninja Promo** (portfólio BM04, antigo Chegou Pagou)
  conectado ao MegaBrain. Ver `clientes/ninjapromo/`.
- 2026-11-13: contas de anúncios **ENGEBLIND** (Engeblind BM 02) e **Verãozin** com status
  UNSETTLED (pagamento pendente) segundo o conector de anúncios.
- 2026-11-13: token do MegaBrain trocado no ambiente por um novo com `instagram_manage_messages`
  (directs do Instagram). Leitura de conversas testada na Página Ninja Promo: responde, lista vazia.
  `pages_messaging` não entrou no token; envio de resposta ainda não testado.
- 2026-11-13 (directs): leitura funciona, inclusive de mensagens na aba Pedidos, desde que o
  remetente tenha função no app (testador do Instagram). Envio falhou com erro #10 / 2534022
  ("fora do período permitido") e a inscrição da Página em `messages` exige `pages_messaging`.
  Próximo passo: gerar o token de novo com `pages_messaging` e repetir o envio.
- 2026-11-13 (directs, resolvido): token trocado de novo, agora com `pages_messaging`. Página
  Ninja Promo inscrita em `messages`. Leitura e resposta testadas com sucesso, com a conversa
  ainda em Pedidos. Receita no manual (`automacao/README.md`, seção Direct).

**Pendências**
- Directs: repetir a ativação (chave no Instagram + inscrição da Página) em DDWEB e Engeblind;
  atendimento a seguidores comuns depende da análise do app (acesso avançado); tempo real exige
  webhook num servidor. O painel `ddweb-central` pode ainda usar o token antigo (não revogar).
- Pôr a API do agente no ar: merge da branch `claude/api-agente` no `ddweb-central`,
  `AGENTE_API_KEY` no .env do servidor, deploy, e salvar a mesma chave no formulário
  seguro para o host `painel.ddweb.com.br`.
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
