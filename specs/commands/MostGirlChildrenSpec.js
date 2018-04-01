const
    assert = require('assert'),
    MostGirlChildren = require('../../src/commands/MostGirlChildren');

describe('MostGirlChildren', ()=> {
  it('should add son to a mother', ()=> {
    const
        relationships = {
          motherWithMostDaughter: () => {
            return [{name: 'mother1'}, {name: 'mother2'}]
          }
        },
        mostGirlChildren = new MostGirlChildren(relationships),
        input = 'Most Girl Children',
        expected = 'mother1,mother2',
        actual = mostGirlChildren.execute(input);

    assert.equal(mostGirlChildren.appliesTo(input), true);
    assert.equal(actual, expected);
  });

});