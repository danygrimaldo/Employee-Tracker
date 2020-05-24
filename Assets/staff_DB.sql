DROP DATABASE IF EXISTS staff_DB;
CREATE DATABASE staff_DB;
USE staff_DB;

CREATE TABLE department
(
    id INTEGER default 0,
    name VARCHAR(30),
    PRIMARY KEY(id)
);

CREATE TABLE role
(
    id INTEGER default 0,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INTEGER NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE employee
(
    id INTEGER default 0,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id VARCHAR(200),
    manager_id INTEGER NOT NULL,
    PRIMARY KEY(id)
);