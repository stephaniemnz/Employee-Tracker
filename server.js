const inquirer = require('inquirer');       
const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employee_db'
});
console.log('Connected to the employee_db database.');


// Function to start the application    
function start() {
    inquirer
        .prompt({
            name: 'action',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                'View all employees',
                'View all departments',
                'View all roles',
                'Add employee',
                'Add department',
                'Add role',
                'Update employee role',
                'Exit'
            ]
        })
        .then(function(answer) {
            switch (answer.action) {
                case 'View all employees':
                    viewEmployees();
                    break;

                case 'View all departments':
                    viewDepartments();
                    break;

                case 'View all roles':
                    viewRoles();
                    break;

                case 'Add employee':
                    addEmployee();
                    break;

                case 'Add department':
                    addDepartment();
                    break;

                case 'Add role':
                    addRole();
                    break;

                case 'Update employee role':
                    updateEmployeeRole();
                    break;

                case 'Exit':
                    db.end();
                    break;
            }
        });
}