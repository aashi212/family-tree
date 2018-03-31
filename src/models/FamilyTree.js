const
    createNode = (family) => {
      return {
        family,
        childFamilies: []
      }
    },
    findNode = (rootNode, select)=>{
      let nodes = [rootNode];
      while(nodes.length){
        let node = nodes.pop();
        if(select(node.family)){
          return node;
        }
        nodes = nodes.concat(node.childFamilies);
      }
    };

class FamilyTree {
  constructor(rootFamily) {
    this.rootFamilyNode = createNode(rootFamily);
  }

  addFamily(family) {
    findNode(this.rootFamilyNode, family=> {
      return family.isOf(family.husband.id) || family.isOf(family.wife.id);
    }).childFamilies.push(createNode(family));
  }

  getParentFamilyOf(personId) {
    return findNode(this.rootFamilyNode, family=> family.hasChild(personId)).family;
  }

  getFamilyOf(personId) {
    let familyNode = findNode(this.rootFamilyNode, family=> family.isOf(personId));
    return familyNode ? familyNode.family : {children: []};
  }
}

module.exports = FamilyTree;