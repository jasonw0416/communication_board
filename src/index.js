"use strict";

const config = require("./config");
const apiRouter = require('./routes')
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', apiRouter);


app.listen(config.port, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", config.port);
});

