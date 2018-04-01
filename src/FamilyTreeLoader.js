const
    Person = require('./models/Person'),
    Family = require('./models/Family'),
    FamilyTree = require('./models/FamilyTree'),

    male    = name => new Person(name, true),
    female  = name => new Person(name, false),
    toFamily = config=> {
      return new Family(
          male(config.husband),
          female(config.wife),
          config.sons.map(male).concat(config.daughters.map(female))
      );
    };

module.exports = {
  load: (config) => {
    const
        rootFamilyConfig = config.families[0],
        rootFamily = toFamily(rootFamilyConfig),
        familyTree = new FamilyTree(rootFamily);

    config.families.slice(1).forEach(familyConfig => {
      familyTree.addFamily(toFamily(familyConfig));
    });

    return familyTree;
  }
};