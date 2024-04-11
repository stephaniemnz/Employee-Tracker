const express = require('express');       
const mysql = require('mysql2');
const inquirer = require('inquirer');

const PORT = process.env.PORT || 3000;
const app = express();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Whiskey7!',
    database: 'employee_db'
});

console.log('Connected to the employee_db database.');

async function fetchDepartments() {
    const sql = `SELECT id, name FROM department`; 
    const [departments] = await db.promise().query(sql);
    return departments.map(department => ({
        name: department.name,
        value: department.id 
    }));
}


//Create a new department and department id
function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the department?'
        }
    ]).then((response) => {
        const department = response.name;
    const sql = `INSERT INTO department (name)
                 VALUES (?)`;
    const params = [department];
    db.query(sql, params, (err, result) => {
        if (err) {
            console.log(err);
            return; 
        }
        console.table(result), viewDepartments();
    })
})
}

//Create a new role
function addRole() {
fetchDepartments().then((departmentChoices) => {{
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the title of the role?'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary of the role?'
        },
        {
            type: 'list',
            name: 'department_id', 
            choices: departmentChoices,      
            message: 'What department does the role belong to?'
        }
    ]).then((response) => {
        const { title, salary, department_id } = response;   
    const sql = `INSERT INTO role (title, salary, department_id)
                 VALUES (?, ?, ?)`;
                 const params = [title, salary, department_id]; 
    db.query(sql, params, (err, result) => {
        if (err) {
            console.log(err);   
            return;
        }
        console.table(result), viewRoles(); 
    });
});
}});
}

//Create a new employee
function addEmployee() {
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
            name: 'role_id',
            message: "What is the employee's role id?"
        }
    ]).then((response) => {
    const { first_name, last_name, role_id } = response;    
    const sql = `INSERT INTO employee (first_name, last_name, role_id)
                 VALUES (?, ?, ?)`;
    const params = [first_name, last_name, role_id];
    db.query(sql, params, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        console.table(result), viewEmployees();
    })
})
}
//View all departments 
function viewDepartments() {
    console.log('Viewing all departments...');      
    const sql = `SELECT * FROM department`;
    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
      console.table(rows), init();
    });
}
//View all roles
function viewRoles() {
    const sql = `SELECT * FROM role`;
    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        console.table(rows), init();
    });
}
//View all employees
function viewEmployees() {  
    const sql = `SELECT * FROM employee`;
    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
       console.table(rows), init(); 
    });
}

//Prompt to initialize
function init() {
    inquirer.prompt([
        {
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
        }
    ]) .then ((response) => {
        switch (response.action) {
            case 'Add a department':
                addDepartment();
                break;
            case 'Add a role':
                addRole();
                break;
            case 'Add an employee':
                addEmployee();
                break;
            case 'View all departments':
                viewDepartments();
                break;
            case 'View all roles':
                viewRoles();
                break;
            case 'View all employees':
                viewEmployees();
                break;
            case 'Update an employee role':
                updateEmployeeRole();
                break;
        }
    });
};

//Start the server
init(); 