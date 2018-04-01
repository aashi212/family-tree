const
    assert = require('assert'),
    AddChild = require('../../src/commands/AddChild');

describe('AddChild', ()=> {
  it('should add son to a mother', (done)=> {
    const
        relationships = {
          addSon: (motherId, childName) => {
            assert.equal(motherId, 'mother');
            assert.equal(childName, 'son');
            done();
          }
        },
        input = 'Mother = mother; son = son',
        addChild = new AddChild(relationships);

    assert.equal(addChild.appliesTo(input), true);
    addChild.execute(input);
  });

  it('should add daughter to a mother', (done)=> {
    const
        relationships = {
          addDaughter: (motherId, childName) => {
            assert.equal(motherId, 'mother');
            assert.equal(childName, 'daughter');
            done();
          }
        },
        input = 'Mother = mother; daughter = daughter',
        addChild = new AddChild(relationships);

    assert.equal(addChild.appliesTo(input), true);
    addChild.execute(input);
  });
});