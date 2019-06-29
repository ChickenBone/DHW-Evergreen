const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
    let hasPermission = message.member.hasPermission("MANAGE_MESSAGES");
    if (hasPermission === false) return message.channel.send('You do not have permission.');
    if (args[0] == "") return message.channel.send('**Please provide a valid amount of messages to purge.**');
    if (args[0] > 100) return message.channel.send('**Please supply a number less than 100.**');
     message.channel.bulkDelete(args[0])
    .then(messages => message.channel.send(`**Successfully deleted \`${messages.size}/${args[0]}\` messages in ${message.channel}**`).then(msg => msg.delete({
      timeout: 1000000
    }))) 
}

exports.cmdConfig = {
  name: "purge",
  aliases: ['clear', 'prune'],
  description: "Deletes [number] messages from the current channel",
  usage: "clear [number]",
  type: "mod"
};