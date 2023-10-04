\c messagely_test
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS users;


CREATE TABLE users (
    username text PRIMARY KEY,
    password text,
    first_name text,
    last_name text,
    phone text,
    join_at timestamp without time zone,
    last_login_at timestamp with time zone
);

CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    from_username text REFERENCES users ON DELETE CASCADE,
    to_username text REFERENCES users ON DELETE CASCADE,
    body text,
    sent_at timestamp with time zone,
    read_at timestamp with time zone
);
