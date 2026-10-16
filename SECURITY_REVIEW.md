# Revisão de segurança e persistência — RONDAS

Data da revisão: 2026-10-16  
Branch: `fix/agenda-persistence-security-review`

## Escopo e limites

Esta revisão foi feita por inspeção do código e das informações de esquema/permissões fornecidas pelo responsável. Não houve alteração no banco Supabase, execução de migração, deploy, merge ou alteração da branch `main`. Nenhum teste de compilação foi executado neste ambiente.

## Achados confirmados

### Crítico — credencial administrativa exposta no frontend

O componente `src/App.tsx` exibe na interface a credencial inicial `master / Master123`; a lógica do login também foi previamente identificada como verificando essa combinação no próprio cliente. Código entregue ao navegador é público, portanto essa credencial não pode ser considerada secreta. Remover apenas o texto visual não basta se a verificação continuar no frontend.

**Correção necessária:** migrar a autenticação administrativa para Supabase Auth ou backend confiável, com autorização validada no servidor. Planejar criação e teste de contas antes de desativar o login antigo. Não reutilizar a senha publicada.

### Crítico — permissões diretas excessivas no banco

O levantamento fornecido indicou privilégios amplos para `anon` e `authenticated` em `agenda_os`, `rondas`, `unidades` e `usuarios_sistema`, incluindo operações de leitura, inclusão, alteração e exclusão. Também foi informado que RLS estava desabilitado.

**Correção necessária:** desenhar políticas RLS mínimas por tabela e por função. Como o login atual é personalizado e não estabelece sessão Supabase Auth, não basta criar políticas que dependam de `auth.uid()` e presumir que o login existente será reconhecido. Primeiro migrar/definir a identidade e os papéis; depois testar cada operação com sessão anônima, técnico e administrador.

### Alto — validação do chamado e envio feitos pelo navegador

A consulta de chamado e a inserção de ronda são feitas diretamente pelo cliente. Validação apenas no React pode ser contornada por chamadas diretas à API.

**Correção necessária:** validar no lado confiável que o chamado existe, está elegível e não foi concluído; validar os campos aceitos; e aplicar autorização/rate limiting no endpoint de submissão. O formulário público pode continuar disponível, mas com permissões estritamente limitadas.

### Alto — senha em tabela personalizada

O esquema/código anteriormente inspecionado indica senhas armazenadas e comparadas na tabela `usuarios_sistema`. Senhas em texto puro não são adequadas para autenticação.

**Correção necessária:** migrar para Supabase Auth ou autenticação backend com hash forte e fluxo de redefinição. Não registrar nem expor senhas em logs ou no cliente.

### Médio — agenda depende de migração ainda não aplicada

O código nesta branch consulta e grava campos novos de `agenda_os`. A migração `supabase/migrations/20261016000100_agenda_os_fields.sql` adiciona os campos e índice único necessários. Ela está apenas no repositório e **não foi executada**.

**Correção necessária:** revisar esquema e duplicidades, fazer backup/exportação verificável e testar a migração em ambiente de teste antes de qualquer aplicação. O índice único é necessário para o `upsert` por `id_chamado`.

## Estado da alteração de agenda

- A branch substitui a lista fictícia local por consulta à tabela `agenda_os`.
- Busca de chamado foi ajustada para igualdade exata de `id_chamado`.
- Cadastro/edição usa `upsert`; exclusão remove por `id_chamado`.
- A submissão da ronda tenta marcar o chamado como `Concluída`.
- Esses fluxos ainda dependem da migração e das permissões corretas; a alteração **não deve ser considerada segura para produção** enquanto os achados acima estiverem pendentes.
- Nenhuma confirmação de compilação ou teste funcional está disponível.

## Sequência segura recomendada

1. Criar ambiente de teste e cópia/backup verificável do esquema e dos dados atuais.
2. Configurar autenticação real e papéis de administrador/técnico; migrar as três contas existentes sem perder o acesso administrativo.
3. Implementar políticas RLS mínimas e/ou funções de backend para operações privilegiadas.
4. Restringir a submissão pública para aceitar apenas chamados válidos e evitar duplicidade/conclusão indevida.
5. Aplicar a migração da agenda somente após validar o esquema e testar em cópia.
6. Executar build, testes funcionais e testes negativos de permissão.
7. Fazer revisão humana do diff e só então decidir sobre pull request, merge e publicação.

## Não fazer

- Não usar `git push --force`.
- Não desativar o login atual antes de testar a nova autenticação e confirmar acesso administrativo.
- Não executar SQL de alteração diretamente em produção sem backup e autorização explícita.
- Não expor a chave `service_role` no frontend nem em variáveis `VITE_*`.
- Não tratar o uso da chave `anon` como proteção: a segurança deve ser garantida por RLS e validação confiável.
