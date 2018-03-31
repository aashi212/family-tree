const
    assert = require('assert'),
    Person = require('../../src/models/Person'),
    Family = require('../../src/models/Family');

describe('Family',()=> {
  const
      husband   = new Person('daddy', true),
      wife      = new Person('mommy', false),
      son       = new Person('son', true),
      daughter  = new Person('daughter', false) ,
      family    = new Family(husband, wife, [son, daughter]);

  it('has children, wife and husband', function() {
    assert.equal(family.husband, husband);
    assert.equal(family.wife, wife);
    assert.deepEqual(family.children, [son, daughter]);
  });

  it('matches family by fathers person id', function() {
    assert.equal(family.isOf('daddy'), true);
    assert.equal(family.isOf('not-daddy'), false);
  });

  it('matches family by mothers person id', function() {
    assert.equal(family.isOf('mommy'), true);
  });

  it('matches family by children id', function() {
    assert.equal(family.hasChild('son'), true);
    assert.equal(family.hasChild('daughter'), true);
    assert.equal(family.hasChild('someone'), false);
  });
});