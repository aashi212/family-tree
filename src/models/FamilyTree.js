const
    Person = require('./Person'),
    createNode = (family) => {
      return {
        family,
        children: []
      };
    },
    findNode = (rootNode, select)=>{
      let nodes = [rootNode];
      while(nodes.length){
        let node = nodes.pop();
        if(select(node.family)){
          return node;
        }
        nodes = nodes.concat(node.children);
      }
    },
    missingFamily = ()=> {
      return {husband: Person.unknown(), wife: Person.unknown(), children: []};
    };

class FamilyTree {
  constructor(rootFamily) {
    this.rootFamilyNode = createNode(rootFamily);
  }

  addFamily(family) {
    findNode(this.rootFamilyNode, family=> {
      return family.isOf(family.husband.id) || family.isOf(family.wife.id);
    }).children.push(createNode(family));
  }

  getParentFamilyOf(personId) {
    let familyNode = findNode(this.rootFamilyNode, family=> family.hasChild(personId));
    return familyNode ? familyNode.family : missingFamily();
  }

  getFamilyOf(personId) {
    let familyNode = findNode(this.rootFamilyNode, family=> family.isOf(personId));
    return familyNode ? familyNode.family : missingFamily();
  }

  addChild(motherId, child){
    findNode(this.rootFamilyNode, family=> family.isOf(motherId)).family.children.push(child);
  }
  getAllFamilies(){
    let
        nodes = [this.rootFamilyNode],
        families = [];
    while(nodes.length){
      let node = nodes.pop();
      families.push(node.family);
      nodes = nodes.concat(node.children);
    }
    return families;
  }
}

module.exports = FamilyTree;