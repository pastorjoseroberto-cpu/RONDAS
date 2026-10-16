-- RONDAS: persistência da agenda de chamados
-- Revisão segura: este arquivo NÃO é executado automaticamente.
-- Execute no Supabase somente após revisar as colunas e fazer backup.
-- As operações abaixo apenas adicionam colunas; não apagam nem alteram registros existentes.

alter table public.agenda_os
  add column if not exists data_agendamento date,
  add column if not exists geo text,
  add column if not exists tipo_unidade text,
  add column if not exists nome_solicitante text,
  add column if not exists contato_ambev text;

-- Confirme que id_chamado possui chave primária ou restrição UNIQUE antes de usar
-- upsert(..., { onConflict: 'id_chamado' }) no aplicativo.
-- Esta migração deliberadamente NÃO altera RLS, privilégios, usuários ou senhas.
