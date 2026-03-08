CREATE KEYSPACE IF NOT EXISTS url_shortener
WITH replication = {
  'class': 'SimpleStrategy',
  'replication_factor': 1
};

USE url_shortener;

CREATE TABLE IF NOT EXISTS urls (
  short_code text PRIMARY KEY,
  long_url text,
  created_at timestamp,
);