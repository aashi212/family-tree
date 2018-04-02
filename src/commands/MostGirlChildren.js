const
    Command = require('./Command');

class MostGirlChildren extends Command{
  constructor(relationships){
    super(relationships);
  }

  usage(){
    return 'Most Girl Children';
  }

  parse(input){
    return {
      success: input.replace(/ /g,'').toLowerCase() === 'mostgirlchildren'
    };
  }

  _execute(){
    return this.relationships.motherWithMostDaughter().map(m => m.name).join(',');
  }
}

module.exports  = MostGirlChildren;