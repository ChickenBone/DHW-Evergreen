const Discord = require("discord.js");
const serversettings = require("./ServerHandler.js");
const fs = require("fs")
var stringSimilarity = require('string-similarity');

const emojis = [
    "🍇",
    "🍉",
    "🥔",
    "🍞",
    "🍔",
    "🥓",
    "🍭",
    "🥄",
]
const names = [
    "grapes",
    "watermelon",
    "potato",
    "bread",
    "hamburger",
    "bacon",
    "lollipop",
    "spoon",
]
module.exports.onJoin = async (user, client) => {
    serversettings.getcaptcha(user.guild.id, function (data) {
        if (data == "true") {
            mute(true,user,client)
            captcha(user, client)
            
        }
    })
};
async function mute(bool,user,client){
    let muterole = user.guild.roles.find(`name`, "captcha");
    if(!muterole){
      try{
        muterole = await user.guild.createRole({
          name: "captcha",
          color: "#000000",
          permissions:[]
        })
        user.guild.channels.forEach(async (channel, id) => {
          await channel.overwritePermissions(muterole, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false,
            READ_MESSAGE_HISTORY: false,
            VIEW_CHANNEL: false
          });
        });
      }catch(e){
        console.log(e.stack);
      }
    }
    if(bool){
        user.addRole(user.guild.roles.find(role => role.name === "captcha"));
    }else{
        user.removeRole(user.guild.roles.find(role => role.name === "captcha"));
    }
}
function captcha(user, client) {
    var nums = []
    let embed = new Discord.RichEmbed()
        .setTitle("Captcha Verficication")
        .setColor("0000ff")
        .addField("Welcome!", "The Owner of this server has enabled captcha verification for this server! in order to prove that you are not a robot, please respond or react to this messsage with these selected emoji's or their respective text", true)
    var rmemoji = Math.floor(Math.random() * emojis.length);
    nums.push(rmemoji);
    embed.addField(emojis[rmemoji], names[rmemoji])
    var rmemoji = Math.floor(Math.random() * emojis.length);
    nums.push(rmemoji);
    embed.addField(emojis[rmemoji], names[rmemoji])
    var rmemoji = Math.floor(Math.random() * emojis.length);
    nums.push(rmemoji);
    embed.addField(emojis[rmemoji], names[rmemoji])
    var rmemoji = Math.floor(Math.random() * emojis.length);
    nums.push(rmemoji);
    embed.addField(emojis[rmemoji], names[rmemoji])
    var rmemoji = Math.floor(Math.random() * emojis.length);
    nums.push(rmemoji);
    embed.addField(emojis[rmemoji], names[rmemoji])
    embed.setFooter("Created at: " + user.joinedAt)
    user.send(embed)
        .then((newmsg) => {
            setTimeout(function () {
                newmsg.channel.awaitMessages(response => response.content, {
                    max: 1,
                    time: 20000,
                })
                    .then((collected) => {
                        resp = collected.first().content
                        var correct = ""
                        var correct2 = ""
                        var correct3 = ""

                        for (var i = 0; i < nums.length; i++) {
                            correct += names[nums[i]] + " "
                        }
                        for (var i = 0; i < nums.length; i++) {
                            correct2 += emojis[nums[i]] + " "
                        }
                        for (var i = 0; i < nums.length; i++) {
                            correct3 += ":" + names[nums[i]] + ":" + " "
                        }
                        if (stringSimilarity.compareTwoStrings(resp, correct) >= 0.8 || stringSimilarity.compareTwoStrings(resp, correct2) >= 0.8 ||
                            stringSimilarity.compareTwoStrings(resp, correct3) >= 0.8 || stringSimilarity.compareTwoStrings(resp, correct2.replace(" ", "")) >= 0.8 ||
                            stringSimilarity.compareTwoStrings(resp, correct3.replace(" ", "")) >= 0.8) {
                                let lmg = new Discord.RichEmbed()
                            .setTitle(`Captcha Successful!`)
                            .setDescription(`You can now chat with others!`)
                            .setColor(`#00ff00`)
                            newmsg.channel.send(lmg)
                            mute(false,user,client)
                        } else {
                            let lmg = new Discord.RichEmbed()
                            .setTitle(`Captcha Unsuccessful!`)
                            .setDescription(`Please try again!`)
                            .setColor(`#00ff00`)
                            newmsg.channel.send(lmg)
                            captcha(user,client)
                        }
                    })
            })
        })

}
