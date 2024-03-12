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
<p> Inside index.ejs, in the form tag we need to mention enctype="multipart/form-data" because this form is going to handle not just text inputs like emails and passwords, but also files, which needs to be submitted in multiple parts. Each input in the form is connected to its label via id (in the label tag the value of 'for' will be the same as the id) and it will be refrenced by the methods in server.js by its name value</p>  
<img width="472" alt="image" src="https://github.com/ViditNaithani22/fileShareMe/assets/102232954/359cfba0-ba02-4868-a2ac-518dd089fe77">
<p>A method in server.js refrencing password input by using it's name value which is 'password'</p>
<img width="500" alt="image" src="https://github.com/ViditNaithani22/fileShareMe/assets/102232954/e361abc6-4242-43e5-beae-8aa8cb0bd87f">
<h4>How to upload files?</h4>
<img width="347" alt="image" src="https://github.com/ViditNaithani22/fileShareMe/assets/102232954/2a7a08f2-8555-4e1b-b6ff-94aca1bc01e9"> 
<p>inside the server.js file, we call multer() method, provided by the multer library, and in the argument we specify the folder name "uploads" where we save all of our uploaded files. This returns an object which we then store in a variable called upload. Now we can use various methods provided in the multer library using this object whenever we want to upload a file in the uploads folder.</p>
<img width="458" alt="image" src="https://github.com/ViditNaithani22/fileShareMe/assets/102232954/a93a6484-cca4-4531-b624-bfad93a04db6">
<p>In the image above, we use upload.single("file") method to tell that we want to upload a single file at a time. Once this post method is called, inside the uploads folder we will see a new file saved with a randomly generated unique name.</p>
<img height="80" width="303" alt="image" src="https://github.com/ViditNaithani22/fileShareMe/assets/102232954/0f6a28a8-2ed9-4797-83da-2a24e49e52c7">
<h4>How to set up port to access the mongodb database and the server output</h4>
<p>We will store the url/port of our mongodb database and server in the dotenv file. To access variables defined in the dotenv file inside our server.js file, we need to first import the dotenv library and then call its config() method</p>
<img width="209" alt="image" src="https://github.com/ViditNaithani22/fileShareMe/assets/102232954/e6ec4080-7fbf-48e7-b45e-7b3fa60853a0">
<p>Then we use mongoose's connect method to connect to our mongodb database, and we use app.listen() method to specify the port to display the server output</p>
<img width="209" alt="image" src="https://github.com/ViditNaithani22/fileShareMe/assets/102232954/36e0dab3-cdd3-49d5-a179-0bc0724f1e5d">
<img width="311" alt="image" src="https://github.com/ViditNaithani22/fileShareMe/assets/102232954/60e47be4-d3ad-4e57-8444-968326d1f0c5">
<p>The variables mentioned as the arguments to these methods are defined in our .env file, which is then made private for security reasons</p>
<img width="392" alt="image" src="https://github.com/ViditNaithani22/fileShareMe/assets/102232954/7321717a-b649-4dfb-a6c9-97a4842a417e">

<h3>How to host this node.js website on an AWS EC2 instance with the help of PM2</h3>
<h4>Step1: select EC2 on your AWS console and open EC2 dashboard. Then click on 'Instances' and then click on 'launch instances'</h4>
<h4>Step2: give name to your EC2 instance, select OS as Amazon Linux, select Instance type as t2.micro, select your login key pair, and leave network settings as default</h4>
<h4>Step3: Now go to Instances section, select your EC2 instance and then click on connect button on the top</h4>
<img width="948" alt="image" src="https://github.com/ViditNaithani22/fileShareMe/assets/102232954/bf99d7c3-004c-412d-9813-4263670521d0">
<h4>Step4: Select 'EC2 Instance Connect' and then click on 'Connect'. After clicking Connect you will see a terminal window opening</h4>
<img width="410" alt="image" src="https://github.com/ViditNaithani22/fileShareMe/assets/102232954/a0b23a82-8a1a-45a9-bd34-5ab9384bb2c8">
<h4>Step5: Switch to root user using: sudo su - and update the system using: yum update -y </h4>
<img width="432" alt="image" src="https://github.com/ViditNaithani22/fileShareMe/assets/102232954/92287ac1-0062-47ab-8fbd-2436c838c82c">
<h4>Step6: install nvm : curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash  and activate nvm: . ~/.nvm/nvm.sh </h4>
<img width="481" alt="image" src="https://github.com/ViditNaithani22/fileShareMe/assets/102232954/24366ee2-05ad-4d60-b02d-4624fa26872b">
<h4>Step7: install node using nvm</h4>
<img width="374" alt="image" src="https://github.com/ViditNaithani22/fileShareMe/assets/102232954/8c99f023-bfb4-45a2-a306-33a76275a3e4">
<h4>Step8: first update the system using: yum update -y and then install git: yum install git -y</h4>
<img width="337" alt="image" src="https://github.com/ViditNaithani22/fileShareMe/assets/102232954/53271a62-d131-4419-949e-82732cc65085">
<h4>Step9: clone this repository</h4>
<img width="384" alt="image" src="https://github.com/ViditNaithani22/fileShareMe/assets/102232954/91b5162f-d69f-4c81-bf3f-187fcf7b77b7">
<h4>Step10: check the cloned folder: ls -lrt then open the cloned folder: cd fileShareMe then check all the files inside the folder: ls -lrt</h4>
<img width="288" alt="image" src="https://github.com/ViditNaithani22/fileShareMe/assets/102232954/f6b74420-eca2-430f-9e55-4bdc4ea36604">
<h4>Step11: try running: npm start if you see the below mentioned error, then first delete all the modules by running: rm -rf node_modules and then install all the modules again by running: npm install</h4>
<img width="455" alt="image" src="https://github.com/ViditNaithani22/fileShareMe/assets/102232954/c7a223c9-9f71-4bf9-bd3d-4c2edb544be4">
<img width="570" alt="image" src="https://github.com/ViditNaithani22/fileShareMe/assets/102232954/82b1bcd5-3190-4d3b-a7a8-4ea70f7b855e">
<h4>Step12: now go back to your Instances section of your AWS EC2, then select your EC2 instance, then select the Security section and then click on the link of the Security groups</h4>
<img width="679" alt="image" src="https://github.com/ViditNaithani22/fileShareMe/assets/102232954/64d5ec7b-fed7-4d21-8f69-f6a6f14aef46">
<h4>Step13: make sure you have these three inbound rules, if you don't then add them</h4>
<img width="779" alt="image" src="https://github.com/ViditNaithani22/fileShareMe/assets/102232954/32ff7ff8-bade-42e0-a0f4-c4dae09e8e57">
<h4>Step14: now go back to your Instances section of your AWS EC2, then select your EC2 instance, and copy the Public IPv4 address of your EC2. open a new tab, paste this ip address and add ':80' at the end of this address, also make sure you use 'http' and not 'https'</h4>
<img width="608" alt="image" src="https://github.com/ViditNaithani22/fileShareMe/assets/102232954/91a2abf9-bf8d-4e73-9a5b-81ae0daeb0c7">
<img width="476" alt="image" src="https://github.com/ViditNaithani22/fileShareMe/assets/102232954/3d8cd025-e148-4628-8c4d-f30bd10b374d">
<h4>After all this you will see the website up and running but now we also need to make sure that it keeps running even when we close our EC2 terminal. For that follow the next few steps to use PM2</h4>
<img width="602" alt="image" src="https://github.com/ViditNaithani22/fileShareMe/assets/102232954/8d9cefe5-14c0-4e34-abf1-4a202502ca74">
<h4>Step15: install PM2: npm install pm2 -g (but first close the running website by: ctrl+c)</h4>
<img width="329" alt="image" src="https://github.com/ViditNaithani22/fileShareMe/assets/102232954/e50e7ceb-f971-414d-8028-0204d28ee994">
<h4>Step16: host website using PM2. Type: pm2 start server.js</h4>
<img width="632" alt="image" src="https://github.com/ViditNaithani22/fileShareMe/assets/102232954/a4e6e313-503e-4123-ba74-22d6aa623852">
<h4>Step17: to stop the application type: pm2 stop 0 (where 0 is the index of the running application) and to restart the same application: pm2 restart 0</h4>
<img width="619" alt="image" src="https://github.com/ViditNaithani22/fileShareMe/assets/102232954/e08b033a-8bb4-4999-99db-b678f9f32e57">
<h4>Step18: make sure that your application keeps running even if you close the terminal. first stop the pm2. then type: pm2 start server.js --name my-app --watch (my-app is the name of this instance) this command will run the pm2 application in detached mode</h4>
<img width="626" alt="image" src="https://github.com/ViditNaithani22/fileShareMe/assets/102232954/4dbd7ef0-e274-4029-833b-93c4be84b3ea">








