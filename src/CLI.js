/* eslint no-console: 0 */

const
    seed = require('../config/seed.json'),
    FamilyTreeLoader = require('./FamilyTreeLoader'),
    Relationships = require('./Relationships'),
    CommandRunner = require('./commands/CommandRunner'),

    cli = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    }),
    commandRunner = new CommandRunner(new Relationships(FamilyTreeLoader.load(seed)));

cli.on('line', (line) => {
  console.log(commandRunner.interpret(line));
});
