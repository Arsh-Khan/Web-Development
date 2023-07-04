// 1. ways to print in js
console.log("Hello World", 10 + 6, "Hi");
// alert("me");
// document.write("This is document write");

// 2. javascript console api
console.warn("this is warning");
console.error("this is warning");
// console.clear();
console.assert(4 == 6);

// 3. Variables
// Containers to store data values
var number1 = 34;
var number2 = 56;
// console.log(number1+number2);

// 4. Datatypes in Js

// STrings
var str1="This is a string";
var str2='This is a string';

// NUmbers
var num1 = 455;
var num2 = 56.72;

// objects
var marks = {
    ravi:34,
    shubham:78,
    harry:99.887
};
// console.log(marks);

// boolean
var a =true;
var b = false;

// undefined or null
// var und;-->undefined!
var und = undefined;

var n = null;

// AT a very high level, there are two types of data types
// 1. Primitive datatypes : undefined,null,number,string,boolean,symbol
// 2. Reference data type : Arrays and object

// Array
var arr= [1,2,'string',3,45,5];
// console.log(arr);
// console.log(arr[2]);

// 5. Operators in Js

// Arithmetic operators
var a = 10;
var b = 100;

console.log(a+b);
console.log(a-b);
console.log(a*b);
console.log(a/b);

// Assignment operators
var c = b;
c+=2;
console.log(c);

// comparsion operator
var x = 34;
var y = 56;
console.log(x==y);
console.log(x>=y);
console.log(x<=y);
console.log(x!=y);

// logical operators
console.log(true && true);
console.log(true || false);
console.log(!true);

console.clear();


// 6. Functions
function avg(a,b){
    return (a+b)/2;
}
c1 = avg(1,2);
console.log(c1);

// 7. Conditionals in JS

var age = 34

// single if statement
// if(age>18){
//     console.log('You are not a kid')
// }

// if else statement
// if(age>18){
//     console.log('You are not a kid')
// }else{
//     console.log('You are a kid')
// }

// if else ladder
if(age>26){
    console.log('You are not a kid')
}
else if(age>2){
    console.log('Bacche nahi rahe')
}
else{
    console.log('Bachhe ho')
}

// 8. loops in Js
var arr= [1,2,3,45,5]
for(var i=0;i<arr.length;i++){
    console.log(arr[i])
}
console.clear()

arr.forEach(function(element){
    console.log(element)
})
console.log()

// const ac=0; // const variable 

let j = 0; // block level scope

// while(j<Array.length){
//     console.log(arr[j])
//     j++
// }

// do{
//     console.log(arr[j])
//     j++
// }while(j<arr.length)

for(var i=0;i<arr.length;i++){
    if(i==2){
        // break
        continue 
    }
    console.log(arr[i])
}

// 9. Array Methods
let myArr = ['Fan','Camera',34,null,true];
console.log(myArr.length);

myArr.pop()  // removing last element
myArr.push('harry') // adds element at last pos
myArr.shift() //removing first element
myArr.unshift('arsh') //adds element in first pos
myArr.toString() //converts array to string
// myArr.sort()  //converts the array to string and then sorts alphabetically

// 10. Strings Methods in Js
let str = "Arsh is a good boy good good"
console.log(str.length)
console.log(str.indexOf('good')) // first occurance
console.log(str.lastIndexOf('good')) // last occurance
console.log(str.slice(1,3)) //dosent include 3rd character
console.log(str.replace('Harry')) //first occurance replace

// 11. Dates in JS
myDate = new Date()
console.log(myDate)
console.log(myDate.getTime()) // in seconds
console.log(myDate.getFullYear())
console.log(myDate.getDay())
console.log(myDate.getMinutes())
console.log(myDate.getHours())


// 12. DOM Manipulation
let elem = document.getElementById('click');
console.log(elem);

let elemClass= document.getElementsByClassName('container');
console.log(elemClass);

// elementClass[0].style.background= "yellow";
elemClass[0].classList.add('bg-primary');
elemClass[0].classList.add('text-success');
// elemClass[0].classList.remove('text-success');

console.log(elem.innerHTML)
console.log(elem.innerText)

console.log(elemClass[0].innerHTML)
console.log(elemClass[0].innerText)

tn = document.getElementsByTagName('div')
console.log(tn)
createdElement = document.createElement('p')
createdElement.innerText = 'This is a created para'
tn[0].appendChild(createdElement);

createdElement2 = document.createElement('b')
createdElement2.innerText = 'This is a created bold'
tn[0].replaceChild(createdElement2,createdElement)

// removeChild(element); --> removes an element

// selecting using query
sel = document.querySelector('.container')
console.log(sel)

sel = document.querySelectorAll('.container')
console.log(sel)

window.onload = function(){
    console.log('the document was loaded')
}

function clicked(){
    console.log('the button was clicked')
}
// events in javascript

/*
firstContainer.addEventListener('click',function(){
    document.querySelectorAll('.container')[1].innerHTML = "<b> We have Clicked </br>"
    console.log('clicked on container')
})

firstContainer.addEventListener('mouseover',function(){
    console.log('Mouse on container')
})
firstContainer.addEventListener('mouseout',function(){
    console.log('Mouse out on container')
})

let prevHtml = document.querySelectorAll('.container')[1].innerHTML
firstContainer.addEventListener('mouseup',function(){
    document.querySelectorAll('.container')[1].innerHTML = prevHtml
    console.log('Mouse up on container')
})

firstContainer.addEventListener('mousedown',function(){
    document.querySelectorAll('.container')[1].innerHTML = "<b> We have Clicked </br>"
    console.log('Mouse down on container')
})
*/

// Arrow functions
sum = (a,b)=>{return a+b}

logKaro = ()=>{
    document.querySelectorAll('.container')[1].innerHTML = "<b> Set Interval Fired</br>"
    console.log("I am your log")}

// Set timeout ans set Interval

// setTimeout(logKaro,2000)
// clr = setInterval(logKaro,2000)

// Use clearInterval(Clr) / clearTimeout(clr) to cancel setInterval/ setTimeout

// clearInterval(clr) // clearInterval stops the interval


// Javascript local storage

localStorage.setItem('name','arsh')
// localStorage.getItem('name')
// localStorage.removeItem('name')
// localStorage.clear()

// JSON
obj = {name:'arsh',length:1, a:{this:"that"}};
jso = JSON.stringify(obj);

console.log(jso)
console.log(typeof jso) //string

parsed = JSON.parse(`{"name":"arsh","length":1, "a":{"this":"that"}}`)
console.log(parsed)

// Template literal
a = 34
console.log(`this is my ${a}`)