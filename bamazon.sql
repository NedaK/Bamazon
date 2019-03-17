CREATE DATABASE bamazon;

use bamazon;

CREATE TABLE products( 
    id INTEGER AUTO-INCREMENT PRIMARY-KEY,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INTEGER NOT NULL,
    product_sales DECIMAL(10,2) 

);

CREATE TABLE departments( 
    department_id INTEGER AUTO-INCREMENT PRIMARY-KEY,
    department_name VARCHAR(50) NOT NULL,
    over_head_costs DECIMAL(10, 2) NOT NULL,
    

);

 INSERT INTO departments(department_name, over_head_costs)
 VALUES("toys", 200);

 INSERT INTO departments(department_name, over_head_costs)
 VALUES("electronics", 300);

 INSERT INTO departments(department_name, over_head_costs)
 VALUES("sporting goods", 100);

 INSERT INTO departments(department_name, over_head_costs)
 VALUES("home goods", 150);

 INSERT INTO departments(department_name, over_head_costs)
 VALUES("clothing", 200);



 INSERT INTO products(product_name, department_name, price, stock_quantity)
 VALUES("light-brite", "toys", 25.00, 30);

 INSERT INTO products(product_name, department_name, price, stock_quantity)
 VALUES("barbie", "toys", 10.00, 15);

 INSERT INTO products(product_name, department_name, price, stock_quantity)
 VALUES("walkman", "electronics", 15.00, 20);

 INSERT INTO products(product_name, department_name, price, stock_quantity)
 VALUES("ipod", "electronics", 35.00, 50);

 INSERT INTO products(product_name, department_name, price, stock_quantity)
 VALUES("fishing pole", "sporting goods", 25.00, 20);

 INSERT INTO products(product_name, department_name, price, stock_quantity)
 VALUES("boxing gloves", "sporting goods", 10.00, 30);

 INSERT INTO products(product_name, department_name, price, stock_quantity)
 VALUES("tazer", "sporting goods", 50.00, 10);

 INSERT INTO products(product_name, department_name, price, stock_quantity)
 VALUES("throw pillow", "home goods", 20.00, 35);

 INSERT INTO products(product_name, department_name, price, stock_quantity)
 VALUES("vase", "home goods", 30.00, 50);

 INSERT INTO products(product_name, department_name, price, stock_quantity)
 VALUES("hot wheels", "toys", 5.00, 40);


SELECT * FROM products;
