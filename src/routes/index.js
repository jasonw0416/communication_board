"use strict";

const config = require("../config");
const sql = require("mysql2");
const fs = require("fs-extra");

const express = require('express');
const path = require('path');
const router = express.Router();

const db = require("../db");

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

router.get('/api/questions', async (request, res) => {
    try {
        let results = await db.questionsAll();
        res.json(results);
    }
    catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

router.get('/api/single-question/:questionId', async (request, res) => {
    try {
        const questionId = request.params.questionId;

        let results = await db.readSingleQuestion(parseInt(questionId));
        res.json(results);
    }
    catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

router.post('/api/questions', async (request, res) => {
    try {
        const {userId, categoryId, title, writtenText} = request.body;

        let results = await db.createQuestion(parseInt(userId), parseInt(categoryId), title, writtenText);
        res.json(results);
    }
    catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

router.put('/api/questions', async (request, res) => {
    try {
        const {writtenText, questionId} = request.body;

        let results = await db.updateQuestion(writtenText, parseInt(questionId));
        res.json(results);
    }
    catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
})

router.delete('/api/questions/:questionId', async (request, res) => {
    try {
        const questionId = request.params.questionId;

        let results = await db.deleteQuestion(parseInt(questionId));
        res.json(results);
    }
    catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

router.get('/api/answer/:questionId', async (request, res) => {
    try {
        const questionId = request.params.questionId;

        let results = await db.readAnswer(parseInt(questionId));
        res.json(results);
    }
    catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

router.post('/api/answer', async (request, res) => {
    try {
        const {questionId, userId, writtenText} = request.body;

        let results = await db.createAnswer(parseInt(questionId), parseInt(userId), writtenText);
        res.json(results);
    }
    catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

router.put('/api/answer', async (request, res) => {
    try {
        const {writtenText, answerId} = request.body;

        let results = await db.updateAnswer(writtenText, parseInt(answerId));
        res.json(results);
    }
    catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

router.delete('/api/answer/:answerId', async (request, res) => {
    try {
        const answerId = request.params.answerId;

        let results = await db.deleteAnswer(parseInt(answerId));
        res.json(results);
    }
    catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

router.delete('/api/all-answer/:questionId', async (request, res) => {
    try {
        const questionId = request.params.questionId;

        let results = await db.deleteAllAnswer(parseInt(questionId));
        res.json(results);
    }
    catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

module.exports = router;
