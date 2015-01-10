CREATE DATABASE chat;

USE chat;

CREATE TABLE user (
	userid integer(5) not null auto_increment primary key,
	username varchar(30)
);

CREATE TABLE messages (
  /* Describe your table here.*/
  userid integer(5) primary key,
  message varchar(255),
  roomname varchar(20)
);


/* Create other tables and define schemas for them here! */
/*CREATE TABLE roomname (
	userid varchar(30),
	room varchar(20)
);*/



/*  Execute this file from the command line by typing:
 *    mysql < schema.sql
 *  to create the database and the tables.*/




