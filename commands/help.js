const config = require('../config.json');

exports.run = (client, message, args) => {
    if(!args[0]) {
        const commandNames = Array.from(client.commands.keys());
        const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);

        //test this as well in case it is a complete mess
        message.channel.sendCode('asciidoc', `🤠 Command List 🤠\n----------\n\n[🤠 Use ${config.musicPrefix}help <commandname> for details! 🤠]\n\n${client.commands.map(c =>
            `${config.musicPrefix}${c.help.name}${' '.repeat(longest - c.help.name.length)} :: ${c.help.description}`).join('\n')}`);
    } else {
        let command = args[0];

        if(client.commands.has(command)) {
            command = client.commands.get(command);
            message.channel.sendCode('asciidoc', `= ${command.help.name} = \n${command.help.description}\nUsage :: ${command.help.usage}`);
        }
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['h'],
    permLevel: 0
};

exports.help = {
    name: 'help',
    description: 'Displays name, descriptions, and usage(s) of available commands.',
    usage: 'help (command)'
};