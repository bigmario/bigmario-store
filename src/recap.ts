const suma = (a: number, b: number) => {
  return a + b;
};

suma(12, 12);

class Persona {
  constructor(private age: number, private name: string) {
    this.age = age;
    this.name = name;
  }

  getSummary() {
    return `My name is ${this.name}, with ${this.age}`;
  }
}

const mario = new Persona(42, 'Mario');

mario.getSummary();
