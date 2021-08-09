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
    this.playerObj = [];
    this.mobArray = [];
    this.mobBulletArray = [];
    this.playerBulletArray = [];
    this.backgroundItems = [];
    this.level = 1;
  }

  updateMobPosition (array) {
    for (let i = 0; i < array.length; i++) {
      array[i].updateBaseVal();
      array[i].updateVerts();
      array[i].drawShape();
    }
  }

  static mainLoop (instance) {
    //check time of frame start
    instance.frameStart = performance.now();
    ctx.clearRect(0, 0, 600, 600);
    instance.updateMobPosition(instance.mobArray);
    // Check player inputs

    // update player position 

    // update mob positions
    //updateMobPosition(this.mobArray);

    // update bullet positions

    // check mob bullets against player
      // resolve hits and setup for next frame

    // check player bullets against mobs
      // resolve hits and setup for next frame

    // check mobs against player
      // resolve hits and setup for next frame
    
    // clear canvas
    //ctx.clearRect(0, 0, 600, 600);
    // draw player
    
    // draw mobs

    // draw bullets
    
    // check time elapsed from frame start
    instance.frameEnd = performance.now();
    instance.frameDelta = (instance.frameEnd - instance.frameStart);
    if (instance.frameDelta < instance.frameTime) {
      instance.frameWait = (instance.frameTime - instance.frameDelta);
      setTimeout(function () { gameLoop.mainLoop(instance); }, instance.frameWait);
    }
    else {
      console.log('dicks');
      setTimeout(function () { gameLoop.mainLoop(instance); }, 1);
    }
  }
}

