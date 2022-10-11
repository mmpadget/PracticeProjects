export { levelData };


//[mobType, cenX, cenY, genus, movesIn, shoots, zStack, speed,]
class levelData {
  constructor() {
    this.level_1 = {
      wave1: [
        ['starMob', 200, -60, 5, 30, false, 2, .5],
        ['polyMob', 150, -60, 5, 50, false, 2, 1.25],
        ['starMob', 300, -60, 5, 70, false, 2, .6],
        ['starMob', 400, -60, 5, 90, false, 2, .7],
        ['starMob', 500, -60, 5, 110, false, 2, .8],
        ['squareMob', 500, -60, 7, 200, true, 1, 1],
        ['squareMob', 100, -60, 7, 30, true, 1, 1]
      ],
      wave2: [
        ['polyMob', 150, -40, 5, 50, false, 2, 1.75],
        ['polyMob', 200, -40, 7, 50, false, 2, 1.75],
        ['polyMob', 250, -40, 5, 50, false, 2, 1.75],
        ['polyMob', 300, -40, 6, 50, false, 2, 1.75],
        ['polyMob', 350, -40, 5, 50, false, 2, 1.75],
        ['polyMob', 400, -40, 4, 50, false, 2, 1.75],
        ['polyMob', 450, -40, 5, 50, false, 2, 1.75],
        ['squareMob', 300, -40, 7, 30, true, 1, 1]
      ],
      wave3: [
        ['polyMob', 150, -40, 5, 50, false, 2, 1.75],
        ['starMob', 200, -40, 5, 30, false, 2, 4],
        ['squareMob', 300, -40, 7, 30, true, 1, 1]
      ],
      wave4: [
        ['polyMob', 150, -40, 5, 50, false, 2, 1.75],
        ['starMob', 200, -40, 5, 30, false, 2, 2],
        ['squareMob', 300, -40, 7, 30, true, 1, 1]
      ],wave5: [  //Boss wave
        ['polyMob', 150, -20, 5, 50, false, 2, 1.75],
        ['starMob', 200, -20, 5, 30, false, 2, .8],
        ['squareMob', 300, -20, 7, 30, true, 1, 1]
      ]
    }
    this.level_2 = [
        //wave 1
        [
          ['polyMob', 150, 100, 5, 50, false, 2],
          ['starMob', 200, 200, 5, 30, false, 2],
          ['squareMob', 300, 300, 7, 30, true, 1]
        ],
        //wave 2
        [
          ['polyMob', 150, 100, 5, 50, false, 2],
          ['starMob', 200, 200, 5, 30, false, 2],
          ['squareMob', 300, 300, 7, 30, true, 1]
        ],
        //wave 3
        [
          ['polyMob', 150, 100, 5, 50, false, 2],
          ['starMob', 200, 200, 5, 30, false, 2],
          ['squareMob', 300, 300, 7, 30, true, 1]
        ]
      ]
  }
}