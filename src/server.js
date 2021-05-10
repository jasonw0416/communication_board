"use strict";


const Hapi = require('@hapi/hapi');
const routes = require("./routes");
const inert = require("@hapi/inert");

const app = async config => {

    const {host, port} = config;

    const server = Hapi.server( { host, port } );

    server.app.config = config;

    await server.register(inert);

    await routes.register(server);
    return server;



};

module.exports = app;


