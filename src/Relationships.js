const
    males = person => person.isMale;
    females = person => !person.isMale
    not = personId => (person) => person.id !== personId;

class Relationships{
  constructor(familyTree){
    this.familyTree = familyTree;
  }

  fatherOf(personId){
    return this.familyTree
        .getParentFamilyOf(personId)
        .husband
  }

  motherOf(personId){
    return this.familyTree
        .getParentFamilyOf(personId)
        .wife
  }

  childrenOf(personId){
    return this.familyTree
        .getFamilyOf(personId)
        .children
  }

  daughtersOf(personId){
    return this.childrenOf(personId).filter(females)
  }

  sonsOf(personId){
    return this.childrenOf(personId).filter(males)
  }

  siblingsOf(personId){
    return this.familyTree
        .getParentFamilyOf(personId)
        .children
        .filter(person => person.id !== personId);
  }

  paternalUncleAndAuntsOf(personId){
    let parentFamily = this.familyTree.getParentFamilyOf(personId),
        fathersParentFamily = this.familyTree.getParentFamilyOf(parentFamily.husband.id);

    return fathersParentFamily.children.filter(not(parentFamily.husband.id));
  }

  maternalUncleAndAuntsOf(personId){
    let parentFamily = this.familyTree.getParentFamilyOf(personId),
        fathersParentFamily = this.familyTree.getParentFamilyOf(parentFamily.wife.id);

    return fathersParentFamily.children.filter(not(parentFamily.wife.id));
  }

  paternalUnclesOf(personId){
    return this.paternalUncleAndAuntsOf(personId).filter(males);
  }

  maternalUnclesOf(personId){
    return this.maternalUncleAndAuntsOf(personId).filter(males);
  }

  cousinsOf(personId){
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