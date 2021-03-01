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


    const addTextBox = async ({categoryId, userId, writtenText, boxPrevious, boxNext}) =>{
        const pool = await getConnection();
        const request = await pool.request();
        if(categoryId == null){
            request.input("categoryId", 0)
        }
        else{
            request.input("categoryId", categoryId)
        }
        if(userId == null){
            request.input("userId", -1);
        }
        else{
            request.input("userId", userId);
        }
        request.input("writtenText", writtenText);
        request.input("boxPrevious", null);
        request.input("boxNext", null);
        return request.query(sqlQueries.addTextBox);
    };

    const updateTextBox = async ({categoryId, userId, writtenText, textBoxId}) => {
        const pool = await getConnection();
        const request = await pool.request();
        request.input("categoryId", categoryId)
        if(userId == null){
            request.input("userId", -1);
        }
        else{
            request.input("userId", userId);
        }
        request.input("textBoxId", textBoxId);
        request.input("writtenText", writtenText);
        return request.query(sqlQueries.updateTextBox);
    };

    const deleteTextBox = async ({textBoxId, userId}) => {
        const pool = await getConnection();
        const request = await pool.request();
        request.input("textBoxId", textBoxId);
        if(userId == null){
            request.input("userId", -1);
        }
        else{
            request.input("userId", userId);
        }
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