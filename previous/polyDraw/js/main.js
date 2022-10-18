import { gameLoop } from "./gameLoop.js";

// function testFunction1() {
//     console.log("Test one");
// }
// function testFunction2() {
//     console.log("Test two");
// }

// function switchFunction(variable) {
//     this['testFunction' + variable]();
// }
// let testVar = '1';

// switchFunction(testVar);


// class Primes {
//     constructor(number) {
//         this.number = number;
//         this.primeArray = [];
//     }

//     calc() {
//         for (let i = 1; i <= this.number; i++) {
//             if (i == 1) {
//                 console.log(i);
//             } else if (i == 2) {
//                 console.log(2);
//                 this.primeArray.push([0, 2]);
//             } else {
//                 let prime = true;
//                 for (let j = 0; j < this.primeArray.length; j++) {
//                     this.primeArray[j][0]++;
//                     if (this.primeArray[j][0] == this.primeArray[j][1]) {
//                         prime = false;
//                         this.primeArray[j][0] = 0;
//                     }
//                 };
//                 if (prime == true) {
//                     console.log(i);
//                     this.primeArray.push([0, i]);
//                 }
//             }
//         }
//         console.log('done');
//     }

// }

// let primesUpTo = new Primes(10);
// primesUpTo.calc();

let gameLoop1 = new gameLoop();

gameLoop1.mainLoop();
// console.log(gameLoop1);
// console.log(gameLoop1.player);
// console.log(gameLoop1.levelData);
// console.log(gameLoop1.mobArray);
// console.log(gameLoop1.playerBulletArray);