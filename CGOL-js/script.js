function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

let grid;
let cols;
let rows;
//resolution decides the size of each cell
let resolution = 20;

function setup() {
  createCanvas(600, 400);
  //generates each col and row based on the resolution, in this case 400/40 = 10 cols and 10 rows
  cols = width / resolution;
  rows = height / resolution;

  grid = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
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
        rect(x, y, resolution-1, resolution-1);
      }
    }
  }
}
