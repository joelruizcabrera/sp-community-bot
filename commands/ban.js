exports.run = (bot, message, [mention, ...reason]) => {
    const modRole = message.guild.roles.cache.find(role => role.name === "Mod");
    if (!modRole)
        return console.log("The Mods role does not exist");

    if (!message.member.roles.cache.has(modRole.id))
        return message.reply("Du kannst diesen Befehl nicht ausführen");

    if (message.mentions.members.size === 0)
        return message.reply("Bitte erwähne einen Benutzer");

    if (!message.guild.me.hasPermission("BAN_MEMBERS"))
        return message.reply("");

    const kickMember = message.mentions.members.first();

    kickMember.ban(reason.join(" ")).then(member => {
        message.reply(`${member.user.username} was succesfully banned.`);
    });
};