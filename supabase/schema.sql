create extension if not exists pgcrypto;

create table if not exists public.collections (
  handle text primary key,
  name text not null,
  eyebrow text not null default 'Collection',
  description text not null default '',
  accent text not null default '',
  hero_image text not null default '',
  tags text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  handle text not null unique,
  name text not null,
  tagline text not null default '',
  price numeric(10,2) not null default 0,
  compare_at_price numeric(10,2),
  collection_handle text not null references public.collections(handle) on delete cascade,
  category text not null default '',
  color text not null default '',
  badges text[] not null default '{}',
  sizes text[] not null default '{}',
  stock integer not null default 0,
  description text not null default '',
  material text not null default '',
  fit text not null default '',
  care text not null default '',
  shipping text not null default '',
  spotlight text not null default '',
  images jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_collections_updated_at on public.collections;
create trigger set_collections_updated_at
before update on public.collections
for each row
execute function public.set_updated_at();

drop trigger if exists set_products_updated_at on public.products;
create trigger set_products_updated_at
before update on public.products
for each row
execute function public.set_updated_at();

alter table public.collections enable row level security;
alter table public.products enable row level security;

drop policy if exists "public can read collections" on public.collections;
create policy "public can read collections"
on public.collections
for select
to anon, authenticated
using (true);

drop policy if exists "public can manage collections in preview" on public.collections;
create policy "public can manage collections in preview"
on public.collections
for all
to anon, authenticated
using (true)
with check (true);

drop policy if exists "public can read products" on public.products;
create policy "public can read products"
on public.products
for select
to anon, authenticated
using (true);

drop policy if exists "public can manage products in preview" on public.products;
create policy "public can manage products in preview"
on public.products
for all
to anon, authenticated
using (true)
with check (true);
