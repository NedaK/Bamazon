var mysql = require("mysql");
var inquirer = require("inquirer");


var connection = mysql.createConnection({
    // host: "localhost",
    host: "127.0.0.1",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "You601Thi$$",
    database: "bamazon"
});

  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    showProducts();
    //connection.end();
  });

  function showProducts(){
        connection.query("SELECT id, product_name, price from products", function(err, resp){
            if(err){
                console.error(err);
            }
            else{
                console.table(resp);
                purchase();
            }
        });

    };

function purchase(){
            inquirer.prompt([
            {
                message: "What is the id of the item you would like to purchase?",
                type: "input",
                name: "product_id"
            },
            {
                message: "How many units of this product would you like to buy?",
                type: "input",
                name: "howMany"
            }
        ]).then(function(inquirerResp1){

                console.log("Item id: " + inquirerResp1.product_id);
                var test = inquirerResp1.product_id;
                var number = Number(inquirerResp1.howMany);

                connection.query("SELECT * FROM products WHERE id =" + test, 
                //id, product_name, price
                    function(err, resp){
                        if(err){
                            console.error(err);
                        }
                        else{
                            console.log("Product you are purchasing: " + resp[0].product_name)
                            console.log("Product price: $" + resp[0].price);
                            console.log("Number of items: " + number);


                            if(resp[0].stock_quantity > number){

                                var price = number * Number(resp[0].price);
                                console.log("Price: " + price);
                                console.log("number: " + number);
                                console.log(resp[0].stock_quantity);
                                console.log(resp[0].price);

                                var current_sales = resp[0].product_sales;
                                var quantity = resp[0].stock_quantity;
                                var updated_quantity = quantity - number;

                                var updated_sales = current_sales + price;

                                console.log("Quantity: " + quantity);
                                console.log("Updated amunt: "+ updated_quantity);

                                console.log("You are purchasing " + number +" " + resp[0].product_name);
                                console.log("You paid this amount: $" + price);
                                    connection.query(
                                        "UPDATE products SET ? WHERE ?",
                                        [
                                          {
                                            stock_quantity: updated_quantity,
                                            product_sales: updated_sales
                                          },
                                          {
                                            id: test
                                          }
                                        ],
                                        function(error) {
                                          if (error) {
                                            console.error(error);
                                          
                                            }
                                        else{
                                            console.log("Inventory updated");
                                            purchaseMore();
                                            }
                                        });
                            }
                            else{
                                console.log("There was not enough inventory to complete your order.");
                                purchaseMore();
                                }
                            //connection.end();
                            //console.log(resp[0].product_name);
                        }

                    });
                });
    };

                
function purchaseMore(){
    inquirer.prompt([
        {
            message: "Would you like to purchase another item (y/n)?",
            type: "confirm",
            name: "again"
        }
    ]).then(function(answer){
        if(answer.again){
            showProducts();
            
        }
        else{
            connection.end();
        }
    });
} ;      
        