class Person{
  constructor(name, isMale){
    this.id     = name.toLowerCase();
    this.name   = name;
    this.isMale = isMale;
  }

  equals(person){
    return this.id === person.id;
  }

  is(personId){
    return this.id === personId.toLowerCase();
  }

  static unknown(){
    return {... new Person(''),is : personId => false, equals: person =>  false };
  }
}

module.exports = Person;