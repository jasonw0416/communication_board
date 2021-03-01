"use strict";

const boom = require("@hapi/boom");

module.exports.register = async server => {
    server.route({
        method:"GET",
        path: "/api/textBoxes",
        
        handler: async request => {
            try {
                
                const db = request.server.plugins.sql.client;
                const userId = 1;
                const res = await db.textBoxes.getTextBoxes(userId);

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
        config: {
            
            handler: async request => {
                try {
                    const db = request.server.plugins.sql.client;
                    //const userId = 1;
                    const {categoryId, userId, writtenText, boxPrevious, boxNext} = request.payload;
                    const res = await db.textBoxes.addTextBox({categoryId, userId, writtenText, boxPrevious, boxNext});
                    return res.recordset[0];
                } catch (err) {
                    server.log(err);
                    return boom.boomify(err);
                }
            }
        }
    } );

    server.route( {
        method: "DELETE",
        path: "/api/textBoxes/{textBoxId}",
        config: {
           
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
        }
    } );


};