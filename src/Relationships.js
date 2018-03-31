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

  paternalUnclesOf(personId){
    return this.paternalUncleAndAuntsOf(personId).filter(males);
  }

  cousinsOf(personId){
    let parentFamily = this.familyTree.getParentFamilyOf(personId),
        mothersParentFamily = this.familyTree.getParentFamilyOf(parentFamily.wife.id),
        fathersParentFamily = this.familyTree.getParentFamilyOf(parentFamily.husband.id),
        unclesAndAunts = mothersParentFamily.children.concat(fathersParentFamily.children);

    return parentFamily

        .children
        .reduce((childrenChildren, child) => childrenChildren.concat(this.familyTree.getFamilyOf(child.id).children), [])
        .filter(person => person.id !== personId)
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