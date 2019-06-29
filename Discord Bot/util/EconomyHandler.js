const Discord = require("discord.js");
const fs = require("fs");

module.exports.getUserInfo = (user,type,guildid) => {
    let users = JSON.parse(fs.readFileSync("../storage/economy/users.json","utf8"));
    return users[guildid][user];
}
module.exports.setUserInfo = (user,type,guildid,data) => {
    let users = JSON.parse(fs.readFileSync("../storage/economy/users.json","utf8"));
    if(!users[guildid][user]) users[guildid][user] = {}
    for(i in users[user]) {
        if(i==type) {
            users[guildid][user][i]=data;
        }
    }
    fs.writeFile("./storage/economy/users.json",JSON.stringify(users),err=>{if(err)console.log(err)});
}
module.exports.getStoreItems = (guildid) => {
    let store = JSON.parse(fs.readFileSync("./storage/economy/store.json","utf8"));
    if(!store[guildid]) store[guildid] = {items:{}};
    return store[guildid].items;
}
module.exports.addStoreItem = (item,desc,value,guildid) => {

    let store = JSON.parse(fs.readFileSync("./storage/economy/store.json","utf8"));
    if(!store[guildid]) store[guildid] = {items:{}};
    store[guildid].items[item]={ //for some reason it outputs { '591455458057781288': { items (this should be quoted): { 'test item': [Object] } } } with this and crashes. 
        description:"\""+desc+"\"",
        value: Number(value)
    };
    //console.log(store);

    fs.writeFile("./storage/economy/store.json",JSON.stringify(store),err=>{if(err)console.log(err)});
}
module.exports.buyStoreItem = (item,user,guildid,amount,channel) => {
    let store = JSON.parse(fs.readFileSync("./storage/economy/store.json","utf8"));
    let users = JSON.parse(fs.readFileSync("./storage/economy/users.json","utf8"));
    if(!store[guildid]) return channel.send("This server does not have a store!");
    for(itm in store[guildid]) {
        if(item.toLowerCase()==itm.toLowerCase()) {
            if(!users[guildid][user]) users[guildid][user] = {}
            if(!users[guildid][user]["inventory"]) users[guildid][user]["inventory"] = {}
            if(!users[guildid][user]["inventory"][itm]) users[guildid][user]["inventory"][itm] = 0;
            users[guildid][user]["inventory"][itm] += amount;
            if(!users[guildid][user]["money"]) {
                users[guildid][user]["money"] = 0;
            }
            if(users[guildid][user]["money"]<store[guildid][itm].value*amount) return channel.send("You don't have the money to buy this!")
            users[guildid][user]["money"] -= (store[guildid][itm].value*amount);
            return channel.send("You have purchased x"+amount+" of "+itm+"!")
        }
    }
    return channel.send("Item does not exist!")
}