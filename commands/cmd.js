module.exports.command = {
  name: "cmd",
  descriptons: "load lệnh",
  author: "NTKhang",
  caterogy: "system",
  use: "cmd load",
  example: "cmd load",
    run: ({globalbot, message, args}) => {
      if(args[0] == "load") {
        try{
        var commandnew = require("./"+args[1]+".js");
        var commands = globalbot.commands;
        commands.delete(commandnew.command.name);
        commands.set(commandnew.command.name, commandnew);
        globalbot.commands = commands;
          message.channel.send("Đã load lệnh "+commandnew.command.name+" thành công")
        }
        catch (e) {
          message.channel.send("Đã xảy ra lỗi: "+e);
        }
      }
    }
}