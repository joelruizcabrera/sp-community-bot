exports.run = (bot, message, [mention, ...reason]) => {
    if (message.member.hasPermission("BAN_MEMBERS")) {

        if (message.mentions.members.size === 0)
            return message.reply("Bitte erwähne einen Benutzer");

        if (message.mentions.members.first()) {
            try {
                message.mentions.members.first().ban();
            } catch {
                message.reply("I do not have permissions to ban" + message.mentions.members.first());
            }
        } else {
            message.reply("You do not have permissions to ban" + message.mentions.members.first());
        }
    }
};