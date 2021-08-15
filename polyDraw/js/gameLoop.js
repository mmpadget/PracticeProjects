export { gameLoop, };
import { levelData } from "./mobInfo.js";
import { player, mob, polyMob, starMob, squareMob, splitter, butFly, teleport, tether } from "./mobClass.js";

let ctx = gameCanvas.getContext("2d");

class gameLoop {
  constructor() {
    this.frameStart = 0;
    this.frameEnd = 0;
    this.frameDelta = 0;
    this.frameWait = 0;
    this.fps = 60;
    this.frameTime = 1000 / this.fps;
    this.levelStart = true;

    this.player = new player;
    this.playerArray = [];
    this.mobArray = [];
    this.mobsOnDeck = [];
    this.mobBulletArray = [];
    this.playerBulletArray = [];
    this.backgroundItems = [];

    this.level = 1;
    this.wave = 1;
    this.numWaves = 5;
    this.bossTime = false;
    this.levelData = new levelData();

    this.pressedKeys = {up: false, down: false, left: false, right: false, space: false, p: false};
    
    this.mainLoop = this.mainLoop.bind(this);

    document.addEventListener("keydown", this.keyDown.bind(this));
    document.addEventListener("keyup", this.keyUp.bind(this));

  }

  mainLoop () {
    //check time of frame start
    this.frameStart = performance.now();
    
    // check mob deletion

    // check if mob load needed
    this.mobLoader();

    // Check player inputs

    // update player position 
    this.player.updateBaseVal(this.pressedKeys);
    this.player.updateVerts();

    // update mob positions
    this.updatePosition(this.mobArray);

    // update bullet positions

    // check mob bullets against player
      // resolve hits and setup for next frame

    // check player bullets against mobs
      // resolve hits and setup for next frame

    // check mobs against player
      // resolve hits and setup for next frame
    
    // clear canvas
    ctx.clearRect(0, 0, 600, 600);

    // draw mobs
    this.updateDraw(this.mobArray);

    // draw bullets

    // draw player
    this.player.drawShape();

    
    // check time elapsed from frame start
    this.frameEnd = performance.now();
    this.frameDelta = (this.frameEnd - this.frameStart);
    if (this.frameDelta < this.frameTime) {
      this.frameWait = (this.frameTime - this.frameDelta);
      //console.log(this.frameDelta);
      setTimeout(this.mainLoop, this.frameWait);
    }
    else {
      console.log('crap');
      setTimeout(this.mainLoop, 1);
    }
  }

  updatePosition (array) {
    for (let i = 0; i < array.length; i++) {
      array[i].updateBaseVal(this.player);
      array[i].updateDeltaToPlayer(this.player);
      array[i].updateVerts();
    }
  }

  updateDraw (array) {
    for (let i = 0; i < array.length; i++) {
      array[i].drawShape();
    }
  }

  keyDown(event) {              
    //up
    if (event.keyCode == 38) {
      this.pressedKeys.up = true;
      this.pressedKeys.down = false;
      console.log('up');
    }
    //down
    if (event.keyCode == 40) {
      this.pressedKeys.down = true;
      this.pressedKeys.up = false;
      console.log('down');
    }
    //left
    if (event.keyCode == 37) {
      this.pressedKeys.left = true;
      this.pressedKeys.right = false;
      console.log('left');
    }
    //right
    if (event.keyCode == 39) {
      this.pressedKeys.right = true;
      this.pressedKeys.left = false;
      console.log('right');
    }
    //space
    if (event.keyCode == 32) {
      this.pressedKeys.space = true;
      console.log('space');
    }
  }
  
  keyUp(event) {
    //up
    if (event.keyCode == 38) {
      this.pressedKeys.up = false;
      console.log('!');
    }
    //down
    if (event.keyCode == 40) {
      this.pressedKeys.down = false;
      console.log('!');
    }
    //left
    if (event.keyCode == 37) {
      this.pressedKeys.left = false;
      console.log('!');
    }
    //right
    if (event.keyCode == 39) {
      this.pressedKeys.right = false;
      console.log('!');
    }
    //space
    if (event.keyCode == 32) {
      this.pressedKeys.space = false;
      console.log('!');
      this.mobPopper();
    }
  }

  mobPopper() {
    let x = Math.floor(Math.random() * this.mobArray.length);
    this.mobArray.splice(x, 1);
    //console.log(this.mobArray);
  }

  mobLoader() {           //get rid of ondeck?  
    if (this.levelStart == true) {   //generalize levelStart
      let tempArray = [];
      for (let i = 0; i < this.levelData['level_' + this.level].wave1.length; i++) {
        let array = this.levelData['level_' + this.level].wave1[i];
        tempArray.push(this.mobFactory(array));
      }
      this.mobArray = tempArray;
      this.mobArray.sort((a, b) => a.zStack - b.zStack);

      tempArray = [];
      for (let i = 0; i < this.levelData['level_' + this.level].wave2.length; i++) {
        let array = this.levelData['level_' + this.level].wave2[i];
        tempArray.push(this.mobFactory(array));
      }
      this.mobsOnDeck = tempArray;
      this.levelStart = false;
      console.log(this.wave);
    }
    if (this.mobArray.length < 4 && this.wave < (this.numWaves -1)) { //says wave 1
      this.wave++;  //says 2 load 3 into ondeck
      this.mobArray = this.mobArray.concat(this.mobsOnDeck);
      this.mobArray.sort((a, b) => a.zStack - b.zStack);
      this.mobsOnDeck = [];

      let tempArray = [];
      let onDeckWave = this.wave + 1;
      for (let i = 0; i < this.levelData['level_' + this.level]['wave' + onDeckWave].length; i++) {
        let array = this.levelData['level_' + this.level]['wave' + onDeckWave][i];
        tempArray.push(this.mobFactory(array));
      }
      this.mobsOnDeck = tempArray;
      console.log(this.wave);
    }
    if (this.mobArray.length < 4 && this.wave == (this.numWaves - 1)) {
      this.wave++;
      this.mobArray = this.mobArray.concat(this.mobsOnDeck);
      this.mobArray.sort((a, b) => a.zStack - b.zStack);
      this.mobsOnDeck = [];
      console.log(this.wave);
    }
    if (this.mobArray.length == 0 && this.wave == this.numWaves){
      console.log('So, so, so good!!!');
    }
  }

  mobFactory (array) {
    let mob
    switch (array[0]) {
      case 'polyMob':
        mob = new polyMob(array);
        return mob;
      case 'starMob':
        mob = new starMob(array);
        return mob;
      case 'squareMob':
        mob = new squareMob(array);
        return mob;
    }
  }
}