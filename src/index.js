"use strict";

const server = require("./server");
const config = require("./config");


const startServer = async() => {
    try{
        const app = await server(config);

        await app.start();

        console.log(`Server running at https://${ config.host }:${ config.port }...`);
    }
    catch (err) {
        console.log("startup error:", err);

    }


};

startServer();



