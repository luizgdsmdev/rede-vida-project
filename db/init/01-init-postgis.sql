CREATE EXTENSION IF NOT EXISTS postgis;

CREATE TABLE donation_centers (
  id SERIAL PRIMARY KEY,
  name TEXT,
  location GEOGRAPHY(POINT, 4326)
);

CREATE INDEX idx_centers_location
ON donation_centers
USING GIST (location);