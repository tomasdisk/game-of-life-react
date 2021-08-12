import p5 from "p5";

interface ISketchProps {
  sketch: any;
  color: number;
  random: boolean;
  running: boolean;
}

type IP5js = {
  myCustomRedrawAccordingToNewPropsHandler: (props: ISketchProps) => void;
} & p5;

let resolution = 20;
let grid: number[];
const size = {
  x: Math.floor(window.innerWidth / resolution) - 1,
  y: Math.floor(window.innerHeight / resolution) - 5,
};
console.log(size);

// window.addEventListener("resize", () => {
//   console.log("wa")
//   size.x = Math.floor(window.innerWidth / resolution) - 1;
//   size.y = Math.floor(window.innerHeight / resolution) - 5;

// });

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
  grid[(xx + 1) * size.x * xDir + yy] = 1;
  grid[(xx + 2) * size.x * xDir + yy + 1 * yDir] = 1;
  grid[xx * size.x + yy + 2 * yDir] = 1;
  grid[(xx + 1) * size.x * xDir + yy + 2 * yDir] = 1;
  grid[(xx + 2) * size.x * xDir + yy + 2 * yDir] = 1;
};

const toggleBlock = (grid: number[], x: number, y: number) => {
  grid[x * size.x + y] = grid[x * size.x + y] === 0 ? 1 : 0;
};

const paintBlock = (grid: number[], x: number, y: number) => {
  grid[x * size.x + y] = 1;
};

const clearBlock = (grid: number[], x: number, y: number) => {
  grid[x * size.x + y] = 1;
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
      a[x * cols + y] = initializer ? initializer(cols, rows, x, y) : 0;
    }
  }
  return a;
};

const sketch = (p: IP5js) => {
  let oldGrid: number[];
  let cols = size.x;
  let rows = size.y;
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

  const sumNeighbors = (grid: number[], x: number, y: number) => {
    const sum =
      (grid[(x + 1) * cols + y - 1] || 0) +
      (grid[(x + 1) * size.x + y] || 0) +
      (grid[(x + 1) * size.x + y + 1] || 0) +
      (grid[x * size.x + y + 1] || 0) +
      (grid[(x - 1) * size.x + y + 1] || 0) +
      (grid[(x - 1) * size.x + y] || 0) +
      (grid[(x - 1) * size.x + y - 1] || 0) +
      (grid[x * size.x + y - 1] || 0);
    return sum;
  };

  const nextGen = (grid: number[], oldGrid: number[]) => {
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        if (oldGrid[i * size.x + j] === 3) {
          grid[i * size.x + j] = 1;
        } else {
          if (oldGrid[i * size.x + j] !== 2) {
            grid[i * size.x + j] = 0;
          }
        }
      }
    }
  };

  p.myCustomRedrawAccordingToNewPropsHandler = (props: ISketchProps) => {
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

        if (grid[i * size.x + j]) {
          p.fill(rand ? p.floor(p.random(256)) : color, 200, 150);
        } else {
          p.fill(0, 0, 50);
        }
        p.stroke(0);
        p.rect(x, y, resolution - 1, resolution - 1);
        oldGrid[i * size.x + j] = sumNeighbors(grid, i, j);
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
    if (x >= 0 && y >= 0 && x < size.x && y < size.y) {
      console.log("drawer", grid, x, y, 1);
      drawer(grid, x, y, 2);
      // eraser(grid, x + 3, y + 3, 5);
      // makeGilder(grid, x, y, 1, true);
    }
  };
  p.windowResized = () => {
    console.log("WAAAAA");
    const X = Math.floor(window.innerWidth / resolution) - 1;
    const Y = Math.floor(window.innerHeight / resolution) - 5;
    console.log(size);
    cols = X;
    rows = Y;
    p.resizeCanvas(resolution * cols, resolution * rows);
    grid = makeGrid(cols, rows, (() => p.floor(p.random(2))));
    oldGrid = makeGrid(cols, rows);
    size.x = X;
    size.y = Y;
  };
};

export default sketch;
