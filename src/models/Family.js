class Family{
  constructor(husband, wife, children){
    this.husband  = husband;
    this.wife     = wife;
    this.children = children;
  }

  equals(family){
    return family.husband.equals(this.husband) && family.wife.equals(this.wife);
  }

  isOf(personsId){
    return this.wife.is(personsId) || this.husband.is(personsId);
  }

  hasChild(personId){
    return this.children.reduce((hasChild, child)=> hasChild || child.is(personId), false);
  }
}

module.exports = Family;