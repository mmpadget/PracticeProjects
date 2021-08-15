import { gameLoop } from "./gameLoop.js";


let gameLoop1 = new gameLoop();
// document.addEventListener("keydown", gameLoop1.keyDown.bind(gameLoop1));
// document.addEventListener("keyup", gameLoop1.keyUp.bind(gameLoop1));
 
gameLoop1.mainLoop();
console.log(gameLoop1);
console.log(gameLoop1.player);
console.log(gameLoop1.levelData);
console.log(gameLoop1.mobArray);