const males = person => person.isMale;

class Relationships{
  constructor(familyTree){
    this.familyTree = familyTree;
  }

  brothersOf(personId){
    return this.familyTree
        .getParentFamilyOf(personId)
        .children.filter(males)
        .filter(person => person.id !== personId);
  }

  getSisterInLawOf(personId){

  }

}

module.exports =  Relationships;