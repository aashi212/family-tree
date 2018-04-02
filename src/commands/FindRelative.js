const
    Command = require('./Command'),
    join = (persons)=> persons.map(p => p.name).join(',');

class FindRelativeCommand extends Command{
  constructor(relationships){
    super(relationships);
    this.relationCommands = {
      'paternaluncle'  : personId => join(relationships.paternalUnclesOf(personId)),
      'maternaluncle'  : personId => join(relationships.maternalUnclesOf(personId)),
      'paternalaunt'   : personId => join(relationships.paternalAuntsOf(personId)),
      'maternalaunt'   : personId => join(relationships.maternalAuntsOf(personId)),
      'sister-in-laws'  : personId => join(relationships.sisterInLawsOf(personId)),
      'brother-in-laws' : personId => join(relationships.brotherInLawsOf(personId)),
      'cousins'  : personId => join(relationships.cousinsOf(personId)),
      'father'   : personId => relationships.fatherOf(personId).name,
      'mother'   : personId => relationships.motherOf(personId).name,
      'children' : personId => join(relationships.childrenOf(personId)),
      'sons'     : personId => join(relationships.sonsOf(personId)),
      'daughters': personId => join(relationships.daughtersOf(personId)),
      'brothers' : personId => join(relationships.brothersOf(personId)),
      'sisters'  : personId => join(relationships.sistersOf(personId)),
      'granddaughter' : personId => join(relationships.grandDaughterOf(personId)),
    };
  }

  usage(){
    return 'Person=<name> ; Relation = <relation-name>';
  }

  parse(input){
    const
        params    = input.replace(/ /g, '').toLowerCase().split(';'),
        personId  = params[0].split('=')[1],
        hasPerson = params[0].split('=')[0] === 'person',
        relation  = params[1].split('=')[1],
        hasRelation = params[1].split('=')[0] === 'relation';

    return {personId, relation, success: hasPerson && hasRelation && !!personId && !!relation};
  }

  hint(){
    return 'Available Options :\n'+ Object.keys(this.relationCommands).join(', ');
  }

  _execute(input){
    const
        params = this.parse(input),
        relation = this.relationCommands[params.relation];
    return relation ? relation(params.personId) : this.hint();
  }
}

module.exports  = FindRelativeCommand;