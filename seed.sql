\echo 'Delete and recreate capstone2 db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE capstone2;
CREATE DATABASE capstone2;
\c capstone2

\i schema.sql
\i data.sql

\echo 'Delete and recreate capstone2_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE capstone2_test;
CREATE DATABASE capstone2_test;

\c capstone2_test

\i schema.sql