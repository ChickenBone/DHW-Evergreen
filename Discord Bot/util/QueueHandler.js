const fs = require('fs');
const serversettings = require('../util/ServerHandler.js')
module.exports.createserver = async (guildid,guild,client) => {
    try {
        if (!checkserver(guildid)) {
            let channelID;
            let channels = guild.channels;
            channelLoop:
            for (let c of channels) {
                let channelType = c[1].type;
                if (channelType === "text") {
                    channelID = c[0];
                    break channelLoop;
                }
            }
            let channel = client.channels.get(guild.systemChannelID || channelID);
            var jsonobj = {
                serverid: guildid,
                users: {
                },
                time: 1,
                users: 5,
            }
            var json = JSON.stringify(jsonobj);
            fs.mkdir(`./storage/servers/${guildid}`);
            fs.writeFile(`./storage/servers/${guildid}/queue.json`, json, 'utf8', (error) => { console.log("Error Creating queue JSON: " + error) });
        }
    } catch (err) { console.log(err) }
}
module.exports.onJoin = async (user, client) => {
    serversettings.getqueue(user.guild.id, function (data) {
        if (data == "true") {
            if(getsize(user.guild.id) <= getmax(user.guild.id)){
                mute(true,user,client)
                user.send(`You are currently in a queue to join this server, you are number ${getsize(user.guild.id) + 1} in the queue! You will wait approx. ${(getsize(user.guild.id)/getmax(user.guild.id))*gettime(user.guild.id)} minutes`)
                i = 0;
                var int = setInterval(() => {
                    i++
                    if(i > 1){
                        clearInterval(int)
                    }
                }, gettime(user.guild.id)*6000);
                mute(false, user, client)
            }
        }
    })
};
function start(){

}
function getmax(guildid){
    fs.readFile(`./storage/servers/${guildid}/queue.json`, 'utf8', function readFileCallback(err, data) {
        if (err) { console.log(err); } else {
            obj = JSON.parse(data);
            return obj.users;
        }
    });
}
function gettime(guildid){
    fs.readFile(`./storage/servers/${guildid}/queue.json`, 'utf8', function readFileCallback(err, data) {
        if (err) { console.log(err); } else {
            obj = JSON.parse(data);
            return obj.time;
        }
    });
}
function getsize(guildid){
    fs.readFile(`./storage/servers/${guildid}/queue.json`, 'utf8', function readFileCallback(err, data) {
        if (err) { console.log(err); } else {
            obj = JSON.parse(data);
            return Object.size(obj.users)
        }
    });
}
async function mute(bool,user,client){
    let muterole = user.guild.roles.find(`name`, "queue");
    if(!muterole){
      try{
        muterole = await user.guild.createRole({
          name: "queue",
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
