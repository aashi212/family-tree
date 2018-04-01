class Command {
  constructor(relationships) {
    this.relationships = relationships;
  }

  appliesTo(input){
    try{
      return this.parse(input).success;
    }catch(error){
      return false;
    }
  }

  execute(input) {
    try{
      return this._execute(input);
    }catch(error){
      return 'invalid command'
    }
  }
}

module.exports = Command;