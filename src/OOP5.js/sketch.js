const DEFAULT_STROKE = 1.0;

let app;
function setup() {
  createCanvas(800, 600);
  background(255); // Move background call to setup function
  const rectangleSize = 50
  // random(10, 50)
  app = new DrawingApp({
    width: 800,
    height: 600,
    border: {
      color: color(200, 200, 200),
      width: 15,
      position: SQUARE,
    },
    shapes: [
      new Animatable({
        animationSpeed: 30,
        /**
         * Animates a shape vertically using a sine wave.
         * @param {Object} shape - The shape to be animated.
         */
        animationFunction: function (shape) {
          // Calculate the current angle based on the animation speed and direction
          let angle = (millis() / (1000 / this.animationSpeed)) * this.animationDirection + this.animationStart;

          // Calculate the new y position based on the angle
          let distance = 1;
          let newY = shape.y + sin(angle) * distance / 2;

          // Update the shape's position
          shape.y = newY;
        },

        // animationFunction: () => { },
        shape: new Rectangle({
          x: 200,
          y: 200,
          height: rectangleSize,
          width: rectangleSize,
          stroke: 5,
          border: {
            color: color(45),
            width: 50,
            position: SQUARE
          },
          onMouseOver: () => {
            console.log('rect over')
          }
        })
      })
    ],
    mouseClicked: function () {
      const circle = new Circle({
        x: mouseX,
        y: mouseY,
        width: random(150, 500),
        color: color(random(255), random(255), random(255)),
        stroke: 5,
        onMouseOver: () => {
          console.log('mouse over')
        }
      });
      this.shapes.push(circle);
    },
  });
}
function draw() {
  app.draw();
}