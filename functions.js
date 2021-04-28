const dotenv = require('dotenv').config();
const fs = require('fs');
const dateFormat = require('dateformat');

let countmsg = 0;

module.exports = {
    addRemMod: function (sql, author, newMod, type) {

    },
    addMsgCount: function () {
        const timeElapsed = Date.now();
        const today = new Date(timeElapsed);

        var now = dateFormat(new Date(), "dd/mm/yyyy");

        fs.readFile('./msgcount.json', (err, data) => {
            if (err) throw err;
            let dataSrc = JSON.parse(data);
            var dataArr = dataSrc.msgCount;

            let foundToday = false;
            var lastIndex = dataArr.length - 1;

            if (dataArr[lastIndex].date != now) {
                newMsgDate(now)
            } else {
                updateMsgFile(now, dataArr)
            }

            /*for (let i = 0; i < dataArr.length; i++) {
                console.log(lastIndex);
            }*/
        });

    }
};

function newMsgDate(newJson) {
    var obj = JSON.parse(fs.readFileSync('./msgcount.json', 'utf-8'));

    obj["msgCount"].push({"date": newJson, "count": 0});
    jsonStr = JSON.stringify(obj, null, 4);
    fs.writeFileSync('./msgcount.json', jsonStr);
}

function updateMsgFile(now) {
    countmsg++;
    console.log(countmsg)
    /*fs.readFile('./msgcount.json', (err, data) => {
        if (err) throw err;

        let foundToday = false;

        let dataSrc = JSON.parse(data);
        var dataArr = dataSrc.msgCount;
        var lastIndex = dataArr.length - 1;

        var newCount = dataArr[lastIndex].count + 1;

        const obj = JSON.parse(fs.readFileSync('./msgcount.json', 'utf-8'));

        try {
            fs.writeFileSync(filePath, JSON.stringify(fileObject, null, 4), 'utf8');
            console.log("The file was saved!");
        }
        catch(err) {
            console.err("An error has ocurred when saving the file.");
        }

        /!*for (let i = 0; i < dataArr.length; i++) {
            console.log(lastIndex);
        }*!/
    });*/
}