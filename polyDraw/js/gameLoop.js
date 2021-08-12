export { gameLoop, };

let ctx = gameCanvas.getContext("2d");

class gameLoop {
  constructor() {
    this.frameStart = 0;
    this.frameEnd = 0;
    this.frameDelta = 0;
    this.frameWait = 0;
    this.fps = 60;
    this.frameTime = 1000 / this.fps;
    this.playerArray = [];
    this.mobArray = [];
    this.mobBulletArray = [];
    this.playerBulletArray = [];
    this.backgroundItems = [];
    this.level = 1;
    this.wave = 1;

    this.pressedKeys = {up: false, down: false, left: false, right: false, space: false, p: false};
    //this.addEventListener('keydown', keyDown);
    //this.addEventListener('keyup', keyUp);
    this.upPressed = false;
    this.downPressed = false;
    this.leftPressed = false;
    this.rightPressed = false;
    this.rightPressed = false;
  }

  mainLoop () {
    //check time of frame start
    this.frameStart = performance.now();
    
    // check if mob load needed

    // Check player inputs

    // update player position 
    this.updatePlayerPosition(this.playerArray);
    //player1.updateBaseVal();
    //player1.updateVerts();

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
    this.updateDraw(this.playerArray);

    
    // check time elapsed from frame start
    this.frameEnd = performance.now();
    this.frameDelta = (this.frameEnd - this.frameStart);
    if (this.frameDelta < this.frameTime) {
      this.frameWait = (this.frameTime - this.frameDelta);
      //console.log(this.frameDelta);
      // setTimeout(this.mainLoop, this.frameWait);         // This should work, but...
      setTimeout(this.mainLoop.bind(this), this.frameWait); // ...we need to do this instead, because JS.
    }
    else {
      console.log('crap');
      // setTimeout(this.mainLoop, 1);          // This should work, but...
      setTimeout(this.mainLoop.bind(this), 1);  // ...we need to do this shit instead, because JS.
    }
  }

  updatePosition (array) {
    for (let i = 0; i < array.length; i++) {
      array[i].updateBaseVal(this.playerArray[0]);
      array[i].updateDeltaToPlayer(this.playerArray[0]);
      array[i].updateVerts();
    }
  }

  updatePlayerPosition (array) {
    for (let i = 0; i < array.length; i++) {
      array[i].updateBaseVal();
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
      this.pressedKeys.up = true;  //this line doesn't work
      console.log('up');
    }
    //down
    if (event.keyCode == 40) {
      this.downPressed = true;  //as opposed to this one
      console.log('down');
    }
    //left
    if (event.keyCode == 37) {
      this.leftPressed = true;
      console.log('left');
    }
    //right
    if (event.keyCode == 39) {
      this.rightPressed = true;
      console.log('right');
    }
  }
  
  keyUp(event) {
    //up
    if (event.keyCode == 38) {
      this.pressedKeys.up = false;   //this line doesn't work
      console.log('!');
    }
  
    //down
    if (event.keyCode == 40) {
      this.downPressed = false;   //as opposed to this one
      console.log('!');
    }
    //left
    if (event.keyCode == 37) {
      this.leftPressed = false;
      console.log('!');
    }
  
    //right
    if (event.keyCode == 39) {
      this.rightPressed = false;
      console.log('!');
    }
  }
}