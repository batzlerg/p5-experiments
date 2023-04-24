const app = new DrawingApp({
  width: 800,
  height: 600,
  mouseClicked() {
    let shape;
    if (random() > 0.5) {
      shape = new Circle(
        mouseX,
        mouseY,
        50,
        color(random(255), random(255), random(255))
      );
    } else {
      shape = new Rectangle(
        mouseX,
        mouseY,
        100,
        50,
        color(random(255), random(255), random(255))
      );
    }

    this.shapes.push(shape);
  }
});

function setup() {
  app.setup();
}

function draw() {
  app.draw();
}

function mouseClicked() {
  app.mouseClicked();
}