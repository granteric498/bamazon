# bamazon

Bamazon is a simple e-commerce application. It implements a simple command line based storefront using the [`inquirer`](https://www.npmjs.com/package/inquirer) package and the [`mysql`](https://www.npmjs.com/package/mysql) package. The application presents two interfaces: **customer** and **manager**.

Download [this video](usingBamazon.webm) to see how I use this application and how it works (click **View Raw** or **Download**).

### MySQL Setup

In order to run this application, you should have the MySQL database set up on your machine. If you don't, visit the [MySQL installation page](https://dev.mysql.com/doc/refman/5.6/en/installing.html) to install the version needed for your operating system. Once you have MySQL isntalled, you will be able to create the *Bamazon* database and the *products* table with the SQL code found in [bamazon.sql](bamazon.sql). Run this code inside your MySQL client, like [Sequel Pro](https://www.sequelpro.com/), to populate the database, then you will be ready to proceed with running the Bamazon customer and manager interfaces.

### Customer Interface

The customer interface allows the user to view the current inventory of store items: item IDs, item name, department in which the item is located, price, and quantity available in stock. The user is then able to purchase one of the existing items by entering the item ID and the desired quantity. If the selected quantity is currently in stock, the user's order is fulfilled, displaying the total purchase price and updating the store database. If the desired quantity is not available, the user is notified that there is insufficient stock.

To run the customer interface, follow the steps below in your command line:

	git clone https://github.com/granteric498/bamazon.git
	cd bamazon
	npm install
	node bamazonCustomer.js

### Manager Interace

The manager interface presents a list of four options, as below. 

	? Please select an option: (Use arrow keys)
	❯ View Products for Sale 
	  View Low Inventory 
	  Add to Inventory 
	  Add New Product
	  
**View Products for Sale** allows the user to view the entire inventory of store items: item IDs, product name, department in which the item is located, price, and the quantity available in stock. 

**View Low Inventory** option shows the user the items which currently have fewer than 5 available units.

**Add to Inventory** option allows the user to select a given item ID and add additional inventory to the target item.

**Add New Product** option allows the user to enter details about a new product which will be entered into the database upon completion of the form.

To run the manager interface, follow the steps below in your command line:

	git clone https://github.com/granteric498/bamazon.git
	cd bamazon
	npm install
	node bamazonManager.js
