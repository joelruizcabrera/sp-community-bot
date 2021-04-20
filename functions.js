const dotenv = require('dotenv').config();
const { createConnection } = require('mysql');

var link = createConnection({
    host     : process.env.MYSQL_HOST,
    user     : process.env.MYSQL_USER,
    password : process.env.MYSQL_PASS,
    database : process.env.MYSQL_DB
});

module.exports = {
    addRemMod: function (sql, author, newMod, type) {

        link.query(sql, function (err, res) {
            if (err) throw err;
            console.log("[" + author + "] hat " + newMod + " den Rang " + type);
        })
    },
    addMsgCount: function () {
        const timeElapsed = Date.now();
        const today = new Date(timeElapsed);

        var checkSql = "SELECT * FROM sp_msgcount WHERE day_date = " + today.toLocaleDateString();
        link.query(checkSql, function (err, res) {
            if(err) {
                logger.error('Error in DB');
                logger.debug(err);
                return;
            } else {
                if (res && res.length ) {
                    console.log('Case row was found!');
                    // do something with your row variable
                } else {
                    console.log('No case row was found :( !');
                }
            }
        })
    }
};
