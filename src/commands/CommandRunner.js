const
    FindRelative = require('./FindRelative'),
    AddChild = require('./AddChild'),
    MostGirlChildren = require('./MostGirlChildren'),
    FindRelation = require('./FindRelation');

class CommandRunner{
  constructor(relationships){
    this.commands = [
        new FindRelative(relationships),
        new AddChild(relationships),
        new MostGirlChildren(relationships),
        new FindRelation(relationships),
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