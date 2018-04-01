const FindRelative = require('./FindRelative');

class CommandRunner{
  constructor(relationships){
    this.commands = [
        new FindRelative(relationships)
    ];
    this.unknownCommandMessage =
        'Available Commands : \n' +
        this.commands.map(c => c.usage()).join('\n');
  }

  interpret(input){
    const command = this.commands.find(command => command.appliesTo(input));
    return command ? command.execute(input) : this.unknownCommandMessage;
  }
}

module.exports = CommandRunner;