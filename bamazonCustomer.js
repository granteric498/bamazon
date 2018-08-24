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

    // Function that prompts user information of all items in database.
    allItems();
});

function questions() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'What is the ID# of the product you would like to buy?'
        },
    ]).then(function (response) {
        // Runs function that will produce individual product's information based on ID#
        idInfo(response);

        inquirer.prompt([
            {
                type: 'input',
                name: 'units',
                message: 'How many units of the product would you like to buy?'
            }
        ]).then(function (res) {
            connection.query(`SELECT * FROM products WHERE item_id = '${idNumber}'`, function(err, results) {
                if (err) throw err;
                
                if (res.units < results[0].stock_quantity) {
                    // This variable is the remaining quantity after the user's purchase.
                    var remainingQuantity = results[0].stock_quantity - res.units;
                    // This variable is the total price that the user paid.
                    var totalPrice = res.units * results[0].price;

                    // This updates stock_quantity in mysql
                    connection.query(`UPDATE products SET stock_quantity = ${remainingQuantity} WHERE item_id = ${idNumber};`);
                    // This lets the user know that they have made their purchase
                    console.log(`You have bought ${res.units} units of ${results[0].product_name}!`);
                    console.log(`You paid $${totalPrice}!`);
                } else {
                    // The user is prompted insufficient quantity because the number of units 
                    // they asked to buy is greater than the available stock quantity.
                    console.log(`Insufficient quantity!`);
                };
            });
        });
    });
};

// Function that produces product's information after user inputs ID#
function idInfo(response) {
    // connection.query("SELECT * FROM products WHERE item_id = " + "'" + response.id + "'", function(err, results) {
    connection.query(`SELECT * FROM products WHERE item_id = '${response.id}'`, function(err, results) {
        if (err) throw err;

        // Store the ID# in a variable so it is easy to call back.
        idNumber = results[0].item_id;
    });
};

// Function that will produce all items for the user
function allItems() {
    connection.query(`SELECT * FROM products`, function(err, results) {
        if (err) throw err;

        for (var i in results) {
            console.log(`ID: ${results[i].item_id} || Product Name: ${results[i].product_name} || Price: ${results[i].price}`);
        };

        // Questions are asked on which item user wants to purchase.
        questions();
    });
};