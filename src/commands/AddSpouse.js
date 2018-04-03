const
    Command = require('./Command');

class AddSpouse extends Command{
  constructor(relationships){
    super(relationships);
  }

  usage(){
    return 'Husband=<name> ; Wife = <child-name>';
  }

  parse(input){
    const
        params    = input.replace(/ /g, '').split(';'),
        husbandDefined = params[0].split('=')[0].toLowerCase() === 'husband',
        husbandId  = params[0].split('=')[1].toLowerCase(),
        wifeDefined     = params[1].split('=')[0].toLowerCase() === 'wife',
        wifeId = params[1].split('=')[1];

    return {husbandId, wifeId, success: husbandDefined && wifeDefined && !!husbandId && !!wifeId};
  }

  _execute(input){
    const params = this.parse(input);
    this.relationships.addSpouse(params.husbandId, params.wifeId)
    return '';
  }
}

module.exports  = AddSpouse;