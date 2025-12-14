\c testdb;

CREATE TABLE test_table1 (
    id SERIAL PRIMARY KEY,
    col1 VARCHAR(100) NOT NULL UNIQUE,
    col2 VARCHAR(255) NOT NULL,
    available BOOLEAN DEFAULT true
);