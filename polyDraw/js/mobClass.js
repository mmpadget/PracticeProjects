export { player, mob, polyMob, starMob, squareMob, splitter, butFly, teleport, tether };
  
class player {
  constructor() {
    this.cenX = 300;
    this.cenY = 100;
    this.vertArray = [];
    this.invincible = false;
    this.lineCol = 'black';
    this.fillCol = 'grey';
  }
  updateVerts() {
    let tempArray = [];
    let halfHeight = 20;
    let halfWidth = 10;

    tempArray.push({x: this.cenX, y: (this.cenY - halfHeight)});
    tempArray.push({x: (this.cenX + halfWidth), y: this.cenY});
    tempArray.push({x: this.cenX, y: (this.cenY + halfHeight)});
    tempArray.push({x: (this.cenX - halfWidth), y: this.cenY});
  }
  drawShape() {
    let ctx = gameCanvas.getContext("2d");//why do I have to declare this here?
    ctx.beginPath();
    ctx.lineJoin = 'round';
    ctx.strokeStyle = this.lineCol;
    ctx.fillStyle = this.fillCol;
    ctx.lineWidth = 3;
  }
}

class mob {
  constructor(array) {
    this.mobType = array[0];
    this.cenX = array[1];
    this.cenY = array[2];
    this.genus = array[3]; //number of sides or hits object can take
    this.movesIn = array[4]; //frames to wait before movement
    this.shoots = array[5];
    this.vertArray = [];
    this.theta = 0;
    this.thetaToPlayer = 0; //angle from cenX,cenY to player center
    this.distanceToPlayer = 0;
    this.rotDir = 0; //0 = no rotation, 1 = clockwise, -1 = counterclock
    this.fullCirc = Math.PI * 2; // 360 degrees expressed in radians
    this.tic = Math.PI / 720; // One tic = 1/4 degree expressed in radians
  }

  updateDistanceToPlayer() {

  }

  drawShape(array) {
    let ctx = gameCanvas.getContext("2d");//why do I have to declare this here?
    ctx.beginPath();
    ctx.lineJoin = 'round';
    ctx.strokeStyle = this.lineCol;
    ctx.fillStyle = this.fillCol;
    ctx.lineWidth = 3;

    for (let i = 0; i < this.vertArray.length; i++) {
      switch (this.vertArray[i]) {
        case 'bp':
          ctx.beginPath();
          break;
        case 'mt':
          i++;
          ctx.moveTo(this.vertArray[i].x, this.vertArray[i].y);
          break;
        case 'cp':
          ctx.closePath();
          break;
        case 'fs':
          i++;
          ctx.fillStyle = [i];
          break;
        case 'ss':
          i++;
          ctx.strokeStyle = [i];
          break;
        case 'f':
          ctx.fill();
          break;
        case 's':
          ctx.stroke();
        default:
          ctx.lineTo(this.vertArray[i].x, this.vertArray[i].y);
          break;

      }
    }
    // for (let i = 0; i < this.vertArray.length; i++){
    //   ctx.lineTo(this.vertArray[i].x, this.vertArray[i].y);
    // }
    // ctx.closePath();
    // ctx.fill();
    // ctx.stroke();
  }

}

class polyMob extends mob {
  constructor(array) {
    super(array);
    this.lineCol = 'red';
    this.fillCol = 'orange';
    this.radius = 20;
  }
  updateVerts() {
    let tempArray = [];
    let arcSeg = this.fullCirc/this.genus;
    let xVal, yVal;
    for (let i = 0; i < this.genus; i++) {
      xVal = Math.round(Math.cos(arcSeg * i) * this.radius + this.cenX);
      yVal = Math.round(Math.sin(arcSeg * i) * this.radius + this.cenY);
      tempArray.push({x: xVal, y: yVal});
    }
    tempArray.push('cp');
    tempArray.push('f');
    tempArray.push('s');
    this.vertArray = tempArray;
  }
}

class starMob extends mob {
  constructor(array) {
    super(array);
    this.lineCol = 'blue';
    this.fillCol = 'green';
    this.radius = 20;
  }
  updateVerts() {
    let tempArray = [];
    let arcSeg = this.fullCirc/this.genus;
    let halfSeg = arcSeg/2;
    let xVal, yVal;
    for (let i = 0; i < this.genus; i++) {
      xVal = Math.round(Math.cos(arcSeg * i) * this.radius + this.cenX);
      yVal = Math.round(Math.sin(arcSeg * i) * this.radius + this.cenY);
      tempArray.push({x: xVal, y: yVal});
      xVal = Math.round(Math.cos((arcSeg * i) + halfSeg) * (this.radius * .6) + this.cenX);
      yVal = Math.round(Math.sin((arcSeg * i) + halfSeg) * (this.radius * .6) + this.cenY);
      tempArray.push({x: xVal, y: yVal});
    }
    tempArray.push('cp');
    tempArray.push('f');
    tempArray.push('s');
    this.vertArray = tempArray;
  }
}
  
class squareMob extends mob {
  constructor(array) {
    super(array);
    this.lineCol = 'blue';
    this.fillCol = 'green';
  }
  updateVerts() {
    let tempArray = [];
    let halfSq = 34; 
    let thirdSq = 19;
    
    //draw outline
    tempArray.push({x: (this.cenX + halfSq), y: (this.cenY + thirdSq)});
    tempArray.push({x: (this.cenX + thirdSq), y: (this.cenY + halfSq)});
    tempArray.push({x: (this.cenX + -thirdSq), y: (this.cenY + halfSq)});
    tempArray.push({x: (this.cenX + -halfSq), y: (this.cenY + thirdSq)});
    tempArray.push({x: (this.cenX + -halfSq), y: (this.cenY + -thirdSq)});
    tempArray.push({x: (this.cenX + -thirdSq), y: (this.cenY + -halfSq)});
    tempArray.push({x: (this.cenX + thirdSq), y: (this.cenY + -halfSq)});
    tempArray.push({x: (this.cenX + halfSq), y: (this.cenY + -thirdSq)});
    tempArray.push('cp');
    tempArray.push('f');
    tempArray.push('s');
    //draw cross
    tempArray.push('bp');
    tempArray.push('ss');
    tempArray.push('black');
    tempArray.push('mt');
    tempArray.push({x: (this.cenX + halfSq), y: this.cenY});
    tempArray.push({x: (this.cenX + -halfSq), y: this.cenY});
    tempArray.push('mt');
    tempArray.push({x: this.cenX, y: (this.cenY + halfSq)});
    tempArray.push({x: this.cenX, y: (this.cenY + -halfSq)});
    tempArray.push('cp');
    tempArray.push('s');

    this.vertArray = tempArray;
  }
}

class splitter {
  
}

class butFly {
  
}

class teleport {
  
}

class tether extends mob { // Use shadow for shield.

}