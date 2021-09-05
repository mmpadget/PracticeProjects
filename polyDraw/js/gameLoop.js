export { gameLoop, };
import { levelData } from "./mobInfo.js";
import { player, mob, polyMob, starMob, squareMob, splitter, butFly, teleport, tether, bullet, bulletUp, bulletDown, bulletAngle } from "./mobClass.js";

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
    this.mobBulletArray = [];
    this.playerBulletArray = [];
    this.backgroundItems = [];

    this.level = 1;
    this.wave = 1;
    this.numWaves = 5;
    this.bossTime = false;
    this.levelData = new levelData();

    this.pressedKeys = {up: false, down: false, left: false, right: false, space: false, p: false};
    
    document.addEventListener("keydown", this.keyDown.bind(this));
    document.addEventListener("keyup", this.keyUp.bind(this));
    this.mainLoop = this.mainLoop.bind(this);

  }

  mainLoop () {
    //check time of frame start
    this.frameStart = performance.now();
    
    // check mob/bullet deletion
    this.eliminateObj(this.playerBulletArray);
    this.eliminateObj(this.mobArray);

    // check if mob load needed
    this.mobLoader();

    // Check player inputs

    // update player position 
    this.player.updateBaseVal(this.pressedKeys, this.playerBulletArray);
    this.player.updateVerts();
    

    // update mob positions
    this.updatePosition(this.mobArray);

    // update bullet positions
    this.updateBulletPositions(this.playerBulletArray);
    this.updateBulletPositions(this.mobBulletArray);

    // check mob bullets against player
      // resolve hits and setup for next frame

    // check player bullets against mobs
      // resolve hits and setup for next frame

    // check mobs against player
      // resolve hits and setup for next frame
    
    // clear canvas
    ctx.clearRect(0, 0, 600, 600);
    
    // draw background

    // draw background flair

    // draw shadows
    //this.drawShadow(this.player);
    this.drawShadow(this.mobArray);

    // draw mobs
    this.updateDraw(this.mobArray);

    // draw bullets
    this.drawBulletFromArray(this.playerBulletArray);
    //this.bulletTest.drawBullet();

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
    if (array.length > 0) {
      for (let i = 0; i < array.length; i++) {
        array[i].updateBaseVal(this.player);
        array[i].updateDeltaToPlayer(this.player);
        array[i].updateVerts();
      }
    }
  }

  updateDraw (array) {
    for (let i = 0; i < array.length; i++) {
      array[i].drawShape();
    }
  }

  updateBulletPositions(array) {
    if (array.length > 0) {
      for (let i = 0; i < array.length; i++) {
        array[i].updateBaseVal();
        array[i].updateVerts();
      }
    }
  }

  drawBulletFromArray(array) {
    if (array.length > 0) {
      for (let i = 0; i < array.length; i++) {
        array[i].drawBullet();
      }
    }
  }

  keyDown(event) {
    //up
    if (event.keyCode == 38) {
      this.pressedKeys.up = true;
      this.pressedKeys.down = false;
      //console.log('up');
    }
    //down
    if (event.keyCode == 40) {
      this.pressedKeys.down = true;
      this.pressedKeys.up = false;
      //console.log('down');
    }
    //left
    if (event.keyCode == 37) {
      this.pressedKeys.left = true;
      this.pressedKeys.right = false;
      //console.log('left');
    }
    //right
    if (event.keyCode == 39) {
      this.pressedKeys.right = true;
      this.pressedKeys.left = false;
      //console.log('right');
    }
    //space
    if (event.keyCode == 32) {
      this.pressedKeys.space = true;
      //console.log('space');
    }
    //p key
    if (event.keyCode == 80) {
      this.pressedKeys.p = true;
      console.log('p');
    }
  }
  
  keyUp(event) {
    //up
    if (event.keyCode == 38) {
      this.pressedKeys.up = false;
      //console.log('!');
    }
    //down
    if (event.keyCode == 40) {
      this.pressedKeys.down = false;
      //console.log('!');
    }
    //left
    if (event.keyCode == 37) {
      this.pressedKeys.left = false;
      //console.log('!');
    }
    //right
    if (event.keyCode == 39) {
      this.pressedKeys.right = false;
      //console.log('!');
    }
    //space
    if (event.keyCode == 32) {
      this.pressedKeys.space = false;
      //console.log('!');
    }
    //p key
    if (event.keyCode == 80) {
      this.pressedKeys.p = false;
      console.log('!');
      this.mobPopper();
    }
  }

  eliminateObj(array) {
    if (array.length > 0) {
      for (let i = array.length -1; i >= 0; --i) {
        if (array[i].eliminate == true) {
          array.splice(i, 1);
          console.log(array);
        }
      }
    }
  }

  // var a = i++; // return i, then iterate i
  // var a = ++i; // iterate i, return iterated i value
  // while (cond) { // do stuff and maybe modify some var that's part of cond }
  // do { // do stuff } while (cond)
  mobPopper() {
    let x = Math.floor(Math.random() * this.mobArray.length);
    this.mobArray[x].eliminate = true;
    //this.mobArray.splice(x, 1);
    //console.log(this.mobArray);
  }

  mobLoader() {
    if (this.levelStart == true) {
      let tempArray = [];
      for (let i = 0; i < this.levelData['level_' + this.level].wave1.length; i++) {
        let array = this.levelData['level_' + this.level].wave1[i];
        tempArray.push(this.mobFactory(array));
      }
      this.mobArray = tempArray;
      this.levelStart = false;
      this.mobArray.sort((a, b) => a.zStack - b.zStack);
    }

    if (this.mobArray.length < 4 && this.wave <= (this.numWaves -1)) { //wave = last wave loaded
      this.wave++;  //wave = wave to be loaded
      let tempArray = [];
      for (let i = 0; i < this.levelData['level_' + this.level]['wave' + this.wave].length; i++) {
        let array = this.levelData['level_' + this.level]['wave' + this.wave][i];
        tempArray.push(this.mobFactory(array));
      }
      this.mobArray = this.mobArray.concat(tempArray);
      this.mobArray.sort((a, b) => a.zStack - b.zStack);
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

  drawShadow(array) {
    if (array.length > 0) {
      ctx.translate(20, 20);
      //ctx.filter = 'blur(4px)';
      for (let i = 0; i < array.length; i++) {
        ctx.beginPath();
        ctx.lineJoin = 'round';
        ctx.strokeStyle = 'rgba(100, 100, 100, .4)';
        ctx.fillStyle = 'rgba(100, 100, 100, .4)';
        ctx.lineWidth = 3;
        for (let j = 0; j < array[i].vertArray.length; j++) {
          ctx.lineTo(array[i].vertArray[j].x, array[i].vertArray[j].y)
        }
        ctx.closePath();
        ctx.fill();
        //ctx.stroke();
      }
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.filter = 'none';
    }
  }
}