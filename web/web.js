const express = require('express')
const hbs = require('express-handlebars')
const bodyParser = require('body-parser')
const path = require('path')
const { createConnection } = require('mysql')

const fs = require('fs')

require('dotenv').config()

var link = createConnection({
    host     : process.env.MYSQL_HOST,
    user     : process.env.MYSQL_USER,
    password : process.env.MYSQL_PASS,
    database : process.env.MYSQL_DB
})

class WebSocket {
    constructor(token, port, client) {
        this.token = token
        this.client = client

        this.app = express()
        this.app.engine('hbs', hbs({
            extname: 'hbs',
            defaultLayout: 'layout',
            layoutsDir: 'web/layouts'
        }))
        this.app.set('views', path.join(__dirname, 'views'))
        this.app.set('view engine', 'hbs')
        this.app.use(express.static(path.join(__dirname, 'public')))
        this.app.use(bodyParser.urlencoded({extended: false}))
        this.app.use(bodyParser.json())

        this.registerRoots()

        this.server = this.app.listen(port, () => {
            console.log(`WEBSOCKET:     \x1b[42m\x1b[30mCONNECTED\x1b[0m`);
            console.log(`   - PORT:     ${this.server.address().port}\n\n`)
        })
    }

    checkToken(_token) {
        return (_token == this.token)
    }

    registerRoots() {
        this.app.get('/', (req, res) => {
            var _token = req.query.token

            if (!this.checkToken(_token)) {
                res.render('error', {title: 'ERROR', errtype: 'INVALID TOKEN'})
                return
            }
            var chans = []
            this.client.guilds.cache.first().channels.cache.forEach(c => {
                if (c.type === 'text' || c.type === 'news') {
                    chans.push({id: c.id, name: c.name})
                }
            })

            res.render('index', {
                title: 'Discord Bot INterface',
                token: _token,
                chans
            })

        })

        this.app.post('/sendMessage', (req, res) => {
            var _token = req.body.token
            var text = req.body.text
            var channelid = req.body.channelid

            if (!this.checkToken(_token))
                return

            var chan = this.client.guilds.cache.first().channels.cache.get(channelid)

            if (chan) {
                chan.send(text)
            }

        })

        this.app.get('/test', (req, res) => {
            res.render('test', {
                title: 'Discord Bot INterface'
            })
        })
    }
}

var updateCountSql = "SELECT day_msg_count FROM sp_msgcount ORDER BY day_id DESC";

function updateMsgCount () {
    link.query(updateCountSql, function (err, res) {
        if (err) throw err;
        let dataJs = {
            msgCount: res[0].day_msg_count
        };
        let data = JSON.stringify(dataJs);
        fs.writeFileSync('/data.json', data);
    })
}

setInterval(updateMsgCount, 2*1000);

module.exports = WebSocket