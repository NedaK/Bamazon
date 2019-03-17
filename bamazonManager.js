var mysql = require("mysql");
var inquirer = require("inquirer");


var connection = mysql.createConnection({
    // host: "localhost",
    host: "127.0.0.1",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password - you need to replace with your password
    password: "password",
    database: "bamazon"
});

  connection.connect(function(err) {
        if (err) {
            console.error(err);
        }
        else{
            console.log("connected as id " + connection.threadId);
            startManager();
        }
    
  });
function startManager(){


  inquirer.prompt({
      message: "Select an action from the list below",
      type: "list",
      choices: ["View Products for Sale", "Add to Inventory", "Add New Product", "View Low Inventory", "Exit"],
      name: "onlyprompt"

    }).then(function(inquirerResponse1){

        switch(inquirerResponse1.onlyprompt){
            case "View Products for Sale":
                viewProducts();
                break;
            case "Add to Inventory":
                addInventory();
                break;
            case "Add New Product":
                addProduct();
                break;
            case "View Low Inventory":
                lowInventory();
                break;
            case "Exit":
                connection.end();
                break; 
        }
    });
};

function viewProducts(){
    connection.query("SELECT * FROM products", function(err, resp){
        if(err){
            console.error(err);
        }
        else{
            console.table(resp);
            startManager();
        }
    });
};

function addInventory(){
    inquirer.prompt(
    [{
        message: "What is the name of the item you would like to add inventory to?",
        type: "input",
        name: "item_name"
    },
    {
        message: "How much of this product do we have in inventory?",
        type: "input",
        name: "quantity"
    }
    ]).then(function(inquirerResp2){
        var query_name = inquirerResp2.item_name;
        var query_quantity = inquirerResp2.quantity;
        connection.query("UPDATE products SET ? WHERE?", 
        [
            {
              stock_quantity: query_quantity
            },
            {
              product_name: query_name
            }
        ],
          function(error) {
            if (error) {
              console.error(error);
            
            
            }
            else{
                console.log("Inventory updated");
                startManager();
            }

         });
    });
    
};

function addProduct(){
    inquirer.prompt([
    {
        message: "What is the name of the product you would like to add?",
        type: "input",
        name: "item_name"
    },
    {
        message:"What is the department of this item?",
        type: "input",
        name: "item_department"
    },
    {
        message: "What is the price of this item?",
        type: "input",
        name: "item_price"
    },
    {
        message: "What is the stock quantity of this item?",
        type: "input",
        name: "item_quantity"
    }
    ]).then(function(inquirerResp3){
        var name = inquirerResp3.item_name;
        var dept = inquirerResp3.item_department;
        var price = inquirerResp3.item_price;
        var stock = inquirerResp3.item_quantity

        connection.query("INSERT INTO products SET ?",
        
        {
        product_name: name,
        department_name: dept,
        price: price,
        stock_quantity: stock
        },
        function(err, resp){
            if(err){
                console.error(err);
            }
            else{
                console.log(resp);
                console.log("Product has been added");
                startManager();
            }
        });
    });
};

function lowInventory(){
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function(err, resp){
        if (err){
            console.error(err);
        }
        else{
            console.table(resp);
            startManager();
        }
    });
    
};