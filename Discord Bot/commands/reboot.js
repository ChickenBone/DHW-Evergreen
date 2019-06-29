/*
    ONLY FOR OUR ID's!!!
*/
exports.run = async (client, message) => {
    if (message.author.id == "203402349975175169" || message.author.id == "345713912945180674" || message.author.id == "140548909314342912") {
        await message.channel.send("Bot is restarting.");
        client.commands.forEach(async cmd => {
            await client.unloadCommand(cmd);
        });
        process.exit(1);
    } else {
        await message.channel.send("Hey you cant do that!");
    }
};

exports.cmdConfig = {
    name: "reboot",
    aliases: ['restart'],
    description: "Turns off the bot.",
    usage: "reboot",
    type: "hidden"
};
