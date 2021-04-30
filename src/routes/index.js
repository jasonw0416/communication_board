"use strict";

const api = require("./api");
const path = require("path")


module.exports.register = async server => {

    await api.register(server);

    server.route({
        method:"GET",
        path:"/",
        handler: async (request, h) => {
            return h.file('./forum.html');
        }
    });

    server.route({
        method:"GET",
        path:"/create_post2.html",
        handler: async (request, h) => {
            return h.file('./create_post2.html');
        }
    });

    server.route({
        method:"GET",
        path:"/create_forum.html",
        handler: async (request, h) => {
            return h.file('./create_forum.html');
        }
    });
};