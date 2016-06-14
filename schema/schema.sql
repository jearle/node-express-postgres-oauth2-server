--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: oauth_tokens; Type: TABLE; Schema: public; Owner: -; Tablespace:
--

CREATE TABLE oauth_tokens (

    id uuid NOT NULL,
    access_token text NOT NULL,
    access_token_expires_on timestamp with time zone NOT NULL,
    client_id text NOT NULL,
    user_id uuid NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL

);

ALTER TABLE ONLY oauth_tokens
    ADD CONSTRAINT oauth_tokens_pkey PRIMARY KEY (id);

--
-- Name: refresh_tokens; Type: TABLE; Schema: public; Owner: -; Tablespace:
--

CREATE TABLE refresh_tokens (

    id uuid NOT NULL,
    refresh_token text NOT NULL,
    refresh_token_expires_on timestamp with time zone NOT NULL,
    client_id text NOT NULL,
    user_id uuid NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL

);

ALTER TABLE ONLY refresh_tokens
    ADD CONSTRAINT refresh_tokens_pkey PRIMARY KEY (id);

--
-- Name: oauth_clients; Type: TABLE; Schema: public; Owner: -; Tablespace:
--

CREATE TABLE oauth_clients (

    client_id text NOT NULL,
    client_secret text NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL

);

ALTER TABLE ONLY oauth_clients
    ADD CONSTRAINT oauth_clients_pkey PRIMARY KEY (client_id, client_secret);

--
-- Name: users; Type: TABLE; Schema: public; Owner: -; Tablespace:
--

CREATE TABLE users (

    id uuid NOT NULL,
    username text unique NOT NULL,
    password text NOT NULL,
    name text,
    profile_url text,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL

);

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);

--
-- user_roles_types: users; Type: TABLE; Schema: public; Owner: -; Tablespace:
--

CREATE TABLE roles (

    id uuid NOT NULL,
    name text unique NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL

);

ALTER TABLE ONLY roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);

--
-- user_roles: users; Type: TABLE; Schema: public; Owner: -; Tablespace:
--

CREATE TABLE user_roles (

    id uuid NOT NULL,
    user_id uuid NOT NULL,
    role_id uuid NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL

);

ALTER TABLE ONLY user_roles
    ADD CONSTRAINT user_roles_pkey PRIMARY KEY (id);

--
-- grant_types: users; Type: TABLE; Schema: public; Owner: -; Tablespace:
--

CREATE TABLE grant_types (

    id uuid NOT NULL,
    name text,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL

);

ALTER TABLE ONLY grant_types
    ADD CONSTRAINT grant_types_pkey PRIMARY KEY (id);

--
-- client_grants: users; Type: TABLE; Schema: public; Owner: -; Tablespace:
--

CREATE TABLE client_grants (

    id uuid NOT NULL,
    client_id uuid NOT NULL,
    grant_type_id uuid NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL

);

ALTER TABLE ONLY client_grants
    ADD CONSTRAINT client_grants_pkey PRIMARY KEY (id);

--
-- Name: users_username_password; Type: INDEX; Schema: public; Owner: -; Tablespace:
--

CREATE INDEX users_username_password ON users USING btree (username, password);
