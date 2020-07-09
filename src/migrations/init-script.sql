CREATE TABLE "actions" (
  "id" UUID PRIMARY KEY,
  "name" text UNIQUE,
  "code" text UNIQUE,
  "created_at" Date,
  "updated_at" Date
);

CREATE TABLE "roles" (
  "id" UUID PRIMARY KEY,
  "name" text UNIQUE,
  "code" text UNIQUE,
  "created_at" Date,
  "updated_at" Date
);

CREATE TABLE "roles_actions" (
  
  "action_id" UUID,
  "role_id" UUID,
  "created_at" Date,
  "updated_at" Date
);

CREATE TABLE "accounts" (
  "id" UUID PRIMARY KEY,
  "username" text UNIQUE,
  "password" text,
  "created_at" Date,
  "updated_at" Date
);

CREATE TYPE gender AS ENUM ('Nam', 'Nữ');

CREATE TABLE "profiles" (
  "id" UUID PRIMARY KEY,
  "account_id" UUID UNIQUE,
  "first_name" text,
  "last_name" text,
  "gender" gender,
  "phone" text,
  "email" text,
  "avatar" text,
  "city_code" text,
  "district_code" text,
  "ward_code" text,
  "address" text,
  "created_at" Date,
  "updated_at" Date
);

CREATE TABLE "accounts_roles" (
  
  "account_id" UUID,
  "role_id" UUID,
  "created_at" Date,
  "updated_at" Date
);

CREATE TABLE "accounts_actions" (
  
  "action_id" UUID,
  "account_id" UUID,
  "created_at" Date,
  "updated_at" Date
);

CREATE TABLE "cities" (
  "code" text UNIQUE PRIMARY KEY,
  "name" text UNIQUE,
  "type" text
);

CREATE TABLE "districts" (
  "code" text PRIMARY KEY,
  "name" text,
  "type" text,
  "city_code" text
);

CREATE TABLE "wards" (
  "code" text UNIQUE PRIMARY KEY,
  "name" text,
  "type" text,
  "district_code" text
);

ALTER TABLE "roles_actions" ADD FOREIGN KEY ("action_id") REFERENCES "actions" ("id");

ALTER TABLE "roles_actions" ADD FOREIGN KEY ("role_id") REFERENCES "roles" ("id");

ALTER TABLE "profiles" ADD FOREIGN KEY ("account_id") REFERENCES "accounts" ("id");

ALTER TABLE "accounts_roles" ADD FOREIGN KEY ("role_id") REFERENCES "roles" ("id");

ALTER TABLE "accounts_roles" ADD FOREIGN KEY ("account_id") REFERENCES "accounts" ("id");

ALTER TABLE "accounts_actions" ADD FOREIGN KEY ("account_id") REFERENCES "accounts" ("id");

ALTER TABLE "accounts_actions" ADD FOREIGN KEY ("action_id") REFERENCES "actions" ("id");

ALTER TABLE "districts" ADD FOREIGN KEY ("city_code") REFERENCES "cities" ("code");

ALTER TABLE "wards" ADD FOREIGN KEY ("district_code") REFERENCES "districts" ("code");

ALTER TABLE "profiles" ADD FOREIGN KEY ("city_code") REFERENCES "cities" ("code");

ALTER TABLE "profiles" ADD FOREIGN KEY ("district_code") REFERENCES "districts" ("code");

ALTER TABLE "profiles" ADD FOREIGN KEY ("ward_code") REFERENCES "wards" ("code");
