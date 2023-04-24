const DEFAULT_STROKE = 1.0;

let app;
function setup() {
  app = new DrawingApp({
    width: 800,
    height: 600,
    border: {
      color: color(200, 200, 200),
      width: 15,
      position: SQUARE,
    },
    shapes: [new Drawable({ color: color(0, 0, 0), persist: true })],
  });
}
function draw() {
  app.draw();
}