-- Preserve the existing Echo archive while adding artwork-to-prompt responses.
-- Existing rows receive kind='prompt' so earlier Echoes remain visible and replyable.
alter table public.echoes
  add column if not exists kind text not null default 'prompt';

alter table public.echoes
  alter column kind set default 'prompt';

update public.echoes set kind='prompt' where kind is null;

alter table public.echoes
  alter column kind set not null;

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conrelid='public.echoes'::regclass and conname='echoes_kind_allowed'
  ) then
    alter table public.echoes add constraint echoes_kind_allowed
      check (kind in ('prompt','artwork')) not valid;
  end if;
end $$;

alter table public.echoes validate constraint echoes_kind_allowed;

alter table public.echoes
  add column if not exists media_path text,
  add column if not exists media_type text,
  add column if not exists response_to_id uuid;

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conrelid='public.echoes'::regclass and conname='echoes_response_to_id_fkey'
  ) then
    alter table public.echoes add constraint echoes_response_to_id_fkey
      foreign key (response_to_id) references public.echoes(id)
      on delete set null not valid;
  end if;
end $$;

alter table public.echoes validate constraint echoes_response_to_id_fkey;
create index if not exists echoes_response_to_id_idx on public.echoes(response_to_id);
