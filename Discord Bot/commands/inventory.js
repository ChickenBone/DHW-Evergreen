const Discord = require("discord.js");
const ecohandler = require("../util/EconomyHandler.js");

module.exports.run = async (client,message,args) => {
    let userinv = ecohandler.getUserInfo(message.author.id,null,message.guild.id);
    let str = "";
    for(item in userinv["inventory"]) {
        str += item+" - x"+userinv["inventory"][item]+"\n"
    }
    if(str=="") str="None";
    let money = 0;
    if(userinv["money"]) money = userinv["money"];
    let embed = new Discord.RichEmbed()
    .setTitle(message.author.username+"'s inventory on "+message.guild.name)
    .setColor("#00ffff")
    .addField("Money",money)
    .addField("Items",str);
    message.channel.send(embed);
}

module.exports.cmdConfig = {
    name: "inventory",
    aliases: ["inv","i"],
    description: "Displays the user's inventory, stats, and cash.",
    usage: "inventory",
    type: "core"
}