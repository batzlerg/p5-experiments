/**
 * A class representing a drawable shape.
 * @class
 */
class Drawable {
  /**
   * Create a drawable shape.
   * @param {Object} options - The options object.
   * @param {p5.Color} options.color - The color of the shape.
   * @param {boolean} options.persist - Whether or not to persist the shape on the canvas.
   */
  constructor(options) {
    this.color = options.color;
    this.persist = options.persist;
    this.points = [];
  }

  /**
   * Draw the shape on the canvas.
   */
  draw() {
    push(); // Save current style settings
    noFill();
    stroke(this.color);
    beginShape();

    for (let i = 0; i < this.points.length; i++) {
      let point = this.points[i];
      vertex(point.x, point.y);
    }
    endShape();

    if (this.persist && mouseIsPressed) {
      this.points.push(createVector(mouseX, mouseY));
    }

    if (!mouseIsPressed) {
      this.points = [];
    }

    pop(); // Restore previous style settings
  }
}
