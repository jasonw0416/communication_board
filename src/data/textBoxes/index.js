"use strict";

const utils = require("../utils");

const register = async({sql, getConnection}) => {
    const sqlQueries = await utils.loadSqlQueries("textBoxes");

    const getTextBoxes = async () => {
        const connection = await getConnection();
        const request = await connection.request();
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

    const updateTextBox = async ({textBoxId, userId, categoryId, writtenText, boxNext, boxPrevious}) => {
        const pool = await getConnection();
        const request = await pool.request();

        request.input("userId", sql.Int, 1);
        request.input("textBoxId", sql.Int, textBoxId);
        request.input("categoryId", sql.Int, categoryId);
        request.input("writtenText", sql.NVarChar(1000), writtenText);
        request.input("boxNext", sql.Int, boxNext);
        request.input("boxPrevious", sql.Int, boxPrevious);
        return request.query(sqlQueries.updateTextBox);
    };

    const deleteTextBox = async ({textBoxId, userId}) => {
        const pool = await getConnection();
        const request = await pool.request();
        request.input("textBoxId", sql.Int, textBoxId);
        request.input("userId", sql.Int, 1);
        request.input("textBoxIdInc", sql.Int, textBoxId - 1);
        return request.query(sqlQueries.deleteTextBox);
    };

    const getTextBoxesPOST = async ({textBoxId, userId}) => {
        const connection = await getConnection();

        const request = await connection.request();
        request.input("textBoxId", sql.Int, textBoxId);
        request.input("userId", sql.Int, 1);
        return await request.query(sqlQueries.getTextBoxesPOST);
    };

    return {
        getTextBoxes,
        addTextBox,
        updateTextBox,
        deleteTextBox,
        getTextBoxesPOST

    };



};

module.exports = {register};