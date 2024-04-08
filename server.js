const express = require('express');       
const mysql = require('mysql12');

const PORT = process.env.PORT || 3000;
const app = express();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Whiskey7!',
    database: 'employee_db'
});
console.log('Connected to the employee_db database.');

//Create a new department and department id
app.post('/api/department', ({ body }, res) => {
    const sql = `INSERT INTO department (name)
                 VALUES (?)`;
    const params = [body.name];
    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: body
        });
    });
});

//Create a new role
app.post('/api/role', ({ body }, res) => {
    const sql = `INSERT INTO role (title, salary, department_id)
                 VALUES (?, ?, ?)`;
    const params = [body.title, body.salary, body.department_id];
    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: body
        });
    });
});

//Create a new employee
app.post('/api/employee', ({ body }, res) => {
    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                 VALUES (?, ?, ?, ?)`;
    const params = [body.first_name, body.last_name, body.role_id, body.manager_id];
    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: body
        });
    });
});

//Read all departments  
app.get('/api/department', (req, res) => {
    const sql = `SELECT * FROM department`;
    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
}); 

//Read all roles
app.get('/api/role', (req, res) => {
    const sql = `SELECT * FROM role`;
    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
}); 
//View all employees
app.get('/api/employee', (req, res) => {
    const sql = `SELECT * FROM employee`;
    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

//Prompt to add a new employee
inquirer.prompt([       
    {
        type: 'input',
        name: 'first_name',
        message: "What is the employee's first name?"
    },
    {
        type: 'input',
        name: 'last_name',
        message: "What is the employee's last name?"
    },
    {
        type: 'input',
        name: 'title',
        message: "What is the employee's title?"
    },
    {
        type: 'input',
        name: 'department_id', 
        message: "What is the department id in which employee will be in?"
    },
    {
        type: 'input',
        name: 'salary',
        message: "What is the employee's salary?"
    }
])
.then((data) => {
    const sql = `INSERT INTO employee (first_name, last_name, title, department_id, salary)
                 VALUES (?, ?, ?, ?, ?)`;
    const params = [data.first_name, data.last_name, data.title, data.department_id, data.salary];
    db.query(sql, params, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log('Employee added!');
    });
});

//Prompt to initialize
function init() {
    inquirer.prompt({
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
            'Add a department',
            'Add a role',
            'Add an employee',
            'View all departments',
            'View all roles',
            'View all employees',
            'Update an employee role'
        ]
    })
};

//Start the server
init(); 