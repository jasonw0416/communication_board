"use strict";

const config = require("../config");
const sql = require("mysql2");
const fs = require("fs-extra");

const express = require('express');
const path = require('path');

const filePath1 = path.join(process.cwd(), "src", "data", "questions");
const files1 = fs.readdirSync(filePath1);
const sqlFiles1 = files1.filter(f => f.endsWith(".sql"));
const questionQueries = {};
for (const sqlFile of sqlFiles1){
    const query = fs.readFileSync(path.join(filePath1, sqlFile), {encoding: "UTF-8"});
    questionQueries[sqlFile.replace(".sql", "")] = query;
}

const filePath2 = path.join(process.cwd(), "src", "data", "answers");
const files2 = fs.readdirSync(filePath2);
const sqlFiles2 = files2.filter(f => f.endsWith(".sql"));
const answerQueries = {};
for (const sqlFile of sqlFiles2){
    const query = fs.readFileSync(path.join(filePath2, sqlFile), {encoding: "UTF-8"});
    answerQueries[sqlFile.replace(".sql", "")] = query;
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


postsdb.questionsAll = () => {
    return new Promise((resolve, reject) => {
        connection.query(questionQueries.readQuestion, (error, results) => {
            if (error) return reject(error);
            return resolve(results);
        });
    })
}

postsdb.readSingleQuestion = (questionId) => {
    return new Promise((resolve, reject) => {
        connection.query(questionQueries.readSingleQuestion, [questionId], (error, results) => {
            if (error) return reject(error);
            return resolve(results);
        });
    })
}

postsdb.createQuestion = (userId, categoryId, title, writtenText) => {
    return new Promise ((resolve, reject) => {
        connection.query(questionQueries.createQuestion, [userId, categoryId, title, writtenText], function (error, results){
            if (error) return reject(error)

            return resolve(results);
        });
    })
}

postsdb.updateQuestion = (writtenText, questionId) => {
    return new Promise ((resolve, reject) => {
        connection.query(questionQueries.updateQuestion, [writtenText, questionId], function (error, results){
            if (error) return reject(error);

            return resolve(results);
        })
    })
}

postsdb.deleteQuestion = (questionId) => {
    return new Promise ((resolve, reject) => {
        connection.query(questionQueries.deleteQuestion, [questionId], function (error, results){
            if (error) return reject(error);

            return resolve(results);
        })
    })
}


postsdb.readAnswer = (questionId) => {
    return new Promise((resolve, reject) => {
        connection.query(answerQueries.readAnswer, [questionId], (error, results) => {
            if (error) return reject(error);
            return resolve(results);
        });
    })
}

postsdb.createAnswer = (questionId, userId, writtenText) => {
    return new Promise((resolve, reject) => {
        connection.query(answerQueries.createAnswer, [questionId, userId, writtenText], (error, results) => {
            if (error) return reject(error);
            return resolve(results);
        });
    })
}

postsdb.updateAnswer = (writtenText, answerId) => {
    return new Promise((resolve, reject) => {
        connection.query(answerQueries.updateAnswer, [writtenText, answerId], (error, results) => {
            if (error) return reject(error);
            return resolve(results);
        })
    })
}

postsdb.deleteAnswer = (answerId) => {
    return new Promise((resolve, reject) => {
        connection.query(answerQueries.deleteAnswer, [answerId], (error, results) => {
            if (error) return reject(error);
            return resolve(results);
        })
    })
}

postsdb.deleteAllAnswer = (questionId) => {
    return new Promise((resolve, reject) => {
        connection.query(answerQueries.deleteAllAnswer, [questionId], (error, results) => {
            if (error) return reject(error);
            return resolve(results);
        })
    })
}

module.exports = postsdb;
