"use strict";

const config = require("../config");
const sql = require("mysql2");
const fs = require("fs-extra");

const express = require('express');
const path = require('path');
const router = express.Router();


const filePath = path.join(process.cwd(), "src", "data", "textBoxes");
const files = fs.readdirSync(filePath);
const sqlFiles = files.filter(f => f.endsWith(".sql"));
const sqlQueries = {};
for (const sqlFile of sqlFiles){
    const query = fs.readFileSync(path.join(filePath, sqlFile), {encoding: "UTF-8"});
    sqlQueries[sqlFile.replace(".sql", "")] = query;
}

const connection = sql.createConnection({
    host: config.sql.server,
    //port: config.sql.port,
    user: config.sql.user,
    password: config.sql.password,
    database: config.sql.database
});

connection.on('error', function(err) {
    console.log(err);
});

let postsdb = {};

postsdb.all = () => {
    return new Promise ((resolve, reject) => {
        connection.query(sqlQueries.getTextBoxes, (error, results) => {
            if (error) return reject(error);
            return resolve(results);
        });
    })
}

postsdb.create = (categoryId, userId, writtenText, boxPrevious, boxNext, title) => {
    return new Promise ((resolve, reject) => {
        connection.query(sqlQueries.addTextBox, [categoryId, userId, writtenText, boxPrevious, boxNext, title], function (error, results, fields){
            if (error) return reject(error)

            return resolve(results);
        });
    })
}

postsdb.update = (textBoxId, userId, categoryId, writtenText, boxNext, boxPrevious, title) => {
    return new Promise((resolve, reject) => {
        connection.query(sqlQueries.updateTextBox, [textBoxId, userId, categoryId, writtenText, boxNext, boxPrevious, title], function (error, results, fields){
            if (error) return reject(error)

            return resolve(results);
        })
    })
}

postsdb.delete = (textBoxId, userId) => {
    return new Promise((resolve, reject) => {
        connection.query(sqlQueries.deleteTextBox, [textBoxId], function (error, results, fields){
            if (error) return reject(error)

            return resolve(results);
        })
    })
}

postsdb.adminRead = (textBoxId, userId) => {
    return new Promise((resolve, reject) => {
        connection.query(sqlQueries.getTextBoxesPOST, [textBoxId], function (error, results, fields){
            if (error) return reject(error)

            return resolve(results);
        })
    })
}

module.exports = postsdb;
