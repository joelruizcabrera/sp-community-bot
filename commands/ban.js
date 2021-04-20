exports.run = (bot, message, [mention, ...reason]) => {
    if (msg.member.hasPermission("BAN_MEMBERS")) {
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