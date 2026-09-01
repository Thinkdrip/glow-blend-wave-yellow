create table if not exists foh_responses (
  id serial primary key,
  answers text not null,
  created_at timestamptz not null default now()
);

create index if not exists foh_responses_created_at_idx on foh_responses (created_at desc);
