// user define function

// 1. non return
// 2. return function
// 3. params function with no return
// 4. params function with return
// 5. non param

// syntax

// function func_name() {
//     function body
// }

// call a function
// func_name()

// function sayHello() {
//   console.log("Hello world");
// }

// sayHello();

// param function
// syntax
// function func_name(param1, param2, ....){
//   function body
// }

// call param function
// func_name(param1_value, param2_value, ...)

// function sayHello(name) {
//   // console.log("Hello " + name);
//   console.log(`Hello ${name}`);
// }

// sayHello("Jiten");

// function logNameAge(name, age) {
//   console.log(`Hello ${name}. You are ${age} years old`);
// }

// logNameAge("Jiten", 20);

// return function with no params
// syntax
// function func_name() {
//   return something;
// }

// func_name();

// function returnFuncNoParams() {
//   return 102;
// }
// function returnFuncNoParams() {
//   return { name: "jiten", age: 25 };
// }

// // console.log(returnFuncNoParams());
// const result = returnFuncNoParams();
// console.log(result);

// return function with params
// syntax
// function func_name(param1, param2,...){
//   return body
//   // eg
//   // return {param1, param2}
// }
// func_name(param1_value, param2_value, ...)

// function returnFuncWithParams(name, age) {
//   return { name, age };
// }

// const result = returnFuncWithParams("jiten", 25);
// console.log(result);

// function returnFuncWithParams(name, age) {
//   return `Hello ${name}. You are ${age} years old`;
// }

// const result = returnFuncWithParams("jiten", 25);
// console.log(result);

// default value function
// function func_name(param1 = 'param1_value') {
//   function body
// }

// func_name()
// func_name(param1_value)

// function sayHello(name, age = 10) {
//   console.log(`Hello ${name}. you are ${age} years old`);
// }

// sayHello("jiten");
// sayHello("jiten", 25);

// const sayHello = (name, age = 10) => {
//   return `Hello ${name}. you are ${age} years old`;
// };
// console.log(sayHello("jiten"));

const sayHello = (name, age = 10) => `Hello ${name}. you are ${age} years old`;

console.log(sayHello("jiten"));

// checkout and new branch
// git checkout -b branch_name
// list branch
// git branch

// delete local branch
// git branch -D branch_name
