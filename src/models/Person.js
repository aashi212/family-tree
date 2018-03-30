class Person{
  constructor(name, isMale){
    this.id     = name;
    this.name   = name;
    this.isMale = isMale;
  }

  equals(person){
    return this.id === person.id;
  }
}

module.exports = Person;