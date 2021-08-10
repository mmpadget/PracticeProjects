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

  static mainLoop (instance) {
    //check time of frame start
    instance.frameStart = performance.now();
    
    // check if mob load needed

    // Check player inputs

    // update player position 

    // update mob positions
    instance.updatePosition(instance.mobArray);

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
    instance.updateDraw(instance.mobArray);

    // draw bullets

    // draw player
    instance.updateDraw(instance.playerArray);

    
    // check time elapsed from frame start
    instance.frameEnd = performance.now();
    instance.frameDelta = (instance.frameEnd - instance.frameStart);
    if (instance.frameDelta < instance.frameTime) {
      instance.frameWait = (instance.frameTime - instance.frameDelta);
      //console.log(instance.frameDelta);
      setTimeout(function () { gameLoop.mainLoop(instance); }, instance.frameWait);
    }
    else {
      console.log('crap');
      setTimeout(function () { gameLoop.mainLoop(instance); }, 1);
    }
  }

  updatePosition (array) {
    for (let i = 0; i < array.length; i++) {
      array[i].updateBaseVal(this.playerArray[0]);
      array[i].updateDeltaToPlayer(this.playerArray[0]);
      array[i].updateVerts();
    }
  }

  updateDraw (array) {
    for (let i = 0; i < array.length; i++) {
      array[i].drawShape();
    }
  }
}