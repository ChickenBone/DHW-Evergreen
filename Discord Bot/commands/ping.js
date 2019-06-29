/*
    Ping Command quite simple sends ping message gets delay then edits the delay with the delay of the discord API
*/
module.exports.run = async(client, message, args) =>{
    const messages = [
        "Sending an email...",
        "Waking up the developers...",
        "Eating fish n' chips..."
        ];
    var randommsg = messages[Math.floor(Math.random() * messages.length)];
    const msg= await message.channel.send(`${randommsg}`);
    msg.edit(`Your message was recieved!\n***Client***: ${msg.createdTimestamp - message.createdTimestamp}ms \n***API***: ${Math.round(client.ping)}ms`)
}
//that shouldnt be a file, just something seperate in index.js i dont even want it to show in m!help
module.exports.cmdConfig = {
    name: "ping",
    aliases: [],
    description: "Ping command, I wonder what it does",
    usage: "ping",
    type: "hidden"
}
// Well if you dont want it to show just comment this out, it cleans it up to have it in a different 