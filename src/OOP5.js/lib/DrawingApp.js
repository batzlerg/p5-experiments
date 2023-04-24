/**
 * Represents the main application for the drawing program.
 */
class DrawingApp {
  /**
   * Creates a new DrawingApp object with the specified options.
   * @param {Object} options - The options for the drawing program.
   * @param {number} options.width - The width of the canvas.
   * @param {number} options.height - The height of the canvas.
   * @param {Function} options.mouseClicked - The mouse click event handler.
   */
  constructor(options) {
    this.canvasWidth = options.width || 800;
    this.canvasHeight = options.height || 600;
    this.canvas = null;
    this.shapes = [];

    if (options.mouseClicked) {
      this.mouseClicked = options.mouseClicked.bind(this);
    }
  }

  /**
   * Sets up the canvas and initializes the drawing program.
   */
  setup() {
    this.canvas = createCanvas(this.canvasWidth, this.canvasHeight);

    if (this.mouseClicked) {
      this.canvas.mouseClicked(this.mouseClicked);
    }
  }

  /**
   * Handles the draw loop for the drawing program.
   */
  draw() {
    background(255);

    for (let shape of this.shapes) {
      shape.draw();
    }
  }
}
