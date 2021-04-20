const dotenv = require('dotenv').config();

const { createConnection } = require('mysql');

const Discord = require('discord.js');
const bot = new Discord.Client();

const Enmap = require("enmap");
const fs = require("fs");

var link = createConnection({
    host     : process.env.MYSQL_HOST,
    user     : process.env.MYSQL_USER,
    password : process.env.MYSQL_PASS,
    database : process.env.MYSQL_DB
});

const ConsoleProgressBar = require('console-progress-bar');
const consoleProgressBar = new ConsoleProgressBar({ maxValue: 100 });

const pckg = require('./package.json');
const config = require('./config.json');

bot.config = config;

function msleep(n) {
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, n);
}

function between(min, max) {
    return Math.floor(
        Math.random() * (max - min) + min
    )
}

var current_activity = "";

if (process.env.APP_ENV === "dev") {
    current_activity = bot.config.develop_activity;
} else {
    current_activity = bot.config.default_activity;
}


console.log('\033[2J');
console.log(`     __              .__                 .__                      ___.                                             `);
console.log(`    |__| ____   ____ |  |   _______ __ __|__|_______   ____ _____ \\_ |_________   ________________                `);
console.log(`    |  |/  _ \\_/ __ \\|  |   \\_  __ \\  |  \\  \\___   / _/ ___\\\\__  \\ | __ \\_  __ \\_/ __ \\_  __ \\__  \\  `);
console.log(`    |  (  <_> )  ___/|  |__  |  | \\/  |  /  |/    /  \\  \\___ / __ \\| \\_\\ \\  | \\/\\  ___/|  | \\// __ \\_   `);
console.log(`/\\__|  |\\____/ \\___  >____/  |__|  |____/|__/_____ \\  \\___  >____  /___  /__|    \\___  >__|  (____  /        `);
console.log(`\\______|           \\/                             \\/      \\/     \\/    \\/            \\/           \\/       `);
msleep(500);
console.log(`_________________________________________________________________________________________________________          \n`);
msleep(1000);
console.log(`BOT VERSION:       ${pckg.version}`);
msleep(300);
console.log(`PACKAGE NAME:      ${pckg.name}`);
msleep(300);
console.log(`SYSTEM AUTHOR:     ${pckg.author}`);
msleep(300);
console.log(`LICENSE:           ${pckg.license}`);
msleep(300);
console.log(`ENV:               ${process.env.APP_ENV}`);
msleep(300);
console.log(`BOT ACTIVITY:      ${current_activity}`);
msleep(300);
console.log(`_________________________________________________________________________________________________________          \n`);

if (process.env.APP_ENV !== "dev" && process.env.APP_ENV === "prod") {
    msleep(between(700, 1000));

    console.log(`BOT IS LOADING UP \n`);

    msleep(between(700, 1000));

    let i = 0;
    for (i = 0; i < 100; i++) {
        consoleProgressBar.addValue(1);
        msleep(between(70, 100));
    }
    console.log("\n");
}

bot.on('ready', () => {

    if (process.env.APP_ENV === "dev") {
        bot.user.setActivity(bot.config.develop_activity, { type: 'PLAYING' });
    } else {
        bot.user.setActivity(config.default_activity, { type: 'PLAYING' });
    }
    console.log("BOT:           \x1b[42mCONNECTED\x1b[0m");

    msleep(200);
    link.connect(err => {
        if (err) return console.log(err);
        console.log(`MYSQL:         \x1b[42mCONNECTED\x1b[0m`);
    });
});

fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        bot.on(eventName, event.bind(null, bot));
    });
});

bot.commands = new Enmap();

fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands/${file}`);
        let commandName = file.split(".")[0];
        console.log(`COMMAND LOADED:        ${commandName}`);
        bot.commands.set(commandName, props);
    });
    console.log(`_________________________________________________________________________________________________________          \n`);
});

bot.login(process.env.APP_TOKEN);