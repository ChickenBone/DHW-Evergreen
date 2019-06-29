const serverHandler = require('../util/ServerHandler.js')
const Discord = require("discord.js");

exports.run = async (client, message, args) => {
    let hasPermission = message.member.hasPermission("ADMINISTRATOR");
    if (hasPermission === false) return message.channel.send('You do not have permission.');
    var one = args[0].replace('<','')
    var two = one.replace('#','')
    var three = two.replace('>','')
    serverHandler.setlogchannel(message.guild.id, three)
    let psd = new Discord.RichEmbed()
    .setTitle(`Success!`)
    .setDescription(`Log Channel Set!`)
    message.channel.send(psd)
  };
  
  exports.cmdConfig = {
    name: "logchannel",
    aliases: ['logchannel'],
    description: "Sets the serverwide logchannel",
    usage: "logchannel [logchannel]",
    type: "admin"
  };