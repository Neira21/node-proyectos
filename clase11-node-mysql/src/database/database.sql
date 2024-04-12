DROP DATABASE IF EXISTS companydb;

CREATE DATABASE companydb;
USE companydb;


CREATE TABLE employee (
  id BINARY(16) NOT NULL DEFAULT (UUID_TO_BIN(UUID())),
  name VARCHAR(45) DEFAULT NULL,
  salary INT(11) DEFAULT NULL, 
  PRIMARY KEY(id)
);

DESCRIBE employee;

INSERT INTO employee(name, salary) values
('Ryan Ray', 20000),
('Joe McMillan', 40000),
('John Carter', 50000);

INSERT INTO employee (name, salary) values 
  ('ccc', 1000),
  ('A', 1500),
  ('b', 1600);

SELECT (BIN_TO_UUID(id)) as "idEmploye" , name, salary FROM employee;