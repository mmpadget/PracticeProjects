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
  }

  mainLoop () {
    //check time of frame start
    this.frameStart = performance.now();
    
    // check if mob load needed

    // Check player inputs

    // update player position 
    instance.updatePlayerPosition(instance.playerArray);

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
}