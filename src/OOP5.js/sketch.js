const DEFAULT_STROKE = 1.0;

let app;
function setup() {
  createCanvas(800, 600);
  // background(255); // Move background call to setup function
  const rectangleSize = 50
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
        animationFunction: sineWave,
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
        width: random(100, 300),
        color: color(random(255), random(255), random(255)),
        stroke: 5,
        onMouseOver: () => {
          console.log('mouse over')
        }
      });

      const circleSpeed = random(0, 1.5)
      const animatableCircle = new Animatable({
        animationStart: random() * TWO_PI, // random start angle
        /**
         * Animates a shape vertically with a slight sway back and forth.
         * @param {Object} shape - The shape to be animated.
         */
        animationFunction: function (shape) {
          // Calculate the new x and y positions based on the angle
          let swayX = sin(millis() / 100) // add a small sway left and right
          let newY = shape.y - (circleSpeed * 3);
          let newX = shape.x + swayX;

          // Update the shape's position
          shape.x = newX;
          shape.y = newY;

          // Check if the circle is offscreen and remove it if it is
          if (shape.y + shape.radius < 0) {
            app.shapes.splice(app.shapes.indexOf(animatableCircle), 1);
          }
        },


        shape: circle
      });

      app.shapes.push(animatableCircle);
    }

  });
}
function draw() {
  app.draw();
}