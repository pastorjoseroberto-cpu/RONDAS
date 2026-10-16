-- RONDAS: campos para persistência da agenda
-- Arquivo de migração para revisão; não é executado automaticamente.
-- Não apaga registros nem altera permissões/RLS.

alter table public.agenda_os
  add column if not exists data_agendamento date,
  add column if not exists geo text,
  add column if not exists tipo_unidade text,
  add column if not exists nome_solicitante text,
  add column if not exists contato_ambev text;

-- Necessário para upsert por id_chamado. Se houver chamados duplicados,
-- a criação do índice falhará sem apagar dados; revise as duplicidades antes de prosseguir.
create unique index if not exists agenda_os_id_chamado_uidx
  on public.agenda_os (id_chamado);
