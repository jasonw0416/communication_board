"use strict";

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
};