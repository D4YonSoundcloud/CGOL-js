//to do!
//make each cell an object

function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

// class Cell {
//     constructor(x, y) {
//         this.x = x;
//         this.y = y;
//         this.state = this.state;
//     }

// }

let grid;
let cols;
let rows;
//resolution decides the size of each cell
let resolution = 10;
let fr = 20;

function setup() {
  let canvas = createCanvas(600, 400);
//   canvas.center();
  frameRate(fr);
  //generates each col and row based on the resolution, in this case 400/40 = 10 cols and 10 rows
  cols = width / resolution;
  rows = height / resolution;

  grid = make2DArray(cols, rows);
  // i = col or x
  // j = row or y
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      //new Cell(i,j)
      grid[i][j] = floor(random(2));
    }
  }
}

function draw() {
  background(0);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      //x and y determine position of each cell, which is find by using the col or row index * the resolution
      //for example: let x = 2 * 40 && let y = 0 * 40, the position is (80,0)
      //or the start of the left side of the 3rd cell
      let x = i * resolution;
      let y = j * resolution;
      //fill alive cells with white
      if (grid[i][j] == 1) {
        fill(255);
        stroke(0);
        rect(x, y, resolution - 1, resolution - 1);
      }
    }
  }
  let next = make2DArray(cols, rows);
  //compute next generation based on the past grid
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let state = grid[i][j];

      //Count alive neighbors
      let sum = 0;
      let neighbors = countNeighbors(grid, i, j);

      if (state == 0 && neighbors == 3) {
        next[i][j] = 1;
      } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
        next[i][j] = 0;
      } else {
        next[i][j] = state;
      }
    }
  }

  grid = next;
}

function countNeighbors(grid, x, y) {
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;

      sum += grid[col][row];
    }
  }

  sum -= grid[x][y];
  return sum;
}

//   sum += grid[i - 1][j - 1];
//   sum += grid[i][j - 1];
//   sum += grid[i + 1][j - 1];
//   sum += grid[i + 1][j];
//   sum += grid[i + 1][j + 1];
//   sum += grid[i][j + 1];
//   sum += grid[i - 1][j];
//   sum += grid[i - 1][j + 1];
