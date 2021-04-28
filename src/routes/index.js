"use strict";

const api = require("./api");
const path = require("path")


module.exports.register = async server => {

    await api.register(server);

    server.route({
        method:"GET",
        path:"/",
        handler: async (request, h) => {
            return h.file('./create_post.html');
        }
    });
};