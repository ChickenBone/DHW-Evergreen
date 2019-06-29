const Discord = require('discord.js');

exports.run = (client, message, [mentionSpace, ...reason]) => {
    let hasPermission = message.member.hasPermission("BAN_MEMBERS");
    if (hasPermission === false) return message.channel.send('You do not have permission.');
    let user = message.mentions.users.first();
    if (message.mentions.users.size < 1) return message.channel.send('You must mention someone to ban them');
    reason = reason.join(' ');
    if (!reason) reason = "/flip";
    if (!message.guild.member(user).bannable) return message.channel.send('I cannot ban that member');
    message.guild.ban(user, 2);
    const Embed = new Discord.RichEmbed()
        .setColor("#ff0000")
        .setThumbnail(user.avatarURL)
        .setTimestamp()
        .addField('Action: ban', `User: ${user.username}#${user.discriminator} (${user.id})\nModrator: ${message.author.username}#${message.author.discriminator} (${message.author.id})\nReason: ${reason}`);
    return message.guild.channels.find(channel => channel.name === 'logs').send(Embed);
};

exports.cmdConfig = {
    name: "ban",
    aliases: [],
    description: "Bans the mentioned user and deletes their messages from the last 2 days.",
    usage: "Ban <@user> [reason]",
    type: "admin"
};
