const Discord = require("discord.js")
exports.run = async (client, message, args) => {
    let muterole = message.guild.roles.find(`name`, "mute");
    let user = message.mentions.users.first()
    if(!muterole){
      try{
        muterole = await message.guild.createRole({
          name: "mute",
          color: "#00ff00",
          permissions:[]
        })
        message.guild.channels.forEach(async (channel, id) => {
          await channel.overwritePermissions(muterole, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false
          });
        });
      }catch(e){
        console.log(e.stack);
      }
    }
    try{
    message.mentions.members.first().addRole(message.guild.roles.find("name", "mute") )
    const embed = new Discord.RichEmbed()
    .setColor("#00ff00")
    .setTitle(`Mute Successful`)
    .addField("User Muted:",`${user.username}#${user.discriminator}`, true)
     message.channel.send({embed});
    }catch(e){
        console.log(e)
        const embed = new Discord.RichEmbed()
        .setColor("#ff0000")
        .setTitle(`Mute FAILED`)
        .addField("User:",`${user.username}#${user.discriminator}`, true)
         message.channel.send({embed});
    }

}

exports.cmdConfig = {
    name: "mute",
    aliases: [],
    description: "Mutes the selected user until unmuted",
    usage: "mute <user>",
    type: "mod"
  };
  