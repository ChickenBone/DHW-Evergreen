const fs = require('fs');

module.exports.onJoin = async (user, client) => {
    serversettings.getcaptcha(user.guild.id, function (data) {
        if (data == "true") {
            mute(true,user,client)
            captcha(user, client)
            
        }
    })
};
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
                settings: {
                    captcha: false
                },
                commands: {
                    "Hello": "Hello World"
                },
                logchannel: channel.id, 
                prefix: "e!"
            }
            channel.send("To Set My Log Channel Please Type e!logchannel #[channelname]")
            var json = JSON.stringify(jsonobj);
            fs.mkdir(`./storage/servers/${guildid}`);
            console.log("Creating Json File")
            fs.writeFile(`./storage/servers/${guildid}/server.json`, json, 'utf8', (error) => { console.log("Error Creating Server JSON: " + error) });
        }
    } catch (err) { console.log(err) }
}
module.exports.removeserver = async (guildid) => {
    if (fs.existsSync(`./storage/servers/${guildid}`)) {
        fs.unlinkSync(`./storage/servers/${guildid}/server.json`, json, 'utf8', callback);
        fs.rmdir(`./storage/servers/${guildid}`);
    }
}
function checkserver(guild) {
    try {
        fs.readdir(`./storage/servers/`, (err, files) => {
            if (err) console.log(err);
            let jsfile = files.filter(f => f.split(".").pop() == "json");
            if (jsfile.length <= 0) {
                // No Files in directory
                console.log("Error: Could not find any servers in directory \"./storage/servers/\".")
                return false;
            }
            jsfile.forEach((f, i) => {
                if (f.replace(".json", "") == "server") {
                    // Server JSON Found
                    return true
                }
            })
            // Server Json Not Found
            return false;
        })
    } catch (e) {
        // Generic Error Try Catch
        return console.log("Error: " + e)
    }
}
module.exports.addsettings = async (guildid, setting, value) => {
    fs.readFile(`./storage/servers/${guildid}/server.json`, 'utf8', function readFileCallback(err, data) {
        if (err) { console.log(err); } else {
            obj = JSON.parse(data);
            obj.settings[setting] = value;
            json = JSON.stringify(obj);
            fs.writeFile(`./storage/servers/${guildid}/server.json`, json, 'utf8', (error) => { if (!(error === null)) { console.log("Error Creating Server JSON: " + error) } });
        }
    });
}
module.exports.addcommand = async (guildid, setting, value) => {
    fs.readFile(`./storage/servers/${guildid}/server.json`, 'utf8', function readFileCallback(err, data) {
        if (err) { console.log(err); } else {
            obj = JSON.parse(data);
            obj.commands[setting] = value;
            json = JSON.stringify(obj);
            fs.writeFile(`./storage/servers/${guildid}/server.json`, json, 'utf8', (error) => { if (!(error === null)) { console.log("Error Creating Server JSON: " + error) } });
        }
    });
}
module.exports.removecommand = async (guildid, setting) => {
    fs.readFile(`./storage/servers/${guildid}/server.json`, 'utf8', function readFileCallback(err, data) {
        if (err) { console.log(err); } else {
            obj = JSON.parse(data);
            delete obj.commands[setting];
            json = JSON.stringify(obj);
            fs.writeFile(`./storage/servers/${guildid}/server.json`, json, 'utf8', (error) => { if (!(error === null)) { console.log("Error Creating Server JSON: " + error) } });
        }
    });
}
module.exports.getsettings = (guildid, callback) => {
    fs.readFile(`./storage/servers/${guildid}/server.json`, 'utf8', function readFileCallback(err, data) {
        if (err) { console.log(err); } else {
            obj = JSON.parse(data);
            callback(obj.settings);
        }
    })
}
module.exports.getcaptcha = (guildid, callback) => {
    fs.readFile(`./storage/servers/${guildid}/server.json`, 'utf8', function readFileCallback(err, data) {
        if (err) { console.log(err); } else {
            obj = JSON.parse(data);
            callback(obj.settings.captcha);
        }
    })
}
module.exports.getqueue = (guildid, callback) => {
    fs.readFile(`./storage/servers/${guildid}/server.json`, 'utf8', function readFileCallback(err, data) {
        if (err) { console.log(err); } else {
            obj = JSON.parse(data);
            callback(obj.settings.queue);
        }
    })
}
module.exports.setprefix = async (guildid, value) => {
    fs.readFile(`./storage/servers/${guildid}/server.json`, 'utf8', function readFileCallback(err, data) {
        if (err) { console.log(err); } else {
            obj = JSON.parse(data);
            obj.prefix = value;
            json = JSON.stringify(obj);
            fs.writeFile(`./storage/servers/${guildid}/server.json`, json, 'utf8', (error) => { if (!(error === null)) { console.log("Error Creating Server JSON: " + error) } });
        }
    });
}
module.exports.getprefix = (guildid, callback) => {
    fs.readFile(`./storage/servers/${guildid}/server.json`, 'utf8', function readFileCallback(err, data) {
        if (err) { console.log(err); } else {
            obj = JSON.parse(data);
            callback(obj.prefix);
        }
    })
}
module.exports.setlogchannel = async (guildid, value) => {
    fs.readFile(`./storage/servers/${guildid}/server.json`, 'utf8', function readFileCallback(err, data) {
        if (err) { console.log(err); } else {
            obj = JSON.parse(data);
            obj.logchannel = value;
            json = JSON.stringify(obj);
            fs.writeFile(`./storage/servers/${guildid}/server.json`, json, 'utf8', (error) => { if (!(error === null)) { console.log("Error Creating Server JSON: " + error) } });
        }
    });
}
module.exports.getlogchannel = (guildid, callback) => {
    fs.readFile(`./storage/servers/${guildid}/server.json`, 'utf8', function readFileCallback(err, data) {
        if (err) { console.log(err); } else {
            obj = JSON.parse(data);
            callback(obj.logchannel);
        }
    })
}
module.exports.getcommands = async (guildid, callback) => {
    fs.readFile(`./storage/servers/${guildid}/server.json`, 'utf8', function readFileCallback(err, data) {
        if (err) { console.log(err); } else {
            obj = JSON.parse(data);
            return callback(obj.commands);
        }
    });
}