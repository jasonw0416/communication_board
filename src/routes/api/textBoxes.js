"use strict";

const boom = require("@hapi/boom");
const utils = require("./utils");
const sql = require("mysql");
const config = require("../../config");

module.exports.register = async server => {

    const sqlQueries = await utils.loadSqlQueries("textBoxes");

  


    server.route({
    
        method:"GET",
        path: "/api/textBoxes",
        
        handler: function (request, h) {
          
            try {
              const connection = sql.createConnection({
                host: config.sql.server,
                port: config.sql.port,
                user: config.sql.user,
                password: config.sql.password,
                database: config.sql.user
            });
        
            connection.on('error', function(err) {
              console.log(err);
          });
              

                return new Promise((resolve, reject) => {
                    connection.query(sqlQueries.getTextBoxes, function (error, results, fields){
                      if (error) {
                        return reject(error)
                      }
                
                      console.log(results);
                
                      return resolve(results);
                    });
                    connection.end();
                    
                  });

                

                /*connection.query("SELECT * FROM textBox", function (error, results, fields) {
                    if (error) throw error;
                    console.log(results);
                    return results;
                });
                const db = request.server.plugins.sql.client;
                
                const res = await db.textBoxes.getTextBoxes();
                console.log(res);

                return res;*/
            }
            catch (err) {
                console.log(err);
            }
          
        }
        
    });

    server.route( {
        method: "POST",
        path: "/api/textBoxes",
        
        handler: function (request, h) {
            try {
              const connection = sql.createConnection({
                host: config.sql.server,
                port: config.sql.port,
                user: config.sql.user,
                password: config.sql.password,
                database: config.sql.user
            });
        
            connection.on('error', function(err) {
              console.log(err);
          });
                console.log(request.payload);
                
                if(request.payload.addOrUpdate == 0){ //don't make this triple

                    const {addOrUpdate, categoryId, userId, writtenText, boxPrevious, boxNext, title} = request.payload;
      

                    return new Promise((resolve, reject) => {
                        // connection.query(sqlQueries.addTextBox, [categoryId, userId, writtenText, boxPrevious, boxNext], function (error, results, fields)
                        if(boxPrevious == undefined && boxNext == undefined){
                            connection.query(sqlQueries.addTextBox, [parseInt(categoryId), parseInt(userId), writtenText, undefined, undefined, title], function (error, results, fields){
                                if (error) {
                                  console.log(error);
                                  return reject(error);
                                }
                          
                                console.log(results);
          
                  
                                return resolve(results);
                              });
                              connection.end();
                        }
                        else if(boxPrevious == undefined){
                            connection.query(sqlQueries.addTextBox, [parseInt(categoryId), parseInt(userId), writtenText, undefined, parseInt(boxNext), title], function (error, results, fields){
                                if (error) {
                                  console.log(error);
                                  return reject(error);
                                }
                          
                                console.log(results);
          
                  
                                return resolve(results);
                              });
                              connection.end();
                              
                        }
                        else if(boxNext == undefined){
                            connection.query(sqlQueries.addTextBox, [parseInt(categoryId), parseInt(userId), writtenText, parseInt(boxPrevious), undefined, title], function (error, results, fields){
                                if (error) {
                                  console.log(error);
                                  return reject(error);
                                }
                          
                                console.log(results);
          
                  
                                return resolve(results);
                              });
                              connection.end();
                        }
                        else{
                            connection.query(sqlQueries.addTextBox, [parseInt(categoryId), parseInt(userId), writtenText, parseInt(boxPrevious), parseInt(boxNext), title], function (error, results, fields){
                                if (error) {
                                  console.log(error);
                                  return reject(error);
                                }
                          
                                console.log(results);
          
                  
                                return resolve(results);
                              });
                              connection.end();
                        }
                        
                      });
               
                    /*const {addOrUpdate, categoryId, userId, writtenText, boxPrevious, boxNext} = request.payload;
                    const res = await db.textBoxes.addTextBox({categoryId, userId, writtenText, boxPrevious, boxNext});
    
                    return res.recordset[0];*/
                }
                else if (request.payload.addOrUpdate == 1){ //don't make this triple
                    const {addOrUpdate, textBoxId, userId, categoryId, writtenText, boxNext, boxPrevious, title} = request.payload;



                    return new Promise((resolve, reject) => {

                        if(boxPrevious == undefined && boxNext == undefined){
                            connection.query(sqlQueries.updateTextBox, [parseInt(categoryId), writtenText, undefined, undefined, title, parseInt(textBoxId), parseInt(userId)], function (error, results, fields){
                                if (error) {
                                    console.log(error);
                                  return reject(error)
                                }
                          
                                console.log(results);
                          
                                return resolve(results);
                              })
                        }
                        else if(boxNext == undefined){
                            connection.query(sqlQueries.updateTextBox, [parseInt(categoryId), writtenText, undefined, parseInt(boxPrevious), title, parseInt(textBoxId), parseInt(userId)], function (error, results, fields){
                                if (error) {
                                    console.log(error);
                                  return reject(error)
                                }
                          
                                console.log(results);
                          
                                return resolve(results);
                              })

                        }
                        else if(boxPrevious == undefined){
                            connection.query(sqlQueries.updateTextBox, [parseInt(categoryId), writtenText, parseInt(boxNext), undefined, title, parseInt(textBoxId), parseInt(userId)], function (error, results, fields){
                                if (error) {
                                    console.log(error);
                                  return reject(error)
                                }
                          
                                console.log(results);
                          
                                return resolve(results);
                              })
                        }
                        else{
                            connection.query(sqlQueries.updateTextBox, [parseInt(categoryId), writtenText, parseInt(boxNext), parseInt(boxPrevious), title, parseInt(textBoxId), parseInt(userId)], function (error, results, fields){
                                if (error) {
                                    console.log(error);
                                  return reject(error)
                                }
                          
                                console.log(results);
                          
                                return resolve(results);
                              })
                        }


                        
                      });

                    /*const res = await db.textBoxes.updateTextBox({textBoxId, userId, categoryId, writtenText, boxNext, boxPrevious});
                    return res.recordset[0];*/


                }
                else if (request.payload.addOrUpdate == 2){ //don't make this triple
                    const {addOrUpdate, textBoxId, userId} = request.payload;
                    return new Promise((resolve, reject) => {
                        connection.query(sqlQueries.deleteTextBox, [parseInt(textBoxId)], function (error, results, fields){
                          if (error) {
                            return reject(error)
                          }
                    
                          console.log(results);
                    
                          return resolve(results);
                        })
                      });
                    /*const res = await db.textBoxes.deleteTextBox({textBoxId, userId});
                    return res.rowsAffected[0] === 1 ? "" : boom.notFound();*/
                }
                else{
                    const {addOrUpdate, textBoxId, userId} = request.payload;
                    return new Promise((resolve, reject) => {
                        connection.query(sqlQueries.getTextBoxesPOST, [textBoxId], function (error, results, fields){
                          if (error) {
                            return reject(error)
                          }
                    
                          console.log(results);
                    
                          return resolve(results);
                        })
                      });
                    /*const res = await db.textBoxes.getTextBoxesPOST({textBoxId, userId});
                    return res.recordset[0];*/
                }
        
                
            
            } catch (err) {
                server.log(err);
                return boom.boomify(err);
            }
          
        }

    } );

    /*server.route( {
        method: "DELETE",
        path: "/api/textBoxes/{textBoxId}",

           
        response: {
            emptyStatusCode: 204
        },
        handler: async request => {
            try {
                const textBoxId = request.params.textBoxId;
                //const userId = 1;
                const db = request.server.plugins.sql.client;
                const res = await db.textBoxes.deleteTextBox({textBoxId, userId});
                return res.rowsAffected[0] === 1 ? "" : boom.notFound();
            } catch (err) {
                server.log(err);
                return boom.boomify( err );
            }
        }

    } );*/


};