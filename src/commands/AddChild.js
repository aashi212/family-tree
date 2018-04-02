const
    Command = require('./Command');

class AddChild extends Command{
  constructor(relationships){
    super(relationships);
  }

  usage(){
    return 'Mother=<name> ; Son/Daughter = <child-name>';
  }

  parse(input){
    const
        params    = input.replace(/ /g, '').split(';'),
        motherDefined = params[0].split('=')[0].toLowerCase() === 'mother',
        motherId  = params[0].split('=')[1].toLowerCase(),
        isSon     = params[1].split('=')[0].toLowerCase() === 'son',
        childName = params[1].split('=')[1];

    return {motherId, isSon, childName, success: motherDefined};
  }

  _execute(input){
    const params = this.parse(input);
    params.isSon ?
        this.relationships.addSon(params.motherId, params.childName) :
        this.relationships.addDaughter(params.motherId, params.childName);
    return '';
  }
}

module.exports  = AddChild;