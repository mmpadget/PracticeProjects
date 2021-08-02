import { player, mob, polyMob, starMob, squareMob, splitter, butFly, teleport, tether } from "./mobClass.js";

var ctx = gameCanvas.getContext("2d");
let x = 100;
let y = 100;
let test = [];


let mob1 = new polyMob(['polyMob', 100, 100, 5, 50, false]);
console.log(mob1);
mob1.updateVerts();
mob1.drawShape();
let mob2 = new starMob(['starMob', 200, 200, 6, 30, false]);
console.log(mob2);
mob2.updateVerts();
mob2.drawShape();
let mob3 = new squareMob(['squareMob', 300, 300, 10, 30, true]);
console.log(mob3);
mob3.updateVerts();
mob3.drawShape();
let player1 = new player();
console.log(player1);
player1.updateVerts();
player1.drawShape();

// console.log(test);
// test.push('A');
// test.push('B');
// console.log(test);
// test.push(100);
// test.push({x: 5, y: 10});
// test.push('C');
// console.log(test);


// ctx.beginPath();
// ctx.translate(.5, .5);
// ctx.strokeStyle = 'green';
// ctx.fillStyle = 'yellow';
// ctx.lineWidth = 3;
// ctx.moveTo(x, y);
// ctx.lineTo((x + 20), y);
// ctx.lineTo((x + 20), (y + 20));
// ctx.closePath();
// ctx.fill();
// ctx.stroke();

// var myPath = new Path2D(); 
// myPath.moveTo(50, 50); 
// myPath.lineTo(100, 100); 
// myPath.lineTo(0, 100); 
// myPath.lineTo(50, 50); 
// myPath.moveTo(50, 110); 
// myPath.lineTo(0, 60); 
// myPath.lineTo(100, 60); 
// myPath.lineTo(50, 110); 
// ctx.stroke(myPath);

// console.log(myPath);
// console.log(Path2D);
