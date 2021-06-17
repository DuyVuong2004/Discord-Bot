module.exports.command = {
  name: "setprefix",
  author: "NTKhang",
  use: "setprefix [prefix muốn đổi]",
  example: "setprefix #",
  descriptions: "Đổi prefix của bot",
    run: ({ message, client, args, config }) => {
      const fs = require("fs-extra");
      if(!args[0]) return message.channel.send("Phần prefix cần đổi không được để trống");
      config.PREFIX = args[0];
      fs.writeFileSync(__dirname + `/../config.json`, JSON.stringify(config, null, 2));
      message.channel.send("Đã đổi prefix thành "+ "\""+config.PREFIX+"\"");
    },
    
    event: ({message, client, args, config}) => {
      if(message.content.toLocaleLowerCase() == "prefix") {
        message.channel.send("Prefix của bot là " + config.PREFIX);
      }
    }
}