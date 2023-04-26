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

    if (mouseButton === RIGHT) {
      this.points = [];
    }

    pop(); // Restore previous style settings
  }

  onMouseDragged() {
    if (this.persist && mouseButton === LEFT) {
      this.points.push(createVector(mouseX, mouseY));
    }
  }
}
