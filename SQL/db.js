var mysql = require('mysql');
var mysql = require('mysql');
/* If the node mysql module is not found on your system, you may
 * need to do an "sudo npm install -g mysql". */

/* You'll need to fill the following out with your mysql username and password.
 * database: "chat" specifies that we're using the database called
 * "chat", which we created by running schema.sql.*/
var dbConnection = mysql.createConnection({
  user: "root",
  password: "sasup",
  database: "chat"
});

// exports.openDB = function(){
  dbConnection.connect();
// };

exports.closeDB = function(){
  // dbConnection.end();
};

/* Now you can make queries to the Mysql database using the
 * dbConnection.query() method.
 * See https://github.com/felixge/node-mysql for more details about
 * using this module.*/




exports.findAllMessages = function(cb){
	var queryString = "select * from messages;";
	dbConnection.query(queryString, function(err, rows, fields){
		if (err) {
			console.log("Error querying the database: ", queryString);
      cb(err, "");
		}
		cb(true, rows);
			// console.log('user: ' + rows[i].username + 'msg: '+ rows[i].message);
	});
};

exports.findUser = function(username, cb){
	var queryString = "select * from user WHERE username='" + username + "';";
	dbConnection.query(queryString, function(err, rows, fields){
		if (err) {
			console.log("Error querying the database: ", queryString);
      cb(err);
		}
		cb(true, rows);
		// console.log('user: ' + rows[i].username + 'msg: '+ rows[i].message);
	});
};

exports.saveUser = function(username, cb){
  var queryString = "INSERT INTO user (username) VALUES ('"+username+"');";
  dbConnection.query(queryString, function(err){
    if (err) {
      console.log("Error inserting :", queryString);
      cb("");
    }
    exports.findUser(username, function(err, results){
      cb(results);
    });
  });
};

exports.saveMessage = function(message, userid, roomname, cb){
  var queryString = 'INSERT INTO messages (userid, message, roomname) VALUES ('+ userid +',"'+message+'", "'+roomname+'");';
  dbConnection.query(queryString, function(err, rows, fields){
    if (err) {
      console.log("Error querying the database: ", queryString);
    }
    cb();
    // console.log('user: ' + rows[i].username + 'msg: '+ rows[i].message);
  });
};

