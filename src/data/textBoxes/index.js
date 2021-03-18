"use strict";

const utils = require("../utils");

const register = async({sql, getConnection}) => {
    const sqlQueries = await utils.loadSqlQueries("textBoxes");

    const getTextBoxes = async userId => {
        const connection = await getConnection();

        const request = await connection.request();
        request.input("userId", sql.Int, userId);
        return await request.query(sqlQueries.getTextBoxes);
    };


    const addTextBox = async ({categoryId, userId, writtenText, boxPrevious, boxNext}) =>{
        const pool = await getConnection();
        const request = await pool.request();


        request.input("categoryId", sql.Int, categoryId);
        request.input("userId", sql.Int, 1);

        request.input("writtenText", sql.NVarChar(1000), writtenText);
        request.input("boxPrevious",sql.Int, boxPrevious);
        request.input("boxNext", sql.Int, boxNext);
        return await request.query(sqlQueries.addTextBox);
    };

    const updateTextBox = async ({categoryId, userId, writtenText, textBoxId}) => {
        const pool = await getConnection();
        const request = await pool.request();
        request.input("categoryId", sql.Int, categoryId)
        request.input("userId", sql.Int, 1);
        request.input("textBoxId", sql.Int, textBoxId);
        request.input("writtenText", sql.NVarChar(1000), writtenText);
        return request.query(sqlQueries.updateTextBox);
    };

    const deleteTextBox = async ({textBoxId, userId}) => {
        const pool = await getConnection();
        const request = await pool.request();
        request.input("textBoxId", sql.Int, textBoxId);
        request.input("userId", sql.Int, 1);
        return request.query(sqlQueries.deleteTextBox);
    };

    return {
        getTextBoxes,
        addTextBox,
        updateTextBox,
        deleteTextBox

    };



};

module.exports = {register};