"use strict";

const config = require("./config");
const sql = require("mysql2");
const fs = require("fs-extra");

const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', router);

const filePath = path.join(process.cwd(), "src", "data", "textBoxes");
const files = fs.readdirSync(filePath);
const sqlFiles = files.filter(f => f.endsWith(".sql"));
const sqlQueries = {};
for (const sqlFile of sqlFiles){
    const query = fs.readFileSync(path.join(filePath, sqlFile), {encoding: "UTF-8"});
    sqlQueries[sqlFile.replace(".sql", "")] = query;
}


router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/../views/forum.html'));
});

router.get('/create_post2.html', (req, res) => {
    res.sendFile(path.join(__dirname+'/../views/create_post2.html'));
});

router.get('/create_forum.html', (req, res) => {
    res.sendFile(path.join(__dirname+'/../views/create_forum.html'));
});

router.get('/public/css/main.css', (req, res) => {
    res.sendFile(path.join(__dirname+'/../public/css/main.css'));
});

router.get('/images/chemistry.jpeg', (req, res) => {
    res.sendFile(path.join(__dirname+'/../images/chemistry.jpeg'));
});

router.get('/images/icon.png', (req, res) => {
    res.sendFile(path.join(__dirname+'/../images/icon.png'));
});

router.get('/postQues.html', (req, res) => {
    res.sendFile(path.join(__dirname+'/../views/postQues.html'));
});

router.get('/api/textBoxes', (req, res) => {
    try {
        const connection = sql.createConnection({
            host: config.sql.server,
            //port: config.sql.port,
            user: config.sql.user,
            password: config.sql.password,
            database: config.sql.database
        });
  
        connection.on('error', function(err) {
            console.log(err);
        });

        connection.query(sqlQueries.getTextBoxes, (error, results) => {
            if (error) console.log(error);
            res.json(results);
        });

        connection.end();
    }
    catch (err) {
        console.log(err);
    }
});

router.post('/api/textBoxes', (request, res) => {
    try {
        const connection = sql.createConnection({
            host: config.sql.server,
            port: config.sql.port,
            user: config.sql.user,
            password: config.sql.password,
            database: config.sql.database
        });
  
        connection.on('error', function(err) {
            console.log(err);
        });

        // console.log(JSON.parse(JSON.stringify(request.body)));

                    
        const {categoryId, userId, writtenText, boxPrevious, boxNext, title} = request.body;

        if (boxPrevious == undefined && boxNext == undefined){
            connection.query(sqlQueries.addTextBox, [parseInt(categoryId), parseInt(userId), writtenText, undefined, undefined, title], function (error, results, fields){
                if (error) {
                    console.log(error);
                    res.sendStatus(500);
                }

                res.json(results);
            });
        }
        else if(boxPrevious == undefined){
            connection.query(sqlQueries.addTextBox, [parseInt(categoryId), parseInt(userId), writtenText, undefined, parseInt(boxNext), title], function (error, results, fields){
                if (error) {
                    console.log(error);
                    res.sendStatus(500);
                }

                res.json(results);
            });
            
        }
        else if(boxNext == undefined){
            connection.query(sqlQueries.addTextBox, [parseInt(categoryId), parseInt(userId), writtenText, parseInt(boxPrevious), undefined, title], function (error, results, fields){
                if (error) {
                    console.log(error);
                    res.sendStatus(500);
                }

                res.json(results);
            });
        }
        else{
            connection.query(sqlQueries.addTextBox, [parseInt(categoryId), parseInt(userId), writtenText, parseInt(boxPrevious), parseInt(boxNext), title], function (error, results, fields){
                if (error) {
                    console.log(error);
                    res.sendStatus(500);
                }

                res.json(results);
            });
        }

        connection.end();

    } catch (err) {
        console.log(err);
    }
});

router.put('/api/textBoxes', (request, res) => {
    try {
        const connection = sql.createConnection({
            host: config.sql.server,
            port: config.sql.port,
            user: config.sql.user,
            password: config.sql.password,
            database: config.sql.database
        });
  
        connection.on('error', function(err) {
            console.log(err);
        });

        const {textBoxId, userId, categoryId, writtenText, boxNext, boxPrevious, title} = request.body;

        if(boxPrevious == undefined && boxNext == undefined){
            connection.query(sqlQueries.updateTextBox, [parseInt(categoryId), writtenText, undefined, undefined, title, parseInt(textBoxId), parseInt(userId)], function (error, results, fields){
                if (error) {
                    console.log(error);
                    res.sendStatus(500);
                }
                
                res.json(results);
            })
        }
        else if(boxNext == undefined){
            connection.query(sqlQueries.updateTextBox, [parseInt(categoryId), writtenText, undefined, parseInt(boxPrevious), title, parseInt(textBoxId), parseInt(userId)], function (error, results, fields){
                if (error) {
                    console.log(error);
                    res.sendStatus(500);
                }
                
                res.json(results);
            })

        }
        else if(boxPrevious == undefined){
            connection.query(sqlQueries.updateTextBox, [parseInt(categoryId), writtenText, parseInt(boxNext), undefined, title, parseInt(textBoxId), parseInt(userId)], function (error, results, fields){
                if (error) {
                    console.log(error);
                    res.sendStatus(500);
                }
                
                res.json(results);
            })
        }
        else{
            connection.query(sqlQueries.updateTextBox, [parseInt(categoryId), writtenText, parseInt(boxNext), parseInt(boxPrevious), title, parseInt(textBoxId), parseInt(userId)], function (error, results, fields){
                if (error) {
                    console.log(error);
                    res.sendStatus(500);
                }
                
                res.json(results);
            })
        }

        connection.end();

    } catch (err) {
        console.log(err);
    }

});

router.delete('/api/textBoxes', (request, res) => {
    try {
        const connection = sql.createConnection({
            host: config.sql.server,
            port: config.sql.port,
            user: config.sql.user,
            password: config.sql.password,
            database: config.sql.database
        });
  
        connection.on('error', function(err) {
            console.log(err);
        });

        const {textBoxId, userId} = request.body;

        connection.query(sqlQueries.deleteTextBox, [parseInt(textBoxId)], function (error, results, fields){
            if (error) {
                console.log(error);
                res.sendStatus(500);
            }
            
            res.json(results);
        })

        connection.end();

    } catch (err) {
        console.log(err);
    }

});

router.get('api/textBoxes/post', (request, res) => {
    try {
        const connection = sql.createConnection({
            host: config.sql.server,
            port: config.sql.port,
            user: config.sql.user,
            password: config.sql.password,
            database: config.sql.database
        });
  
        connection.on('error', function(err) {
            console.log(err);
        });

        const {textBoxId, userId} = request.body;

        connection.query(sqlQueries.getTextBoxesPOST, [textBoxId], function (error, results, fields){
            if (error) {
                console.log(error);
                res.sendStatus(500);
            }
            
            res.json(results);
        })

        connection.end();

    } catch (err) {
        console.log(err);
    }
});


app.listen(config.port, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", config.port);
});


module.exports = app;



/*router.post('/api/textBoxes', (request, res) => {
    try {
        const connection = sql.createConnection({
            host: config.sql.server,
            port: config.sql.port,
            user: config.sql.user,
            password: config.sql.password,
            database: config.sql.database
        });
  
        connection.on('error', function(err) {
            console.log(err);
        });

        //console.log(request.payload);
                    
        if(request.payload.addOrUpdate == 0){ //don't make this triple

            const {addOrUpdate, categoryId, userId, writtenText, boxPrevious, boxNext, title} = request.payload;


            let promise =  new Promise((resolve, reject) => {
                // connection.query(sqlQueries.addTextBox, [categoryId, userId, writtenText, boxPrevious, boxNext], function (error, results, fields)
                if(boxPrevious == undefined && boxNext == undefined){
                    connection.query(sqlQueries.addTextBox, [parseInt(categoryId), parseInt(userId), writtenText, undefined, undefined, title], function (error, results, fields){
                        if (error) {
                        console.log(error);
                        return reject(error);
                        }
                
                        //console.log(results);

        
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
                
                        //console.log(results);

        
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
                
                        //console.log(results);

        
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
                
                        //console.log(results);

        
                        return resolve(results);
                    });
                    connection.end();
                }
                
            });
    
            res.json(promise);
        }
        else if (request.payload.addOrUpdate == 1){ //don't make this triple
            const {addOrUpdate, textBoxId, userId, categoryId, writtenText, boxNext, boxPrevious, title} = request.payload;



            let promise = new Promise((resolve, reject) => {

                if(boxPrevious == undefined && boxNext == undefined){
                    connection.query(sqlQueries.updateTextBox, [parseInt(categoryId), writtenText, undefined, undefined, title, parseInt(textBoxId), parseInt(userId)], function (error, results, fields){
                        if (error) {
                            console.log(error);
                        return reject(error)
                        }
                
                        //console.log(results);
                
                        return resolve(results);
                    })
                }
                else if(boxNext == undefined){
                    connection.query(sqlQueries.updateTextBox, [parseInt(categoryId), writtenText, undefined, parseInt(boxPrevious), title, parseInt(textBoxId), parseInt(userId)], function (error, results, fields){
                        if (error) {
                            console.log(error);
                        return reject(error)
                        }
                
                        //console.log(results);
                
                        return resolve(results);
                    })

                }
                else if(boxPrevious == undefined){
                    connection.query(sqlQueries.updateTextBox, [parseInt(categoryId), writtenText, parseInt(boxNext), undefined, title, parseInt(textBoxId), parseInt(userId)], function (error, results, fields){
                        if (error) {
                            console.log(error);
                        return reject(error)
                        }
                
                        //console.log(results);
                
                        return resolve(results);
                    })
                }
                else{
                    connection.query(sqlQueries.updateTextBox, [parseInt(categoryId), writtenText, parseInt(boxNext), parseInt(boxPrevious), title, parseInt(textBoxId), parseInt(userId)], function (error, results, fields){
                        if (error) {
                            console.log(error);
                        return reject(error)
                        }
                
                        //console.log(results);
                
                        return resolve(results);
                    })
                }
                
            });

            res.json(promise);
        }
        else if (request.payload.addOrUpdate == 2){ //don't make this triple
            const {addOrUpdate, textBoxId, userId} = request.payload;
            let promise =  new Promise((resolve, reject) => {
                connection.query(sqlQueries.deleteTextBox, [parseInt(textBoxId)], function (error, results, fields){
                if (error) {
                    return reject(error)
                }
            
                //console.log(results);
            
                return resolve(results);
                })
            });

            res.json(promise);
        }
        else{
            const {addOrUpdate, textBoxId, userId} = request.payload;
            let promise =  new Promise((resolve, reject) => {
                connection.query(sqlQueries.getTextBoxesPOST, [textBoxId], function (error, results, fields){
                if (error) {
                    return reject(error)
                }
            
                //console.log(results);
            
                return resolve(results);
                })
            });

            res.json(promise);
        }
    } catch (err) {
        console.log(err);
    }

});*/


// "use strict";

// const server = require("./server");
// const config = require("./config");


// const startServer = async() => {
//     try{
//         const app = await server(config);

//         await app.start();

//         console.log(`Server running at https://${ config.host }:${ config.port }...`);
//     }
//     catch (err) {
//         console.log("startup error:", err);

//     }


// };

// startServer();



