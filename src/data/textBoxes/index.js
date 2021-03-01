"use strict";

const utils = require("../utils");

const register = async({sql, getConnection}) => {
    const sqlQueries = await utils.loadSqlQueries("textBoxes");

    const getTextBoxes = async textBoxId => {
        const connection = await getConnection();

        const request = await connection.request();
        request.input("textBoxId", sql.Int, textBoxId);
        return request.query(sqlQueries.getTextBoxes);
    };
    return {
        getTextBoxes
    };
};

module.exports = {register};