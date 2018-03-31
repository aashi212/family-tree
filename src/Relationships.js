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

  maternalAuntsOf(personId){
    return this.maternalUncleAndAuntsOf(personId).filter(females);
  }

  paternalAuntsOf(personId){
    return this.paternalUncleAndAuntsOf(personId).filter(females);
  }

  cousinsOf(personId){
    return this.maternalUncleAndAuntsOf(personId)
        .concat(this.paternalUncleAndAuntsOf(personId))
        .map(person => this.familyTree.getFamilyOf(person.id))
        .reduce((cousins, family)=> cousins.concat(family.children), []);
  }

  sisterInLawsOf(personId){
    const
        siblings = this.familyTree
            .getParentFamilyOf(personId)
            .children.filter(not(personId)),
        wivesOfBrother = siblings.filter(males)
            .map((brother) => this.familyTree.getFamilyOf(brother.id).wife),
        family = this.familyTree
            .getFamilyOf(personId),
        spouse =  !family.husband ? null : family.husband.id === personId ? family.wife : family.husband,
        sistersOfSpouse= !spouse ? []
            : this.familyTree
                .getParentFamilyOf(spouse.id)
                .children.filter(females)
                .filter(not(spouse.id))
    return wivesOfBrother.concat(sistersOfSpouse);
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