const mysql = require("mysql");
const inquirer = require("inquirer");
require ("dotenv").config();

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "bamazon"
});

var idNumber;

connection.connect((err) => {
    if (err) throw err;
    
    // Questions are asked on what the user would like to do.
    questions();
});

function questions() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'questions',
            message: 'What would you like to do?',
            choices: [
                'View Products for Sale',
                'View Low Inventory',
                'Add to Inventory',
                'Add New Product'
            ]
        }
    ]).then(function (response) {
        if (response.questions === 'View Products for Sale') {
            allProducts();
        } else if (response.questions === 'View Low Inventory') {
            lowInventory();
        } else if (response.questions === 'Add to Inventory') {
            addInventory();
        } else if (response.questions === 'Add New Product') {
            newProduct();
        }
    });
};

// Function that produces information of all products for sale
function allProducts() {
    connection.query(`SELECT * FROM products`, function(err, results) {
        if (err) throw err;

        for (var i in results) {
            console.log(`ID: ${results[i].item_id}`);
            console.log(`Product Name: ${results[i].product_name}`);
            console.log(`Department: ${results[i].department_name}`);
            console.log(`Price: ${results[i].price}`);
            console.log(`Stock Quantity: ${results[i].stock_quantity}`);
            console.log(`---------------------------------------------`);
        };
    });
};

// Function that lists all items with inventory count that is less than 5
function lowInventory() {
    connection.query(`SELECT * FROM products`, function(err, results) {
        if (err) throw err;

        for (var i in results) {
            if (results[i].stock_quantity < 5) {
                console.log(`Product Name: ${results[i].product_name}`);
                console.log(`Stock Quantity: ${results[i].stock_quantity}`);
                console.log(`---------------------------------------------`);
            }
        };
    });
};

// Function that allows user to add stock_quantity to existing item
function addInventory() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'What is the ID# of the product you would like to add?'
        },
        {
            type: 'input',
            name: 'units',
            message: 'How many units of product would you like to add?'
        }
    ]).then(function (response) {
        connection.query(`SELECT * FROM products WHERE item_id = '${response.id}'`, function(err, results) {
            if (err) throw err;
    
            // Store the ID# in a variable so it is easy to call back.
            idNumber = results[0].item_id;

            // This variable is the new stock_quantity after the adding the user's units.
            var newQuantity = parseInt(results[0].stock_quantity) + parseInt(response.units);

            // This updates stock_quantity in mysql
            connection.query(`UPDATE products SET stock_quantity = ${newQuantity} WHERE item_id = ${idNumber};`);

            // This lets the user know that they have added to stock_quantity
            console.log(`You have added ${response.units} units!`);
            console.log(`${results[0].product_name} now has ${newQuantity} total units!`);
        });
    });
};

// Function that allows user to add new item to mysql
function newProduct() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the product you would like to add?'
        },
        {
            type: 'input',
            name: 'department',
            message: 'What department does this product belong to?'
        },
        {
            type: 'input',
            name: 'price',
            message: 'How much does this product cost?'
        },
        {
            type: 'input',
            name: 'stockQuantity',
            message: 'How many units of product is available?'
        }
    ]).then(function (response) {
        connection.query(
            `insert into products(product_name, department_name, price, stock_quantity)
            values ("${response.name}", "${response.department}", ${response.price}, ${response.stockQuantity});`
            , function(err) {
            if (err) throw err;

            // This lets the user know that the item has been added into mysql
            console.log("Your item has been added!")
        });
    });
};