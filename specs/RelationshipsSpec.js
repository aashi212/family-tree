const
    assert      = require('assert'),
    Person      = require('../src/models/Person'),
    Family      = require('../src/models/Family'),
    FamilyTree  = require('../src/models/FamilyTree'),
    Relationships = require('../src/Relationships');

describe('Relationships',()=> {
  const
      grandDad = new Person('GrandDad', true),
      grandMom = new Person('GrandMom', false),
      dad      = new Person('Dad', true),
      mom      = new Person('Mom', false),
      son      = new Person('Son', true),
      otherSon = new Person('OtherSon', true),
      daughter = new Person('Daughter', false),
      otherDaughter = new Person('OtherDaughter', false),
      daughtersHubby   = new Person('DaughtersHubby', true),
      daughtersSon     = new Person('DaughtersSon', true),

      rootFamily       = new Family(grandDad, grandMom, [dad]),
      childFamily      = new Family(dad, mom, [son, daughter, otherSon, otherDaughter]),
      grandChildFamily = new Family(daughtersHubby, daughter, [daughtersSon]),
      familyTree       = new FamilyTree(rootFamily),
      relationships    = new Relationships(familyTree);

  familyTree.addFamily(childFamily);
  familyTree.addFamily(grandChildFamily);

  it('should return brothers of male', function() {
    const
        expected =  [otherSon],
        actual   = relationships.brothersOf('Son');
    assert.deepEqual(actual, expected);
  });

  it('should return brothers of female', function() {
    const
        expected = [son, otherSon],
        actual   = relationships.brothersOf('Daughter');
    assert.deepEqual(actual, expected);
  });

  it('should return sisters of male', function() {
    const
        expected = [daughter, otherDaughter],
        actual   = relationships.sistersOf('Son');
    assert.deepEqual(actual, expected);
  });

  it('should return sisters of female', function() {
    const
        expected = [otherDaughter],
        actual   = relationships.sistersOf('Daughter');
    assert.deepEqual(actual, expected);
  });

});