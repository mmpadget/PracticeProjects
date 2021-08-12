import { player, mob, polyMob, starMob, squareMob, splitter, butFly, teleport, tether } from "./mobClass.js";
import { gameLoop } from "./gameLoop.js";
//var ctx = gameCanvas.getContext("2d");

let player1 = new player();
console.log(player1);
player1.updateVerts();
player1.drawShape();
let mob1 = new polyMob(['polyMob', 150, 100, 5, 50, false]);
console.log(mob1);
mob1.updateVerts();
mob1.updateDeltaToPlayer(player1);
mob1.drawShape();
//mobClass:drawShape(mob1)
let mob2 = new starMob(['starMob', 200, 200, 5, 30, false]);
console.log(mob2);
mob2.updateVerts();
mob2.drawShape();
let mob3 = new squareMob(['squareMob', 500, 300, 10, 30, true]);
console.log(mob3);
mob3.updateVerts();
mob3.drawShape();

let gameLoop1 = new gameLoop();
document.addEventListener("keydown", gameLoop1.keyDown);
document.addEventListener("keyup", gameLoop1.keyUp);
gameLoop1.playerArray.push(player1);
gameLoop1.mobArray.push(mob1);
gameLoop1.mobArray.push(mob2);
gameLoop1.mobArray.push(mob3);
gameLoop1.mainLoop();
console.log(gameLoop1);
