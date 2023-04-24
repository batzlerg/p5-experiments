class Rectangle {
  /**
   * Creates a new Rectangle object with the specified options.
   * @param {Object} options - The options for the rectangle.
   * @param {number} options.x - The x-coordinate of the rectangle's top-left corner.
   * @param {number} options.y - The y-coordinate of the rectangle's top-left corner.
   * @param {number} options.width - The width of the rectangle.
   * @param {number} options.height - The height of the rectangle.
   * @param {color} options.color - The fill color of the rectangle.
   * @param {Object} options.border - The border configuration of the rectangle.
   * @param {color} options.border.color - The stroke color of the rectangle.
   * @param {number} options.border.width - The stroke weight of the rectangle.
   * @param {string} options.border.position - The stroke position of the rectangle.
   */
  constructor(options = {}) {
    this.x = options.x || 0;
    this.y = options.y || 0;
    this.width = options.width || 100;
    this.height = options.height || 50;
    this.color = options.color || color(0);
    this.border = options.border || null;
  }

  /**
   * Draws the rectangle.
   */
  draw() {
    push();

    fill(this.color);

    if (this.border) {
      stroke(this.border.color);
      strokeWeight(this.border.width);
      strokeCap(this.border.position);
    } else {
      noStroke();
    }

    rect(this.x, this.y, this.width, this.height);

    pop();
  }
}
