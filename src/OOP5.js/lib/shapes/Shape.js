/**
 * Represents a shape.
 */
class Shape {
  constructor(options = {}) {
    this.x = options.x || 0;
    this.y = options.y || 0;
    this.width = options.width || 50;
    this.height = options.height || 50;
    this.color = options.color || color(0);
    this.stroke = options.stroke || undefined;
    this.onMouseOver = options.onMouseOver || undefined;
    this.onMouseDown = options.onMouseDown || undefined;

    this.isMouseOver = false;
    this.isMouseDown = false;
  }

  /**
   * Draws the shape.
   */
  draw() {
    // this.handleMouseEvents();
  }

  /**
   * Handles mouse events for the shape.
   */
  handleMouseEvents() {
    // Update mouse flags
    let wasMouseOver = this.isMouseOver;
    this.isMouseOver = this.contains(mouseX, mouseY);
    let wasMouseDown = this.isMouseDown;
    this.isMouseDown = mouseIsPressed && this.isMouseOver;

    // Call mouse event functions
    if (this.onMouseOver && this.isMouseOver && !wasMouseOver) {
      this.onMouseOver();
    }

    if (this.onMouseDown && this.isMouseDown && !wasMouseDown) {
      this.onMouseDown();
    }
  }

  /**
   * Checks if given x and y coordinates are inside the shape.
   * @param {number} x - The x-coordinate to check.
   * @param {number} y - The y-coordinate to check.
   * @returns {boolean} - True if the coordinates are inside the shape, false otherwise.
   */
  contains(x, y) {
    return x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.height;
  }
}
