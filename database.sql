
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "first_name" VARCHAR (80) NOT NULL DEFAULT '',
    "last_name" VARCHAR (80) NOT NULL DEFAULT '',
    "position" VARCHAR (80) NOT NULL,
    "classification" VARCHAR (225) NOT NULL DEFAULT ''
);


-- Create a function to auto trigger timestamps
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TABLE "message" (
	"id" SERIAL PRIMARY KEY,
	"status_number" INTEGER,
	"details" VARCHAR(255),
	"created_at_timestamp" TIMESTAMPTZ NOT NULL DEFAULT NOW(), -- this will get updated by the auto trigger
	"user_id" INTEGER REFERENCES "user"
	ON DELETE CASCADE
);

-- create the trigger that runs on each row that is updated on the message table
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON message
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();