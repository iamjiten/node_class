// let num1 = 10;
// num1 = 20;
var Person = /** @class */ (function () {
    function Person(age) {
    }
    Person.prototype.sayHello = function () {
        console.log("name: " + this.name);
        console.log("Hello world");
    };
    Person.prototype.add = function (num1, num2) {
        return num1 + num2;
    };
    // info(data: IPersonInfo) {
    //   console.log(`Address: ${data.address}`);
    //   console.log(`Phone: ${data.phone}`);
    //   console.log(`Age: ${data.age}`);
    //   console.log(`Education: ${data.education}`);
    // }
    Person.prototype.info = function (data) {
        var address = data.address, phone = data.phone, age = data.age, education = data.education;
        console.log("Address: " + address);
        console.log("Phone: " + phone);
        console.log("Age: " + age);
        console.log("Education: " + education);
    };
    return Person;
}());
var clsObj = new Person(23);
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
var personInfo = {
    address: "Imadole",
    phone: 121212,
    age: 20,
    education: "SEE"
};
clsObj.info(personInfo);
