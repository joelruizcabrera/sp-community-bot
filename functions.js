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

        var checkSql = "SELECT * FROM sp_msgcount WHERE day_date = '" + today.toLocaleDateString() + "'";
        link.query(checkSql, function (err, res) {
            if(err) {
                logger.error('Error in DB');
                logger.debug(err);
                return;
            } else {
                if (res && res.length ) {
                    var updateRow = "UPDATE sp_msgcount SET day_msg_count = day_msg_count + 1 WHERE day_date = '" + today.toLocaleDateString() + "'";

                    link.query(updateRow, function (err, res) {
                        if(err) {
                            console.log("\x1b[41mERROR: COUNTING MESSAGE ERROR\x1b[0m\n\n" + err);
                        }
                    })
                } else {
                    var newRow = "INSERT INTO sp_msgcount (day_date, day_msg_count) VALUES ('" + today.toLocaleDateString() + "', 1)"

                    link.query(newRow, function (err, res) {
                        if(err) {
                            console.log("\x1b[41mERROR: COUNTING MESSAGE ERROR\x1b[0m\n\n" + err);
                        }
                    })
                }
            }
        })
    }
};
