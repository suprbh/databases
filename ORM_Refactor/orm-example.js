/* You'll need to
 * npm install sequelize
 * before running this example. Documentation is at http://sequelizejs.com/
 */

var Sequelize = require("sequelize");
var sequelize = new Sequelize('chat', 'root', 'sasup', {
  dialect: "mysql",
  port: 3306 // or 5432 for postgres
});
/* TODO this constructor takes the database name, username, then password.
 * Modify the arguments if you need to */

/* first define the data structure by giving property names and datatypes
 * See http://sequelizejs.com for other datatypes you can use besides STRING. */
var User = sequelize.define('Users', {
  username: Sequelize.STRING,
  // id: Sequelize.INTEGER
});

var Message = sequelize.define('Messages', {
  userid: Sequelize.INTEGER,
  message: Sequelize.STRING,
  roomname: Sequelize.STRING
});

sequelize
  .authenticate()
  .complete(function(err) {
    if (!!err) {
      console.log('Unable to connect to the database:', err)
    } else {
      console.log('Connection has been established successfully.')
    }
  });
/* .sync() makes Sequelize create the database table for us if it doesn't
 *  exist already: */
User.sync( { force: true } ).complete(function(err) {
  if (!!err){
    console.log('An error occured while creating table Users');
  } else {
    /* This callback function is called once sync succeeds. */
    console.log("Success creating table Users");
  }
});

// Create Message table , overwrite existing table
Message.sync( { force: true } ).complete(function(err) {
   if (!!err){
    console.log('An error occured while creating table Messages');
  } else {
    /* This callback function is called once sync succeeds. */
    console.log("Success creating table Messages");
  }
});

exports.saveUser = function(_username, cb){
  var newUser = User.build({username: _username});
  newUser.save().complete(function(err) {
    if (!!err){
    console.log('An error occured while saving User: ', _username);
    } else {
      /* This callback function is called once saving succeeds. */
      console.log("User saved: ", _username);
      // Retrieve objects from the database:
      exports.findUser(_username, function(results){
        cb(results);
      });
    }
  });
};

exports.saveMessage = function(_message, _userid, _roomname, cb){
  var newMsg = Message.build({ userid: _userid, message: _message, roomname: _roomname });
  newMsg.save().complete(function(err) {
    if (!!err){
      console.log('An error occured while saving User: ', _username);
    } else {
      /* This callback function is called once saving succeeds. */
      console.log("Message saved: ", _message);
      cb();
    }
  });
};

exports.findUser = function(_username, cb){
  // Retrieve objects from the database:
  User.findAll({ where: {username: _username} }).complete(function(err, usrs) {
    if (!!err){
      console.log('An error occured while finding User: ', _username);
    } else {
      // This function is called back with an array of matches.
      cb(usrs);
    }
  });
};

exports.findAllMessages = function(cb){
  console.log("Here");
  Message.findAll().complete(function(err, msgs) {
    if (!!err){
      console.log('An error occured while finding all messages! ');
      cb(err, msgs);
    } else {
      // This function is called back with an array of matches.
      cb(err, msgs);
    }
  });
};



