const Discord = require("discord.js");
const serversettings = require("./ServerHandler.js");
const fs= require("fs")
var member;
const joinmsg = [
    `✔️ Who eats grilled lettuce? username surely doesn't.`,
    `✔️ Do you know the way? username knows it for sure.`,
    `✔️ username joined the fam.`,
    `✔️ Hotel? Trivago. New member? username .`,
    `✔️ username got magnetized in by Butter's handsomeness... yeah, that.`,
    `✔️ username is strong. How strong? Eats spikes for breakfast. Without milk.`,
    `✔️ username : Alexa, take me to the best Discord server. Alexa: Say no more.`
]
const leavemsg = [
    `:x: username ate too many burgers. Had to go.`,
    `:x: username 's phone got eaten by their dog.`,
    `:x: username stole a wumpus from Discord's headquarters and got arrested.`,
    `:x: username raged and smashed his computer.`,
    `:x: username ditched Minecraft for Candy Crush.`,
    `:x: username got caught dipping cookies in orangeade.`,
    `:x: username got caught cutting his pizza into squares.`
]

module.exports.onMemberJoin = async (memberorg, client) => {
    member = memberorg.user.tag
    let embed = new Discord.RichEmbed()
        .setColor("#00ff00")
        .addField("Member Joined", joinmsg[Math.floor(Math.random() * joinmsg.length)].replace("username", member))
        .setThumbnail(memberorg.user.avatarURL)
        .setFooter("Joined at: " + memberorg.joinedAt);
    try {
        return serversettings.getlogchannel(memberorg.guild.id, function callbackchid(id) { try{client.channels.get(id).send(embed)}catch(err) { if (err) console.log(err); memberorg.guild.channels.first.send("Unable to find the logs channel.") } });
    } catch (err) {
        if (err) console.log(err); memberorg.guild.channels.first().send("Unable to find the logs channel.")
        return;
    }
}
module.exports.onMemberLeave = async (memberorg, client) => {
    member = memberorg.user.tag
    let embed = new Discord.RichEmbed()
        .setColor("#ff0000") //hex codes are 6 digits or 3 your choice or 9 lol lmao ye
        .addField("Member Left", leavemsg[Math.floor(Math.random() * leavemsg.length)].replace("username", member))
        .setThumbnail(memberorg.user.avatarURL)
        .setFooter("Member since: " + (memberorg.joinedAt))
    try {
        return serversettings.getlogchannel(memberorg.guild.id, function callbackchid(id) { try{ client.channels.get(id).send(embed)}catch(err) { if (err) console.log(err); memberorg.guild.channels.first.send("Unable to find the logs channel.") } });
    } catch (err) {
        if (err) console.log(err); memberorg.guild.channels.first().send("Unable to find the logs channel.")
        return;
    }

}

module.exports.onMemberUpdate = async (oldmember, newmember, client) => {

    let embed = new Discord.RichEmbed()
        .setTitle("Member Updated")
        .setColor("#0000ff")
        .addField("Old Roles", oldmember.roles.map(r => `${r}`).join(' | '), true)
        .addField("New Roles", newmember.roles.map(r => `${r}`).join(' | '), true)
        .addField("Old Nickname", oldmember.nickname == "" ? "none" : oldmember.nickname, true)
        .addField("New Nickname", newmember.nickname == "" ? "none" : newmember.nickname, true)
        .setThumbnail(oldmember.user.avatarURL)
    try {
        return serversettings.getlogchannel(oldmember.guild.id, function callbackchid(id) { try{ client.channels.get(id).send(embed)}catch(err) { if (err) console.log(err); oldmember.guild.channels.first.send("Unable to find the logs channel.") } });
    } catch (err) {
        if (err) console.log(err); oldmember.guild.channels.first().send("Unable to find the logs channel.")
        return;
    }
}

module.exports.onGuildAdd = async (guild, client) => {
    serversettings.createserver(guild.id, guild, client);
}

module.exports.onGuildRemove = async (guild, client) => {
    serversettings.removeserver(guild.id);
}
module.exports.onMessageDelete = async (message, client) => {
    let embed = new Discord.RichEmbed()
        .setTitle("Message Deleted")
        .setColor("#ff0000")
        .addField("Message", (message.content == "" ? "none" : message.content), true)
        .addField("User", (message.author.tag == "" ? "none" : message.author.tag), true)
        .setThumbnail(client.user.avatarURL)
    try {
        return serversettings.getlogchannel(message.guild.id, function callbackchid(id) { try{client.channels.get(id).send(embed)}catch(err) { if (err) console.log(err); message.guild.channels.first.send("Unable to find the logs channel.") } });
    } catch (err) {
        if (err) console.log(err); message.guild.channels.first().send("Unable to find the logs channel.")
        return;
    }
}
module.exports.onChannelCreate = async (channel, client) => {
    let embed = new Discord.RichEmbed()
        .setTitle("Channel Created")
        .setColor("#00ff00")
        .addField("Channel Name", channel.name)
        .addField("Channel Type", channel.type)
        .addField("Category", channel.parent.name)
        .setFooter("Created at: " + channel.createdAt)
    try {
        return serversettings.getlogchannel(channel.guild.id, function callbackchid(id) { try{client.channels.get(id).send(embed)}catch(err) { if (err) console.log(err); channel.guild.channels.first.send("Unable to find the logs channel.") } });
    } catch (err) {
        if (err) console.log(err); channel.guild.channels.first().send("Unable to find the logs channel.")
        return;
    }
}

module.exports.onChannelDelete = async (channel, client) => {
    let embed = new Discord.RichEmbed()
        .setTitle("Channel Deleted")
        .setColor("#ff0000")
        .addField("Channel Name", channel.name)
        .addField("Channel Type", channel.type)
        .addField("Category", channel.parent.name)
        .setFooter("Channel since: " + channel.createdAt)
    try {
        return serversettings.getlogchannel(channel.guild.id, function callbackchid(id) { try{client.channels.get(id).send(embed)}catch(err) { if (err) console.log(err); channel.guild.channels.first.send("Unable to find the logs channel.") } });
    } catch (err) {
        if (err) console.log(err); channel.guild.channels.first().send("Unable to find the logs channel.")
        return;
    }
}

module.exports.onChannelUpdate = async (oldchannel, newchannel, client) => {
    // NOT WORKING 6/28/2019
    // let embed = new Discord.RichEmbed()
    //     .setTitle("Channel Updated")
    //     .setColor("#0000ff")
    //     .addField("Old Channel Name", oldchannel.name, true)
    //     .addField("\nOld Channel Type", oldchannel.type, true)
    //     .addField("New Channel Type", newchannel.type, true)
    //     .addField("\nOld Channel Category", oldchannel.parent.name, true)
    //     .addField("New Channel Name", newchannel.name, true)
    //     .addField("New Channel Category", newchannel.parent.name, true)
    //     .setFooter("Created at: " + oldchannel.createdAt)
    // try {
    //     return serversettings.getlogchannel(oldchannel.guild.id, function callbackchid(id) { try{client.channels.get(id).send(embed)}catch(err){ if (err) console.log(err); oldchannel.guild.channels.first.send("Unable to find the logs channel.") } });
    // } catch (err) {
    //     if (err) console.log(err); oldchannel.guild.channels.first().send("Unable to find the logs channel.")
    //     return;
    // }
}
module.exports.onRoleCreate = async (role, client) => {
    let embed = new Discord.RichEmbed()
        .setTitle("Role Created")
        .setColor("#00ff00")
        .addField("Role Name", role.name)
        .addField("Role Permissions", role.permissions)
        .addField("Is Hoisted", role.hoist)
        .setFooter("Created at: " + role.createdAt)
    try {
        serversettings.getlogchannel(role.guild.id, function callbackchid(id) { client.channels.get(id).send(embed) })
        return;
    } catch (err) {
        if (err) console.log(err); role.guild.channels.first().send("Unable to find the logs channel.")
        return;
    }
}

module.exports.onRoleDelete = async (role, client) => {
    let embed = new Discord.RichEmbed()
        .setTitle("Role Deleted")
        .setColor("#ff0000")
        .addField("Role Name", role.name)
        .setFooter("Role since: " + role.createdAt)
    try {
        return serversettings.getlogchannel(role.guild.id, function callbackchid(id) { try{ client.channels.get(id).send(embed)}catch(err){ if (err) console.log(err); role.guild.channels.first.send("Unable to find the logs channel.") } });
    } catch (err) {
        if (err) console.log(err); role.guild.channels.first().send("Unable to find the logs channel.")
        return;
    }
}

module.exports.onRoleUpdate = async (oldrole, newrole, client) => {
    let embed = new Discord.RichEmbed()
        .setTitle("Role Updated")
        .setColor("0000ff")
        .addField("Old Role Name", oldrole.map(r => `${r}`).join(' | '), true)
        .addField("New Role Name", newrole.map(r => `${r}`).join(' | '), true)
        .addField("Old Role Permissions", oldrole.permissions, true)
        .addField("New Role Permissions", newrole.permissions, true)
        .setFooter("Created at: " + olrole.createdAt)
    try {
        return serversettings.getlogchannel(oldrole.guild.id, function callbackchid(id) { try{client.channels.get(id).send(embed)}catch(err){ if (err) console.log(err); oldrole.guild.channels.first.send("Unable to find the logs channel.") } })
    } catch (err) {
        if (err) console.log(err); oldrole.guild.channels.first().send("Unable to find the logs channel.")
        return;
    }
};
