const Discord = require("discord.js")
const serverhandler = require("../util/ServerHandler.js")
exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Hey you cant do that!")
    if (args.length != 1) return message.channel.send("Incorrect syntax captcha <enable|disable>")
    if(args[0] == "enable"){
    await serverhandler.addsettings(message.guild.id, "captcha", "true");
    serverhandler.getcaptcha(message.guild.id, function(data){ 
            const embed = new Discord.RichEmbed()
            .setColor("#00ff00")
            .setTitle(`Captcha enabled!`)
             message.channel.send({embed});
    })
    }else if(args[0] == "disable"){
        await serverhandler.addsettings(message.guild.id, "captcha", "false");
        serverhandler.getcaptcha(message.guild.id, function(data){ 
                const embed = new Discord.RichEmbed()
                .setColor("#00ff00")
                .setTitle(`Captcha disabled!`)
                 message.channel.send({embed});
        })
    }else{
        const ls = new Discord.RichEmbed()
        .setColor("#00ff00")
        .setTitle(`Incorrect syntax!`)
        .setDescription(`Correct usage: `)
        message.channel.send("Incorrect syntax!\ncaptcha enable|disable")
    }
}

exports.cmdConfig = {
    name: "captcha",
    aliases: [],
    description: "Enables/Disables serverwide captcha",
    usage: "captcha <enable|disable>",
    type: "admin"
  };
  