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
      daughtersDaughter= new Person('DaughtersDaughter', false),

      sonsWife = new Person('SonsWife', false),
      sonsSon  = new Person('SonsSon', true),

      otherSonsWife = new Person('OtherSonsWife', false),
      otherSonsDaughter  = new Person('OtherSonsDaughter', false),

      rootFamily       = new Family(grandDad, grandMom, [dad]),
      childFamily      = new Family(dad, mom, [son, daughter, otherSon, otherDaughter]),
      grandChildFamily = new Family(daughtersHubby, daughter, [daughtersSon, daughtersDaughter]),
      sonsFamily       = new Family(son, sonsWife, [sonsSon]),
      otherSonsFamily  = new Family(otherSon, otherSonsWife, [otherSonsDaughter]),

      familyTree       = new FamilyTree(rootFamily),
      relationships    = new Relationships(familyTree);

  familyTree.addFamily(childFamily);
  familyTree.addFamily(grandChildFamily);
  familyTree.addFamily(sonsFamily);
  familyTree.addFamily(otherSonsFamily);

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

  it('should return grand daughters', function() {
    const
        expected = [daughtersDaughter, otherSonsDaughter],
        actual   = relationships.grandDaughterOf('Mom');
    assert.deepEqual(actual, expected);
  });

  it('should return daughters', function() {
    const
        expected = [daughtersDaughter],
        actual   = relationships.daughtersOf('Daughter');
    assert.deepEqual(actual, expected);
  });

  it('should return sons', function() {
    const
        expected = [son, otherSon],
        actual   = relationships.sonsOf('Mom');
    assert.deepEqual(actual, expected);
  });

  it('should return children', function() {
    const
        expected = [son, daughter, otherSon, otherDaughter],
        actual   = relationships.childrenOf('Dad');
    assert.deepEqual(actual, expected);
  });

  it('should return mother', function() {
    const
        expected = mom,
        actual   = relationships.motherOf('OtherSon');
    assert.deepEqual(actual, expected);
  });

  it('should return father', function() {
    const
        expected = daughtersHubby,
        actual   = relationships.fatherOf('DaughtersDaughter');
    assert.deepEqual(actual, expected);
  });

  it('should return paternal uncles', function() {
    const
        expected = [otherSon],
        actual   = relationships.paternalUnclesOf('SonsSon');
    assert.deepEqual(actual, expected);
  });

  it('should return maternal uncles', function() {
    const
        expected = [son, otherSon],
        actual   = relationships.maternalUnclesOf('DaughtersDaughter');
    assert.deepEqual(actual, expected);
  });

  it('should return maternal aunts', function() {
    const
        expected = [otherDaughter],
        actual   = relationships.maternalAuntsOf('DaughtersDaughter');
    assert.deepEqual(actual, expected);
  });

  it('should return paternal aunts', function() {
    const
        expected = [daughter, otherDaughter],
        actual   = relationships.paternalAuntsOf('OtherSonsDaughter');
    assert.deepEqual(actual, expected);
  });

  it('should return maternal cousins', function() {
    const
        expected = [sonsSon, otherSonsDaughter],
        actual   = relationships.cousinsOf('DaughtersDaughter');
    assert.deepEqual(actual, expected);
  });

  it('should return paternal cousins', function() {
    const
        expected = [daughtersSon, daughtersDaughter, otherSonsDaughter],
        actual   = relationships.cousinsOf('SonsSon');
    assert.deepEqual(actual, expected);
  });

  it('should return wives of brothers in sister-in-laws', function() {
    const
        expected = [sonsWife, otherSonsWife],
        actual   = relationships.sisterInLawsOf('OtherDaughter');
    assert.deepEqual(actual, expected);
  });


  it('should return sisters of husband in sister-in-laws', function() {
    const
        expected = [daughter, otherDaughter],
        actual   = relationships.sisterInLawsOf('SonsWife');
    assert.deepEqual(actual, expected);
  });

  it('should return sisters of wife in sister-in-laws', function() {
    const
        expected = [otherDaughter],
        actual   = relationships.sisterInLawsOf('DaughtersHubby');
    assert.deepEqual(actual, expected);
  });

});