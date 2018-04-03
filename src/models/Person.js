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

  isUnknown(){
    return this.unknown;
  }
  static unknown(){
    return {... new Person(''),is : () => false, equals: () =>  false, isUnknown: ()=>true };
  }
}

module.exports = Person;