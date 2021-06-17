module.exports.command = {
  name: "sim",
  author: "NTKhang",
  use: "sim [on/off]",
  example: "sim on",
  descriptions: "Bật tắt simsimi",
  
    run: ({message, client, args}) => {
      const fs = require("fs-extra");
      var settings = require("./cache/setting.json");
      if(!settings[message.channel.id]) settings[message.channel.id] = {};
      var setting = settings[message.channel.id];
      if(args[0] == "on") {
        setting.sim = "on";
        message.channel.send("Đã bật simsimi");
      }
      if(args[0] == "off") {
        setting.sim = "off";
        message.channel.send("Đã tắt simsimi");
      }
      		fs.writeFileSync(__dirname + `/cache/setting.json`, JSON.stringify(settings, null, 2));
      		
    },
    
    event: async ({message, client, args}) => {
      var axios = require("axios");
      var settings = require("./cache/setting.json");
      if(settings[message.channel.id].sim == "on") {
        var text = encodeURIComponent(args.join(" "));
   	var data = (await axios.get(`https://api.simsimi.net/v1/?text=${text}&lang=vi-vn&cf=false`)).data.success;
   	message.channel.send(decodeURIComponent(data));
      }
    }
      
}