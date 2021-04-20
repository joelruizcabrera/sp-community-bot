const FUNCTIONS = require('../functions');

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

    if (args[0] == "" || args[1] == "") {
        return message.reply("Bitte gib ein valides Argument an");
    }

    if (args[0] == "remove") {
        const removeMod = message.mentions.members.first();
        removeMod.roles.remove(modRole);

        FUNCTIONS.conLink("DELETE FROM sp_mods WHERE admin_dsc_id = " + removeMod.user.id);
    }
    if (args[0] == "add") {
        const removeMod = message.mentions.members.first();
        removeMod.roles.add(modRole);

        FUNCTIONS.conLink("INSERT INTO sp_mods (admin_dsc_id) VALUES (" + removeMod.user.id + ")");
    }
};