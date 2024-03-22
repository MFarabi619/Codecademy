const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

class Field {
  constructor(field) {
    this.field = field;
    this.playerPos = [0, 0];
    this.field[0][0] = pathCharacter;
  }

  static generateField(height, width, holePercentage) {
    const field = new Array(height)
      .fill(null)
      .map(() => new Array(width).fill(fieldCharacter));

    let hatPosition = {
      x: Math.floor(Math.random() * width),
      y: Math.floor(Math.random() * height),
    };

    while (hatPosition.x === 0 && hatPosition.y === 0) {
      hatPosition.x = Math.floor(Math.random() * width);
      hatPosition.y = Math.floor(Math.random() * height);
    }

    field[hatPosition.y][hatPosition.x] = hat;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (
          Math.random() * 100 < holePercentage &&
          (x !== hatPosition.x || y !== hatPosition.y)
        ) {
          field[y][x] = hole;
        }
      }
    }

    return field;
  }

  print() {
    console.clear();
    this.field.forEach((row) => console.log(row.join("")));
  }

  movePlayer(movement) {
    const directionMappings = {
      w: [-1, 0],
      a: [0, -1],
      s: [1, 0],
      d: [0, 1],
    };

    const move = directionMappings[movement];
    if (!move) {
      console.log("Invalid move. Use 'w', 'a', 's', 'd'.");
      return false;
    }

    const [y, x] = this.playerPos;
    const [moveY, moveX] = move;
    const newPos = [y + moveY, x + moveX];

    if (
      newPos[0] < 0 ||
      newPos[0] >= this.field.length ||
      newPos[1] < 0 ||
      newPos[1] >= this.field[0].length
    ) {
      console.log("Out of bounds!");
      return true;
    }

    switch (this.field[newPos[0]][newPos[1]]) {
      case fieldCharacter:
        this.field[y][x] = fieldCharacter;
        this.field[newPos[0]][newPos[1]] = pathCharacter;
        this.playerPos = newPos;
        break;
      case hole:
        console.log("Oops, fell down a hole!");
        return true;
      case hat:
        console.log("Hurray! Found the hat!");
        return true;
      default:
        break;
    }
    return false;
  }
}

const height = 10;
const width = 15;
const holePercentage = 20;

const myField = new Field(Field.generateField(height, width, holePercentage));

while (true) {
  myField.print();
  const movement = prompt("Which way? (w, a, s, d): ");
  if (myField.movePlayer(movement)) {
    console.log("Game over!");
    break;
  }
}
