"use strict";

const config = require("../config");
const sql = require("mysql2");
const fs = require("fs-extra");

const express = require('express');
const path = require('path');
const router = express.Router();

const db = require("../db");
const postsdb = require("../db");


const filePath = path.join(process.cwd(), "src", "data", "textBoxes");
const files = fs.readdirSync(filePath);
const sqlFiles = files.filter(f => f.endsWith(".sql"));
const sqlQueries = {};
for (const sqlFile of sqlFiles){
    const query = fs.readFileSync(path.join(filePath, sqlFile), {encoding: "UTF-8"});
    sqlQueries[sqlFile.replace(".sql", "")] = query;
}


router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/../../views/forum.html'));
});

router.get('/create_post.html', (req, res) => {
    res.sendFile(path.join(__dirname+'/../../views/create_post.html'));
});

router.get('/create_forum.html', (req, res) => {
    res.sendFile(path.join(__dirname+'/../../views/create_forum.html'));
});

router.get('/public/css/main.css', (req, res) => {
    res.sendFile(path.join(__dirname+'/../../public/css/main.css'));
});

router.get('/images/chemistry.jpeg', (req, res) => {
    res.sendFile(path.join(__dirname+'/../../images/chemistry.jpeg'));
});

router.get('/images/icon.png', (req, res) => {
    res.sendFile(path.join(__dirname+'/../../images/icon.png'));
});

router.get('/postQues.html', (req, res) => {
    res.sendFile(path.join(__dirname+'/../../views/postQues.html'));
});

router.get('/api/textBoxes', async (req, res) => {
    try {
        let results = await db.all();
        res.json(results);
    }
    catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

router.post('/api/textBoxes', async (request, res) => {
    try {
        // console.log(JSON.parse(JSON.stringify(request.body)));
        
        const {categoryId, userId, writtenText, boxPrevious, boxNext, title} = request.body;

        if (boxPrevious == undefined && boxNext == undefined){
            let results = await db.create(parseInt(categoryId), parseInt(userId), writtenText, undefined, undefined, title);
            res.json(results); 
        }
        else if(boxPrevious == undefined){
            let results = await db.create(parseInt(categoryId), parseInt(userId), writtenText, undefined, parseInt(boxNext), title);
            res.json(results); 
            
        }
        else if(boxNext == undefined){
            let results = await db.create(parseInt(categoryId), parseInt(userId), writtenText, parseInt(boxPrevious), undefined, title);
            res.json(results); 
        }
        else{
            let results = await db.create(parseInt(categoryId), parseInt(userId), writtenText, parseInt(boxPrevious), parseInt(boxNext), title);
            res.json(results); 
        }

    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

router.put('/api/textBoxes', async (request, res) => {
    try {
        const {textBoxId, userId, categoryId, writtenText, boxNext, boxPrevious, title} = request.body;

        if(boxPrevious == undefined && boxNext == undefined){
            let results = await db.update(parseInt(categoryId), writtenText, undefined, undefined, title, parseInt(textBoxId), parseInt(userId));
            res.json(results);
        }
        else if(boxNext == undefined){
            let results = await db.update(parseInt(categoryId), writtenText, undefined, parseInt(boxPrevious), title, parseInt(textBoxId), parseInt(userId));
            res.json(results);
        }
        else if(boxPrevious == undefined){
            let results = await db.update(parseInt(categoryId), writtenText, parseInt(boxNext), undefined, title, parseInt(textBoxId), parseInt(userId));
            res.json(results);
        }
        else{
            let results = await db.update(parseInt(categoryId), writtenText, parseInt(boxNext), parseInt(boxPrevious), title, parseInt(textBoxId), parseInt(userId));
            res.json(results);
        }

    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }

});

router.delete('/api/textBoxes', async (request, res) => {
    try {
        const {textBoxId, userId} = request.body;

        let results = await postsdb.delete(parseInt(textBoxId), undefined);
        res.json(results);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }

});

router.get('api/textBoxes/post', async (request, res) => {
    try {
        const {textBoxId, userId} = request.body;

        let results = await postsdb.adminRead(parseInt(textBoxId), undefined);
        res.json(results);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});


module.exports = router;
