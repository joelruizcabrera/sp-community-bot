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

    if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
        return message.reply("");
    }

    if (args[0] == "" || args[1] == "") {
        return message.reply("Bitte gib ein valides Argument an");
    }

    if (args[0] == "remove") {
        const removeMod = message.mentions.members.first();
        removeMod.roles.remove(modRole);

        bot.users.cache.get(removeMod.user.id).send("Hallo <@" + removeMod.user.id + ">! Dir wurde der **MOD** Rang entnommen.\nDanke das du das Team und den Server mit deiner Arbeit bereichert hast!\n\nDein SP Community Team");

        FUNCTIONS.addRemMod("DELETE FROM sp_mods WHERE admin_dsc_id = " + removeMod.user.id, message.author.name, removeMod.user.id, "entnommen");
    }
    if (args[0] == "add") {
        const addMod = message.mentions.members.first();
        addMod.roles.add(modRole);

        bot.users.cache.get(addMod.user.id).send("Hallo <@" + addMod.user.id + ">! Dir wurde der **MOD** Rang zugewiesen. \nBitte nutze deine Rechte auf dem Server nicht aus.\nFalls du Fragen hast, melde dich gerne bei den anderen Moderatoren!\n\nWillkommen im Team!");

        FUNCTIONS.addRemMod("INSERT INTO sp_mods (admin_dsc_id) VALUES (" + addMod.user.id + ")", message.author.name, addMod.user.id, "zugewiesen");
    }
};