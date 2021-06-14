var Client = require("discord.js");
var client = new Client.Client();
var token = require("./token.json");
client.login(token);

client.on("ready", () => {
	console.log("ok");
	console.log(`Logged in as ${client.user.tag}!`);
/*client.user.setPresence({
		activity: {
			name: "ONICHAN",
			type: "PLAYING"
		},
		status: "online"
	})*/
})


client.on("message", async message => {
	const axios = require("axios");
	var content = message.content;
        if (message.author.id != 841690351944335420 && content && content.split(" ").length == 2) {
            var data = (await axios.get("http://simsimi.miraiproject.tk/api/linkword?ask=" + encodeURIComponent(content))).data;
            return message.channel.send(data.text);
        }
});
