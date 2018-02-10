const Discord = require('discord.io');

require('dotenv').config();
const token = process.env.AUTH_TOKEN;

var bot = new Discord.Client({
	autorun: true,
	token: token
});

var lastMessage, messageID, lastMessageID;

bot.on("ready", ()=>{
	console.log("NO MORE SPAM!");
});

bot.on("message", function(user, userID, channelID, message, event) {
	messageID = event.d.id;
	console.log("Message ID: " + messageID);
	var opts = {channelID: channelID, messageID: event.d.id};
	if(message.includes("hh") || message.includes("HH") || message.includes('h\nh') || message.includes("H\nH")){
		bot.deleteMessage(opts);
	}else if (message === lastMessage) {
		bot.deleteMessages({channelID: channelID, messageIDs: [messageID, lastMessageID]}, ()=>{
			console.log("deleted messages " + lastMessageID + " and " + messageID);
			lastMessage = 0;
			lastMessageID = 0;
		});
	} else{
		lastMessage = message;
		lastMessageID = messageID;
	}
});
