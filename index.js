"use strict";

const server = require("./server");

const startServer = async() => {
    try{
        const config = {
            host: "localhost",
            port: 3000
        };
        const app = await server(config);

        await app.start();

        console.log(`Server running at https://${ config.host }:${ config.port }...`);
    }
    catch (err) {
        console.log("startup error:", err);

    }


};

startServer();



