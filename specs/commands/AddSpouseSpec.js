const
    assert = require('assert'),
    AddSpouse = require('../../src/commands/AddSpouse');

describe('AddSpouse', ()=> {
  it('should add spouse to relationship tree', (done)=> {
    const
        relationships = {
          addSpouse: (husbandId, wifeId) => {
            assert.equal(husbandId, 'hubby');
            assert.equal(wifeId, 'wify');
            done();
          }
        },
        input = 'husband = hubby; wife = wify',
        addSpouse = new AddSpouse(relationships);

    assert.equal(addSpouse.appliesTo(input), true);
    addSpouse.execute(input);
  });

});