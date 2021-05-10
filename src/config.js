"use strict";

const dotenv = require("dotenv");
const assert = require("assert");

dotenv.config();

const {
    PORT,
    HOST_URL,
    SQL_SERVER,
    SQL_PORT,
    SQL_USER,
    SQL_DATABASE,
    SQL_PASSWORD,
} = process.env;

const sqlEncrypt = process.env.SQL_ENCRYPT === "true";

assert( PORT, "PORT configuration is required." );
assert( HOST_URL, "HOST_URL configuration is required." );
assert( SQL_SERVER, "SQL_SERVER configuration is required." );
assert( SQL_PORT, "SQL_PORT configuration is required." );
assert( SQL_DATABASE, "SQL_DATABASE configuration is required." );
assert( SQL_USER, "SQL_USER configuration is required." );
assert( SQL_PASSWORD, "SQL_PASSWORD configuration is required." );


module.exports = {
    port: PORT,
    url: HOST_URL,
    sql: {
        server: SQL_SERVER,
        port: SQL_PORT,
        database: SQL_DATABASE,
        user: SQL_USER,
        password: SQL_PASSWORD,
        options:{
            encrypt: sqlEncrypt,
            enableArithAbort: true,

        },

    },
};

