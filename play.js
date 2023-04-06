const { rejects } = require("assert");
const { resolve } = require("path");

let name = 'elon';

// console.log(name);


var name1 = 'john';
const age = 23;
var hashHobbies = true;
// age = 56;

function summarizeUser(userName, userAge, userHashHobby){
    return ('name is '+ userName + ', age is ' + userAge + ', and the user has hobbies: '+ userHashHobby );
}

// console.log(summarizeUser(name1, age, hashHobbies));


const person = {
    name: 'Elon',
    age: 24,
    greet (){
        console.log('Hi, I am ' + this.name);
    }
};

// person.greet();

const fruits = ['apple','mango'];

// for(let fruit of fruits) {
//     console.log(fruit);
// }

// console.log(fruits.map(fruit => 'fruit: ' + fruit));
// console.log(fruits);

fruits.push('orange');
// console.log(fruits);
fruits.pop('orange');
// console.log(fruits);

const fetchData = () => {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() =>{
            resolve('done!');
        }, 2000);
    });
    return promise;
};

setTimeout(() =>{
    console.log('timer is done!');
    fetchData()
    .then(text => {
        console.log(text);
        return fetchData();
    })
    .then(text2 =>{
        console.log(text2);
    });
}, 3000);

console.log('Hello!');
console.log('Hii!');
