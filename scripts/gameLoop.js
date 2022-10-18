export { gameLoop, ctxH1, ctxH2 };
import { levelData } from "./mobInfo.js";
import { player, mob, polyMob, starMob, squareMob, splitter, butFly, teleport, tether, bullet, bulletUp, bulletDown, bulletAngle } from "./mobClass.js";

let ctx = gameCanvas.getContext("2d", { willReadFrequently: true });
let ctxH1 = hit1.getContext("2d", { willReadFrequently: true });
let ctxH2 = hit2.getContext("2d", { willReadFrequently: true });

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
    this.numWaves = 5;    // remove, tie waves load to array length
    this.bossTime = false;
    this.levelData = new levelData();

    this.pressedKeys = { up: false, down: false, left: false, right: false, space: false, p: false };
    this.upDownKeys = [];
    this.leftRightKeys = [];
    document.addEventListener("keydown", this.keyDown.bind(this));
    document.addEventListener("keyup", this.keyUp.bind(this));
    this.mainLoop = this.mainLoop.bind(this);

  }

  mainLoop() {
    //check time of frame start
    this.frameStart = performance.now();

    // check mob/bullet deletion
    this.eliminateObj(this.playerBulletArray);
    this.eliminateObj(this.mobBulletArray);
    this.eliminateObj(this.mobArray);

    // check if mob load needed
    this.mobLoader();

    // check if boss load needed

    // Check player inputs

    // update player position 
    this.player.updateBaseVal(this.pressedKeys, this.playerBulletArray, this.leftRightKeys, this.upDownKeys);
    this.player.updateVerts();


    // update mob positions
    this.updatePosition(this.mobArray, this.mobBulletArray);

    // update bullet positions
    this.updateBulletPositions(this.playerBulletArray);
    this.updateBulletPositions(this.mobBulletArray);


    // check mob bullets against player
    this.testPlayerObjCol(this.player, this.mobBulletArray);

    // resolve hits and setup for next frame

    // check player bullets against mobs
    this.testPlayerMBulletCol(this.playerBulletArray, this.mobArray);
    // resolve hits and setup for next frame

    // check mobs against player
    this.testPlayerObjCol(this.player, this.mobArray);
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
    this.drawBulletFromArray(this.mobBulletArray);

    // draw player
    this.player.drawShape();

    // draw info
    this.drawInfo(this.player, this.level, this.wave);


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

  updatePosition(array, mobBulletArray) {
    if (array.length > 0) {
      for (let i = 0; i < array.length; i++) {
        array[i].updateBaseVal(this.player, mobBulletArray);
        array[i].updateDeltaToPlayer(this.player);
        array[i].updateVerts();
      }
    }
  }

  updateDraw(array) {
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

  drawInfo(player, level, wave) {
    let health = (player.genus - 3);
    let xVal = 15
    if (health > 0) {
      for (let i = 1; i <= health; i++) {
        //ctx.rect(xVal, 580, 20, 10);
        ctx.lineWidth = 4;
        ctx.lineJoin = 'round'
        ctx.strokeStyle = 'rgba(245, 191, 79, 1)';
        ctx.beginPath();
        ctx.arc(xVal, 585, 5, Math.PI * .5, Math.PI * 1.5);
        ctx.lineTo(xVal + 10, 580);
        ctx.arc(xVal + 10, 585, 5, Math.PI * 1.5, Math.PI * .5);
        ctx.closePath();
        ctx.stroke();
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'rgba(199, 53, 40, 1)';
        ctx.stroke();
        xVal += 25;
      }
    }

  }


  keyDown(event) {
    //up
    if (event.keyCode == 38) {
      if (!(this.upDownKeys.includes(-1))) {
        this.upDownKeys.unshift(-1);
      }
      // this.pressedKeys.up = true;
      // this.pressedKeys.down = false;
      //console.log('up');
    }
    //down
    if (event.keyCode == 40) {
      if (!(this.upDownKeys.includes(1))) {
        this.upDownKeys.unshift(1);
      }

      // this.pressedKeys.down = true;
      // this.pressedKeys.up = false;
      //console.log('down');
    }
    //left
    if (event.keyCode == 37) {
      if (!(this.leftRightKeys.includes(-1))) {
        this.leftRightKeys.unshift(-1);
      }
      //this.pressedKeys.left = true;
      //this.pressedKeys.right = false;
      //console.log('left');
    }
    //right
    if (event.keyCode == 39) {
      if (!(this.leftRightKeys.includes(1))) {
        this.leftRightKeys.unshift(1);
      }
      // this.pressedKeys.right = true;
      // this.pressedKeys.left = false;
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
      if (this.upDownKeys[0] == -1) {
        this.upDownKeys.shift();
      }
      if (this.upDownKeys[1] == -1) {
        this.upDownKeys.pop();
      }
      //this.pressedKeys.up = false;
      //console.log('!');
    }
    //down
    if (event.keyCode == 40) {
      if (this.upDownKeys[0] == 1) {
        this.upDownKeys.shift();
      }
      if (this.upDownKeys[1] == 1) {
        this.upDownKeys.pop();
      }
      //this.pressedKeys.down = false;
      //console.log('!');
    }
    //left
    if (event.keyCode == 37) {
      if (this.leftRightKeys[0] == -1) {
        this.leftRightKeys.shift();
      }
      if (this.leftRightKeys[1] == -1) {
        this.leftRightKeys.pop();
      }
      //this.pressedKeys.left = false;
      //console.log('!');
    }
    //right
    if (event.keyCode == 39) {
      if (this.leftRightKeys[0] == 1) {
        this.leftRightKeys.shift();
      }
      if (this.leftRightKeys[1] == 1) {
        this.leftRightKeys.pop();
      }
      //this.pressedKeys.right = false;
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
      for (let i = array.length - 1; i >= 0; --i) {
        if (array[i].eliminate == true) {
          array.splice(i, 1);
          //console.log(array);
        }
      }
    }
  }

  mobPopper() {
    let x = Math.floor(Math.random() * this.mobArray.length);
    this.mobArray[x].eliminate = true;
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

    if (this.mobArray.length < 4 && this.wave <= (this.numWaves - 1)) { //wave = last wave loaded
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

    if (this.mobArray.length == 0 && this.wave == this.numWaves) {
      console.log('So, so, so good!!!');
    }
  }

  mobFactory(array) {
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

  collisionTest(objA, objB) {
    if (objA.invincible > 0 || objB.invincible > 0) {
      return;
    }

    let range = (objA.hitTestOffset + objB.hitTestOffset)
    let deltaX = (objB.cenX - objA.cenX)
    if ((Math.abs(deltaX)) >= range) {
      //console.log('Failed X test');
      return;
    }
    let deltaY = (objB.cenY - objA.cenY);
    if ((Math.abs(deltaY)) >= range) {
      //console.log('Failed Y test');
      return;
    }

    ctxH1.clearRect(0, 0, 81, 81);
    ctxH2.clearRect(0, 0, 81, 81);

    let xTransform = (objA.cenX - 40);
    let yTransform = (objA.cenY - 40);

    ctxH1.beginPath();
    ctxH1.lineJoin = 'round';
    ctxH1.strokeStyle = 'rgba(100, 100, 100, 1)';
    ctxH1.fillStyle = 'rgba(100, 100, 100, 1)';
    ctxH1.lineWidth = 3;
    for (let i = 0; i < objA.vertArray.length; i++) {
      ctxH1.lineTo((objA.vertArray[i].x - xTransform), (objA.vertArray[i].y - yTransform));
    }
    ctxH1.closePath();
    ctxH1.fill();
    ctxH1.stroke();


    ctxH2.beginPath();
    ctxH2.lineJoin = 'round';
    ctxH2.strokeStyle = 'rgba(100, 100, 100, 1)';
    ctxH2.fillStyle = 'rgba(100, 100, 100, 1)';
    ctxH2.lineWidth = 3;
    for (let i = 0; i < objB.vertArray.length; i++) {
      ctxH2.lineTo((objB.vertArray[i].x - xTransform), (objB.vertArray[i].y - yTransform));
    }
    ctxH2.closePath();
    ctxH2.fill();
    ctxH2.stroke();


    let imData1 = ctxH1.getImageData(0, 0, 81, 81);
    let imData2 = ctxH2.getImageData(0, 0, 81, 81);

    // ctxH1.clearRect(0, 0, 81, 81);
    // ctxH2.clearRect(0, 0, 81, 81);

    for (let i = 0; i < imData1.data.length; i += 4) {
      if (imData1.data[i] > 0 && imData2.data[i] > 0) {
        //console.log('Hit at...');
        console.log(i);
        if (objA.genus > 3) {
          objA.genus--;
          objA.invincible = 30;
        } else {
          objA.eliminate = true;
        }
        if (objB.genus > 3) {
          objB.genus--;
          objB.invincible = 30;
        } else {
          objB.eliminate = true;
        }
        break;
      }
    }

  }

  testPlayerObjCol(player, array) {
    for (let i = 0; i < array.length; i++) {
      this.collisionTest(player, array[i]);
    }
  }
  testPlayerMBulletCol(playerBulletArray, mobArray) {
    for (let i = 0; i < playerBulletArray.length; i++) {
      for (let j = 0; j < mobArray.length; j++) {
        this.collisionTest(playerBulletArray[i], mobArray[j]);
      }
    }
  }
}