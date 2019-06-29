const Discord = require('discord.js');

exports.run = (client, message, args) => {
    let manageMessages = message.member.hasPermission("KICK_MEMBERS");
    if (manageMessages === false) return message.channel.send('You do not have permission.');
    let user = message.mentions.users.first();
    if (message.mentions.users.size < 1) return message.channel.send('You must mention someone to kick them');
    let reason = args.slice(1).join(' ');
    if (!reason) reason = "/flip";
    if (!message.guild.member(user).kickable) return message.channel.send('I cannot kick that member');
    message.guild.member(user).kick();
    const Embed = new Discord.RichEmbed()
        .setColor("#ff0000")
        .setThumbnail(user.avatarURL)
        .setTimestamp()
        .addField('Action: kick', `User: ${user.username}#${user.discriminator} (${user.id})\nModrator: ${message.author.username}#${message.author.discriminator} (${message.author.id})\nReason: ${reason}`);
    return message.guild.channels.find(channel => channel.name === 'logs').send(Embed);
};

exports.cmdConfig = {
    name: "kick",
    aliases: [],
    description: "Kicks the mentioned user.",
    usage: "kick <user> [reason]",
    type: "admin"
};
