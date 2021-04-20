const dotenv = require('dotenv').config();
const { createConnection } = require('mysql');

module.exports = {
    addRemMod: function (sql, author, newMod, type) {
        var link = createConnection({
            host     : process.env.MYSQL_HOST,
            user     : process.env.MYSQL_USER,
            password : process.env.MYSQL_PASS,
            database : process.env.MYSQL_DB
        });

        link.query(sql, function (err, res) {
            if (err) throw err;
            console.log("[" + author + "] hat " + newMod + " den Rang " + type);
        })
    }
};