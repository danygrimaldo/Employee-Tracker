var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Gr!mald0",
    database: "staff_DB"
});

connection.connect(function (err) {
    if (err) throw err;
    runSearch();
});

//Runs the prompts and runs the search by calling the selected function based on client Input
function runSearch() {
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "What can we do for you today?",
        choices: [
            "View Employees",
            "View Departments",
            "View Roles",
            "Add a NEW Employee",
            "Add a NEW Role",
            "Add a NEW Department",
            "Update an Employee's Role"
        ]
    }).then(function (answer) {
        switch (answer.action) {
            case "View Employees":
                employeeSearch();
                break;

            case "View Departments":
                deptSearch();
                break;

            case "View Roles":
                roleSearch();
                break;

            case "Add a NEW Employee":
                addEmployee();
                break;

            case "Add a NEW Role":
                addRole();
                break;

            case "Add a NEW Department":
                addDept();
                break;

            case "Update an Employee Role":
                updateRole();
                break;
        }
    });
}

//function to view all employees
function employeeSearch() {
    var query = "SELECT * FROM employee";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        runSearch();
    });
}

//function to view all departments
function deptSearch() {
    var query = "SELECT * FROM department";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        runSearch();
    });
}

//function to view all roles
function roleSearch() {
    var query = "SELECT * FROM role";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        runSearch();
    });
}

//function to add an employee
function addEmployee() {
    //Prompts for First Name, Last Name, Role, and Manager
    inquirer.prompt([
        {
            name: "first_name",
            type: "input",
            message: "What is the NEW employee's first name?"
        },
        {
            name: "last_name",
            type: "input",
            message: "What is the NEW employee's last name?"
        },
        {
            name: "role",
            type: "input",
            message: "What is the NEW employee's role?"
        },
        {
            name: "manager",
            type: "input",
            message: "Who is the NEW employee's manager?"
        }
    ]).then(function (answer) {
        // .then(function (answer) {
        // when finished prompting, insert a new item into the db with that info
        connection.query(
            "INSERT INTO employee SET ?",
            {
                first_name: answer.first_name,
                last_name: answer.last_name,
                //Figure out how to get these to talk to the corresponding array
                role_id: 0,
                manager_id: 0
            },
            function (err) {
                if (err) throw err;
                console.log("New Employee Successfully Added!");
                runSearch();
            });
    });
}

//function to add a department
function addDept() {
    inquirer.prompt({
        name: "action",
        type: "input",
        message: "What NEW department are we adding?"
    }).then(function (answer) {
        const value = { name: answer.action }
        var query = "INSERT INTO department SET ?"
        connection.query(query, value, function (err, res) {
            if (err) throw err;
            console.table(res);
            runSearch();
        });
    })
}

//function to add a role
function addRole() {
    //Prompts for First Name, Last Name, Role, and Manager
    inquirer.prompt([
        {
            name: "title",
            type: "input",
            message: "What is the NEW name of the role you would like to add?"
        },
        {
            name: "salary",
            type: "input",
            message: "What is the salary for the NEW role?"
        },
        {
            name: "department",
            type: "input",
            message: "What department will the role be filled under?"
        }
    ]).then(function (answer) {
        // .then(function (answer) {
        // when finished prompting, insert a new item into the db with that info
        connection.query(
            "INSERT INTO role SET ?",
            {
                title: answer.title,
                salary: answer.salary,
                //Figure out how to get these to talk to the corresponding array
                department_id: 0,
            },
            function (err) {
                if (err) throw err;
                console.log("New Role Successfully Added!");
                runSearch();
            });
    });
}

// function updateRole() {
//     // query the database for all items being auctioned
//     connection.query("SELECT * FROM employee", function (err, results) {
//         if (err) throw err;
//         // once you have the items, prompt the user for which they'd like to bid on
//         inquirer
//             .prompt([
//                 {
//                     name: "choice",
//                     type: "rawlist",
//                     choices: function () {
//                         var choiceArray = [];
//                         for (var i = 0; i < results.length; i++) {
//                             choiceArray.push(results[i].item_name);
//                         }
//                         return choiceArray;
//                     },
//                     message: "What auction would you like to place a bid in?"
//                 },
//                 {
//                     name: "bid",
//                     type: "input",
//                     message: "How much would you like to bid?"
//                 }
//             ])
//             .then(function (answer) {
//                 // get the information of the chosen item
//                 var chosenItem;
//                 for (var i = 0; i < results.length; i++) {
//                     if (results[i].item_name === answer.choice) {
//                         chosenItem = results[i];
//                     }
//                 }

//                 // determine if bid was high enough
//                 if (chosenItem.highest_bid < parseInt(answer.bid)) {
//                     // bid was high enough, so update db, let the user know, and start over
//                     connection.query(
//                         "UPDATE auctions SET ? WHERE ?",
//                         [
//                             {
//                                 highest_bid: answer.bid
//                             },
//                             {
//                                 id: chosenItem.id
//                             }
//                         ],
//                         function (error) {
//                             if (error) throw err;
//                             console.log("Bid placed successfully!");
//                             start();
//                         }
//                     );
//                 }
//                 else {
//                     // bid wasn't high enough, so apologize and start over
//                     console.log("Your bid was too low. Try again...");
//                     start();
//                 }
//             });
//     });
// }