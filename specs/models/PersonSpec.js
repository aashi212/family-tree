const
    assert = require('assert'),
    Person = require('../../src/models/Person');

describe('Person', ()=> {
  it('has name, id and gender', ()=> {
    const person = new Person('Ajay', true);

    assert.equal(person.id, 'ajay');
    assert.equal(person.name, 'Ajay');
    assert.equal(person.isMale, true);
  });

  it('equals to person with same id', ()=> {
    const
        personOne = new Person('Ajay', true),
        personTwo = new Person('Ajay', true);

    assert.equal(personOne.equals(personTwo), true);
  });

  it('matches person by id', ()=> {
    const
        personOne = new Person('Ajay', true);

    assert.equal(personOne.is('Ajay'), true);
  });
});