exports.run = (bot, message, args) => {
    const modRole = message.guild.roles.cache.find(role => role.name === "Mod");

    if (!modRole) {
        return console.log("The Mods role does not exist");
    }

    if (!message.member.roles.cache.has(modRole.id)) {
        return message.reply("Du kannst diesen Befehl nicht ausführen");
    }

    if (message.mentions.members.size === 0) {
        return message.reply("Bitte erwähne einen Benutzer");
    }

    if (!message.guild.me.hasPermission("KICK_MEMBERS")) {
        return message.reply("");
    }

    if (args[0] == "remove") {
        let remMod = args[1];
        console.log(remMod);
    }

    const removeMod = message.mentions.members.first();
    removeMod.roles.remove(modRole);
};