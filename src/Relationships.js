const
    males = person => person.isMale;
    females = person => !person.isMale;

class Relationships{
  constructor(familyTree){
    this.familyTree = familyTree;
  }

  siblingsOf(personId){
    return this.familyTree
        .getParentFamilyOf(personId)
        .children
        .filter(person => person.id !== personId);
  }

  brothersOf(personId){
    return this.siblingsOf(personId).filter(males)
  }

  sistersOf(personId){
    return this.siblingsOf(personId).filter(females)
  }

  grandDaughterOf(personId){
    return this.familyTree
        .getFamilyOf(personId)
        .children
        .reduce((childFamilies, child) => childFamilies.concat(this.familyTree.getFamilyOf(child.id)), [])
        .reduce((grandChildren, family) => grandChildren.concat(family.children), [])
        .filter(females);
  }

}

module.exports =  Relationships;