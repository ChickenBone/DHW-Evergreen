const Discord = require("discord.js")
exports.run = (client, message, args) => {
        const moment = require("moment");
        let user;
        
          if (message.mentions.users.first()) {
            user = message.mentions.users.first();
          } else {
              user = message.author;
          }
          const member = message.guild.member(user);
          const embed = new Discord.RichEmbed()
          .setColor("#00ff00")
          .setThumbnail(user.avatarURL)
          .setTitle(`${user.username}#${user.discriminator}`)
          .addField("ID:", `${user.id}`, true)
          .addField("Nickname:", `${member.nickname !== null ? `${member.nickname}` : 'none'}`, true)
          .addField("Created At:", `${moment.utc(user.createdAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`, true)
          .addField("Joined Server:", `${moment.utc(member.joinedAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`, true)
          .addField("Bot:", `${user.bot}`, true)
          .addField("Status:", `${user.presence.status}`, true)
          .addField("Game:", `${user.presence.game ? user.presence.game.name : 'none'}`, true)
          .addField("Roles:", member.roles.map(roles => `${roles.name}`).join(' | '), true)
           message.channel.send({embed});
}

exports.cmdConfig = {
    name: "info",
    aliases: [],
    description: "Gets User Info",
    usage: "info <user>",
    type: "mod"
  };
  