const
    Person   = require('./models/Person'),
    males    = person => person.isMale;
    females  = person => !person.isMale
    not      = personId => (person) => !person.is(personId),
    existing = p=> !!p;

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
        .filter(not(personId));
  }

  fathersSiblings(personId){
    let parentFamily = this.familyTree.getParentFamilyOf(personId),
        fathersParentFamily = this.familyTree.getParentFamilyOf(parentFamily.husband.id);

    return fathersParentFamily.children.filter(not(parentFamily.husband.id));
  }

  mothersSiblings(personId){
    let parentFamily = this.familyTree.getParentFamilyOf(personId),
        fathersParentFamily = this.familyTree.getParentFamilyOf(parentFamily.wife.id);

    return fathersParentFamily.children.filter(not(parentFamily.wife.id));
  }

  brotherInLawsOf(personId) {
    const
        siblings = this.familyTree
            .getParentFamilyOf(personId)
            .children.filter(not(personId)),
        husbandOfSister = siblings.filter(females)
            .map((sister) => this.familyTree.getFamilyOf(sister.id).husband)
            .filter(existing),
        family = this.familyTree
            .getFamilyOf(personId),
        spouse =  !family.husband ? null : family.husband.is(personId) ? family.wife : family.husband,
        brothersOfSpouse= !spouse ? []
            : this.familyTree
                .getParentFamilyOf(spouse.id)
                .children.filter(males)
                .filter(not(spouse.id));

    return husbandOfSister.concat(brothersOfSpouse);
  }

  paternalUnclesOf(personId){
    return this.fathersSiblings(personId)
        .filter(males)
        .concat(this.brotherInLawsOf(this.familyTree.getParentFamilyOf(personId).husband.id));
  }

  maternalUnclesOf(personId){
    return this.mothersSiblings(personId).filter(males)
        .concat(this.brotherInLawsOf(this.familyTree.getParentFamilyOf(personId).wife.id));
    ;
  }

  maternalAuntsOf(personId){
    return this.mothersSiblings(personId)
        .filter(females)
        .concat(this.sisterInLawsOf(this.familyTree.getParentFamilyOf(personId).wife.id));
  }

  paternalAuntsOf(personId){
    return this.fathersSiblings(personId)
        .filter(females)
        .concat(this.sisterInLawsOf(this.familyTree.getParentFamilyOf(personId).husband.id));
  }

  cousinsOf(personId){
    return this.mothersSiblings(personId)
        .concat(this.fathersSiblings(personId))
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
        spouse =  !family.husband ? null : family.husband.is(personId) ? family.wife : family.husband,
        sistersOfSpouse= !spouse ? []
            : this.familyTree
                .getParentFamilyOf(spouse.id)
                .children.filter(females)
                .filter(not(spouse.id));

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

  addSon(motherId, sonsName){
    this.familyTree.addChild(motherId, new Person(sonsName, true));
  }

  addDaughter(motherId, daughterName){
    this.familyTree.addChild(motherId, new Person(daughterName, false));
  }

  motherWithMostDaughter(){
    const
        allFamilies = this.familyTree.getAllFamilies(),
        mostDaughters = allFamilies.reduce(
            (daughters, family)=> Math.max(daughters, family.children.filter(females).length), 0
        );

    return allFamilies.filter(f => f.children.filter(females).length === mostDaughters).map(f => f.wife);
  }
}

module.exports =  Relationships;