"use strict";

const boom = require("@hapi/boom");

module.exports.register = async server => {
    server.route({
        method:"GET",
        path: "/api/textBoxes",
        
        handler: async request => {
            try {
                
                const db = request.server.plugins.sql.client;
                const res = await db.textBoxes.getTextBoxes();

                return res.recordset;
            }
            catch (err) {
                console.log(err);
            }
        }
    });

    server.route( {
        method: "POST",
        path: "/api/textBoxes",
        
        handler: async request => {
            try {
                const db = request.server.plugins.sql.client;
                //const userId = 1;
                console.log(request.payload);
                
                if(request.payload.addOrUpdate == 0){ //don't make this triple
                    console.log("awohid");
                    const {addOrUpdate, categoryId, userId, writtenText, boxPrevious, boxNext} = request.payload;
                    const res = await db.textBoxes.addTextBox({categoryId, userId, writtenText, boxPrevious, boxNext});
    
                    return res.recordset[0];
                }
                else if (request.payload.addOrUpdate == 1){ //don't make this triple
                    const {addOrUpdate, textBoxId, userId, categoryId, writtenText} = request.payload;
                    const res = await db.textBoxes.updateTextBox({textBoxId, userId, categoryId, writtenText});
                    return res.recordset[0];


                }
                else if (request.payload.addOrUpdate == 2){ //don't make this triple
                    const {addOrUpdate, textBoxId, userId} = request.payload;
                    const res = await db.textBoxes.deleteTextBox({textBoxId, userId});
                    return res.rowsAffected[0] === 1 ? "" : boom.notFound();
                }
                else{
                    const {addOrUpdate, textBoxId, userId} = request.payload;
                    const res = await db.textBoxes.getTextBoxesPOST({textBoxId, userId});
                    return res.recordset[0];
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