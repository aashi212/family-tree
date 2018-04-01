const
    assert = require('assert'),
    Person = require('../../src/models/Person'),
    FindRelation = require('../../src/commands/FindRelation'),
    female = name=> new Person(name, false),
    male = name=> new Person(name, true);

describe('Find Relation Command', ()=> {
  const
      relationships = {
        motherOf    : (personId)=> {if(personId === 'person') return female('mothername')},
        fatherOf    : (personId)=> {if(personId === 'person') return male('fathername')},
        brothersOf  : (personId)=> {if(personId === 'person') return [male('bro1'), male('bro2')]},
        sistersOf   : (personId)=> {if(personId === 'person') return [female('sis1'), female('sis2')]},
        daughtersOf : (personId)=> {if(personId === 'person') return [female('daught1'), female('daught2')]},
        sonsOf      : (personId)=> {if(personId === 'person') return [male('son1'), male('son2')]},
        grandDaughterOf  : (personId)=> {if(personId === 'person') return [female('grand-daughter1'), female('grand-daughter2')]},
        cousinsOf        : (personId)=> {if(personId === 'person') return [male('cousin1'), female('cousin2')]},
        brotherInLawsOf  : (personId)=> {if(personId === 'person') return [male('brow-law-1'), male('brow-law-2')]},
        sisterInLawsOf   : (personId)=> {if(personId === 'person') return [female('sis-law-1'), female('sis-law-2')]},
        maternalAuntsOf  : (personId)=> {if(personId === 'person') return [female('m-aunt-1'), female('m-aunt-2')]},
        paternalAuntsOf  : (personId)=> {if(personId === 'person') return [female('p-aunt-1'), female('p-aunt-2')]},
        maternalUnclesOf : (personId)=> {if(personId === 'person') return [male('m-uncle-1'), male('m-uncle-2')]},
        paternalUnclesOf : (personId)=> {if(personId === 'person') return [male('p-uncle-1'), male('p-uncle-2')]},
      },
      findRelative  = new FindRelation(relationships),
      specs = [
        {
          name    : 'should find mother',
          command : 'Person = person; Relative = mothername',
          expected: 'Mother',
        },
        {
          name    : 'should find father',
          command : 'Person = person; Relative = fathername',
          expected: 'Father',
        },
        {
          name    : 'should find brothers',
          command : 'Person = person; Relative = bro2',
          expected: 'Brother',
        },
        {
          name    : 'should find sisters',
          command : 'Person = person; Relative = sis2',
          expected: 'Sister',
        }
        ,{
          name    : 'should find daughters',
          command : 'Person = person; Relative = daught1',
          expected: 'Daughter',
        },
        {
          name    : 'should find sons',
          command : 'Person = person; Relative = son2',
          expected: 'Son',
        },
        {
          name    : 'should find grand daughter',
          command : 'Person = person; Relative = grand-daughter2',
          expected: 'Grand Daughter',
        },
        {
          name    : 'should find cousins',
          command : 'Person = person; Relative = cousin2',
          expected: 'Cousin',
        },
        {
          name    : 'should find brother in law',
          command : 'Person = person; Relative = brow-law-2',
          expected: 'Brother-in-law',
        },
        {
          name    : 'should find sister in law',
          command : 'Person = person; Relative = sis-law-2',
          expected: 'Sister-in-law',
        }
        ,{
          name    : 'should find maternal aunt',
          command : 'Person = person; Relative = m-aunt-2',
          expected: 'Maternal Aunt',
        }
        ,{
          name    : 'should find paternal aunt',
          command : 'Person = person; Relative = p-aunt-2',
          expected: 'Paternal Aunt',
        },
        {
          name    : 'should find maternal uncle',
          command : 'Person = person; Relative = m-uncle-2',
          expected: 'Maternal Uncle',
        },
        {
          name    : 'should find paternal uncle',
          command : 'Person = person; Relative = p-uncle-2',
          expected: 'Paternal Uncle',
        },
      ];
  specs.forEach(spec => {
    it(spec.name, () => {
      assert.equal(findRelative.appliesTo(spec.command), true);
      assert.equal(findRelative.execute(spec.command), spec.expected);
    });
  });


});