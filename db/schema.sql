DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;   
   
CREATE TABLE department (
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(60) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(60) NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (department) REFERENCES department(id)
);

CREATE TABLE employee (
    id INT AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES role(id) on DELETE CASCADE,
    FOREIGN KEY (department) REFERENCES  department(id) on DELETE SET NULL
);  