var express  = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    expressValidator = require('express-validator'),
    cors = require('cors'),
    connection  = require('express-myconnection'),
    mysql = require('mysql');

app.use(bodyParser.urlencoded({ extended: true})); //support x-www-form-urlencoded
app.use(bodyParser.json());
app.use(expressValidator());
app.use(  
    connection(mysql,{  
        host     : 'localhost',    /* Your host name/ip  */
        user     : 'root',         /* Database user      */
        password : 'rootPassword', /* User password      */ 
        database : 'glpi',         /* GLPI database name */ 
        debug    : false   
    },'request')  
); 

//Enable CORS
app.use(cors());

/* Pages/Routes */
app.get('/', function (req, res) {
	res.send('Available routes: /tickets')
})

app.get('/tickets', function (req, res, next) {
    req.getConnection(function(err,connection){
        if (err) {
        	res.send("Cannot connect!");
        	return next("Cannot Connect");
        }	
	    connection.query('select id, name, content from glpi_tickets where status = 1 and is_deleted = false', function(err, result) {
			if (err){
				res.send("Error accessing database, please check if MySQL is running.")
				return next("Error accessing database, please check if MySQL is running.");
			}	 
			res.send(result);
	 	});		        
    })	
})

app.listen(3030, function () {
  console.log('RESTful GLPI server running on port 3030! ')
})

function initializeConnection(config) {
    function addDisconnectHandler(connection) {
        connection.on("error", function (error) {
            if (error instanceof Error) {
                if (error.code === "PROTOCOL_CONNECTION_LOST") {
                    console.error(error.stack);
                    console.log("Lost connection. Reconnecting...");

                    initializeConnection(connection.config);
                } else if (error.fatal) {
                    throw error;
                }
            }
        });
    }

    var connection = mysql.createConnection(config);

    addDisconnectHandler(connection);

    connection.connect();
    return connection;
}