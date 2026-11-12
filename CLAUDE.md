# DDWEB · agência

Este repositório é a central da **DDWEB**, agência de marketing digital que cuida das
redes sociais e do marketing dos clientes. Tudo que é trabalho para cliente fica aqui.
Projetos pessoais do Márcio ou sem relação com a agência ficam em outros repositórios.

## Antes de qualquer coisa, em toda sessão

1. Leia `HISTORICO.md` (o que já foi feito e decidido na agência).
2. Se a conversa for sobre um cliente, leia `clientes/<cliente>/CLAUDE.md` e
   `clientes/<cliente>/historico.md`.
3. Para publicar, editar mídia ou mexer em contas, leia `automacao/README.md`.

## Ao final de cada sessão (obrigatório)

Registre o que foi feito, antes de encerrar:
- Trabalho de um cliente → `clientes/<cliente>/historico.md`
- Infraestrutura, decisões gerais ou contas → `HISTORICO.md`

Formato: data, o que foi feito, decisões, pendências. Curto e objetivo. Faça commit e push.
Sem isso a próxima conversa não sabe o que aconteceu.

## Como o Márcio prefere trabalhar

- Respostas curtas, diretas, em português, com passo a passo quando ele precisa clicar.
- Análise crítica: apontar riscos e alternativas, não só concordar.
- Nunca publicar, apagar ou gastar verba sem aprovação explícita daquele item.
- Credenciais nunca pelo chat: elas ficam salvas no ambiente (ver `automacao/README.md`).

## Estrutura

```
automacao/          scripts de publicação (Instagram/Facebook), Worker de mídia, manual
clientes/<nome>/    contexto, histórico, calendário e materiais de cada cliente
```

Cliente novo: copie a estrutura de `clientes/engeblind/` e siga "Cliente novo" em
`automacao/README.md`.

## Sistemas relacionados (outros repositórios, não mexer daqui)

| Repositório | O que é |
|---|---|
| `ddweb-central` | Painel central na VPS (painel.ddweb.com.br): servidores, sistemas, Duda (WhatsApp) |
| `ddweb-social` | Sistema antigo de agendamento de posts (Next.js + SQLite). Será substituído pela automação deste repositório |
| `ddweb-painel`, `ddweb-cliente` | Painéis antigos |
| `engeblind` | Site da Engeblind (cliente) |

Projetos pessoais do Márcio (ex.: Costa, óculos) ficam fora da agência, em repositórios próprios.
