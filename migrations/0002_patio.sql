create table if not exists patio_marks (
  id serial primary key,
  zone text not null,
  vibe smallint not null,
  pour smallint not null,
  plate smallint not null,
  service smallint not null,
  sound smallint not null,
  tags text not null default '[]',
  note text,
  created_at timestamptz not null default now()
);

create index if not exists patio_marks_created_at_idx on patio_marks (created_at desc);

insert into patio_marks (zone, vibe, pour, plate, service, sound, tags, note, created_at)
select * from (
  values
    ('rail', 5, 4, 5, 5, 4, '["locked-in","lights-hit"]', 'String lights did the thing tonight.', now() - interval '18 minutes'),
    ('firepit', 5, 5, 4, 5, 5, '["music-right","come-back"]', 'Firepit was the room.', now() - interval '41 minutes'),
    ('bar', 4, 5, 4, 4, 3, '["staff-on-it","packed"]', 'Pour was clean. Bar got loud after ten.', now() - interval '1 hour 12 minutes'),
    ('garden', 4, 4, 5, 4, 4, '["lights-hit"]', 'Plate hit. Garden felt like a secret.', now() - interval '2 hours 5 minutes'),
    ('corner', 3, 4, 3, 5, 2, '["too-loud","staff-on-it"]', 'Corner caught the speaker. Staff moved us.', now() - interval '2 hours 48 minutes'),
    ('lights', 5, 4, 4, 4, 5, '["locked-in","music-right"]', null, now() - interval '3 hours 10 minutes'),
    ('rail', 4, 3, 4, 3, 4, '["slow-ticket","packed"]', 'Ticket lagged but the rail held.', now() - interval '4 hours'),
    ('garden', 5, 5, 5, 5, 4, '["come-back","locked-in"]', null, now() - interval '22 hours'),
    ('bar', 4, 4, 3, 4, 4, '["packed"]', null, now() - interval '1 day 3 hours'),
    ('firepit', 3, 3, 4, 4, 5, '["cold-seats","music-right"]', 'Bring a layer. Soundtrack was right.', now() - interval '2 days 5 hours'),
    ('rail', 5, 5, 4, 5, 5, '["staff-on-it","lights-hit"]', null, now() - interval '3 days 2 hours'),
    ('corner', 4, 4, 4, 3, 3, '["long-wait"]', 'Wait was real. Night still worked.', now() - interval '4 days 6 hours'),
    ('lights', 5, 4, 5, 5, 5, '["locked-in","come-back"]', 'This is the patio.', now() - interval '5 days 1 hour'),
    ('garden', 4, 4, 4, 4, 4, '["lights-hit"]', null, now() - interval '6 days 4 hours')
) as seed(zone, vibe, pour, plate, service, sound, tags, note, created_at)
where not exists (select 1 from patio_marks limit 1);
