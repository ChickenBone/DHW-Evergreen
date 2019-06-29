// const Discord = require("discord.js");
// /*
//     NO LONGER NEEDED 6/28/19
//     Big Boy Settings Command
//     Gonna be an absolute legond
// */
// const serverHandler = require('../util/ServerHandler.js')
// module.exports.run = async (client, message, args) => {
//     let hasPermission = message.member.hasPermission("ADMINISTRATOR");
//     if (hasPermission === false) return message.channel.send('You do not have permission.');
//     if (args.length == 0) {
//         try {
//             var json;
//             await serverHandler.getsettings(message.guild.id, function readFileCallback(json) {
//                 var keys = Object.keys(json); 
//                 let embed = new Discord.RichEmbed()
//                     .setTitle("Server Settings")
//                     .setColor("#00ff00");
//                 for (var i = 0; i < keys.length; i++) {
//                     var key = keys[i];
//                     embed.addField(key, json[key])
//                 }
//                 embed.setFooter("Evergreen")
//                 message.channel.send(embed);
//             });
//         } catch (e) { console.log("Error: " + e) }
//     }else{
//         if(args.length > 5){
//             let ds = new Discord.RichEmbed()
//             .setTitle 
//             message.channel.send("Incorrect syntax! Use **e!settings help** for more info")
//         }else if(args.length == 1 && args[0] == "help"){
//             let embed = new Discord.RichEmbed()
//             .setTitle("Server Settings Help")
//             .setColor("#00ff00")
//             .addField("set", "Set a setting value, ex. e!settings set captcha true")
//             .addField("command", "Syntax e!settings command <add/remove> <command> <resp>")
//             .setFooter("Evergreen")
//             message.channel.send(embed);
//         }else if(args.length == 2){
//             if(args[0] == "prefix"){
//                 serverHandler.setprefix(message.guild.id, args[1])
//                 let psd = new Discord.RichEmbed()
//                 .setTitle(`Success!`)
//                 .setDescription(`All changes have been applied.`)
//                 message.channel.send(psd)
//             }
//             if(args[0] == "logchannel"){

//             }
//         }else if(args.length == 3){
//             if(args[0] == "set"){
//                 serverHandler.addsettings(message.guild.id, args[1], args[2])
//                 let psd = new Discord.RichEmbed()
//                 .setTitle(`Success!`)
//                 .setDescription(`All changes have been applied.`)
//                 message.channel.send(psd)
//             }
//         }else if(args.length > 4){
//             if(args[0] == "command"){
//                 if(args[1] = "add"){
//                     let psd = new Discord.RichEmbed()
//                     .setTitle(`Success!`)
//                     .setDescription(`All changes have been applied.`)
//                     message.channel.send(psd)
//                 }
//             }
//         }
//     }
// }

// module.exports.cmdConfig = {
//     name: "settings",
//     aliases: ["s"],
//     description: "Settings command, use e!settings help for more information",
//     usage: "settings <setting> <value>",
//     type: "admin"
// }

// NO LONGER NEEDED