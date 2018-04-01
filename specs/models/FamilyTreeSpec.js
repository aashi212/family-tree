const
    assert = require('assert'),
    Person = require('../../src/models/Person'),
    Family = require('../../src/models/Family'),
    FamilyTree = require('../../src/models/FamilyTree');

describe('FamilyTree',()=> {
  const
      grandDad = new Person('GrandDad', true),
      grandMom = new Person('GrandMom', false),
      dad      = new Person('Dad', true),
      mom      = new Person('Mom', false),
      son      = new Person('Son', true),
      daughter = new Person('Daughter', false),
      daughtersHubby   = new Person('DaughtersHubby', true),
      daughtersSon     = new Person('DaughtersSon', true),

      rootFamily       = new Family(grandDad, grandMom, [dad]),
      childFamily      = new Family(dad, mom, [son, daughter]),
      grandChildFamily = new Family(daughtersHubby, daughter, [daughtersSon]),
      familyTree = new FamilyTree(rootFamily);

  familyTree.addFamily(childFamily);
  familyTree.addFamily(grandChildFamily);

  it('should return family of a person', function() {
    const
        grandMomsFamily   = familyTree.getFamilyOf('GrandMom'),
        sonsParentFamily  = familyTree.getParentFamilyOf('Son'),
        daughtersFamily   = familyTree.getFamilyOf('Daughter'),
        daughtersSonParentFamily = familyTree.getParentFamilyOf('DaughtersSon');

    assert.equal(grandMomsFamily.equals(rootFamily), true);
    assert.equal(sonsParentFamily.equals(childFamily), true);

    assert.equal(daughtersFamily.equals(grandChildFamily), true);
    assert.equal(daughtersSonParentFamily.equals(grandChildFamily), true);
  });

  it('should return empty family if child is not married', function() {
    const
        expected = [],
        actual   = familyTree.getFamilyOf('DaughtersSon').children;
    assert.deepEqual(actual, expected);
  });

  it('should add a child to family', function() {
    const newDaughter = new Person('Daughters Daughter', false);
    familyTree.addChild('Daughter', newDaughter)

    const
        expected = [daughtersSon, newDaughter],
        actual   = familyTree.getFamilyOf('Daughter').children;
    assert.deepEqual(actual, expected);
  });

  it('should return all families', function() {
    const
        expected = [rootFamily, grandChildFamily, childFamily],
        actual   = familyTree.getAllFamilies();
    assert.deepEqual(actual, expected);
  });

});