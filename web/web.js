const express = require('express')
const hbs = require('express-handlebars')
const bodyParser = require('body-parser')
const path = require('path')

const dateFormat = require('dateformat');
var now = dateFormat(new Date(), "dd/mm/yyyy");

const fs = require('fs')

require('dotenv').config()

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

            res.render('login', {
                title: 'Login - SP COMMUNITY Bot',
            })

        })

        this.app.get('/board', (req, res) => {
            var _token = req.query.token

            if (!this.checkToken(_token)) {
                res.redirect('/?correct=false')
                return
            }
            var chans = []
            this.client.guilds.cache.first().channels.cache.forEach(c => {
                if (c.type === 'text' || c.type === 'news') {
                    chans.push({id: c.id, name: c.name})
                }
            })

            var mods = []

            this.client.guilds.cache.first().members.cache.forEach(u => {
                var getRole = u.roles.member._roles
                if (getRole.indexOf('834080634145865739') > -1) {
                    var username = u.roles.member.user.username
                    var discriminator = u.roles.member.user.discriminator
                    var userid = u.roles.member.user.id
                    var avatar = u.roles.member.user.avatar

                    mods.push({name: username, disc: discriminator, userid: userid, avatar: avatar})
                }
                /*var checkTrue = u.roles.includes('834080634145865739');
                if (checkTrue === true ) {
                    console.log(u.user.username)
                }*/
            })

            /*if(this.client.guilds.cache.first().member.roles.cache.find(r => r.id === "834080634145865739")){
                console.log(this.client.guilds.member.name)
            }*/

            var roles = []

            this.client.guilds.cache.first().roles.cache.forEach(m => {
                roles.push({id: m.id, name: m.name, color: "#" + OLEtoRGB(m.color)})
            })

            var emojis = []

            this.client.guilds.cache.first().emojis.cache.forEach(e => {
                var emoji_bool = ""
                var emoji_badge = ""
                var emoji_text = ""
                if (e.animated === false) {
                    emoji_bool = "false"
                    emoji_badge = "danger"
                    emoji_text = "NO"
                } else {
                    emoji_bool = "true"
                    emoji_badge = "success"
                    emoji_text = "YES"
                }

                emojis.push({id: e.id, name: e.name, animated: {bool: emoji_bool, badge: emoji_badge, text: emoji_text}})
            })

            var todayCount = [];

            fs.readFile('./msgcount.json', (err, data) => {
                if (err) throw err;
                let dataSrc = JSON.parse(data);
                var dataArr = dataSrc.msgCount;

                var lastIndex = dataArr.length - 1;

                console.log(dataArr[lastIndex].count)

                todayCount.push({count: dataArr[lastIndex].count});

                /*for (let i = 0; i < dataArr.length; i++) {
                    console.log(lastIndex);
                }*/
            });

            console.log(todayCount)

            res.render('index', {
                title: 'SP COMMUNITY Bot',
                token: _token,
                chans,
                roles,
                emojis,
                bot_status: this.client.presence.status,
                mods,
                todayCount
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


function updateMsgCount () {

}

function OLEtoRGB(ole) {
    // Verify ole is valid OLE.
    var blu = Math.floor((ole / 65536) % 256);
    var grn = Math.floor((ole / 256) % 256);
    var red = Math.floor(ole % 256);

    blu = blu.toString(16);
    if (blu.length < 2) { blu = "0" + blu; }
    grn = grn.toString(16);
    if (grn.length < 2) { grn = "0" + grn; }
    red = red.toString(16);
    if (red.length < 2) { red = "0" + red; }

    var rgb = red.toString() + grn.toString() + blu.toString();

    return rgb;
}

module.exports = WebSocket