-- Supabase members-only Studio feed, extending existing Echo tables when present.
create table if not exists public.echoes (
 id uuid primary key default gen_random_uuid(), author_id uuid not null references auth.users(id) on delete cascade,
 kind text not null default 'prompt' check(kind in ('prompt','artwork')), title text not null, practice text not null,
 description text not null, external_url text, media_path text, media_type text check(media_type is null or media_type in ('image','video')), created_at timestamptz not null default now()
);
alter table public.echoes add column if not exists kind text not null default 'prompt';
alter table public.echoes add column if not exists media_path text;
alter table public.echoes add column if not exists media_type text;
alter table public.echoes add column if not exists external_url text;
alter table public.echoes add column if not exists created_at timestamptz not null default now();
create table if not exists public.echo_comments (
 id uuid primary key default gen_random_uuid(), echo_id uuid not null references public.echoes(id) on delete cascade,
 author_id uuid not null references auth.users(id) on delete cascade, content text not null, created_at timestamptz not null default now()
);
alter table public.echo_comments add column if not exists created_at timestamptz not null default now();
create index if not exists echoes_created_at_idx on public.echoes(created_at desc);
create index if not exists echo_comments_echo_created_at_idx on public.echo_comments(echo_id,created_at);
alter table public.echoes enable row level security;
alter table public.echo_comments enable row level security;
drop policy if exists "Members can read echoes" on public.echoes;
create policy "Members can read echoes" on public.echoes for select to authenticated using(true);
drop policy if exists "Studio members only: read echoes" on public.echoes;
create policy "Studio members only: read echoes" on public.echoes as restrictive for select to public using(auth.uid() is not null);
drop policy if exists "Members can publish echoes" on public.echoes;
create policy "Members can publish echoes" on public.echoes for insert to authenticated with check(author_id=auth.uid());
drop policy if exists "Studio members only: publish echoes" on public.echoes;
create policy "Studio members only: publish echoes" on public.echoes as restrictive for insert to public with check(author_id=auth.uid());
drop policy if exists "Authors can update their echoes" on public.echoes;
create policy "Authors can update their echoes" on public.echoes for update to authenticated using(author_id=auth.uid()) with check(author_id=auth.uid());
drop policy if exists "Studio members only: update echoes" on public.echoes;
create policy "Studio members only: update echoes" on public.echoes as restrictive for update to public using(author_id=auth.uid()) with check(author_id=auth.uid());
drop policy if exists "Authors can delete their echoes" on public.echoes;
create policy "Authors can delete their echoes" on public.echoes for delete to authenticated using(author_id=auth.uid());
drop policy if exists "Studio members only: delete echoes" on public.echoes;
create policy "Studio members only: delete echoes" on public.echoes as restrictive for delete to public using(author_id=auth.uid());
drop policy if exists "Members can read echo comments" on public.echo_comments;
create policy "Members can read echo comments" on public.echo_comments for select to authenticated using(true);
drop policy if exists "Studio members only: read comments" on public.echo_comments;
create policy "Studio members only: read comments" on public.echo_comments as restrictive for select to public using(auth.uid() is not null);
drop policy if exists "Members can comment as themselves" on public.echo_comments;
create policy "Members can comment as themselves" on public.echo_comments for insert to authenticated with check(author_id=auth.uid());
drop policy if exists "Studio members only: add comments" on public.echo_comments;
create policy "Studio members only: add comments" on public.echo_comments as restrictive for insert to public with check(author_id=auth.uid());
drop policy if exists "Authors can delete their comments" on public.echo_comments;
create policy "Authors can delete their comments" on public.echo_comments for delete to authenticated using(author_id=auth.uid());
drop policy if exists "Studio members only: delete comments" on public.echo_comments;
create policy "Studio members only: delete comments" on public.echo_comments as restrictive for delete to public using(author_id=auth.uid());
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
values('echo-media','echo-media',false,52428800,array['image/jpeg','image/png','image/gif','image/webp','image/avif','image/heic','image/heif','video/mp4','video/webm','video/quicktime','video/ogg'])
on conflict(id) do update set public=false,file_size_limit=excluded.file_size_limit,allowed_mime_types=excluded.allowed_mime_types;
drop policy if exists "Members can view studio media" on storage.objects;
create policy "Members can view studio media" on storage.objects for select to authenticated using(bucket_id='echo-media');
drop policy if exists "Studio members only: read media" on storage.objects;
create policy "Studio members only: read media" on storage.objects as restrictive for select to public using(bucket_id<>'echo-media' or auth.uid() is not null);
drop policy if exists "Members can upload their studio media" on storage.objects;
create policy "Members can upload their studio media" on storage.objects for insert to authenticated with check(bucket_id='echo-media' and (storage.foldername(name))[1]=auth.uid()::text);
drop policy if exists "Studio members only: upload media" on storage.objects;
create policy "Studio members only: upload media" on storage.objects as restrictive for insert to public with check(bucket_id<>'echo-media' or (auth.uid() is not null and (storage.foldername(name))[1]=auth.uid()::text));
drop policy if exists "Members can update their studio media" on storage.objects;
create policy "Members can update their studio media" on storage.objects for update to authenticated using(bucket_id='echo-media' and (storage.foldername(name))[1]=auth.uid()::text) with check(bucket_id='echo-media' and (storage.foldername(name))[1]=auth.uid()::text);
drop policy if exists "Studio members only: update media" on storage.objects;
create policy "Studio members only: update media" on storage.objects as restrictive for update to public using(bucket_id<>'echo-media' or (auth.uid() is not null and (storage.foldername(name))[1]=auth.uid()::text)) with check(bucket_id<>'echo-media' or (auth.uid() is not null and (storage.foldername(name))[1]=auth.uid()::text));
drop policy if exists "Members can delete their studio media" on storage.objects;
create policy "Members can delete their studio media" on storage.objects for delete to authenticated using(bucket_id='echo-media' and (storage.foldername(name))[1]=auth.uid()::text);
drop policy if exists "Studio members only: delete media" on storage.objects;
create policy "Studio members only: delete media" on storage.objects as restrictive for delete to public using(bucket_id<>'echo-media' or (auth.uid() is not null and (storage.foldername(name))[1]=auth.uid()::text));
alter table public.profiles enable row level security;
drop policy if exists "Members can read profiles" on public.profiles;
create policy "Members can read profiles" on public.profiles for select to authenticated using(true);
drop policy if exists "Studio members only: read profiles" on public.profiles;
create policy "Studio members only: read profiles" on public.profiles as restrictive for select to public using(auth.uid() is not null);
drop policy if exists "Members can create their profile" on public.profiles;
create policy "Members can create their profile" on public.profiles for insert to authenticated with check(id=auth.uid());
drop policy if exists "Studio members only: create profiles" on public.profiles;
create policy "Studio members only: create profiles" on public.profiles as restrictive for insert to public with check(id=auth.uid());
drop policy if exists "Members can update their profile" on public.profiles;
create policy "Members can update their profile" on public.profiles for update to authenticated using(id=auth.uid()) with check(id=auth.uid());
drop policy if exists "Studio members only: update profiles" on public.profiles;
create policy "Studio members only: update profiles" on public.profiles as restrictive for update to public using(id=auth.uid()) with check(id=auth.uid());
