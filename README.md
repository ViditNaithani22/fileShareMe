# fileShareMe
<br>
<h4>🍁This is a file sharing website which covers all the important concepts of backend web development.</h4>
<h4>🍁You can upload files and can generate password protected links to download those files which you can share with your friends.</h4>
<h4>🍁You can also compress any text file (.txt) using Huffman file compression algorithm.</h4>
<h4>🍁The website was made using Node.js and Express.js. The database used is MongoDB. And it is hosted on AWS EC2 using PM2</h4>
<h4>🍁Website link: http://52.23.208.55:80</h4>
<br>
<h2> How it works </h2>

<h4>First we create a Node.js environment by installing the following packages:</h4>
<h4>🍁 Express: it handles routing and server side logic, allows us to create methods that analyze the user's request and respond to them accordingly</h4>
<h4>🍁 mongoose: helps us to access our MongoDB database</h4>
<h4>🍁 multer: helps us to create the functionality of uploading, saving and downloading files</h4>
<h4>🍁 ejs: instead of using html we will use ejs as we will be using various if-conditions inside our html code</h4>
<h4>🍁 bcrypt: used for crypting passwords before storing them in our database</h4>
<h4>🍁 dotenv: to store multiple environment variables like server port and database url</h4>
<h4>🍁 nodemon: automatically refresh our server everytime we make changes</h4>
<br>
<h4>Open the terminal inside the folder of your project and run the following commands in the terminal to create this environemt:</h4>
<h4>npm init -y (starts the default node environment and creates package.json file)</h4>
<h4>npm i express mongoose multer ejs bcrypt dotenv (installs all the above mentioned packages and updates the "dependencies" section of the package.json file)</h4>
<h4>npm i --save-dev nodemon (installs nodemon)</h4>
<img width="396" alt="Screenshot 2024-02-25 145504" src="https://github.com/ViditNaithani22/fileShareMe/assets/102232954/91143fb0-ee06-470d-aeea-0530ec8b45c3">
<h4>Inside package.json file, in the "scripts" section we add: "devStart": "nodemon server.js", this tells nodemon to restart the server as soon as we update the server.js file </h4>
<h4>To run the server we just write "npm run devStart" in the terminal</h4>
<br>
<p>The server.js file contains all the express methods to handle all the server side logic. The index.js file carries the home page which user sees upon visiting the website.</p>
<p>Since we have "type": "module" in our package.json, we can't use require() method to import express package or any other package in the server.js file (eg: const express = require("express") ). We need to use import statements like: import express from 'express'; </p>
<p>Once we have imported express, we can use express() method to get an object which has various useful methods like get(),set(),post(), etc. We store this object in app: const app = express();</p>
<p>The 'views' folder contains our ejs pages. index.ejs shows the home screen and password.ejs shows the screen when user is supposed to type in a password to access a file</p>
<p> Inside index.ejs, in the "<form>" tag we need to mention enctype="multipart/form-data" because this form is going to handle not just text inputs like emails and passwords, but also files, which needs to be submitted in multiple parts. Each input in the form is connected to its label via id (in the label tag the value of 'for' will be the same as the id) and it will be refrenced by the methods in server.js by its name value</p>  
<img width="472" alt="image" src="https://github.com/ViditNaithani22/fileShareMe/assets/102232954/359cfba0-ba02-4868-a2ac-518dd089fe77">
<p>A method in server.js refrencing password input by using it's name value which is 'password'</p>
<img width="500" alt="image" src="https://github.com/ViditNaithani22/fileShareMe/assets/102232954/e361abc6-4242-43e5-beae-8aa8cb0bd87f">
