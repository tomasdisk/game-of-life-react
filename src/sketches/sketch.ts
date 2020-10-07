let resolution = 20;
const COLS = Math.floor(document.documentElement.clientWidth / resolution) - 1;
const ROWS = Math.floor(document.documentElement.clientHeight / resolution) - 5;
let grid: number[];

// interface ICell {
//   alive: boolean
//   color: p5.Color
//   age: number
// }

// // type Grid = ICell[][]

// class Grid<T> {
//   grid: T[][]
//   width: number
//   height: number
//   constructor(cols: number, rows: number, initializer: (cols: number, rows: number, x: number, y: number) => T) {
//     if (cols <= 0 && rows <= 0) {
//       throw new Error('Number of cols and rows must be intiger greater than zero.')
//     }
//     this.width = cols
//     this.height = rows
//     for (let x = 0; x < cols; x++) {
//       this.grid[x] = []
//       for (let y = 0; y < rows; y++) {
//         this.grid[x][y] = initializer(cols, rows, x, y)
//       }
//     }
//   }

//   set(x: number, y: number, value: T) {
//     this.grid[x][y] = value
//   }

//   safeSet(x: number, y: number, value: T) {
//     if (x < 0 || x >= this.width || y < 0 || y > this.height) {
//       return
//     }
//     this.grid[x][y] = value
//   }

//   get(x: number, y: number) {
//     return this.grid[x][y]
//   }

//   safeGet(x: number, y: number) {
//     if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
//       return
//     }
//     return this.grid[x][y]
//   }
// }

const eraser = (grid: number[], x: number, y: number, h = 1) => {
  for (let i = x; i < x + h; i++) {
    for (let j = y; j < y + h; j++) {
      grid[i * COLS + j] = 0;
    }
  }
};

const drawer = (grid: number[], x: number, y: number, h = 1) => {
  for (let i = x; i < x + h; i++) {
    for (let j = y; j < y + h; j++) {
      grid[i * COLS + j] = 1;
    }
  }
};

const makeGilder = (
  grid: number[],
  x: number,
  y: number,
  dir = 0,
  force = false
) => {
  if (force) {
    eraser(grid, x, y, 3);
  }
  let xDir = 1;
  let yDir = 1;
  let xx = x;
  let yy = y;
  if (dir === 2) {
    xDir = -1;
    xx = x + 2;
  }
  if (dir === 0) {
    yDir = -1;
    yy = y + 2;
  }
  if (dir === 3) {
    xDir = -1;
    yDir = -1;
    xx = x + 2;
    yy = y + 2;
  }
  grid[(xx + 1) * COLS * xDir + yy] = 1;
  grid[(xx + 2) * COLS * xDir + yy + 1 * yDir] = 1;
  grid[xx * COLS + yy + 2 * yDir] = 1;
  grid[(xx + 1) * COLS * xDir + yy + 2 * yDir] = 1;
  grid[(xx + 2) * COLS * xDir + yy + 2 * yDir] = 1;
};

const makeBlock = (grid: number[][], x: number, y: number) => {
  grid[x][y] = 1;
  grid[x + 1][y] = 1;
  grid[x + 1][y + 1] = 1;
  grid[x][y + 1] = 1;
};

export const clear = () => {
  for (let index = 0; index < grid.length; index++) {
    grid[index] = 0;
  }
};

const sketch = (p: any) => {
  let oldGrid: number[];
  let cols = COLS;
  let rows = ROWS;
  let color = 80;
  let rand = false;
  let running = true;

  p.setup = () => {
    p.createCanvas(resolution * cols, resolution * rows);
    p.colorMode(p.HSB);
    // cols = p.width / resolution
    // rows = p.height / resolution
    grid = makeGrid(cols, rows, () => p.floor(p.random(2)));
    oldGrid = makeGrid(cols, rows);
    // p.frameRate(5)

    // drawer(grid, 10,10,16)
    // makeGilder(grid, 30,30,3)
  };

  const makeGrid = (
    cols: number,
    rows: number,
    initializer?: (cols: number, rows: number, x: number, y: number) => number
  ) => {
    const a: number[] = [];
    for (let x = 0; x < cols; x++) {
      for (let y = 0; y < rows; y++) {
        a[x * cols + y] = initializer ? initializer(cols, rows, x, y) : 0;
      }
    }
    return a;
  };

  const sumNeighbors = (grid: number[], x: number, y: number) => {
    const sum =
      (grid[(x + 1) * cols + y - 1] || 0) +
      (grid[(x + 1) * COLS + y] || 0) +
      (grid[(x + 1) * COLS + y + 1] || 0) +
      (grid[x * COLS + y + 1] || 0) +
      (grid[(x - 1) * COLS + y + 1] || 0) +
      (grid[(x - 1) * COLS + y] || 0) +
      (grid[(x - 1) * COLS + y - 1] || 0) +
      (grid[x * COLS + y - 1] || 0);
    return sum;
  };

  const nextGen = (grid: number[], oldGrid: number[]) => {
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        if (oldGrid[i * COLS + j] === 3) {
          grid[i * COLS + j] = 1;
        } else {
          if (oldGrid[i * COLS + j] !== 2) {
            grid[i * COLS + j] = 0;
          }
        }
      }
    }
  };
  p.myCustomRedrawAccordingToNewPropsHandler = (props: any) => {
    color = props.color;
    rand = props.random;
    running = props.running;
  };

  p.draw = () => {
    p.background(0);
    for (let i = 0; i < cols; i++) {
      let x = i * resolution;
      for (let j = 0; j < rows; j++) {
        let y = j * resolution;

        if (grid[i * COLS + j]) {
          p.fill(rand ? p.floor(p.random(256)) : color, 200, 150);
        } else {
          p.fill(0, 0, 50);
        }
        p.stroke(0);
        p.rect(x, y, resolution - 1, resolution - 1);
        oldGrid[i * COLS + j] = sumNeighbors(grid, i, j);
      }
    }
    if (running) {
      nextGen(grid, oldGrid);
    }
  };

  p.mouseReleased = () => {
    const x = p.floor(p.mouseX / resolution);
    const y = p.floor(p.mouseY / resolution);
    console.log(x, y);
    if (x >= 0 && y >= 0 && x < COLS && y < ROWS) {
      drawer(grid, x, y, 1);
      // eraser(grid, x + 3, y + 3, 5);
      // makeGilder(grid, x, y, 1, true);
    }
  };
};

export default sketch;
