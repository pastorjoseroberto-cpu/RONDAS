# Configurar Supabase Auth no ambiente de testes — RONDAS

## Objetivo
Preparar uma identidade de autenticação para substituir gradualmente o login personalizado `master`, sem alterar produção nem interromper o formulário público de Nova Ronda.

## Antes de começar
1. No painel Supabase, abra **Project Settings → General**.
2. Confirme o nome e o Project Ref do projeto.
3. **Pare aqui se não tiver certeza de que este é um projeto exclusivamente de testes, separado da produção.** Não execute SQL, não altere RLS/permissões e não apague usuários ou tabelas.
4. Use um endereço de e-mail ao qual você tenha acesso e uma senha forte e exclusiva. Não reutilize senhas antigas nem compartilhe a senha neste documento ou no GitHub.

## Criar o usuário de teste
Somente depois de confirmar que o projeto é isolado:
1. Abra **Authentication → Users**.
2. Veja se já existe um usuário de teste adequado. Evite criar duplicatas desnecessárias.
3. Se precisar criar um, use **Add user** (o nome pode variar na interface), informe o e-mail acessível e uma senha forte exclusiva.
4. Siga o fluxo de confirmação de e-mail que o painel apresentar. Não desative globalmente a confirmação de e-mail apenas para facilitar o teste.
5. Não apague nem modifique a tabela personalizada `usuarios_sistema` ou o registro `master` nesta etapa.

## O que informar para continuar
- Nome do projeto e Project Ref (não envie chaves nem tokens).
- Confirmação de que é um projeto separado de produção.
- Se o usuário aparece em **Authentication → Users** e se o e-mail está confirmado.

## Próximas etapas de desenvolvimento
Depois da confirmação, a migração deve ser feita em etapas na branch de trabalho:
- integrar o login à sessão do Supabase Auth, mantendo o nome de usuário visível `master` se desejado;
- definir autorização por função no servidor/banco, sem confiar apenas em verificações no navegador;
- planejar RLS e permissões com políticas específicas para o painel autenticado e para o formulário público de Nova Ronda;
- tornar atômicos o registro da ronda e a atualização do chamado;
- testar login, logout, recuperação de acesso, permissões e fluxo público no ambiente de testes.

**Importante:** criar um usuário no Supabase Auth não corrige automaticamente as permissões das tabelas. Não exponha a chave `service_role) no navegador nem em variáveis `VITE_*`. Nenhuma alteração no banco ou em produção é autorizada por este guia.
