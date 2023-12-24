
import { compressFile } from './compress.js';

import dotenv from 'dotenv';
dotenv.config();

import express from 'express';

import multer from 'multer';

import mongoose from 'mongoose';

import bcrypt from 'bcrypt';

import File from './models/File.js';

const app = express();

app.use(express.urlencoded({ extended: true}));

mongoose.connect(process.env.DATABASE_URL);

const upload = multer({ dest: "uploads"});

app.set("view engine", "ejs");

app.get("/", (req,res)=>{
    res.render("index")
});



app.get("/compress/:id",async (req,res)=>{
    const file = await File.findById(req.params.id);

    if(file.password != null){
        if(req.body.password == null){
            res.render("password");
            return;
        }

        if(!(await bcrypt.compare(req.body.password, file.password))){
            res.render("password", {error: true})
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
            res.render("password");
            return;
        }

        if(!(await bcrypt.compare(req.body.password, file.password))){
            res.render("password", {error: true})
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
            res.render("password");
            return;
        }

        if(!(await bcrypt.compare(req.body.password, file.password))){
            res.render("password", {error: true})
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
            res.render("password");
            return;
        }

        if(!(await bcrypt.compare(req.body.password, file.password))){
            res.render("password", {error: true})
            return;
        }
    }

    file.downloadCount++;
    await file.save();
    console.log(file.downloadCount);

    res.download(file.path, file.originalName);
})





app.post("/upload", upload.single("file"),async (req,res)=>{

    const fileData = {
        path: req.file.path,
        originalName: req.file.originalname

    }

    if(req.body.password != null && req.body.password !== ""){
        fileData.password = await bcrypt.hash(req.body.password, 10);
    }

    const file = await File.create(fileData);

    if(req.file.mimetype == "text/plain"){
        res.render("index",{fileLink: `${req.headers.origin}/file/${file.id}`, compressLink: `${req.headers.origin}/compress/${file.id}`});
    }
    else{
        res.render("index",{fileLink: `${req.headers.origin}/file/${file.id}`});
    }

});


app.listen(process.env.PORT);