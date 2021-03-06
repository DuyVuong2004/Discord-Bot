module.exports = ({client, config, globalbot}) => {
  const fs = require("fs-extra");
  const chalk = require("chalk");
  const ascii = require("ascii-table");
  let tableCommands = new ascii("Commands");
  let tableCommandsEvent = new ascii("CommandsEvent");
  tableCommands.setHeading = ("","Command", "Status");
  tableCommandsEvent.setHeading = ("CmxEvent", "Status");
  const commands = fs.readdirSync(__dirname + "/../commands/").filter((file) => file.endsWith(".js"));
  let i = 1;
  let ii = 1;
for (const command of commands) {
  try{
		var cmd = require(__dirname + "/../commands/" + command);
		const namecmd = cmd.command.name;
		globalbot.commands.set(namecmd, cmd);
		tableCommands.addRow(i++, command, "Success ✅");
		if (cmd.command.event) {
		  try{
			var commandNoprefix = globalbot.commandNoprefix.get("event") || [];
			commandNoprefix.push(namecmd);
			globalbot.commandNoprefix.set("event", commandNoprefix);
			tableCommandsEvent.addRow(ii++, command, "Success ✅");
		  }
		  catch(e) {
		    var infoe = e.stack.split("\n")[0];
	    tableCommandsEvent.addRow(ii++, command, "❎"+e.message+" Line"+infoe.slice(infoe.lastIndexOf(command)+command.length));
		  }
		}
	}
	catch(e) {
	  var infoe = e.stack.split("\n")[0];
	  tableCommands.addRow(i++, command, "❎"+e. message+" Line"+infoe.slice(infoe.lastIndexOf(command)+command.length));
	}
};
	console.log(tableCommands.toString());
  console.log(tableCommandsEvent.toString());
  
client.on("message", async message => {
  if(message.author.bot) return;
  const prefix = config.PREFIX;
  const args = message.content.slice(prefix.length).trim().split (/ +/g);
  var cmd = args.shift().toLowerCase();
  var command = globalbot.commands.get(cmd);
    if(message.content.startsWith(prefix)) {
      if(command) {
        try {
          command.command.run({ args, message, client, globalbot, config });
        }
        catch(error) {
          var infoe = error.stack.split("\n")[1];
          infoe = infoe.slice(infoe.lastIndexOf(".js")+4);
          infoe = infoe.slice(0, infoe.lastIndexOf(`)`));
          console.log("Lỗi "+chalk.red(error) + " Line: "+infoe+" tại lệnh: " + chalk.green(command.command.name));
          message.channel.send("Đã xảy ra lỗi khi thực thi lệnh này: "+error+" Line: "+infoe);
        }
      }
    }
  
  const cmdNoprefix = globalbot.commandNoprefix.get("event") || [];
		for (const noprefix of cmdNoprefix) {
			const commandModule = globalbot.commands.get(noprefix);
			if(message.content.startsWith(prefix)) return;
			try {
				commandModule.command.event({ message, args, client, globalbot, config });
			}
			catch (error) {
				var infoe = error.stack.split("\n")[1];
          infoe = infoe.slice(infoe.lastIndexOf(".js")+4);
          infoe = infoe.slice(0, infoe.lastIndexOf(`)`));
          console.log("Lỗi "+chalk.red(error) + " Line: "+infoe+" tại lệnh: " + chalk.green(command.command.name));
          message.channel.send("Đã xảy ra lỗi khi thực thi lệnh này: "+error+" Line: "+infoe);
			}
		}
  });

}