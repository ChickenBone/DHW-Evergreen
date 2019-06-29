const Discord = require("discord.js");
const ecohandler = require("../util/EconomyHandler");

function askForValue(message,args) {
    message.reply("please message a price value within 30 seconds.");
    let collector = new Discord.MessageCollector(message.channel,msg=>msg.author.id==message.author.id,{time: 30000});
    collector.on("collect",(msg)=>{
        if(!isNaN(Number(msg))) {
            let val = Number(msg);
            collector.stop("Found Price.")
            message.reply("please message a description within 30 seconds.");
            let collect = new Discord.MessageCollector(message.channel,msg=>msg.author.id==message.author.id,{time: 30000});
            collect.on("collect",(msg)=>{
                let desc = msg;
                collect.stop("Found Description")
                askForConfirmation(message,args.join(" "),val,desc);
            })
        } else {
            collector.stop();
            message.channel.send("That's not a number! Please try again.")
        }
    });
}

function askForConfirmation(message,name,val,desc) {
    let embed = new Discord.RichEmbed()
    .setTitle("Please verify the following:")
    .addField("Name",name)
    .addField("Price",val)
    .addField("Description",desc)
    .setFooter("Is this correct?\nType yes or no to confirm that you would like to add this item to the store.")
    message.channel.send(embed);
    let confirm = new Discord.MessageCollector(message.channel,msg=>msg.author.id==message.author.id,{time: 10000});
    confirm.on("collect",(msg)=>{
        if(msg.content == "yes") {
            confirm.stop("Yes")
            let dasd = new Discord.RichEmbed()
            .setTitle(`Success!`)
            .setDescription(`You have successfully added an item to your server's store!\n\nView your store by typing **e!store**.\n\nTo add another item to your server's store, type **e!additem <item name>** to begin the process again!`)
            message.channel.send(dasd);
            ecohandler.addStoreItem(name,desc,val,message.guild.id);
        } else {
            confirm.stop("No")
            let dasd = new Discord.RichEmbed()
            .setTitle(`Cancelled`)
            .setDescription(`The process was cancelled, please type **e!additem <item>** to begin the process again!`)
            message.channel.send(dasd)
        }
    })
}

module.exports.run = async (client,message,args) => {
    if(args=="") return message.channel.send("Specify an item name.");
    askForValue(message,args);
}

module.exports.cmdConfig = {
    name: "additem",
    aliases: [],
    description: "Adds a Store Item",
    usage: "additem <item>",
    type: "mod"
}
