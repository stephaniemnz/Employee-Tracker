const express = require('express');       
const mysql = require('mysql12');

const PORT = process.env.PORT || 3001;
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
//Read all employees
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