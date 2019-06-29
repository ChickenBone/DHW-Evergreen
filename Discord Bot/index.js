/*
 * Evergreen DISCORD BOT
 */

// Required modules
const Discord = require("discord.js");
const fs = require("fs");
const eventhandler = require("./util/EventHandler.js");
const serverhandler = require("./util/ServerHandler.js")
//npm install discord.js
//install.

const client = new Discord.Client();
client.commands = new Discord.Collection();
client.commands.aliases = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
    if (err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() == "js");
    if (jsfile.length <= 0) {
        return console.log("Error: Could not find any commands in directory \"./commands\".");  //hello?
    }
    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`Command ${f} is loaded`);
        client.commands.set(props.cmdConfig.name.toLowerCase(), props);
        props.cmdConfig.aliases.forEach(alias => {
            client.commands.aliases.set(alias, props.cmdConfig.name);
        });
    })
})

client.on("ready", async () => {

    setInterval(() => {
        client.user.setPresence({ game: { name: client.guilds.size+" servers | mintdev.co/evergreen", type: 3 }, status: 'avaliable' })
    },10000)
});

client.on("guildMemberAdd", async (member) => {if(member.id != "592784915020513282"){ eventhandler.onMemberJoin(member, client); require("./util/CaptchaHandler.js").onJoin(member,client); }});
client.on("guildMemberRemove", async (member) => { if(member.id != "592784915020513282"){eventhandler.onMemberLeave(member, client)} });
client.on("guildMemberUpdate", async (oldmember, newmember) => {if(oldmember.id != "592784915020513282"){ eventhandler.onMemberUpdate(oldmember, newmember, client) }})
client.on("channelCreate", async (channel) => { eventhandler.onChannelCreate(channel, client) });
client.on("channelDelete", async (channel) => { eventhandler.onChannelDelete(channel, client) });
client.on("channelUpdate", async (oldchannel, newchannel) => { eventhandler.onChannelUpdate(oldchannel, newchannel, client) });
client.on("roleCreate", async (role) => { eventhandler.onRoleCreate(role, client) });
client.on("roleDelete", async (role) => { eventhandler.onRoleDelete(role, client) });
client.on("roleUpdate", async (oldrole, newrole) => { eventhandler.onRoleUpdate(oldrole, newrole, client) });
client.on("guildCreate", async (guild) => { eventhandler.onGuildAdd(guild, client) });
client.on("guildDelete", async (guild) => { eventhandler.onGuildRemove(guild, client) })
client.on("messageDelete", (messageDelete) => {serverhandler.getprefix(messageDelete.guild.id, function callbackprefix(pre) { if(messageDelete.content.includes(pre+"poll ") || messageDelete.content.includes(pre+"createpoll ") || messageDelete.content.includes(pre+"p ")){}else{eventhandler.onMessageDelete(messageDelete, client) }})})

client.on("message", async message => {
    if (message.channel.type == "dm") return;
    if (message.author.bot) return;
    /* 
        Custom Command Code Start
    */
    serverhandler.getcommands(message.guild.id, function callback(data) {
        serverhandler.getprefix(message.guild.id, function callbackprefix(pre) {
            var keys = Object.keys(data);
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                if (message.content == pre + key) {
                    message.channel.send(data[key])
                    return;
                }
            }
            /* 
                Custom Command Code Stop
            */
            let prefix = pre;
            const args = message.content.slice(prefix).trim().split(/ +/g);
            const command = args.shift().toLowerCase();
            const cmd = client.commands.get(command.slice(prefix.length)) || client.commands.get(client.commands.aliases.get(command.slice(prefix.length)));
            if (command.slice(0, prefix.length) != prefix) return;
            if (!cmd) return message.channel.send("Command not found.");
            cmd.run(client, message, args);
        })
    })

});

/*
    NO PREFIX ON FUN COMMANDS FYI
*/
client.on("message", async message => {
    if (message.content == "👁👄👁") {
        message.channel.send(":eyes:\n:lips:")
    }

    // The Past Tense Of Yeet Is Yote
    if (message.content === "yeet") {
        let embedmsg = new Discord.RichEmbed()
            .setTitle(`no.`)
            .setColor("#00ffff")
        message.channel.send(embedmsg);
    }
});

client.login(""); // NO TOKEN WHILE PUSHING TO GITHUB!
