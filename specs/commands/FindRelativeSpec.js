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
        expected  = 'Failed to execute command.',
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
          childrenOf  : (personId)=> {if(personId === 'person') return [{name: 'child1'}, {name: 'child2'}]},
          grandDaughterOf  : (personId)=> {if(personId === 'person') return [{name: 'grand-daughter1'}, {name: 'grand-daughter2'}]},
          cousinsOf        : (personId)=> {if(personId === 'person') return [{name: 'cousin1'}, {name: 'cousin2'}]},
          brotherInLawsOf  : (personId)=> {if(personId === 'person') return [{name: 'brow-law-1'}, {name: 'brow-law-2'}]},
          sisterInLawsOf   : (personId)=> {if(personId === 'person') return [{name: 'sis-law-1'}, {name: 'sis-law-2'}]},
          maternalAuntsOf  : (personId)=> {if(personId === 'person') return [{name: 'm-aunt-1'}, {name: 'm-aunt-2'}]},
          paternalAuntsOf  : (personId)=> {if(personId === 'person') return [{name: 'p-aunt-1'}, {name: 'p-aunt-2'}]},
          maternalUnclesOf : (personId)=> {if(personId === 'person') return [{name: 'm-uncle-1'}, {name: 'm-uncle-2'}]},
          paternalUnclesOf : (personId)=> {if(personId === 'person') return [{name: 'p-uncle-1'}, {name: 'p-uncle-2'}]},
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
          },{
            name    : 'should find grand daughter',
            command : 'Person = person; Relation = grand daughter',
            expected: 'grand-daughter1,grand-daughter2',
          },{
            name    : 'should find cousins',
            command : 'Person = person; Relation = cousins',
            expected: 'cousin1,cousin2',
          },{
            name    : 'should find brother in law',
            command : 'Person = person; Relation = Brother-in-laws',
            expected: 'brow-law-1,brow-law-2',
          },{
            name    : 'should find sister in law',
            command : 'Person = person; Relation = Sister-in-laws',
            expected: 'sis-law-1,sis-law-2',
          },{
            name    : 'should find maternal aunt',
            command : 'Person = person; Relation = maternal aunt',
            expected: 'm-aunt-1,m-aunt-2',
          },{
            name    : 'should find paternal aunt',
            command : 'Person = person; Relation = paternal aunt',
            expected: 'p-aunt-1,p-aunt-2',
          },{
            name    : 'should find maternal uncle',
            command : 'Person = person; Relation = maternal uncle',
            expected: 'm-uncle-1,m-uncle-2',
          },{
            name    : 'should find paternal uncle',
            command : 'Person = person; Relation = paternal uncle',
            expected: 'p-uncle-1,p-uncle-2',
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