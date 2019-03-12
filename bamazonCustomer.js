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
    //connection.end();
  });

  function showProducts(){
    connection.query("SELECT id, product_name, price from products", function(err, resp){
        if(err){
            console.error(err);
        }
        else{
            console.table(resp);
            inquirer.prompt({
                message: "What is the id of the item you would like to purchase?",
                type: "input",
                name: "product_id"
            }).then(function(inquirerResp1){
                console.log("Item id: " + inquirerResp1.product_id);
                var test = inquirerResp1.product_id;
                connection.query("SELECT id, product_name, price from products WHERE id =" + test, 
                    
                    function(err, resp){
                        if(err){
                            console.error(err);
                        }
                        else{
                            console.log("Product you are purchasing: " + resp[0].product_name)
                            console.log("Product price: $" + resp[0].price);
                        }
                    });

                
                inquirer.prompt({
                    message: "How many units of this product would you like to buy?",
                    type: "input",
                    name: "howMany"
                }).then(function(inquirerResp2){
                    console.log("Number of items: " + inquirerResp2.howMany);
                    console.log("test: "+ test);
                    var number = Number(inquirerResp2.howMany);
                    connection.query("SELECT * FROM products WHERE id =" + test,
                    //stock_quantity, product_name
                    function(err, resp){
                        if(err){
                            console.error(err);
                        }
                        else{
                            if(resp[0].stock_quantity > number){

                                var price = number * Number(resp[0].price);
                                console.log("Price: " + price);
                                console.log("number: " + number);
                                console.log(resp[0].stock_quantity);
                                console.log(resp[0].price);

                                var quantity = resp[0].stock_quantity;
                                var updated_quantity = quantity - number;

                                console.log("Quantity: " + quantity);
                                console.log("Updated amunt: "+ updated_quantity);

                                console.log("You are purchasing " + number +" " + resp[0].product_name);
                                console.log("You paid this amount: $" + price);
                                    connection.query(
                                        "UPDATE products SET ? WHERE ?",
                                        [
                                          {
                                            stock_quantity: updated_quantity
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
                                        }
                                    });
                            }
                            else{
                                console.log("There was not enough inventory to complete your order.")
                            }
                            connection.end();
                            //console.log(resp[0].product_name);
                        }
                        
                        // var total = resp[0].stock_quantity;
                        // console.log("Number of products available: "+ total);

                    });
                    //console.log("Number of products available: "+ number_prodects_avail);
                    //connection.end();
                })

            })
        }

        //connection.end();
    });
  };
  showProducts();
  