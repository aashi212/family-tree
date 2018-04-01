const
    assert = require('assert'),
    FindRelative = require('../../src/commands/FindRelative');

describe('Find Relative Command', ()=> {
  it('should not raise errors for invalid commands', ()=> {
    const
        relationships = {},
        findRelative  = new FindRelative(relationships),
        invalidCommands = [
          '',
          'Person = person; Relations = ',
          'Person = ; Relation = ',
          'Person; Relation',
          'Relation',
          'Person',
        ],
        actual    = invalidCommands.reduce((applies, command) => applies || findRelative.appliesTo(command), false);

    assert.equal(actual, false);
  });

  it('should handle errors in relationship lookups', ()=> {
    const
        relationships = {
          motherOf: (personId)=> {if(personId === 'person') throw 'Error'}
        },
        findRelative  = new FindRelative(relationships),
        command   = 'Person = person; Relation = Mother',
        expected  = 'invalid command',
        actual    = findRelative.execute(command);

    assert.equal(findRelative.appliesTo(command), true);
    assert.equal(actual, expected);
  });

  describe('find relationships', ()=>{
    const
        relationships = {
          motherOf    : (personId)=> {if(personId === 'person') return {name: 'mothername'}},
          fatherOf    : (personId)=> {if(personId === 'person') return {name: 'fathername'}},
          brothersOf  : (personId)=> {if(personId === 'person') return [{name: 'bro1'}, {name: 'bro2'}]},
          sistersOf   : (personId)=> {if(personId === 'person') return [{name: 'sis1'}, {name: 'sis2'}]},
          daughtersOf : (personId)=> {if(personId === 'person') return [{name: 'dught1'}, {name: 'dught2'}]},
          sonsOf      : (personId)=> {if(personId === 'person') return [{name: 'son1'}, {name: 'son2'}]},
          childrenOf  : (personId)=> {if(personId === 'person') return [{name: 'child1'}, {name: 'child2'}]}
        },
        findRelative  = new FindRelative(relationships),
        specs = [
          {
            name    : 'should find mother',
            command : 'Person = person; Relation = Mother',
            expected: 'mothername',
          },
          {
            name    : 'should find father',
            command : 'Person = person; Relation = father',
            expected: 'fathername',
          },
          {
            name    : 'should find brothers',
            command : 'Person = person; Relation = Brothers',
            expected: 'bro1,bro2',
          },
          {
            name    : 'should find sisters',
            command : 'Person = person; Relation = sisters',
            expected: 'sis1,sis2',
          },{
            name    : 'should find daughters',
            command : 'Person = person; Relation = daughters',
            expected: 'dught1,dught2',
          },{
            name    : 'should find sons',
            command : 'Person = person; Relation = sons',
            expected: 'son1,son2',
          },{
            name    : 'should find children',
            command : 'Person = person; Relation = children',
            expected: 'child1,child2',
          },
        ];

    specs.forEach(spec => {
      it(spec.name, () => {
        assert.equal(findRelative.appliesTo(spec.command), true);
        assert.equal(findRelative.execute(spec.command), spec.expected);
      });
    });

  });

});