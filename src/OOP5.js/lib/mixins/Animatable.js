/**
 * Represents an animatable shape.
 */
class Animatable {
  /**
   * Creates a new Animatable object with the specified options.
   * @param {Object} options - The options for the shape.
   * @param {Shape} options.shape - The shape to animate.
   * @param {function} options.animationFunction - The function to execute during the animation.
   */
  constructor(options = {}) {
    this.shape = options.shape;
    this.animationFunction = options.animationFunction || function (shape) { };
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