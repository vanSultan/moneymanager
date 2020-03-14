--
-- PostgreSQL database dump
--

-- Dumped from database version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: postgres; Type: SCHEMA; Schema: -; Owner: moneymanager
--

CREATE SCHEMA money_manager;


ALTER SCHEMA money_manager OWNER TO moneymanager;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: account; Type: TABLE; Schema: postgres; Owner: moneymanager
--

CREATE TABLE money_manager.account (
    id integer NOT NULL,
    user_id integer NOT NULL,
    name character varying NOT NULL,
    type_id integer NOT NULL,
    balance double precision DEFAULT 0 NOT NULL
);


ALTER TABLE money_manager.account OWNER TO moneymanager;

--
-- Name: TABLE account; Type: COMMENT; Schema: postgres; Owner: moneymanager
--

COMMENT ON TABLE money_manager.account IS 'Счет';


--
-- Name: account_id_seq; Type: SEQUENCE; Schema: postgres; Owner: moneymanager
--

CREATE SEQUENCE money_manager.account_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE money_manager.account_id_seq OWNER TO moneymanager;

--
-- Name: account_id_seq; Type: SEQUENCE OWNED BY; Schema: postgres; Owner: moneymanager
--

ALTER SEQUENCE money_manager.account_id_seq OWNED BY money_manager.account.id;


--
-- Name: account_type; Type: TABLE; Schema: postgres; Owner: moneymanager
--

CREATE TABLE money_manager.account_type (
    id integer NOT NULL,
    type_name character varying NOT NULL
);


ALTER TABLE money_manager.account_type OWNER TO moneymanager;

--
-- Name: TABLE account_type; Type: COMMENT; Schema: postgres; Owner: moneymanager
--

COMMENT ON TABLE money_manager.account_type IS 'Тип счета';


--
-- Name: category; Type: TABLE; Schema: postgres; Owner: moneymanager
--

CREATE TABLE money_manager.category (
    id integer NOT NULL,
    name character varying NOT NULL,
    parent_category_id integer
);


ALTER TABLE money_manager.category OWNER TO moneymanager;

--
-- Name: TABLE category; Type: COMMENT; Schema: postgres; Owner: moneymanager
--

COMMENT ON TABLE money_manager.category IS 'Категория';


--
-- Name: category_id_seq; Type: SEQUENCE; Schema: postgres; Owner: moneymanager
--

CREATE SEQUENCE money_manager.category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE money_manager.category_id_seq OWNER TO moneymanager;

--
-- Name: category_id_seq; Type: SEQUENCE OWNED BY; Schema: postgres; Owner: moneymanager
--

ALTER SEQUENCE money_manager.category_id_seq OWNED BY money_manager.category.id;


--
-- Name: category_user; Type: TABLE; Schema: postgres; Owner: moneymanager
--

CREATE TABLE money_manager.category_user (
    user_id integer NOT NULL,
    category_id integer NOT NULL,
    hidden_flag boolean DEFAULT false NOT NULL
);


ALTER TABLE money_manager.category_user OWNER TO moneymanager;

--
-- Name: TABLE category_user; Type: COMMENT; Schema: postgres; Owner: moneymanager
--

COMMENT ON TABLE money_manager.category_user IS 'Пользовательская категрия';


--
-- Name: cell_type_id_seq; Type: SEQUENCE; Schema: postgres; Owner: moneymanager
--

CREATE SEQUENCE money_manager.cell_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE money_manager.cell_type_id_seq OWNER TO moneymanager;

--
-- Name: cell_type_id_seq; Type: SEQUENCE OWNED BY; Schema: postgres; Owner: moneymanager
--

ALTER SEQUENCE money_manager.cell_type_id_seq OWNED BY money_manager.account_type.id;


--
-- Name: external_entity; Type: TABLE; Schema: postgres; Owner: moneymanager
--

CREATE TABLE money_manager.external_entity (
    id integer NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE money_manager.external_entity OWNER TO moneymanager;

--
-- Name: TABLE external_entity; Type: COMMENT; Schema: postgres; Owner: moneymanager
--

COMMENT ON TABLE money_manager.external_entity IS 'Внешняя сущность';


--
-- Name: external_entity_id_seq; Type: SEQUENCE; Schema: postgres; Owner: moneymanager
--

CREATE SEQUENCE money_manager.external_entity_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE money_manager.external_entity_id_seq OWNER TO moneymanager;

--
-- Name: external_entity_id_seq; Type: SEQUENCE OWNED BY; Schema: postgres; Owner: moneymanager
--

ALTER SEQUENCE money_manager.external_entity_id_seq OWNED BY money_manager.external_entity.id;


--
-- Name: external_entity_user; Type: TABLE; Schema: postgres; Owner: moneymanager
--

CREATE TABLE money_manager.external_entity_user (
    user_id integer NOT NULL,
    external_entity_id integer NOT NULL,
    popular_category_id integer
);


ALTER TABLE money_manager.external_entity_user OWNER TO moneymanager;

--
-- Name: TABLE external_entity_user; Type: COMMENT; Schema: postgres; Owner: moneymanager
--

COMMENT ON TABLE money_manager.external_entity_user IS 'Пользовательская внешняя сущность';


--
-- Name: operation; Type: TABLE; Schema: postgres; Owner: moneymanager
--

CREATE TABLE money_manager.operation (
    id integer NOT NULL,
    user_id integer NOT NULL,
    account_from_id integer,
    account_to_id integer,
    category_id integer NOT NULL,
    external_entity_id integer,
    value double precision DEFAULT 0 NOT NULL,
    comment character varying,
    system_date timestamp without time zone DEFAULT now() NOT NULL,
    user_date timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE money_manager.operation OWNER TO moneymanager;

--
-- Name: TABLE operation; Type: COMMENT; Schema: postgres; Owner: moneymanager
--

COMMENT ON TABLE money_manager.operation IS 'Операция';


--
-- Name: operation_id_seq; Type: SEQUENCE; Schema: postgres; Owner: moneymanager
--

CREATE SEQUENCE money_manager.operation_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE money_manager.operation_id_seq OWNER TO moneymanager;

--
-- Name: operation_id_seq; Type: SEQUENCE OWNED BY; Schema: postgres; Owner: moneymanager
--

ALTER SEQUENCE money_manager.operation_id_seq OWNED BY money_manager.operation.id;


--
-- Name: role; Type: TABLE; Schema: postgres; Owner: moneymanager
--

CREATE TABLE money_manager.role (
    id integer NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE money_manager.role OWNER TO moneymanager;

--
-- Name: TABLE role; Type: COMMENT; Schema: postgres; Owner: moneymanager
--

COMMENT ON TABLE money_manager.role IS 'Роль пользователя';


--
-- Name: user; Type: TABLE; Schema: postgres; Owner: moneymanager
--

CREATE TABLE money_manager."user" (
    id integer NOT NULL,
    login character varying NOT NULL,
    password character varying NOT NULL,
    role_id integer NOT NULL
);


ALTER TABLE money_manager."user" OWNER TO moneymanager;

--
-- Name: TABLE "user"; Type: COMMENT; Schema: postgres; Owner: moneymanager
--

COMMENT ON TABLE money_manager."user" IS 'Пользователь';


--
-- Name: user_id_seq; Type: SEQUENCE; Schema: postgres; Owner: moneymanager
--

CREATE SEQUENCE money_manager.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE money_manager.user_id_seq OWNER TO moneymanager;

--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: postgres; Owner: moneymanager
--

ALTER SEQUENCE money_manager.user_id_seq OWNED BY money_manager."user".id;


--
-- Name: user_profile; Type: TABLE; Schema: postgres; Owner: moneymanager
--

CREATE TABLE money_manager.user_profile (
    user_id integer NOT NULL,
    email character varying NOT NULL,
    name character varying NOT NULL,
    surname character varying NOT NULL
);


ALTER TABLE money_manager.user_profile OWNER TO moneymanager;

--
-- Name: TABLE user_profile; Type: COMMENT; Schema: postgres; Owner: moneymanager
--

COMMENT ON TABLE money_manager.user_profile IS 'Профиль пользователя';


--
-- Name: user_role_id_seq; Type: SEQUENCE; Schema: postgres; Owner: moneymanager
--

CREATE SEQUENCE money_manager.user_role_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE money_manager.user_role_id_seq OWNER TO moneymanager;

--
-- Name: user_role_id_seq; Type: SEQUENCE OWNED BY; Schema: postgres; Owner: moneymanager
--

ALTER SEQUENCE money_manager.user_role_id_seq OWNED BY money_manager.role.id;


--
-- Name: account id; Type: DEFAULT; Schema: postgres; Owner: moneymanager
--

ALTER TABLE ONLY money_manager.account ALTER COLUMN id SET DEFAULT nextval('money_manager.account_id_seq'::regclass);


--
-- Name: account_type id; Type: DEFAULT; Schema: postgres; Owner: moneymanager
--

ALTER TABLE ONLY money_manager.account_type ALTER COLUMN id SET DEFAULT nextval('money_manager.cell_type_id_seq'::regclass);


--
-- Name: category id; Type: DEFAULT; Schema: postgres; Owner: moneymanager
--

ALTER TABLE ONLY money_manager.category ALTER COLUMN id SET DEFAULT nextval('money_manager.category_id_seq'::regclass);


--
-- Name: external_entity id; Type: DEFAULT; Schema: postgres; Owner: moneymanager
--

ALTER TABLE ONLY money_manager.external_entity ALTER COLUMN id SET DEFAULT nextval('money_manager.external_entity_id_seq'::regclass);


--
-- Name: operation id; Type: DEFAULT; Schema: postgres; Owner: moneymanager
--

ALTER TABLE ONLY money_manager.operation ALTER COLUMN id SET DEFAULT nextval('money_manager.operation_id_seq'::regclass);


--
-- Name: role id; Type: DEFAULT; Schema: postgres; Owner: moneymanager
--

ALTER TABLE ONLY money_manager.role ALTER COLUMN id SET DEFAULT nextval('money_manager.user_role_id_seq'::regclass);


--
-- Name: user id; Type: DEFAULT; Schema: postgres; Owner: moneymanager
--

ALTER TABLE ONLY money_manager."user" ALTER COLUMN id SET DEFAULT nextval('money_manager.user_id_seq'::regclass);


--
-- Data for Name: account; Type: TABLE DATA; Schema: postgres; Owner: moneymanager
--

COPY money_manager.account (id, user_id, name, type_id, balance) FROM stdin;
\.


--
-- Data for Name: account_type; Type: TABLE DATA; Schema: postgres; Owner: moneymanager
--

COPY money_manager.account_type (id, type_name) FROM stdin;
1	cash
2	bank_card
3	savings_account
\.


--
-- Data for Name: category; Type: TABLE DATA; Schema: postgres; Owner: moneymanager
--

COPY money_manager.category (id, name, parent_category_id) FROM stdin;
\.


--
-- Data for Name: category_user; Type: TABLE DATA; Schema: postgres; Owner: moneymanager
--

COPY money_manager.category_user (user_id, category_id, hidden_flag) FROM stdin;
\.


--
-- Data for Name: external_entity; Type: TABLE DATA; Schema: postgres; Owner: moneymanager
--

COPY money_manager.external_entity (id, name) FROM stdin;
\.


--
-- Data for Name: external_entity_user; Type: TABLE DATA; Schema: postgres; Owner: moneymanager
--

COPY money_manager.external_entity_user (user_id, external_entity_id, popular_category_id) FROM stdin;
\.


--
-- Data for Name: operation; Type: TABLE DATA; Schema: postgres; Owner: moneymanager
--

COPY money_manager.operation (id, user_id, account_from_id, account_to_id, category_id, external_entity_id, value, comment, system_date, user_date) FROM stdin;
\.


--
-- Data for Name: role; Type: TABLE DATA; Schema: postgres; Owner: moneymanager
--

COPY money_manager.role (id, name) FROM stdin;
1	user
2	moderator
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: postgres; Owner: moneymanager
--

COPY money_manager."user" (id, login, password, role_id) FROM stdin;
\.


--
-- Data for Name: user_profile; Type: TABLE DATA; Schema: postgres; Owner: moneymanager
--

COPY money_manager.user_profile (user_id, email, name, surname) FROM stdin;
\.


--
-- Name: account_id_seq; Type: SEQUENCE SET; Schema: postgres; Owner: moneymanager
--

SELECT pg_catalog.setval('money_manager.account_id_seq', 1, false);


--
-- Name: category_id_seq; Type: SEQUENCE SET; Schema: postgres; Owner: moneymanager
--

SELECT pg_catalog.setval('money_manager.category_id_seq', 1, false);


--
-- Name: cell_type_id_seq; Type: SEQUENCE SET; Schema: postgres; Owner: moneymanager
--

SELECT pg_catalog.setval('money_manager.cell_type_id_seq', 3, true);


--
-- Name: external_entity_id_seq; Type: SEQUENCE SET; Schema: postgres; Owner: moneymanager
--

SELECT pg_catalog.setval('money_manager.external_entity_id_seq', 1, false);


--
-- Name: operation_id_seq; Type: SEQUENCE SET; Schema: postgres; Owner: moneymanager
--

SELECT pg_catalog.setval('money_manager.operation_id_seq', 1, false);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: postgres; Owner: moneymanager
--

SELECT pg_catalog.setval('money_manager.user_id_seq', 1, false);


--
-- Name: user_role_id_seq; Type: SEQUENCE SET; Schema: postgres; Owner: moneymanager
--

SELECT pg_catalog.setval('money_manager.user_role_id_seq', 2, true);


--
-- Name: account account_pk; Type: CONSTRAINT; Schema: postgres; Owner: moneymanager
--

ALTER TABLE ONLY money_manager.account
    ADD CONSTRAINT account_pk PRIMARY KEY (id);


--
-- Name: category category_pk; Type: CONSTRAINT; Schema: postgres; Owner: moneymanager
--

ALTER TABLE ONLY money_manager.category
    ADD CONSTRAINT category_pk PRIMARY KEY (id);


--
-- Name: category_user category_user_pk; Type: CONSTRAINT; Schema: postgres; Owner: moneymanager
--

ALTER TABLE ONLY money_manager.category_user
    ADD CONSTRAINT category_user_pk PRIMARY KEY (user_id, category_id);


--
-- Name: account_type cell_type_pk; Type: CONSTRAINT; Schema: postgres; Owner: moneymanager
--

ALTER TABLE ONLY money_manager.account_type
    ADD CONSTRAINT cell_type_pk PRIMARY KEY (id);


--
-- Name: external_entity external_entity_pk; Type: CONSTRAINT; Schema: postgres; Owner: moneymanager
--

ALTER TABLE ONLY money_manager.external_entity
    ADD CONSTRAINT external_entity_pk PRIMARY KEY (id);


--
-- Name: external_entity_user external_entity_user_pk; Type: CONSTRAINT; Schema: postgres; Owner: moneymanager
--

ALTER TABLE ONLY money_manager.external_entity_user
    ADD CONSTRAINT external_entity_user_pk PRIMARY KEY (user_id, external_entity_id);


--
-- Name: operation operation_pk; Type: CONSTRAINT; Schema: postgres; Owner: moneymanager
--

ALTER TABLE ONLY money_manager.operation
    ADD CONSTRAINT operation_pk PRIMARY KEY (id);


--
-- Name: user user_pk; Type: CONSTRAINT; Schema: postgres; Owner: moneymanager
--

ALTER TABLE ONLY money_manager."user"
    ADD CONSTRAINT user_pk PRIMARY KEY (id);


--
-- Name: user_profile user_profile_pk; Type: CONSTRAINT; Schema: postgres; Owner: moneymanager
--

ALTER TABLE ONLY money_manager.user_profile
    ADD CONSTRAINT user_profile_pk PRIMARY KEY (user_id);


--
-- Name: role user_role_pk; Type: CONSTRAINT; Schema: postgres; Owner: moneymanager
--

ALTER TABLE ONLY money_manager.role
    ADD CONSTRAINT user_role_pk PRIMARY KEY (id);


--
-- Name: account_type_type_name_uindex; Type: INDEX; Schema: postgres; Owner: moneymanager
--

CREATE UNIQUE INDEX account_type_type_name_uindex ON money_manager.account_type USING btree (type_name);


--
-- Name: account_user_id_name_uindex; Type: INDEX; Schema: postgres; Owner: moneymanager
--

CREATE UNIQUE INDEX account_user_id_name_uindex ON money_manager.account USING btree (user_id, name);


--
-- Name: category_name_uindex; Type: INDEX; Schema: postgres; Owner: moneymanager
--

CREATE UNIQUE INDEX category_name_uindex ON money_manager.category USING btree (name);


--
-- Name: external_entity_name_uindex; Type: INDEX; Schema: postgres; Owner: moneymanager
--

CREATE UNIQUE INDEX external_entity_name_uindex ON money_manager.external_entity USING btree (name);


--
-- Name: user_login_uindex; Type: INDEX; Schema: postgres; Owner: moneymanager
--

CREATE UNIQUE INDEX user_login_uindex ON money_manager."user" USING btree (login);


--
-- Name: user_profile_email_uindex; Type: INDEX; Schema: postgres; Owner: moneymanager
--

CREATE UNIQUE INDEX user_profile_email_uindex ON money_manager.user_profile USING btree (email);


--
-- Name: user_role_name_uindex; Type: INDEX; Schema: postgres; Owner: moneymanager
--

CREATE UNIQUE INDEX user_role_name_uindex ON money_manager.role USING btree (name);


--
-- Name: account account_account_type_id_fk; Type: FK CONSTRAINT; Schema: postgres; Owner: moneymanager
--

ALTER TABLE ONLY money_manager.account
    ADD CONSTRAINT account_account_type_id_fk FOREIGN KEY (type_id) REFERENCES money_manager.account_type(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: account account_user_id_fk; Type: FK CONSTRAINT; Schema: postgres; Owner: moneymanager
--

ALTER TABLE ONLY money_manager.account
    ADD CONSTRAINT account_user_id_fk FOREIGN KEY (user_id) REFERENCES money_manager."user"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: category category_category_id_fk; Type: FK CONSTRAINT; Schema: postgres; Owner: moneymanager
--

ALTER TABLE ONLY money_manager.category
    ADD CONSTRAINT category_category_id_fk FOREIGN KEY (parent_category_id) REFERENCES money_manager.category(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: category_user category_user_category_id_fk; Type: FK CONSTRAINT; Schema: postgres; Owner: moneymanager
--

ALTER TABLE ONLY money_manager.category_user
    ADD CONSTRAINT category_user_category_id_fk FOREIGN KEY (category_id) REFERENCES money_manager.category(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: category_user category_user_user_id_fk; Type: FK CONSTRAINT; Schema: postgres; Owner: moneymanager
--

ALTER TABLE ONLY money_manager.category_user
    ADD CONSTRAINT category_user_user_id_fk FOREIGN KEY (user_id) REFERENCES money_manager."user"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: external_entity_user external_entity_user_category_id_fk; Type: FK CONSTRAINT; Schema: postgres; Owner: moneymanager
--

ALTER TABLE ONLY money_manager.external_entity_user
    ADD CONSTRAINT external_entity_user_category_id_fk FOREIGN KEY (popular_category_id) REFERENCES money_manager.category(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: external_entity_user external_entity_user_external_entity_id_fk; Type: FK CONSTRAINT; Schema: postgres; Owner: moneymanager
--

ALTER TABLE ONLY money_manager.external_entity_user
    ADD CONSTRAINT external_entity_user_external_entity_id_fk FOREIGN KEY (external_entity_id) REFERENCES money_manager.external_entity(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: external_entity_user external_entity_user_user_id_fk; Type: FK CONSTRAINT; Schema: postgres; Owner: moneymanager
--

ALTER TABLE ONLY money_manager.external_entity_user
    ADD CONSTRAINT external_entity_user_user_id_fk FOREIGN KEY (user_id) REFERENCES money_manager."user"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: operation operation_account_from_id_fk; Type: FK CONSTRAINT; Schema: postgres; Owner: moneymanager
--

ALTER TABLE ONLY money_manager.operation
    ADD CONSTRAINT operation_account_from_id_fk FOREIGN KEY (account_from_id) REFERENCES money_manager.account(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: operation operation_account_to_id_fk; Type: FK CONSTRAINT; Schema: postgres; Owner: moneymanager
--

ALTER TABLE ONLY money_manager.operation
    ADD CONSTRAINT operation_account_to_id_fk FOREIGN KEY (account_to_id) REFERENCES money_manager.account(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: operation operation_category_id_fk; Type: FK CONSTRAINT; Schema: postgres; Owner: moneymanager
--

ALTER TABLE ONLY money_manager.operation
    ADD CONSTRAINT operation_category_id_fk FOREIGN KEY (category_id) REFERENCES money_manager.category(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: operation operation_external_entity_id_fk; Type: FK CONSTRAINT; Schema: postgres; Owner: moneymanager
--

ALTER TABLE ONLY money_manager.operation
    ADD CONSTRAINT operation_external_entity_id_fk FOREIGN KEY (external_entity_id) REFERENCES money_manager.external_entity(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: operation operation_user_id_fk; Type: FK CONSTRAINT; Schema: postgres; Owner: moneymanager
--

ALTER TABLE ONLY money_manager.operation
    ADD CONSTRAINT operation_user_id_fk FOREIGN KEY (user_id) REFERENCES money_manager."user"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: user_profile user_profile_user_id_fk; Type: FK CONSTRAINT; Schema: postgres; Owner: moneymanager
--

ALTER TABLE ONLY money_manager.user_profile
    ADD CONSTRAINT user_profile_user_id_fk FOREIGN KEY (user_id) REFERENCES money_manager."user"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: user user_user_role_id_fk; Type: FK CONSTRAINT; Schema: postgres; Owner: moneymanager
--

ALTER TABLE ONLY money_manager."user"
    ADD CONSTRAINT user_user_role_id_fk FOREIGN KEY (role_id) REFERENCES money_manager.role(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--