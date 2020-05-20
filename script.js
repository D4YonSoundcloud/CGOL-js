//to do!
//make each cell an object
//allow to change speed (framerate) || DONE 6:49pm 5-19-20
//basic generation counter || DONE 12:40pm 5-19-20
//allow each cell to be interactable
//add rules tab

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
//fr = framerate or generations/s
let fr = 20;
let intervalTimer = 50;
let counter = 0;
let newCount = 0;
let interval;

function setup() {
  let canvas = createCanvas(600, 400);
  //   canvas.center();
  timer = createP();
  if (setInterval) counter = 0;
  setInterval(timeIt, intervalTimer);
  console.log(intervalTimer);
  console.log(fr);
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

function timeIt() {
  timer.html("Generation: " + counter);
  timer.style("font-family", "Montserrat, sans-serif");
  timer.style("margin", "auto");
  timer.style("width", "100%");
  timer.style("text-align", "center");
  timer.style("transform", "translateY(60px)");
  counter++;
}

function draw() {
  background(255);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      //x and y determine position of each cell, which is find by using the col or row index * the resolution
      //for example: let x = 2 * 40 && let y = 0 * 40, the position is (80,0)
      //or the start of the left side of the 3rd cell
      let x = i * resolution;
      let y = j * resolution;
      //fill alive cells with white
      if (grid[i][j] == 1) {
        fill(0);
        stroke(255);
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

function changeSpeed(newFr, newTimer) {
  intervalTimer = newTimer;
  fr = newFr;
  console.log("done");
  console.log(fr);
  console.log(intervalTimer);
  setup().setInterval(timeIt, intervalTimer);
  setup().frameRate(fr);
}

//   sum += grid[i - 1][j - 1];
//   sum += grid[i][j - 1];
//   sum += grid[i + 1][j - 1];
//   sum += grid[i + 1][j];
//   sum += grid[i + 1][j + 1];
//   sum += grid[i][j + 1];
//   sum += grid[i - 1][j];
//   sum += grid[i - 1][j + 1];
