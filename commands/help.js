module.exports.command = {
  name: "help",
  author: "NTKhang",
  use: "help {tên lệnh}",
  example: "help sim",
  category: "system",
  descriptions: "Xem cách sử dụng lệnh",
    run: ({message, args, globalbot, config}) => {
    const fs = require("fs-extra");
    const {MessageEmbed} = require("discord.js");
    

    if(args[0]) allCommand(globalbot, message);
    if(!args[0]) getCmd(globalbot, message);
    
      function allCommand (globalbot, message) {
        const embed = new MessageEmbed();
        var command = globalbot.commands.get(args[0]);
        if(!command) return message.channel.send(embed.setColor("RED").setDescription("Lệnh "+args[0]+" không tồn tại"));
            command = command.command;
        var info = `◆━━━━━━◆❃◆━━━━━━◆\n❖Tên lệnh: ${command.name}`;
        if(command.descriptions) info += "\n❖Công dụng: " +command.descriptions;
        if(command.author) info += "\n❖Tác giả: "+command.author;
        if(command.use) info += "\n❖Cách dùng: "+command.use;
        if(command.example) info += "\n❖Ví dụ: "+command.example;
        info += "\n◆━━━━━━◆❃◆━━━━━━◆";
        return message.channel.send(embed.setColor("GREEN").setDescription(info));
      }

      function getCmd (globalbot, message) {
        var valueCmd = globalbot.commands.values();
        var groupCommands = [];
        var groupCommands2 = [];
  
         for(command of valueCmd) {
           if(!groupCommands.some(cmd => cmd.category.toLocaleLowerCase() == command.command.category.toLocaleLowerCase())) {
             groupCommands.push({
             category: command.command.category.toLocaleLowerCase(),
             name: [command.command.name]})
           }
            else {
           groupCommands.find(item => item.category.toLocaleLowerCase() == command.command.category.toLocaleLowerCase()).name.push(command.command.name); 
           }
         }
    groupCommands.forEach(item => {
      var a = {
        name: "═════ "+item.category.charAt(0).toUpperCase()+item.category.slice(1)+" ═════",
        value: item.name.join(", ")
      }
      groupCommands2.push(a);
    });
        const embed = new MessageEmbed()
          .setColor("BLUE")
          .addFields(groupCommands2)
          .setAuthor(`Hiện tại bot có ${globalbot.commands.size} lệnh có thể sử dụng, gõ ${config.PREFIX}help <tên lệnh> để xem chi tiết cách dùng lệnh đó`)
          
          return message.channel.send(embed);
      }
    }
}