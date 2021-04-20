exports.run = (bot, message, args) => {
    const modRole = message.guild.roles.cache.find(role => role.name === "Mod");

    if (!modRole) {
        return console.log("The Mods role does not exist");
    }

    if (!message.member.roles.cache.has(modRole.id)) {
        return message.reply("Du kannst diesen Befehl nicht ausführen");
    }

    if (args[0] == "change") {
        bot.user.setActivity(message.content.slice(13), { type: 'PLAYING' });
        console.log("\x1b[42m\x1b[30m" + message.author.tag + "\x1b[0m\x1b[42m\x1b[30m Hat die Aktivität des Bots zu '" + message.content.slice(13) + "' geändert\x1b[0m");
    }
};