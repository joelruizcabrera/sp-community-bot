const FUNCTIONS = require('../functions');

exports.run = (bot, message, args) => {
    const modRole = message.guild.roles.cache.find(role => role.name === "Mod");

    if (!modRole) {
        return console.log("The Mods role does not exist");
    }

    if (!message.member.roles.cache.has(modRole.id)) {
        return message.reply("Du kannst diesen Befehl nicht ausführen");
    }

    if (args[0] == "" || args[1] == "") {
        return message.reply("Bitte gib ein valides Argument an");
    }

    if (args[0] == "change") {
        bot.user.setActivity(message.content.slice(12, 0), { type: 'PLAYING' });
        console.log("\x1b[42m\x1b[30m" + message.author.tag + "\x1b[0m\x1b[42m\x1b[30m Hat die Aktivität des Bots geändert\x1b[0m");
    }
};