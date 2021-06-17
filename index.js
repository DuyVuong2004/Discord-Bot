var Client = require("discord.js");
var client = new Client.Client();
const globalbot = {
  commands: new Map(),
  commandNoprefix: new Map()
}

var config = require("./config.json");

client.login(config.TOKEN);

client.on("ready", () => {
	console.log(`Đã đăng nhập ${client.user.tag}`);
client.user.setPresence({
		activity: {
			name: "GAME",
			type: "PLAYING"
		},
		status: "online"
	})
})

var loadCmd = require("./load/loadCommand");
return loadCmd({client, config, globalbot});

//Create webSever
/*const app = require ("express") ();  app.get ('/', (req, res) => {res.send ("NTKhang");});app.listen(process.env. PORT);*/
