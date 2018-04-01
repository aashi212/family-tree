const
    Command = require('./Command'),
    join = (persons)=> persons.map(p => p.name).join(',');

class FindRelativeCommand extends Command{
  constructor(relationships){
    super(relationships);
    this.relationCommands = {
      'mother'   : personId => relationships.motherOf(personId).name,
      'father'   : personId => relationships.fatherOf(personId).name,
      'sisters'  : personId => join(relationships.sistersOf(personId)),
      'brothers' : personId => join(relationships.brothersOf(personId)),
      'daughters': personId => join(relationships.daughtersOf(personId)),
      'sons'     : personId => join(relationships.sonsOf(personId)),
      'children' : personId => join(relationships.childrenOf(personId)),
    };
  }

  usage(){
    return 'Person=<name> ; Relation = <relation-name>'
  }

  parse(input){
    const
        params   = input.replace(/ /g, '').toLowerCase().split(';'),
        personId = params[0].split("=")[1],
        relation = params[1].split("=")[1];

    return {personId, relation, success: !!personId && !!relation};
  }

  _execute(input){
    const params = this.parse(input);
    return this.relationCommands[params.relation](params.personId);
  }
}

module.exports  = FindRelativeCommand;