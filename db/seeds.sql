INSERT INTO department (name) VALUES
('Engineering'),
('Marketing'),
('Sales'),
('Finance'),
('Legal');  

INSERT INTO role (title, salary, department_id) VALUES
    ('Software Engineer', 80000, 1),
    ('Marketing Manager', 90000, 2),
    ('Sales Manager', 85000, 3),
    ('Financial Analyst', 75000, 4),
    ('Lawyer', 100000, 5);   

INSERT INTO employee (first_name, last_name, role_id) VALUES
    ('Stephanie', 'Ramos', 1),
    ( 'Whiskey', 'Ramos', 2),
    ('Gin', 'Muniz', 3),
    ('Kahlua', 'Demoss', 4),
    ('Rooster', 'Melendez', 5);