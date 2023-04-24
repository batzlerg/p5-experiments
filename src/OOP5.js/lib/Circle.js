/**
 * Represents a circle.
 */
class Circle {
  /**
   * Creates a new Circle object with the specified options.
   * @param {Object} options - The options for the circle.
   * @param {number} options.x - The x-coordinate of the circle's center.
   * @param {number} options.y - The y-coordinate of the circle's center.
   * @param {number} options.radius - The radius of the circle.
   * @param {color} options.color - The fill color of the circle.
   */
  constructor(options = {}) {
    this.x = options.x || 0;
    this.y = options.y || 0;
    this.radius = options.radius || 50;
    this.color = options.color || color(0);

    if (options.stroke) {
      this.stroke = options.stroke;
    }
  }

  /**
   * Draws the circle.
   */
  draw() {
    fill(this.color);

    if (this.stroke) {
      stroke(this.stroke);
    }

    circle(this.x, this.y, this.radius);
  }
}