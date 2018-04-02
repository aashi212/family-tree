const
    Command = require('./Command'),
    contains = (persons, relative)=> persons.find(p => p.is(relative));

class FindRelativeCommand extends Command{
  constructor(relationships){
    super(relationships);
    this.relativeTypes = {
      'Mother'  : (personId, relative) => relationships.motherOf(personId).is(relative),
      'Father'  : (personId, relative) => relationships.fatherOf(personId).is(relative),
      'Brother' : (personId, relative) => contains(relationships.brothersOf(personId), relative),
      'Sister'  : (personId, relative) => contains(relationships.sistersOf(personId), relative),
      'Daughter': (personId, relative) => contains(relationships.daughtersOf(personId), relative),
      'Son'     : (personId, relative) => contains(relationships.sonsOf(personId), relative),
      'Grand Daughter' : (personId, relative) => contains(relationships.grandDaughterOf(personId), relative),
      'Cousin'         : (personId, relative) => contains(relationships.cousinsOf(personId), relative),
      'Brother-in-law' : (personId, relative) => contains(relationships.brotherInLawsOf(personId), relative),
      'Sister-in-law'  : (personId, relative) => contains(relationships.sisterInLawsOf(personId), relative),
      'Maternal Aunt'  : (personId, relative) => contains(relationships.maternalAuntsOf(personId), relative),
      'Paternal Aunt'  : (personId, relative) => contains(relationships.paternalAuntsOf(personId), relative),
      'Maternal Uncle' : (personId, relative) => contains(relationships.maternalUnclesOf(personId), relative),
      'Paternal Uncle' : (personId, relative) => contains(relationships.paternalUnclesOf(personId), relative),
    };
  }

  usage(){
    return 'Person=<name> ; Relative = <relative-name>';
  }

  parse(input){
    const
        params   = input.replace(/ /g, '').split(';'),
        personId = params[0].split('=')[1].toLowerCase(),
        hasPerson = params[0].split('=')[0].toLowerCase() === 'person',
        relative = params[1].split('=')[1],
        hasRelative= params[1].split('=')[0].toLowerCase() === 'relative';

    return {personId, relative, success: hasPerson && hasRelative && !!personId && !!relative};
  }

  _execute(input){
    const params = this.parse(input);
    return Object.keys(this.relativeTypes).find(relative => this.relativeTypes[relative](params.personId, params.relative));
  }
}

module.exports  = FindRelativeCommand;