const Discord = require("discord.js");
const ecohandler = require("../util/EconomyHandler.js");

module.exports.run = async (client,message,args) => {
    let amount = Number(args[0]);
    if(isNaN(amount)) return message.channel.send("Please specify an amount!");
    let item = args.slice(1).join(" ")
    ecohandler.buyStoreItem(item,message.author.id,message.guild.id,amount,message.channel)
}

module.exports.cmdConfig = {
    name: "buy",
    aliases: [],
    description: "Buys an item from the store",
    usage: "buy <amount> <item>",
    type: "core"
}