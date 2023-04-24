/**
 * Represents a drawable object that allows the user to draw on the canvas.
 */
class Drawable {
  /**
   * Creates a new Drawable object with the specified options.
   * @param {Object} options - The options for the drawable object.
   * @param {color} options.color - The color of the stroke.
   * @param {number} options.strokeWeight - The weight of the stroke.
   */
  constructor(options) {
    this.color = options.color || color(0);
    this.strokeWeight = options.strokeWeight || 1;

    this.points = [];
  }

  /**
   * Draws the drawable object.
   */
  draw() {
    stroke(this.color);
    strokeWeight(this.strokeWeight);
    noFill();

    beginShape();
    for (let i = 0; i < this.points.length; i++) {
      vertex(this.points[i].x, this.points[i].y);
    }
    endShape();
  }

  /**
   * Adds a point to the drawable object.
   * @param {number} x - The x-coordinate of the point.
   * @param {number} y - The y-coordinate of the point.
   */
  addPoint(x, y) {
    this.points.push(createVector(x, y));
  }

  /**
   * Clears all points from the drawable object.
   */
  clearPoints() {
    this.points = [];
  }

  /**
   * Sets the color of the stroke.
   * @param {color} color - The new color of the stroke.
   */
  setColor(color) {
    this.color = color;
  }

  /**
   * Sets the weight of the stroke.
   * @param {number} weight - The new weight of the stroke.
   */
  setStrokeWeight(weight) {
    this.strokeWeight = weight;
  }
}
