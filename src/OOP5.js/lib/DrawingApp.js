/**
 * Create a drawing app.
 */
class DrawingApp {
  /**
   * Create a drawing app.
   * @param {Object} options - The options object.
   * @param {number} options.width - The width of the canvas.
   * @param {number} options.height - The height of the canvas.
   * @param {Function} options.initOnDraw - Decide what to do with the canvas on every frame
   * @param {Drawable[]} options.shapes - An array of Drawable objects.
   * @param {Object | undefined} options.border - The configuration for the bordered rectangle. No border if undefined
   * @param {Function | undefined} options.mouseClicked - The function to be called when the mouse is clicked.
   */
  constructor(options = {}) {
    this.width = options.width;
    this.height = options.height;
    this.shapes = options.shapes || [];
    this.postDrawShapes = [];

    if (!!options.border) {
      const strokeWidth = options.border.width || 1;
      const rectOptions = {
        x: strokeWidth / 2,
        y: strokeWidth / 2,
        width: this.width - strokeWidth,
        height: this.height - strokeWidth,
        color: color(0, 0, 0, 0), // transparent fill
        border: options.border
      };
      const rectangle = new Rectangle(rectOptions);
      this.postDrawShapes.unshift(rectangle);
    }

    this.canvas = createCanvas(this.width, this.height);
    if (options.initOnDraw) this.onDraw = options.initOnDraw();

    if (!!options.mouseClicked) {
      this.mouseClicked = options.mouseClicked.bind(this);
    }

    this.canvas.mouseClicked(this.onMouseClicked.bind(this));
  }

  /**
   * Draw all shapes on the canvas.
   */
  draw() {
    background(255);
    if (!!this.onDraw) {
      this.onDraw();
    }
    this.shapes.forEach(s => s.draw());
    this.postDrawShapes.forEach(s => s.draw());
  }

  /**
   * Called when the mouse is clicked.
   */
  onMouseClicked() {
    if (typeof this.mouseClicked === 'function') {
      this.mouseClicked();
    }
  }
}
