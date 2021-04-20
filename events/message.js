const FUNCTIONS = require('../functions');

module.exports = (bot, message) => {
    if (message.author.bot) return;

    if (!message.member.roles.cache.has(modRole.id))
        return console.log("\x1b[47m\x1b[30m\x1b[1m[#" + message.channel.name + "]\x1b[0m \x1b301m" + message.author.tag + ": " + message.content + "\x1b[0m");

    if (message.content.indexOf(bot.config.prefix) !== 0) {
        console.log("\x1b[47m\x1b[30m\x1b[1m[#" + message.channel.name + "]\x1b[0m \x1b[1m" + message.author.tag + ":\x1b[0m " + message.content);
    } else {
        console.log("\x1b[43m\x1b[30m[#" + message.channel.name + "] " + message.author.tag + ":\x1b[0m " + message.content);
    }

    FUNCTIONS.addMsgCount();

    const args = message.content.slice(bot.config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    const cmd = bot.commands.get(command);

    if (!cmd) return;

    cmd.run(bot, message, args);
};