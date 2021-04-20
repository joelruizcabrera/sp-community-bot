exports.run = (bot, msg, [mention, ...reason]) => {
    if (msg.member.hasPermission("BAN_MEMBERS")) {
        if (msg.members.mentions.first()) {
            try {
                msg.members.mentions.first().ban();
            } catch {
                msg.reply("I do not have permissions to ban" + msg.members.mentions.first());
            }
        } else {
            msg.reply("You do not have permissions to ban" + msg.members.mentions.first());
        }
    }
};