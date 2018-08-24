-- Creates the bamazon database and switches to it.
CREATE DATABASE bamazon;
USE bamazon;

-- Creates the table products and adds the columns of information needed.
CREATE TABLE products (
    item_id INT NOT NULL auto_increment,
    product_name VARCHAR(100) NOT NULL,
    department_name varchar(100) NOT NULL,
    price INT NOT NULL,
    stock_quantity INT NOT NULL,
    PRIMARY KEY (item_id)
);

-- Insert data into products table.
INSERT INTO products(product_name, department_name, price, stock_quantity)
    VALUES ("Wilson Evolution Basketball", "Sporting Goods", 60, 1000);
                ("MacBook Pro", "Electronics", 1500, 100),
                ("Harry Potter Box Set", "Books", 50, 250),
                ("Samsung Galaxy Note 8", "Electronics", 600, 10),
                ("Basketball", "Sporting Goods", 60, 100),
                ("Bamazon Bkindle", "Electronics", 80, 150),
                ("Nike Air Force 1", "Clothing", 100, 100),
                ("Bible", "Books", 6, 1000),
                ("Air Jordan 1", "Clothing", 100, 100),
                ("Adidas Superstar", "Clothing", 70, 50);