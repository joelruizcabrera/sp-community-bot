module.exports = (bot, message) => {
    if (message.author.bot) return;

    console.log("[@" + message.channel.name + "] " + message.author.tag + ": " + message.content);

    if (message.content.indexOf(bot.config.prefix) !== 0) return;

    const args = message.content.slice(bot.config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    const cmd = bot.commands.get(command);

    if (!cmd) return;

    cmd.run(bot, message, args);
};