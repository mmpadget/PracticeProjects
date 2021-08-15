export { levelData };


//[mobType, cenX, cenY, genus, movesIn, shoots, zStack]
class levelData {
  constructor() {
    this.level_1 = {
      wave1: [
        ['starMob', 200, 200, 5, 30, false, 2],
        ['starMob', 300, 200, 5, 30, false, 2],
        ['starMob', 400, 200, 5, 30, false, 2],
        ['starMob', 500, 200, 5, 30, false, 2],
        ['squareMob', 450, 300, 10, 30, true, 1],
        ['squareMob', 150, 300, 10, 30, true, 1]
      ],
      wave2: [
        ['polyMob', 150, 100, 5, 50, false, 2],
        ['polyMob', 200, 100, 5, 50, false, 2],
        ['polyMob', 250, 100, 5, 50, false, 2],
        ['polyMob', 300, 100, 5, 50, false, 2],
        ['polyMob', 350, 100, 5, 50, false, 2],
        ['polyMob', 400, 100, 5, 50, false, 2],
        ['polyMob', 450, 100, 5, 50, false, 2],
        ['squareMob', 300, 300, 10, 30, true, 1]
      ],
      wave3: [
        ['polyMob', 150, 100, 5, 50, false, 2],
        ['starMob', 200, 200, 5, 30, false, 2],
        ['squareMob', 300, 300, 10, 30, true, 1]
      ],
      wave4: [
        ['polyMob', 150, 100, 5, 50, false, 2],
        ['starMob', 200, 200, 5, 30, false, 2],
        ['squareMob', 300, 300, 10, 30, true, 1]
      ],wave5: [  //Boss wave
        ['polyMob', 150, 100, 5, 50, false, 2],
        ['starMob', 200, 200, 5, 30, false, 2],
        ['squareMob', 300, 300, 10, 30, true, 1]
      ]
    }
    this.level_2 = [
        //wave 1
        [
          ['polyMob', 150, 100, 5, 50, false, 2],
          ['starMob', 200, 200, 5, 30, false, 2],
          ['squareMob', 300, 300, 10, 30, true, 1]
        ],
        //wave 2
        [
          ['polyMob', 150, 100, 5, 50, false, 2],
          ['starMob', 200, 200, 5, 30, false, 2],
          ['squareMob', 300, 300, 10, 30, true, 1]
        ],
        //wave 3
        [
          ['polyMob', 150, 100, 5, 50, false, 2],
          ['starMob', 200, 200, 5, 30, false, 2],
          ['squareMob', 300, 300, 10, 30, true, 1]
        ]
      ]
  }
}