const
    Person   = require('./models/Person'),
    males    = person => person.isMale,
    females  = person => !person.isMale,
    not      = personId => (person) => !person.is(personId),
    existing = p=> !!p;

class Relationships{
  constructor(familyTree){
    this.familyTree = familyTree;
  }

  fatherOf(personId){
    return this.familyTree
        .getParentFamilyOf(personId)
        .husband;
  }

  motherOf(personId){
    return this.familyTree
        .getParentFamilyOf(personId)
        .wife;
  }

  childrenOf(personId){
    return this.familyTree
        .getFamilyOf(personId)
        .children;
  }

  daughtersOf(personId){
    return this.childrenOf(personId).filter(females);
  }

  sonsOf(personId){
    return this.childrenOf(personId).filter(males);
  }

  siblingsOf(personId){
    return this.familyTree
        .getParentFamilyOf(personId)
        .children
        .filter(not(personId));
  }

  spouseOf(personId){
    const family = this.familyTree.getFamilyOf(personId);
    return !family.husband ? null : family.husband.is(personId) ? family.wife : family.husband;
  }

  fathersSiblings(personId){
    const parentFamily = this.familyTree.getParentFamilyOf(personId);
    return this.siblingsOf(parentFamily.husband.id);
  }

  mothersSiblings(personId){
    const parentFamily = this.familyTree.getParentFamilyOf(personId);
    return this.siblingsOf(parentFamily.wife.id);
  }

  paternalUnclesOf(personId){
    const father = this.fatherOf(personId);
    return this.brothersOf(father.id)
            .concat(this.brotherInLawsOf(father.id));
  }

  maternalUnclesOf(personId){
    const mother = this.motherOf(personId);
    return this.brothersOf(mother.id)
        .concat(this.brotherInLawsOf(mother.id));
  }

  maternalAuntsOf(personId){
    const mother = this.motherOf(personId);
    return this.sistersOf(mother.id)
        .concat(this.sisterInLawsOf(mother.id));
    }

  paternalAuntsOf(personId){
    const father = this.fatherOf(personId);
    return this.sistersOf(father.id)
        .concat(this.sisterInLawsOf(father.id));
  }

  cousinsOf(personId){
    return this.mothersSiblings(personId)
        .concat(this.fathersSiblings(personId))
        .reduce((cousins, person) => cousins.concat(this.childrenOf(person.id)), []);
  }

  brotherInLawsOf(personId) {
    const
        husbandOfSisters = this.siblingsOf(personId).filter(females)
            .map((sister) => this.familyTree.getFamilyOf(sister.id).husband)
            .filter(existing),
        spouse =  this.spouseOf(personId),
        brothersOfSpouse= !spouse ? [] : this.brothersOf(spouse.id);

    return husbandOfSisters.concat(brothersOfSpouse);
  }

  sisterInLawsOf(personId){
    const
        wivesOfBrother = this.siblingsOf(personId).filter(males)
            .map((brother) => this.familyTree.getFamilyOf(brother.id).wife),
        spouse =  this.spouseOf(personId),
        sistersOfSpouse= !spouse ? [] : this.sistersOf(spouse.id);

    return wivesOfBrother.concat(sistersOfSpouse);
  }

  brothersOf(personId){
    return this.siblingsOf(personId).filter(males);
  }

  sistersOf(personId){
    return this.siblingsOf(personId).filter(females);
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