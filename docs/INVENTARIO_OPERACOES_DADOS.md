# Inventário de operações de dados — RONDAS

Este inventário foi preparado por leitura estática de `src/App.tsx` na branch `fix/agenda-persistence-security-review`. Ele não é um teste de execução e não altera o banco.

## Chamadas encontradas e destino recomendado

| Área | Operação atual no navegador | Destino planejado |
|---|---|---|
| Inicialização do formulário | `unidades.select('*')` | View/RPC de leitura pública com apenas campos usados no formulário |
| Busca do chamado | `agenda_os.select('*').eq('id_chamado', ...)` | RPC que retorna apenas os campos necessários e verifica status elegível |
| Painel gestor | `rondas.select('*')` | Leitura apenas para papel administrativo autorizado |
| Painel gestor | `usuarios_sistema.select('*')` | Remover consulta pública; gestão por endpoint/funções de servidor autorizadas |
| Painel gestor | `agenda_os.select('*')` | Leitura de agenda apenas para papel administrativo autorizado |
| Login atual | Consulta por username e senha em texto puro | Supabase Auth; nunca comparar senha via tabela pública |
| Troca de senha | Atualização direta da coluna `senha` | Fluxo de alteração/recuperação Supabase Auth |
| Criar usuário | Insert direto em `usuarios_sistema` com senha provisória | Criação via servidor autorizado/Supabase Auth Admin; nunca devolver senha na lista ou no alerta |
| Reset de senha | Update direto da coluna `senha` e exibição do segredo em alerta | Fluxo de recuperação seguro, sem registrar ou exibir senha depois de enviada |
| Excluir usuário | Delete direto na tabela | Ação administrativa no servidor, com validação de papel e proteção da última conta master |
| Criar/editar agenda | `agenda_os.upsert(...)` | Endpoint/RPC administrativa autorizada; preservar chave por `id_chamado` |
| Excluir agenda | Delete direto em `agenda_os` | Endpoint/RPC administrativa autorizada; definir se chamados com ronda podem ser excluídos |
| Enviar ronda | Insert em `rondas`, depois update separado em `agenda_os` | Uma operação transacional que valida o chamado, grava ronda e conclui agenda |
| Excluir ronda | Delete direto em `rondas` | Ação master autorizada no servidor, com trilha/auditoria e regra de impacto na agenda |

## Observações de autorização

- Ocultar a aba Gestor ou condicionar botões a `usuarioLogado` não impede chamadas diretas à API.
- O fluxo atual de login personalizado não cria sessão Supabase Auth.
- Os papéis `ADM` e `Master` vistos no cliente não devem ser confiados sem verificação no servidor.
- O formulário técnico depende de uma leitura limitada da agenda e das unidades; a segurança precisa preservar explicitamente esse requisito.
- O botão “Importar JSON/CSV” e a exportação exibidos no painel devem ser testados separadamente: a presença visual de um botão não comprova que a operação esteja implementada.

## Ordem segura de implementação

1. Configurar e testar identidades Supabase Auth em ambiente de teste.
2. Implementar perfil/papel e provar que usuários sem papel não leem nem alteram dados administrativos.
3. Mover operações administrativas para um contexto autorizado no servidor.
4. Implementar RPC transacional para submissão pública.
5. Preparar views/RPC públicas de escopo mínimo.
6. Só então ativar RLS e revogar grants amplos, primeiro em ambiente de teste.
7. Executar a suíte funcional e revisar rollback antes de qualquer ação em produção.

## Não executado

Este inventário não cria usuários, não altera senha, não modifica policies/grants, não cria RPCs e não executa SQL.
