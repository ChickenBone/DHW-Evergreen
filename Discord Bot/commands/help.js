const Discord = require('discord.js');
const serverhandler = require("../util/ServerHandler.js")
exports.run = (client, message, args) => {
    let settings = {
        embedColor: "#0f88bc",
    }
    
    serverhandler.getprefix(message.guild.id, function callbackprefix(pre) {
        var prefix = pre;
    if (!args[0]) {
        let cmdName = client.commands.map(cmd => `${cmd.cmdConfig.name}type=${cmd.cmdConfig.type}`);
        let owner = cmdName.filter(filterOwner).join(', ').replace(/type=owner/g, '');
        let admin = cmdName.filter(filterAdmin).join(', ').replace(/type=admin/g, '');
        let mod = cmdName.filter(filterMod).join(', ').replace(/type=mod/g, '');
        let core = cmdName.filter(filterCore).join(', ').replace(/type=core/g, '');
        let hidden = cmdName.filter(filterHidden).join(', ').replace(/type=Hidden/g, '');

        const helpcmd = new Discord.RichEmbed()
            .setColor(settings.embedColor)
            .setThumbnail('https://mintdev.co/logoV1.png')
            .setTitle(`Use ${prefix}help <command> for more information`)
            //.addField('Owner', (owner == "" ? "none" : owner)) Disabled due to no use
            .addField('Administration', (admin == "" ? "none" : admin))
            .addField('Moderation', (mod == "" ? "none" : mod))
            .addField('Core', (core == "" ? "none" : core));
        message.channel.send({ embed: helpcmd });
    } else {
        let command = args[0];
        if (client.commands.has(command)) {
            command = client.commands.get(command);
            const commandHelp = new Discord.RichEmbed()
                .setThumbnail('https://mintdev.co/logoV1.png')
                .setColor(settings.embedColor)
                .setTitle(upper(command.cmdConfig.name))
                .addField('Description', (command.cmdConfig.description == "" ? "none" :command.cmdConfig.description))
                .addField('Usage', (command.cmdConfig.usage == "" ? "none" : command.cmdConfig.usage))
                .addField('Aliases', (command.cmdConfig.aliases == "" ? "none" : command.cmdConfig.aliases))
                .addField('Type', (command.cmdConfig.type == "" ? "none" : command.cmdConfig.type));
            message.channel.send({ embed: commandHelp });
        } else {
            message.channel.send(`:negative_squared_cross_mark: Command not found! \`${args.join(' ')}\`, trying using \`${prefix}help\` to get a list of all commands.`);
        }
    }
});

};
function filterOwner(type) {
    return type.includes('type=owner');
}

function filterAdmin(type) {
    return type.includes('type=admin');
}


function filterMod(type) {
    return type.includes('type=mod');
}


function filterCore(type) {
    return type.includes('type=core');
}
function filterHidden(type) {
    return type.includes('type=hidden');
}
function upper(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
exports.cmdConfig = {
    name: "help",
    aliases: ['h', 'command', 'commands'],
    description: "A help command that list all the bots commands and gives information about how to use them.",
    usage: "help [command]",
    type: "core"
};