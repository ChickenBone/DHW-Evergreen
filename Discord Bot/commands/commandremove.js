const serverHandler = require('../util/ServerHandler.js')
const Discord = require("discord.js");

exports.run = async (client, message, args) => {
    let hasPermission = message.member.hasPermission("ADMINISTRATOR");
    if (hasPermission === false) return message.channel.send('You do not have permission.');
    serverHandler.getprefix(message.guild.id, function callbackprefix(pre) {
    serverHandler.removecommand(message.guild.id, args[0])
    let psd = new Discord.RichEmbed()
    .setTitle(`Success!`)
    .setDescription(`Command Removed!`)
    message.channel.send(psd)
    });
  };
  
  exports.cmdConfig = {
    name: "cmdremove",
    aliases: [],
    description: "Adds a custom server command",
    usage: "cmdremove [cmdname] <Response Text>",
    type: "admin"
  };