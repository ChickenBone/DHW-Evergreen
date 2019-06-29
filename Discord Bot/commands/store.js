const Discord = require("discord.js");
const ecohandler = require("../util/EconomyHandler");

module.exports.run = async (client,message,args) => {
    let embed = new Discord.RichEmbed()
    .setTitle(`${message.guild.name}'s store`)
    .setColor("#00ffff")
    .setFooter(`Guild: ` + message.guild.name);
    let str = "";
    let items = ecohandler.getStoreItems(message.guild.id)
    for(item in items) {
        str += item+" - $"+items[item].value+" for 1\n"
    }
    if(str=="") str = "This place looks empty, add some items to your server store!\n\nTo start adding items to the server's store, type **e!additem <item>** to begin the automated process!"
    embed.addField("Items",str);
    embed.setDescription("For more information on an item, type **e!store <item>**.");
    if(args=="") {
        message.channel.send(embed)
    } else {
        for(item in items) {
            if(args.join(" ").toLowerCase()==item.toLowerCase()) {
                let embed = new Discord.RichEmbed()
                .setTitle("Items")
                .setColor("00ffff")
                .addField(item,"Value: "+items[item].value+"\nDescription:\n"+items[item].description);
                message.channel.send(embed);
            }
        }
    }
}
module.exports.cmdConfig = {
    name: "store",
    aliases: ['shop'],
    description: "Displays the Store",
    usage: "e!store",
    type: "core"
}