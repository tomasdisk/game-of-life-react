import { Sketch, SketchProps } from "@p5-wrapper/react";

type ISketchProps = SketchProps & {
  sketch: any;
  color: number;
  random: boolean;
  running: boolean;
  speed: number;
  glider: boolean;
}

let resolution = 20;
let grid: number[];
export const gridSize = () => ({
  x: Math.floor(window.innerWidth / resolution) - 1,
  y: Math.floor(window.innerHeight / resolution) - 5,
});
const size = gridSize();


// window.addEventListener("resize", () => {
//   size.x = Math.floor(window.innerWidth / resolution) - 1;
//   size.y = Math.floor(window.innerHeight / resolution) - 5;
// });

const index = (x: number, y: number) => x * size.y + y;

const inBounds = (x: number, y: number) =>
  x >= 0 && y >= 0 && x < size.x && y < size.y;

const eraser = (grid: number[], x: number, y: number, h = 1) => {
  for (let i = x; i < x + h; i++) {
    for (let j = y; j < y + h; j++) {
      clearBlock(grid, i, j);
    }
  }
};

const drawer = (grid: number[], x: number, y: number, radius = 1) => {
  const r = Math.floor(radius / 2);
  for (let i = x - r; i <= x + r; i++) {
    for (let j = y - r; j <= y + r; j++) {
      paintBlock(grid, i, j);
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
  paintBlock(grid, xx + 1 * xDir, yy);
  paintBlock(grid, xx + 2 * xDir, yy + 1 * yDir);
  paintBlock(grid, xx, yy + 2 * yDir);
  paintBlock(grid, xx + 1 * xDir, yy + 2 * yDir);
  paintBlock(grid, xx + 2 * xDir, yy + 2 * yDir);
};

const toggleBlock = (grid: number[], x: number, y: number) => {
  if (inBounds(x, y)) {
    grid[index(x, y)] = grid[index(x, y)] === 0 ? 1 : 0;
  }
};

const paintBlock = (grid: number[], x: number, y: number) => {
  if (inBounds(x, y)) {
    grid[index(x, y)] = 1;
  }
};

const clearBlock = (grid: number[], x: number, y: number) => {
  if (inBounds(x, y)) {
    grid[index(x, y)] = 0;
  }
};

export const clear = () => {
  for (let index = 0; index < grid.length; index++) {
    grid[index] = 0;
  }
};

const makeGrid = (
  cols: number,
  rows: number,
  initializer?: (cols: number, rows: number, x: number, y: number) => number
) => {
  const a: number[] = [];
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      a[x * rows + y] =initializer ? initializer(cols, rows, x, y) : 0;
    }
  }
  return a;
};

const sketch: Sketch<ISketchProps> = (p5) => {
  let oldGrid: number[];
  let cols = size.x;
  let rows = size.y;
  let color = 80;
  let rand = false;
  let running = true;
  let speed = 10; // Default speed value
  let glider = false;

  p5.setup = () => {
    p5.createCanvas(resolution * cols, resolution * rows);
    p5.colorMode(p5.HSB);
    // cols = p.width / resolution
    // rows = p.height / resolution
    grid = makeGrid(cols, rows, () => p5.floor(p5.random(2)));
    oldGrid = makeGrid(cols, rows);
    p5.frameRate(speed); // Set initial frame rate

    // drawer(grid, 10,10,16)
    // makeGilder(grid, 30,30,3)
  };

  const sumNeighbors = (grid: number[], x: number, y: number) => {
    const cell = (x: number, y: number) =>
      inBounds(x, y) ? grid[index(x, y)] : 0;
    const sum =
      cell(x + 1, y - 1) +
      cell(x + 1, y) +
      cell(x + 1, y + 1) +
      cell(x, y + 1) +
      cell(x - 1, y + 1) +
      cell(x - 1, y) +
      cell(x - 1, y - 1) +
      cell(x, y - 1);
    return sum;
  };

  const nextGen = (grid: number[], oldGrid: number[]) => {
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        if (oldGrid[index(i, j)] === 3) {
          grid[index(i, j)] = 1;
        } else {
          if (oldGrid[index(i, j)] !== 2) {
            grid[index(i, j)] = 0;
          }
        }
      }
    }
  };

  p5.updateWithProps = (props: ISketchProps) => {
    color = props.color;
    rand = props.random;
    running = props.running;
    glider = props.glider;

    if (speed !== props.speed) {
      speed = props.speed;
      p5.frameRate(speed);
    }
  };

  p5.draw = () => {
    p5.background(0);
    for (let i = 0; i < cols; i++) {
      let x = i * resolution;
      for (let j = 0; j < rows; j++) {
        let y = j * resolution;

        if (grid[index(i, j)]) {
          p5.fill(rand ? p5.floor(p5.random(256)) : color, 200, 150);
        } else {
          p5.fill(0, 0, 50);
        }
        p5.stroke(0);
        p5.rect(x, y, resolution - 1, resolution - 1);
        oldGrid[index(i, j)] = sumNeighbors(grid, i, j);
      }
    }
    if (running) {
      nextGen(grid, oldGrid);
    }
  };

  p5.mouseReleased = () => {
    const x = p5.floor(p5.mouseX / resolution);
    const y = p5.floor(p5.mouseY / resolution);

    if (x >= 0 && y >= 0 && x < size.x && y < size.y) {
      if (glider) {
        // centered on the click, heading in a random diagonal
        makeGilder(grid, x - 1, y - 1, p5.floor(p5.random(4)), true);
      } else {
        drawer(grid, x, y, 2);
      }
      // eraser(grid, x + 3, y + 3, 5);
    }
  };
  p5.windowResized = () => {
    const { x: X, y: Y } = gridSize();

    cols = X;
    rows = Y;
    p5.resizeCanvas(resolution * cols, resolution * rows);
    grid = makeGrid(cols, rows, (() => p5.floor(p5.random(2))));
    oldGrid = makeGrid(cols, rows);
    size.x = X;
    size.y = Y;
  };
};

export default sketch;
