const
    assert = require('assert'),
    Family = require('../../src/models/Family');

describe('Family', function() {
  it('has children, wife and husband', function() {
    const
        husband = {name: 'daddy'},
        wife    = {name: 'mommy'},
        kidOne  = {name: 'kid1'},
        kidTwo  = {name: 'kid2'},

        family = new Family(husband, wife, [kidOne, kidTwo]);

    assert.equal(family.husband, husband);
    assert.equal(family.wife, wife);
    assert.deepEqual(family.children, [kidOne, kidTwo]);
  });
});