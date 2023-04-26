/**
 * Represents an animatable shape.
 */
class Animatable {
  /**
   * Creates a new Animatable object with the specified options.
   * @param {Object} options - The options for the shape.
   * @param {Shape} options.shape - The shape to animate.
   * @param {function} options.animationFunction - The function to execute during the animation.
   * @param {number} options.animationSpeed - The speed of the animation.
   * @param {number} options.animationDirection - The direction of the animation (1 for clockwise, -1 for counterclockwise).
   * @param {number} options.animationStart - The starting position of the animation.
   */
  constructor(options = {}) {
    this.shape = options.shape;
    this.animationFunction = options.animationFunction || function (shape) { };
    this.animationSpeed = options.animationSpeed || 1;
    this.animationDirection = options.animationDirection || 1;
    this.animationStart = options.animationStart || 0;
  }

  /**
   * Draws the animatable shape.
   */
  draw() {
    push(); // push current drawing settings onto the stack

    // Execute the animation function
    this.animationFunction(this.shape);

    // Draw the shape
    this.shape.draw();

    pop(); // restore previous drawing settings from the stack
  }
}