create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  full_name text not null default '',
  phone text,
  role text not null default 'customer' check (role in ('customer', 'admin')),
  created_at timestamptz not null default now()
);

create unique index if not exists profiles_email_lower_unique
  on public.profiles (lower(email));

alter table public.profiles enable row level security;

revoke all on public.profiles from anon, authenticated;
grant select on public.profiles to authenticated;
grant update (full_name, phone) on public.profiles to authenticated;

drop policy if exists "Users can read their own profile" on public.profiles;
create policy "Users can read their own profile"
  on public.profiles for select
  to authenticated
  using (id = (select auth.uid()));

drop policy if exists "Users can update their own profile" on public.profiles;
create policy "Users can update their own profile"
  on public.profiles for update
  to authenticated
  using (id = (select auth.uid()))
  with check (id = (select auth.uid()));

create or replace function public.is_store_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.profiles
    where id = (select auth.uid())
      and role = 'admin'
      and lower(email) = 'sujalkalamkar2234@gmail.com'
  );
$$;

revoke all on function public.is_store_admin() from public, anon;
grant execute on function public.is_store_admin() to authenticated;

create or replace function public.create_profile_for_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, email, full_name, phone)
  values (
    new.id,
    lower(new.email),
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    nullif(new.raw_user_meta_data ->> 'phone', '')
  )
  on conflict (id) do update
    set email = excluded.email,
        full_name = excluded.full_name,
        phone = excluded.phone;

  return new;
end;
$$;

drop trigger if exists create_profile_after_signup on auth.users;
create trigger create_profile_after_signup
  after insert on auth.users
  for each row execute procedure public.create_profile_for_new_user();

insert into public.profiles (id, email, full_name, phone, role)
select
  id,
  lower(email),
  coalesce(raw_user_meta_data ->> 'full_name', ''),
  nullif(raw_user_meta_data ->> 'phone', ''),
  'customer'
from auth.users
where email is not null
on conflict (id) do update
  set email = excluded.email,
      full_name = excluded.full_name,
      phone = excluded.phone;

create table if not exists public.store_content (
  id smallint primary key default 1 check (id = 1),
  content jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.store_content enable row level security;
revoke all on public.store_content from anon, authenticated;
grant select on public.store_content to anon, authenticated;
grant insert, update on public.store_content to authenticated;

drop policy if exists "Store content is public to read" on public.store_content;
create policy "Store content is public to read"
  on public.store_content for select
  to anon, authenticated
  using (true);

drop policy if exists "Only the store admin can insert content" on public.store_content;
create policy "Only the store admin can insert content"
  on public.store_content for insert
  to authenticated
  with check ((select public.is_store_admin()));

drop policy if exists "Only the store admin can update content" on public.store_content;
create policy "Only the store admin can update content"
  on public.store_content for update
  to authenticated
  using ((select public.is_store_admin()))
  with check ((select public.is_store_admin()));

create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  phone text not null,
  product_id text not null,
  product_name text not null,
  message text not null default '',
  status text not null default 'New',
  created_at timestamptz not null default now(),
  constraint enquiries_customer_name_length check (char_length(btrim(customer_name)) between 2 and 100),
  constraint enquiries_phone_format check (phone ~ '^[+0-9() -]{7,20}$'),
  constraint enquiries_product_id_length check (char_length(btrim(product_id)) between 1 and 80),
  constraint enquiries_product_name_length check (char_length(btrim(product_name)) between 1 and 200),
  constraint enquiries_message_length check (char_length(message) <= 2000),
  constraint enquiries_status_allowed check (status in ('New', 'Contacted', 'Closed'))
);

alter table public.enquiries enable row level security;
revoke all on public.enquiries from anon, authenticated;
grant insert (customer_name, phone, product_id, product_name, message)
  on public.enquiries to anon, authenticated;
grant select on public.enquiries to authenticated;
grant update (status) on public.enquiries to authenticated;

drop policy if exists "Visitors can submit an enquiry" on public.enquiries;
create policy "Visitors can submit an enquiry"
  on public.enquiries for insert
  to anon, authenticated
  with check (status = 'New');

drop policy if exists "Only the store admin can read enquiries" on public.enquiries;
create policy "Only the store admin can read enquiries"
  on public.enquiries for select
  to authenticated
  using ((select public.is_store_admin()));

drop policy if exists "Only the store admin can update enquiries" on public.enquiries;
create policy "Only the store admin can update enquiries"
  on public.enquiries for update
  to authenticated
  using ((select public.is_store_admin()))
  with check ((select public.is_store_admin()));

create index if not exists enquiries_created_at_desc_idx
  on public.enquiries (created_at desc);
