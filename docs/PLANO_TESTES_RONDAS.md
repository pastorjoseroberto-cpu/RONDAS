# Plano de testes — RONDAS

Data: 2026-10-16  
Branch: `fix/agenda-persistence-security-review`

Este documento descreve testes manuais e negativos pendentes. Não afirma que os testes foram executados. Não requer alteração no banco de produção.

## 1. Busca e confirmação do chamado

- [ ] Buscar um chamado existente e elegível: os dados correspondentes aparecem no formulário.
- [ ] Buscar um chamado inexistente: a interface informa que não foi encontrado e não permite enviar usando a confirmação anterior.
- [ ] Carregar um chamado válido e, em seguida, pesquisar um número inexistente: o envio deve ser bloqueado.
- [ ] Carregar um chamado válido e, em seguida, provocar erro de consulta: o envio deve ser bloqueado.
- [ ] Pesquisar um chamado já concluído: o envio deve ser bloqueado.
- [ ] Alterar manualmente o número do chamado no formulário após a busca: o envio deve ser bloqueado.
- [ ] Testar normalização de espaços e letras maiúsculas/minúsculas sem transformar números diferentes em equivalentes.

## 2. Persistência da agenda (somente ambiente de teste)

- [ ] Criar agendamento e confirmar que ele persiste após atualizar a página.
- [ ] Editar agendamento e confirmar que os campos editados persistem após recarregar.
- [ ] Confirmar que a operação de gravação não cria duplicidade para o mesmo `id_chamado`.
- [ ] Excluir agendamento de teste e confirmar que a exclusão persiste após recarregar.
- [ ] Registrar uma ronda válida e verificar se o status do chamado muda para `Concluída`.
- [ ] Simular falha na gravação da ronda e verificar que a interface não informa sucesso indevidamente.
- [ ] Verificar se a ronda não é inserida duas vezes em caso de clique repetido ou repetição da requisição.

## 3. Autenticação e autorização

Estes testes devem ser feitos apenas depois de existir um desenho de autenticação/RLS testável, em ambiente de teste.

- [ ] Sem sessão, tentar ler `usuarios_sistema`, `rondas` e `agenda_os` diretamente pela API: a operação deve ser negada conforme a política planejada.
- [ ] Como técnico, tentar listar usuários e alterar dados administrativos: deve ser negado.
- [ ] Como técnico, enviar uma ronda para chamado inexistente ou concluído por requisição direta: deve ser negado pelo servidor.
- [ ] Como administrador, verificar apenas as operações administrativas explicitamente autorizadas.
- [ ] Confirmar que nenhuma senha é retornada por consultas de usuários ou gravada em logs.
- [ ] Confirmar que nenhuma chave `service_role` está no bundle do navegador ou em variável `VITE_*`.

## 4. Build e validações automatizadas

O `package.json` atualmente define os scripts `build` e `typecheck`, mas não define um script de testes automatizados. Portanto:

- [ ] Executar `npm ci`.
- [ ] Executar `npm run typecheck`.
- [ ] Executar `npm run build`.
- [ ] Planejar testes automatizados para busca/validação e submissão antes de considerar a mudança pronta.

## Critérios para considerar pronto

Não aprovar para produção enquanto houver qualquer falha nos testes de busca, persistência ou autorização. A aprovação de build, isoladamente, não demonstra segurança nem funcionamento ponta a ponta.

## Restrições de segurança

- Não executar migrações nem comandos SQL de alteração no banco de produção durante estes testes.
- Não alterar a branch `main), não fazer merge e não publicar produção sem autorização explícita.
- Usar dados fictícios ou cópia de teste; não usar chamados reais para testes destrutivos.

## 6. Critérios para migração de autenticação e RLS (pendentes)

Estes testes devem ser executados em um projeto Supabase de teste, com dados fictícios. Não executar contra produção durante esta fase.

- [ ] Login administrativo por Supabase Auth funciona com credencial nova e sessão válida.
- [ ] Logout invalida a sessão e os dados administrativos deixam de ficar disponíveis na interface.
- [ ] Uma conta autenticada sem papel administrativo não consegue consultar nem alterar rondas, usuários ou agenda administrativa.
- [ ] Um administrador autorizado consegue consultar e gerir a agenda conforme suas permissões.
- [ ] O visitante/técnico consegue consultar apenas os campos mínimos do chamado e unidades necessários para preencher Nova Ronda.
- [ ] O visitante/técnico não consegue listar histórico completo de rondas, consultar usuários, criar usuários, redefinir senhas, editar agenda nem excluir registros.
- [ ] Chamado inexistente, já concluído ou não elegível é rejeitado no servidor, mesmo chamando diretamente a API.
- [ ] Uma submissão válida grava a ronda e conclui o chamado na mesma transação.
- [ ] Uma falha forçada durante a operação transacional não deixa ronda gravada com agenda aberta, nem agenda concluída sem ronda.
- [ ] Repetir a mesma requisição não cria rondas duplicadas; comportamento de repetição está documentado.
- [ ] Verificar grants, policies, views e funções para garantir que `anon` e `authenticated` não mantêm privilégios amplos desnecessários.
- [ ] Confirmar que nenhuma chave `service_role` está presente no código cliente, no bundle ou em variáveis `VITE_*`.

## 7. Critérios antes de qualquer publicação

- [ ] Backup restaurável verificado e plano de reversão revisado.
- [ ] `npm ci`, `npm run typecheck` e `npm run build` concluídos com sucesso na revisão atual.
- [ ] Testes funcionais e negativos registrados com resultado real, não apenas check de build/deploy.
- [ ] Diff final e migrations revisados por pessoa responsável.
- [ ] Aprovação explícita obtida antes de qualquer alteração em produção.
