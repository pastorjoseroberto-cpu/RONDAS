-- RONDAS: auditoria somente leitura de permissões e RLS
-- Execute no SQL Editor do Supabase apenas para INSPECIONAR o estado atual.
-- Este arquivo contém SELECTs; não altera tabelas, dados, grants nem políticas.
-- Revise os resultados antes de desenhar uma migração de segurança.

-- 1) Estado de RLS e FORCE RLS nas tabelas públicas de interesse
select
  n.nspname as schema_name,
  c.relname as table_name,
  c.relrowsecurity as rls_enabled,
  c.relforcerowsecurity as force_rls
from pg_class c
join pg_namespace n on n.oid = c.relnamespace
where n.nspname = 'public'
  and c.relkind in ('r', 'p')
  and c.relname in ('agenda_os', 'rondas', 'unidades', 'usuarios_sistema')
order by c.relname;

-- 2) Políticas RLS existentes, inclusive comandos e expressões
select
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual as using_expression,
  with_check as with_check_expression
from pg_policies
where schemaname = 'public'
  and tablename in ('agenda_os', 'rondas', 'unidades', 'usuarios_sistema')
order by tablename, policyname;

-- 3) Privilégios explícitos por papel/tabela
select
  grantee,
  table_schema,
  table_name,
  privilege_type,
  is_grantable
from information_schema.role_table_grants
where table_schema = 'public'
  and table_name in ('agenda_os', 'rondas', 'unidades', 'usuarios_sistema')
  and grantee in ('anon', 'authenticated', 'service_role', 'PUBLIC')
order by table_name, grantee, privilege_type;

-- 4) Colunas e tipos atuais; compare com os campos usados pela aplicação
select
  table_name,
  ordinal_position,
  column_name,
  data_type,
  is_nullable,
  column_default
from information_schema.columns
where table_schema = 'public'
  and table_name in ('agenda_os', 'rondas', 'unidades', 'usuarios_sistema')
order by table_name, ordinal_position;

-- 5) Constraints e índices existentes na agenda; ajuda a validar o upsert
select
  t.relname as table_name,
  i.relname as index_name,
  ix.indisunique as is_unique,
  pg_get_indexdef(i.oid) as index_definition
from pg_class t
join pg_namespace n on n.oid = t.relnamespace
join pg_index ix on ix.indrelid = t.oid
join pg_class i on i.oid = ix.indexrelid
where n.nspname = 'public'
  and t.relname = 'agenda_os'
order by i.relname;

-- 6) Contagens aproximadas/atuais das tabelas alvo.
-- COUNT(*) é exato, porém pode demorar se a tabela for grande.
select 'agenda_os' as table_name, count(*) as row_count from public.agenda_os
union all
select 'rondas', count(*) from public.rondas
union all
select 'unidades', count(*) from public.unidades
union all
select 'usuarios_sistema', count(*) from public.usuarios_sistema;
