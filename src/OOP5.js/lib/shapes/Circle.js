/**
 * Represents a circle.
 */
class Circle extends Shape {
  constructor(options = {}) {
    super(options);
    if (this.width) {
      this.radius = this.width / 2;
    } else if (this.height) {
      this.radius = this.height / 2;
    } else {
      this.radius = 50; // Default radius
    }
  }

  /**
   * Draws the circle.
   */
  draw() {
    push(); // push current drawing settings onto the stack

    super.draw();

    fill(this.color);
    if (this.stroke) {
      stroke(this.stroke);
    }

    let diameter = this.radius * 2;
    ellipse(this.x, this.y, diameter, diameter);

    pop(); // restore previous drawing settings from the stack
  }

  /**
   * Checks if given x and y coordinates are inside the circle.
   * @param {number} x - The x-coordinate to check.
   * @param {number} y - The y-coordinate to check.
   * @returns {boolean} - True if the coordinates are inside the circle, false otherwise.
   */
  contains(x, y) {
    let distance = dist(x, y, this.x, this.y);
    return distance <= this.radius;
  }
}
