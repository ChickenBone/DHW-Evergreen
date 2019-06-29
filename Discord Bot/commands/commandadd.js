const serverHandler = require('../util/ServerHandler.js')
const Discord = require("discord.js");

exports.run = async (client, message, args) => {
    let hasPermission = message.member.hasPermission("ADMINISTRATOR");
    if (hasPermission === false) return message.channel.send('You do not have permission.');
    serverHandler.getprefix(message.guild.id, function callbackprefix(pre) {
    serverHandler.addcommand(message.guild.id, args[0], message.content.replace(pre+"cmdadd "+args[0]+" ", ""))
    let psd = new Discord.RichEmbed()
    .setTitle(`Success!`)
    .setDescription(`Command Added!`)
    message.channel.send(psd)
    });
  };
  
  exports.cmdConfig = {
    name: "cmdadd",
    aliases: [],
    description: "Adds a custom server command",
    usage: "cmdadd [cmdname] <Response Text>",
    type: "admin"
  };