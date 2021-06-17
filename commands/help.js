module.exports.command = {
  name: "help",
  author: "NTKhang",
  use: "help {tên lệnh}",
  example: "help sim",
  descriptions: "Xem cách sử dụng lệnh",
    run: ({message, args}) => {
    const ascii  = require("ascii-table");
    const fs = require("fs-extra");
    
    const commands = fs.readdirSync(__dirname + "/").filter((file) => file.endsWith(".js"));
      var cmd = [];
      for(let commandfile of commands) {
        var command = require("./"+commandfile);
        cmd.push(command.command.name);
      }
      message.channel.send("Hiện tại Bot có "+cmd.length+" lệnh có thể sử dụng:\n"+cmd.join(", "));
      
    }
}