let name="Hansiga"
const age=20
var country="India"

var c=5+6
console.log(c)
var d=5-6
console.log(d)
var e=5*6
console.log(e)
var f=5/6
console.log(f)
var g=5
var h=6
console.log(g>=h)

//logical concepts
var x=true
var y=false
console.log(x&&y)
console.log(x||y) 
console.log(!x) 

//Usage of === checks both the value and data type
var i=5
var j="5"
console.log(i===j)

//simple function with call
function greet(name) {
    console.log("Hello, " + name + "!");
}
greet("Hansiga");


//age is major or minor
function checkAge(age) {
    if (age >= 18) {
        console.log("You are an adult.");
    } else {
        console.log("You are a minor.");
    }
}
checkAge(20);

//for loop example
for (let i = 0; i < 5; i++) {
    console.log("Iteration: " + i);
}   

let fruits = ["Apple", "Banana", "Cherry"];
let car={brand:"Toyota", model:"Corolla", year:2020};
console.log(fruits);
console.log(car.model);

//hoisting
var z;
console.log(z);
var z= 10;

//null and undefined
var a = null;
var b;
console.log(a);
console.log(b);

//switch condition
var fruit = "Cherry";
switch (fruit) {
    case "Apple":
        console.log("Apple is selected");
        break;
    case "Banana":
        console.log("Banana is selected");
        break;
    case "Cherry":
        console.log("Cherry is selected");
        break;
    default:
        console.log("Another fruit selected");
}

let person={
    firstName:"hansiga",
    age:20,
    city:"India"
}
for (let key in person) {
    console.log(key + ": " + person[key]);
}

//ternary operator
var age1=20
age1>=18 ? console.log("allowed.") : console.log("not allowed.");

//arrow function
const greet1 =(name)=>{
    return `Hello, ${name}!`;
}
console.log(greet1("Prakaash"));

//spread operator
let num=[1,2,3]
let num1=[4,5,6]
let combined=[...num,...num1]
console.log(combined);

let object={name:"Hansiga", age:20,country:"India"}
let object1={name:"Prakaash",age:40,city:"Erode"}
let combinedObject={...object,...object1}
console.log(combinedObject);


//array destructuring
const num2=[1,2,3]
const [a1,b1,c1]=num2;
console.log(a1,b1,c1);

const [first, ,third]=num2;
console.log(first,third);

const[x1,y1,...rest]=num2;
console.log(x1,y1);
console.log(rest);

//object destructuring 
const person1={name1:"Hansiga", age2:20, city1:"Erode"}
const{name1,age2}=person1;
console.log(name1,age2);


//map is used like for loop 
//filter , means condition based 
//reduced gives us single value from multiple values
const numbers=[1,2,3,4,5]
const mapped=numbers.map((num)=>num*2)
console.log("Mapped:",mapped)
const filtered=numbers.filter((num)=>num%2==0)
console.log("Filtered:",filtered)
const sum=numbers.reduce((accumulator,current)=>accumulator+current,0)
console.log("Sum:",sum)

//rest paramters
function sum1(...numbers){
    return numbers.reduce((accumulator,current)=>accumulator+current,0) 
}   
console.log(sum1(1,2,3,4,5))

const arr=[1,2,3];
arr.push(4);
console.log(arr);
arr.push(5,6);
console.log(arr);
arr.pop();
//shift and unshift
arr.shift();
console.log(arr);
arr.unshift(0);
console.log(arr);

let str="Hello World"
console.log(str.length)
console.log(str.charAt(0))
let str1="Hansi"
let str2="ga"   
let fullName=str1.concat(str2)
console.log(fullName)
console.log(str.includes("World"))
console.log(str.indexOf("o"))
console.log(str.substring(0,5))
console.log(str.trim())
console.log(str.toUpperCase())
console.log(str.toLowerCase())

