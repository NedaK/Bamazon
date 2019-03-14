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
        if (err) {
            console.error(err);
        }
        else{
            console.log("connected as id " + connection.threadId);
            startSupervisor();
        }
    
  });

  function startSupervisor(){
        inquirer.prompt({
            message: "Select an action from the list below",
            type: "list",
            choices: ["View Product Sales By Department", "Create New Department", "Exit"],
            name: "onlyprompt"
    
            }).then(function(inquirerResponse1){
    
            switch(inquirerResponse1.onlyprompt){
                case "View Product Sales By Department":
                    viewProducts();
                break;

                case "Create New Department":
                    newDepartment();
                break;
                
                case "Exit":
                    connection.end();
                break; 
            };
        });
    };

    
// SELECT departments.department_id, departments.department_name, departments.over_head_costs, products.product_sales
// FROM departments
// INNER JOIN products on departments.department_name = products.department_name;

// SELECT department_name, SUM(IFNULL(product_sales,0)) AS dept_sales
//        FROM products
//        GROUP BY department_name
//        ORDER BY department_name;

    //    SELECT departments.department_id, products.department_name,  SUM(IFNULL(product_sales,0)) AS dept_sales
    //    FROM products
       
    //    JOIN departments
    //    ON products.department_name = departments.department_name
    //    GROUP BY department_name, department_id
    //    ORDER BY department_id, department_name
    //    ;

    function viewProducts(){
        var query = 
        "SELECT departments.department_id, departments.department_name, departments.over_head_costs, " +
        "SUM(IFNULL(product_sales,0)) AS total_product_sales, " +
        "SUM(IFNULL(product_sales,0))- over_head_costs AS total_profit " +
        "FROM products " + 
       
        "RIGHT JOIN departments " +
        "ON products.department_name = departments.department_name " +
        "GROUP BY department_name, department_id " +
        "ORDER BY department_id, department_name";
        connection.query(query, 
        function(err, resp){
            if (err){
                console.error(err);
            }
            else{
                console.table(resp);
                startSupervisor();
            }
        });
        
    };

    function newDepartment(){
        inquirer.prompt([
            {
                message: "What is the name of the deparmtnet you want to add?",
                type: "input",
                name: "d_name"

            },
            {
                message: "What are the overhead costs of this department?",
                type: "input",
                name: "over_costs"
            }
            ]).then(function(inquirerResp){
                    connection.query("INSERT into departments SET ?",
                        {
                            department_name: inquirerResp.d_name,
                            over_head_costs: Number(inquirerResp.over_costs)

                        },
                        function(err, response){
                            if(err){
                                console.error(err);
                            }
                            else{
                                console.log(response);
                                console.log("Department has been added");
                                startSupervisor();
                            }

                    });
                    

        });
    };