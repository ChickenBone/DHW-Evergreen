const serverHandler = require('../util/ServerHandler.js')
const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  let hasPermission = message.member.hasPermission("ADMINISTRATOR");
  if (hasPermission === false) return message.channel.send('You do not have permission.');
                serverHandler.setprefix(message.guild.id, args[0])
                let psd = new Discord.RichEmbed()
                .setTitle(`Success!`)
                .setDescription(`All changes have been applied.`)
                message.channel.send(psd)
  };
  
  exports.cmdConfig = {
    name: "prefix",
    aliases: ['prefix'],
    description: "Sets the serverwide prefix",
    usage: "prefix [prefix]",
    type: "admin"
  };