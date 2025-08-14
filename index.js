// variables
// var
// let
// const

// var num = 10;
// var num2 = 20;

// let num = 10;
// const num2 = 20;

// +"1" alt soln parseInt(1)
// num = +"1";
// num2 = 30;

// var result = num + num2;

// console.log({ num, num2, result });

// const result = 70;

// if (result > 60) {
//   console.log(result + " is gt 60");
// } else {
//   console.log(result + " is lt 60");
// }

// // case 1:
// //   >= 70 => first
// //   case 2:
// //    69<=60, 60 >= 50. 50-69

// let message = "";
// if (result >= 70) {
//   message = " first ";
//   // console.log("First".toUpperCase());
// } else if (result >= 50) {
//   message = "second";
//   // console.log("second".toUpperCase());
// } else if (result >= 30) {
//   // console.log("Third".toUpperCase());
//   message = "third";
// } else {
//   message = "fail";
//   // console.log("Fail".toUpperCase());
// }

// // message = message.toUpperCase();
// message = message.charAt(0).toUpperCase() + message.slice(1);

// // let newMessage = message.slice(-1);

// const trimedValue = message.trim();
// console.log({ len: message.length, len1: trimedValue.length });

// console.log(message);

// let arr = [];
// let obj = {};

// let num = 10;
// let flt = 10.9;
// let str = "test";
// let boolvalue = true;

// console.log(typeof arr);
// console.log(typeof obj);
// console.log(typeof num);
// console.log(typeof flt);
// console.log(typeof str);
// console.log(typeof boolvalue);

// let arr = [10, 20, 5, 40, 10];

// for (let element of arr) {
//   // if (element == 40) console.log("40 exist");
//   console.log(element);
// }

// const exist = arr.includes(50);
// console.log(exist);

// arr.forEach((x) => {
//   if (x == 40) {
//     console.log("40 exist");
//   }
// });

// arr.map((x) => {
//   if (x == 40) {
//     console.log("40 exist");
//   }
// });

const arr1 = [10, 20, 5, 40, 30, 7, 6, 15];

const newArr = [];
let sum = 0;

arr1.map((x) => {
  if (x > 20) newArr.push(x);
  sum += x;
});

// const newArr = arr1.filter((x) => x > 20);

console.log({ arr1, newArr, sum });

const newSum = arr1.reduce((prev, curr) => prev + curr, 0);

console.log({ newSum });
console.log("hello");
