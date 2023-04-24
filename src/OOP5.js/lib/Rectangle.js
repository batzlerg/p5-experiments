
/**
 * Represents a rectangle.
 */
class Rectangle {
  /**
   * Creates a new Rectangle object with the specified options.
   * @param {Object} options - The options for the rectangle.
   * @param {number} options.x - The x-coordinate of the rectangle's top-left corner.
   * @param {number} options.y - The y-coordinate of the rectangle's top-left corner.
   * @param {number} options.width - The width of the rectangle.
   * @param {number} options.height - The height of the rectangle.
   * @param {color} options.color - The fill color of the rectangle.
   */
  constructor(options) {
    this.x = options.x || 0;
    this.y = options.y || 0;
    this.width = options.width || 100;
    this.height = options.height || 50;
    this.color = options.color || color(0);

    if (options.stroke) {
      this.stroke = options.stroke;
    }
  }

  /**
   * Draws the rectangle.
   */
  draw() {
    fill(this.color);

    if (this.stroke) {
      stroke(this.stroke);
    }

    rect(this.x, this.y, this.width, this.height);
  }
}