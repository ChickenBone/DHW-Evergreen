exports.run = async (client, message, args) => {
    let reactionArray = ['✅', '➖', '❌'];
    let msg = 0;
    if(args!="") msg = await message.channel.send(args.join(" "))
    if(args=="") msg = await message.channel.send("Should I remember to add arguments when I use the poll command?")
    message.delete().catch(O_o=>{})
    for (const react of reactionArray) {
      await msg.react(react)
    }
  };
  
  exports.cmdConfig = {
    name: "poll",
    aliases: ['createpoll', 'p'],
    description: "Creates a poll that people can vote using reactions.",
    usage: "poll",
    type: "core"
  };