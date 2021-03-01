"use strict";

const textBoxes = require("./textBoxes");

module.exports.register = async server => {
    await textBoxes.register(server)
};