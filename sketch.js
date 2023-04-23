const SKETCH_MARGIN = 32;

let scaling;
let separation;

function getCanvasWidth() {
  return windowWidth - SKETCH_MARGIN * 2;
}

function getCanvasHeight() {
  return windowHeight - SKETCH_MARGIN * 2;
}

function f(x) {
  return Math.sin(x * x) * x;
}

function shouldPaint(x, y) {
  const fx = f(x);

  return (0 < y && y < fx) || (0 > y && y > fx);
}

function sliderMoved() {
  redraw();
}

function setup() {
  createCanvas(getCanvasWidth(), getCanvasHeight());
  scaling = createSlider(1, 1000, 100, 1);
  separation = createSlider(4, 32, 8, 1);
  scaling.input(sliderMoved);
  separation.input(sliderMoved);
  noLoop();
}

function draw() {
  background(24);

  translate(getCanvasWidth() / 2, getCanvasHeight() / 2);
  scale(1, -1);

  for (let x = -getCanvasWidth() / 2; x < getCanvasWidth() / 2; x += separation.value()) {
    for (let y = -getCanvasHeight() / 2; y < getCanvasHeight() / 2; y += separation.value()) {
      if (shouldPaint(x / scaling.value(), y / scaling.value())) {
        drawPoint(x, y, 255);
      }
    }
  }
}

function drawPoint(x, y, color) {
  stroke(color);
  point(x, y);
}

function windowResized() {
  resizeCanvas(getCanvasWidth(), getCanvasHeight());
}
