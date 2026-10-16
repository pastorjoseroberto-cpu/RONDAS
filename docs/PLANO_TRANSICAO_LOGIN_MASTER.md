# Plano de transição de login — RONDAS

Status: planejamento, não executado. Nenhuma senha é registrada neste documento.

## Informação operacional confirmada
O responsável acessa atualmente pela conta `master` com nome de usuário e senha, sem utilizar login por e-mail. A senha da conta atual foi alterada pelo responsável. Não há e-mail de recuperação cadastrado na conta atual, mas o responsável confirmou que possui um endereço de e-mail acessível que poderá ser usado na configuração futura. Também confirmou que consegue acessar o painel Supabase utilizado durante os testes; ainda é necessário confirmar no painel o projeto exato e se ele é isolado de produção. Não sabemos, sem inspecionar o fluxo de alteração (sem ler o valor secreto), se essa alteração também removeu a possibilidade de bootstrap antigo no código.

## Risco verificado no código
Em `src/App.tsx`, o login ainda contém uma comparação com a credencial inicial `master / Master123`. Se a linha `master` não existir em `usuarios_sistema`, o código tenta criá-la novamente com essa senha. Se a linha existir com a nova senha, o fluxo normal compara o valor digitado com a coluna `senha`. Isso não equivale a uma autenticação segura: o código e a comparação de senha ficam no cliente e a tabela continua acessível pelo Supabase.

## Decisão de migração
Não remover nem substituir o login atual sem uma estratégia de recuperação testada. Não utilizar a senha atual em logs, commits, prompts, documentos ou testes. A migração futura deve:
1. Criar autenticação nova e testável antes de desativar a antiga.
2. Manter `master` como identificador visível no app, sem presumir que seja um e-mail. Avaliar o e-mail acessível como identidade interna/recuperação do Supabase Auth, sem publicá-lo em commits ou logs desnecessários.
3. Criar perfis de autorização e validar papéis no servidor/banco, não por estado React.
4. Manter o fluxo público de técnico por views/RPCs com campos mínimos.
5. Implementar a submissão da ronda como transação no servidor.
6. Testar recuperação de acesso, logout, conta master, administrador, usuário sem papel e visitante anônimo em ambiente de teste.
7. Só depois remover o bootstrap `Master123`, as comparações em texto puro e os grants amplos, em uma sequência revisada e reversível.

## Próxima atividade técnica
1. Confirmar no painel o nome e a referência do projeto Supabase de testes e verificar que não é produção.
2. Mapear o código de troca/reset de senha e criação/remoção de usuários para entender como a senha alterada é persistida e como preservar a conta master. A inspeção deve registrar apenas nomes de funções e caminhos de execução, nunca o valor da senha.
3. Só após confirmar o ambiente, planejar a criação e verificação da identidade de autenticação com o e-mail acessível. Não é necessário publicar o endereço no repositório.
4. Testar login, recuperação, logout e permissões antes de qualquer troca do fluxo atual.

## Segurança e produção
O sistema está pausado segundo informação do responsável. Mesmo assim, este trabalho permanece em branch separada. Não executar migrations nem alterar configurações do projeto Supabase sem backup verificável e autorização explícita.
