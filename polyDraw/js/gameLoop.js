


class gameLoop {
  constructor() {
    this.frameStart = 0;
    this.frameEnd = 0;
    this.fps = 30
    this.frameTime = 1000 / this.fps
    this.playerObj = 0;
    this.mobArray = [];
    this.mobBulletArray = [];
    this.playerBulletArray = [];
    this.backgroundItems = [];
    
    }

  updateMobPosition () {
    for (i = 0; i < this.mobArray; i++) {
      this.mobArray[i].updateBaseVal();
      this.mobArray[i].updateVerts();
    }
  }

  mainLoop () {
    this.frameStart = performance.now;

    // Check player inputs

    // update player position 

    // update mob positions
    updateMobPosition(this.mobArray);

    // update bullet positions

    // check mob bullets against player
      // resolve hits and setup for next frame

    // check player bullets against mobs
      // resolve hits and setup for next frame

    // check mobs against player
      // resolve hits and setup for next frame

    // draw player

    // draw mobs

    // draw bullets

    

  }
}

