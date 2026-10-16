-- RONDAS: campos para persistência da agenda
-- Arquivo de migração para revisão; não é executado automaticamente.
-- Não apaga registros nem altera permissões/RLS.
--
-- A auditoria confirmou que public.agenda_os já possui a chave primária
-- agenda_os_pkey em (id_chamado). Não criar um segundo índice único.

alter table public.agenda_os
  add column if not exists data_agendamento date,
  add column if not exists geo text,
  add column if not exists tipo_unidade text,
  add column if not exists nome_solicitante text,
  add column if not exists contato_ambev text;
