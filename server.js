
import { compressFile } from './compress.js';

import passport from 'passport';

import session from 'express-session';

import { Strategy as LocalStrategy } from 'passport-local';

import dotenv from 'dotenv';
dotenv.config();

import express from 'express';

import multer from 'multer';

import mongoose from 'mongoose';

import bcrypt from 'bcrypt';

import File from './models/File.js';

import User from './models/User.js';

import crypto from 'crypto';

import flash from 'express-flash';

import methodOverride from 'method-override';

import { promises as fsPromises } from 'fs';

import path from 'path';

const app = express();

app.use(express.urlencoded({ extended: true}));

app.use(express.static('public'));
app.use(flash());
app.use(session({ secret:'vidit-secret-key', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

mongoose.connect(process.env.DATABASE_URL);

const upload = multer({ dest: "uploads"});

app.set("view engine", "ejs");

app.get("/", (req,res)=>{
    
    if (req.isAuthenticated()) {
        const {links} = req.user; 
        res.render("index", { user: `${req.user.username}`, links});
  } else {
    res.render("index");
  }
    
});

app.get("/compress/:id",async (req,res)=>{
    const file = await File.findById(req.params.id);

    if(file.password != null){
        if(req.body.password == null){
            res.render("password",{creator: `${file.username}`, fileName: `${file.originalName}`});
            return;
        }

        if(!(await bcrypt.compare(req.body.password, file.password))){
            res.render("password", {error: true, creator: `${file.username}`, fileName: `${file.originalName}`})
            return;
        }
    }

    
    file.downloadCount++;
    await file.save();
    console.log(file.downloadCount);
    let nameSplit = file.path.split("uploads\\");
    let fileName = nameSplit[1];
    const compressedFile = `uploads/${fileName}.compressed`;
    compressFile(file.path, compressedFile);
    res.download(compressedFile, file.originalName);

})

app.post("/compress/:id",async (req,res)=>{
    const file = await File.findById(req.params.id);

    if(file.password != null){
        if(req.body.password == null){
            res.render("password",{creator: `${file.username}`, fileName: `${file.originalName}`});
            return;
        }

        if(!(await bcrypt.compare(req.body.password, file.password))){
            res.render("password", {error: true, creator: `${file.username}`, fileName: `${file.originalName}`})
            return;
        }
    }

    
    file.downloadCount++;
    await file.save();
    console.log(file.downloadCount);
    let nameSplit = file.path.split("uploads\\");
    let fileName = nameSplit[1];
    const compressedFile = `uploads/${fileName}.compressed`;
    compressFile(file.path, compressedFile);
    res.download(compressedFile, file.originalName);

})


app.get("/file/:id",async (req,res)=>{
    const file = await File.findById(req.params.id);

    if(file.password != null){
        if(req.body.password == null){
            res.render("password", {creator: `${file.username}`, fileName: `${file.originalName}`});
            return;
        }

        if(!(await bcrypt.compare(req.body.password, file.password))){
            res.render("password", {error: true, creator: `${file.username}`, fileName: `${file.originalName}`})
            return;
        }
    }

    
    file.downloadCount++;
    await file.save();
    console.log(file.downloadCount);

    res.download(file.path, file.originalName);

})

app.post("/file/:id",async (req,res)=>{
    const file = await File.findById(req.params.id);

    if(file.password != null){
        if(req.body.password == null){
            res.render("password",{creator: `${file.username}`, fileName: `${file.originalName}`});
            return;
        }

        if(!(await bcrypt.compare(req.body.password, file.password))){
            res.render("password", {error: true, creator: `${file.username}`, fileName: `${file.originalName}`})
            return;
        }
    }

    file.downloadCount++;
    await file.save();
    console.log(file.downloadCount);

    res.download(file.path, file.originalName);

})



app.post("/signup", async (req,res)=>{

    const userData = {
        username: req.body.username,
        email: req.body.email
    }

    if(req.body.password != null && req.body.password !== ""){
        userData.password = await bcrypt.hash(req.body.password, 10)
    }

    const user = await User.create(userData);
    
    console.log(user);
    res.render("index", {register: `${req.body.username}`});

});

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, async (email, password, done) => {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return done(null, false, { message: 'No user found with that email' });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return done(null, false, { message: 'Incorrect password' });
    }

    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

app.post('/login', passport.authenticate('local', {
  // Successful authentication
  successRedirect: '/', // Redirect to a separate route for handling success

  // Failed authentication
  failureRedirect: '/login-failure', // Redirect to a separate route for handling failure
  failureFlash: true,
}));

// Route for failed login
app.get('/login-failure', (req, res) => {
  // You can send a failure message or perform additional actions
    res.render("index", { loginFail: "true"});
});


app.post("/upload", upload.single("file"),async (req,res)=>{

    if(req.isAuthenticated()){
    const fileData = {
        path: req.file.path,
        originalName: req.file.originalname,
        username: req.user.username
    }

    if(req.body.password != null && req.body.password !== ""){
        fileData.password = await bcrypt.hash(req.body.password, 10);
    }

    const file = await File.create(fileData);

     // Update the links array in the user document
        await User.updateOne(
            { _id: req.user._id }, // Assuming you have user information in req.user
            { $push: { links: `${req.headers.origin}/file/${file.id}` } }
        );

    if(req.file.mimetype == "text/plain"){
        await User.updateOne(
            { _id: req.user._id }, // Assuming you have user information in req.user
            { $push: { links: `${req.headers.origin}/compress/${file.id}` } }
        );
    }
    console.log("file uploaded")

}else{
    console.log("file not uploaded");
}
    res.redirect('/');

});

app.delete('/logout', (req, res) => {
    req.logout(function(err) {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});


app.delete('/file/:id', async (req, res) => {
    try {
        const fileId = req.params.id;
        const file = await File.findById(fileId);

        // Check if the file exists
        if (!file) {
            return res.status(404).send('File not found');
        }

        // Check if the user is the owner of the file
        if (file.username !== req.user.username) {
            return res.status(403).send('Unauthorized');
        }

        await fsPromises.unlink(file.path);

        // Delete the file from the database
        await File.findByIdAndDelete(fileId);

        // Remove the file link from the user's "links" array
        await User.updateOne(
            { _id: req.user._id },
            { $pull: { links: `${req.headers.origin}/file/${fileId}` } }
        );

        console.log('File deleted');
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});



app.delete('/compress/:id', async (req, res) => {
    try {
        const fileId = req.params.id;

        // Remove the file link from the user's "links" array
        await User.updateOne(
            { _id: req.user._id },
            { $pull: { links: `${req.headers.origin}/compress/${fileId}` } }
        );

        console.log('File deleted');
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(process.env.PORT);

