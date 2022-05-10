# f21-capstone

Welcome! This is my fullstack todo application project!

This is app is hosted on heroku @ https://f21-capstone.herokuapp.com

This project allows users to create an account and login securely using Bcrypt. Users then will be able to create tasks, update tasks, and delete them aswell.

I used axios for the front end and used nodeJS, express, sequelize and Bcrypt for my backend. 

I used postgreSQL for my database, which is also hosted onto Heroku.


instructions to download:

1. Once you clone my repository, run npm install to download the required dependencies.

2. create a postgreSQL database on heroku (it is free) and get the databaseURL 

3.create a .env folder and put the database_url from step two in there and save it to variable called DATABASE_URL
-also, add SERVER_PORT and set it equal to whichever port you would like this project to run on locally


4.Since I did not seed the database with my tables, I went ahead and used https://pgweb-demo.herokuapp.com/
-once there, put in database url in the scheme tab, and click connect.
-once connected, go to queries and run the following:
 
 CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(100),
    username VARCHAR(100),
    user_pass VARCHAR(100)
    );
    CREATE TABLE tasks (
    task_id SERIAL PRIMARY KEY,
    author_id INT NOT NULL REFERENCES users(user_id),
    task_title VARCHAR(100),
    task VARCHAR(1000)
    );

5. Now you should be ready to run this on localhost

