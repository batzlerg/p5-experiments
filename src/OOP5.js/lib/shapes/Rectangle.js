/**
 * Represents a rectangle.
 */
class Rectangle extends Shape {
  constructor(options = {}) {
    super(options); // call parent constructor with options argument
    this.width = options.width || 100;
    this.height = options.height || 50;
    this.border = options.border;
  }

  /**
   * Draws the rectangle.
   */
  draw() {
    push(); // push current drawing settings onto the stack

    fill(this.color);
    if (this.border) {
      stroke(this.border.color);
      strokeWeight(this.border.width);
      strokeCap(this.border.position);
    } else {
      noStroke();
    }

    rect(this.x, this.y, this.width, this.height);

    this.handleMouseEvents(); // call parent method to handle mouse events

    pop(); // restore previous drawing settings from the stack
  }
}
