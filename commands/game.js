module.exports.command = {
  name: "game",
  author: "NTKhang",
  use: "game [on/off]",
  example: "game on",
  category: "game",
  descriptions: "Bật tắt game nối chữ",
    run: ({message, args}) => {
      const fs = require("fs-extra");
      var onoff = "";
  if(args[0] == "on") {
     onoff = "on";
	 	message.channel.send("Đã bật game nối chữ");
	}
	else if(args[0] == "off") {
	   onoff = "off";
		message.channel.send("Đã tắt game nối chữ");
	};
	
  	var settings = require("./cache/setting.json");
      if(!settings[message.channel.id]) settings[message.channel.id] = {};
      var setting = settings[message.channel.id];
      setting.game = onoff;
      fs.writeFileSync(__dirname + `/cache/setting.json`, JSON.stringify(settings, null, 2));
    },
    
    event: async ({message}) => {
      const axios = require("axios");
    var settings = require("./cache/setting.json");
      if(settings[message.channel.id].game == "on") {
        var {content} = message;
   var data = (await axios.get("http://simsimi.miraiproject.tk/api/linkword?ask=" + encodeURIComponent(content))).data;
   message.channel.send(data.text);
      }
    }
     
}