// let num1 = 10;
// num1 = 20;

// let num1 = 10;
// let num2 = 20;
// const result = num1 + num2;
// console.log({ result });

// function sayHello() {
//   console.log("Hello world");
// }

// sayHello();

// function sayHello(name: string, age: number) {
//   console.log(`Hello ${name}. You are ${age} years old`);
// }

// sayHello("jiten", 10);

// function add(num1: number, num2: number): number {
//   return num1 + num2;
// }

// console.log(add(10, 15));

interface IPersonInfo {
  address: string;
  phone: number;
  age: number;
  education: string;
}

class Person {
  constructor(age: number) {}

  name: string;
  sayHello() {
    console.log(`name: ${this.name}`);
    console.log("Hello world");
  }

  add(num1: number, num2: number): number {
    return num1 + num2;
  }

  // info(data: IPersonInfo) {
  //   console.log(`Address: ${data.address}`);
  //   console.log(`Phone: ${data.phone}`);
  //   console.log(`Age: ${data.age}`);
  //   console.log(`Education: ${data.education}`);
  // }
  info(data: IPersonInfo) {
    const { address, phone, age, education } = data;
    console.log(`Address: ${address}`);
    console.log(`Phone: ${phone}`);
    console.log(`Age: ${age}`);
    console.log(`Education: ${education}`);
  }
}

const clsObj = new Person(23);

// clsObj.sayHello();
// clsObj.name = "Jiten";

// const result = clsObj.add(10, 23);

// console.log(result);

// const personInfo = {
//   address: "Imadole",
//   phone: 121212121,
//   age: 20,
//   education: "SEE",
// };

const personInfo: IPersonInfo = {
  address: "Imadole",
  phone: 121212,
  age: 20,
  education: "SEE",
};

clsObj.info(personInfo);
