# Documentação técnica — RONDAS

**Projeto:** RONDAS  
**Repositório:** https://github.com/pastorjoseroberto-cpu/RONDAS  
**Branch de referência deste documento:** `main`  
**Arquivo principal do front-end:** `src/App.tsx)  
**Última atualização:** 18/10/2026

> **Nota sobre o estado documentado:** este documento registra o comportamento implementado e os testes relatados pelo responsável pelo projeto durante a conversa. Antes de publicar uma versão, confirme que as alterações locais em `src/App.tsx` e as mudanças no banco estão sincronizadas com o repositório e com o ambiente Supabase de destino. Não considerar recursos listados como pendentes já implementados.

## 1. Objetivo

O RONDAS gerencia chamados agendados e o fluxo de atendimento de técnicos, incluindo início da ronda, checklist, registro do atendimento e atualização do status para a equipe gestora.

## 2. Fluxo implementado e testado

Os itens abaixo foram confirmados pelo responsável pelo projeto em teste:

1. **Localizar chamado:** o técnico consegue pesquisar e carregar um chamado da Agenda.
2. **Iniciar ronda:** ao iniciar, o sistema atualiza o registro correspondente em `public.agendamentos` com status `Em andamento`, data/hora de início e coordenadas GPS quando a permissão e a localização estão disponíveis.
3. **Agenda do gerente:** o status `Em andamento` é exibido em azul. A regra visual de atraso foi ajustada para não exibir como `Atrasada` um chamado cujo status seja `Em andamento`.
4. **Concluir ronda:** o envio grava os dados da ronda na tabela `rondas` e atualiza o status do chamado em `agendamentos` para `Concluída`.
5. **Persistência:** foi verificado pelo responsável que o status, a data de início e as coordenadas permanecem gravados no Supabase após o início; também foi verificado que a conclusão persiste no banco.
6. **Bloqueio na busca:** a busca bloqueia chamados com status `Concluída`.
7. **Proteção na inicialização:** a atualização de início filtra chamados cujo status seja diferente de `Concluída` e de `Em andamento`; se nenhuma linha for atualizada, o sistema avisa que o chamado já foi concluído ou está em andamento.
8. **Estado da tela:** ao limpar o chamado, `rondaIniciada` é redefinido para `false`. Ao carregar um chamado, esse estado é ajustado conforme o status do agendamento.

### Observação sobre interrupções

Os dados já enviados ao Supabase permanecem no banco se o navegador for fechado ou o aparelho desligar. Porém, o salvamento automático de cada campo do checklist ainda não foi implementado. Portanto, dados preenchidos no formulário mas ainda não enviados podem ser perdidos ao sair da página ou atualizar o navegador.

## 3. Dados e banco de dados

### Tabela `public.agendamentos`

Colunas existentes identificadas no projeto:

- `id`
- `numero_chamado`
- `data_agendamento`
- `hora_agendamento`
- `unidade`
- `geo`
- `tipo_unidade`
- `nome_solicitante`
- `contato_ambev`
- `status`
- `criado_em`

Foram adicionadas ao banco durante o trabalho as seguintes colunas:

- `data_inicio timestamptz NULL`
- `latitude double precision NULL`
- `longitude double precision NULL`

A aplicação grava `data_inicio` em formato ISO e grava latitude/longitude quando o navegador consegue obter a posição. Se a localização não estiver disponível, esses dois campos podem ficar nulos.

### Tabela `rondas`

O fluxo de conclusão insere o conteúdo do formulário em `rondas`. O esquema completo dessa tabela não foi documentado aqui; confirmar diretamente no Supabase antes de alterar sua estrutura.

### Status utilizados no fluxo

- `Dentro do prazo`
- `Atrasada`
- `Em andamento`
- `Concluída`

Status adicionais, como `Pendente de decisão do gerente` ou `Improdutiva`, são propostas futuras e ainda não devem ser considerados estados implementados.

## 4. Sequência técnica atual

### Início

A função `iniciarRonda`:

1. Confere se há um número de chamado carregado.
2. Captura data/hora atual.
3. Tenta obter coordenadas usando a API de geolocalização do navegador.
4. Atualiza `public.agendamentos` com `status = 'Em andamento'`, `data_inicio`, `latitude` e `longitude`.
5. Exibe erro se a atualização falhar; caso contrário, atualiza o estado visual e informa sucesso.

A atualização de início inclui filtros para não atualizar registros já `Concluída` ou `Em andamento`. Isso reduz duplicidade no fluxo, mas concorrência, permissões/RLS e integridade devem ser revisadas antes de uso em produção.

### Conclusão

A função `handleSubmit`:

1. Insere os dados do atendimento em `public.rondas`.
2. Se a inserção funcionar, atualiza `public.agendamentos.status` para `Concluída` usando `numero_chamado`.
3. Se a atualização do status falhar, exibe uma mensagem informando que a ronda foi gravada, mas o status do chamado não pôde ser atualizado.
4. Se ambas as operações funcionarem, atualiza a lista na interface e segue o fluxo de sucesso.

**Atenção:** a inserção em `rondas` e a atualização em `agendamentos` são duas operações distintas; não constituem uma transação única. Se a primeira funcionar e a segunda falhar, pode ser necessário reconciliar os dados.

## 5. Recursos planejados — ainda não implementados

### 5.1 Rascunho automático do checklist

Salvar periodicamente ou a cada alteração os campos do checklist no Supabase e permitir retomar o preenchimento depois de sair da página, perder conexão ou desligar o aparelho. Definir tratamento de conflitos e identificação da execução antes de implementar.

### 5.2 Prévia para o suporte

Permitir que o técnico revise os dados preenchidos e envie uma prévia ao suporte antes da conclusão final. A prévia não deve marcar o chamado como concluído. O canal de envio e o fluxo de devolução para correção ainda precisam ser definidos.

### 5.3 Declaração de improdutividade

Disponibilizar um botão **Improdutiva** ao lado de **Iniciar ronda**. O técnico poderá declarar improdutividade sem iniciar a ronda e sem abrir o checklist. O formulário deve exigir justificativa e criar um registro próprio com chamado, técnico, data/hora, justificativa e estado pendente de decisão.

Fluxo proposto:

1. Técnico seleciona **Improdutiva** e informa a justificativa.
2. Chamado fica pendente de decisão do gerente.
3. Gerente escolhe o encaminhamento operacional correspondente a `-2`, encerra o chamado com motivo, ou devolve para esclarecimentos, conforme regras a confirmar.
4. O histórico da declaração e da decisão é preservado.

O significado operacional de `-2` precisa ser confirmado com a equipe antes da implementação. A improdutividade não deve preencher `data_inicio` nem gravar coordenadas como se a ronda tivesse começado.

### 5.4 Reabertura de chamado concluído

Permitir que usuário autorizado reabra um chamado, informando o motivo. A nova execução deve ser registrada separadamente, preservando o atendimento anterior, suas respostas, data/hora, GPS e conclusão. Não apagar nem sobrescrever o histórico antigo.

### 5.5 Proteção e integridade

Revisar as permissões/RLS do Supabase, autorização por função, prevenção de ações simultâneas, tratamento de falhas parciais e validações do lado do banco. Não presumir que filtros no front-end, isoladamente, são uma garantia de segurança.

## 6. Checklist de validação já relatado

- [x] Chamado localizado.
- [x] Status alterado para `Em andamento`.
- [x] Data de início e GPS preservados no Supabase.
- [x] Status `Concluída` persistido no Supabase.

Esses resultados refletem os testes relatados pelo responsável pelo projeto. Repetir os testes após sincronizar alterações com a branch `main), mudar esquema ou publicar nova versão.

## 7. Procedimento recomendado para cada alteração futura

1. Registrar objetivo e comportamento esperado antes de editar.
2. Verificar o código atual e a estrutura real do banco.
3. Fazer uma alteração pequena por vez.
4. Salvar e confirmar que o projeto compila.
5. Testar o fluxo funcional no ambiente correto.
6. Confirmar no Supabase os valores persistidos.
7. Atualizar este documento com arquivos, mudanças, testes, resultado e pendências.
8. Antes de produção, verificar variáveis de ambiente, RLS, autenticação, permissões e backup.

## 8. Segurança e configuração

- Não colocar chaves secretas, senhas ou tokens neste documento.
- O front-end pode usar uma chave pública/anon do Supabase, mas o acesso aos dados deve ser protegido por políticas RLS adequadas e autorização no banco.
- Confirmar que as variáveis de ambiente usadas pelo Vite estão configuradas corretamente em cada ambiente.
- Distinguir sempre o Supabase local de desenvolvimento do projeto remoto/de produção.
- Não executar migrações ou mudanças destrutivas em produção sem validar o ambiente e ter um plano de recuperação.

---

**Regra de manutenção:** ao implementar uma funcionalidade, atualizar as seções 2, 3, 5 e 6 conforme necessário. Manter explícita a diferença entre “implementado e testado”, “implementado mas não testado” e “planejado”.
