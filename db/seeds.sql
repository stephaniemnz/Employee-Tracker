INSERT INTO departments (department, department_id) VALUES
('Engineering, 1'),
('Marketing', 2),
('Sales', 3),
('Finance', 4),
('Legal', 5);  

INSERT INTO roles (title, salary, department_id) VALUES
    ('Software Engineer', 80000, 1),
    ('Marketing Manager', 90000, 2),
    ('Sales Manager', 85000, 3),
    ('Financial Analyst', 75000, 4),
    ('Lawyer', 100000, 5);   

INSERT INTO employees (employee_id, first_name, last_name, title, department_id, salary,) VALUES
    (10, 'John', 'Doe', 'Software Engineer', 1, 80000),
    (20, 'Jane', 'Smith', 'Marketing Manager', 2, 90000),
    (30, 'John', 'Smith', 'Sales Manager', 3, 85000),
    (40, 'Jane', 'Doe', 'Financial Analyst', 4, 75000),
    (50, 'John', 'Doe', 'Lawyer', 5, 100000);
