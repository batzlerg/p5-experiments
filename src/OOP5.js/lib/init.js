/**
 * A function to initialize a P5.js instance with custom event handlers.
 * @param {Object} options - An object containing event types as keys and their corresponding callback functions.
 * @param {Function} options.mousePressed - The callback function to be called when the mouse is pressed.
 * @param {Function} options.mouseReleased - The callback function to be called when the mouse is released.
 * @param {Function} options.mouseClicked - The callback function to be called when the mouse is clicked.
 * @param {Function} options.mouseMoved - The callback function to be called when the mouse is moved.
 * @param {Function} options.mouseDragged - The callback function to be called when the mouse is dragged.
 * @param {Function} options.keyPressed - The callback function to be called when a key is pressed.
 * @param {Function} options.keyReleased - The callback function to be called when a key is released.
 * @param {Function} options.keyTyped - The callback function to be called when a key is typed.
 * @param {Function} options.touchStarted - The callback function to be called when a touch event starts.
 * @param {Function} options.touchMoved - The callback function to be called when a touch event moves.
 * @param {Function} options.touchEnded - The callback function to be called when a touch event ends.
 * @returns {Object} The P5.js instance with the added event handlers.
 */
function initP5WithEvents(options) {
  let p5Instance = new p5((p5) => {
    // Define empty arrays for each event type
    let eventCallbacks = {
      mousePressed: [],
      mouseReleased: [],
      mouseClicked: [],
      mouseMoved: [],
      mouseDragged: [],
      keyPressed: [],
      keyReleased: [],
      keyTyped: [],
      touchStarted: [],
      touchMoved: [],
      touchEnded: []
    };

    // Loop through each event type and add the corresponding event handler
    for (let eventType in eventCallbacks) {
      p5[`handle${pascalCase(eventType)}`] = (...args) => {
        // Call all of the event handlers for this event type in order
        for (let callback of eventCallbacks[eventType]) {
          callback(...args);
        }
        // Call the original event handler if it exists
        if (typeof p5[`_${eventType}`] === 'function') {
          p5[`_${eventType}`](...args);
        }
      };
    }

    // Define a function to add new event handlers
    p5.addEventHandler = (eventType, callback) => {
      if (eventCallbacks.hasOwnProperty(eventType)) {
        eventCallbacks[eventType].push(callback);
      }
    };

    // Add event handlers specified in the options object
    for (let eventType in options) {
      if (eventCallbacks.hasOwnProperty(eventType)) {
        eventCallbacks[eventType].push(options[eventType]);
      }
    }
  });

  window.p5 = p5Instance;
  return p5Instance;
}

/**
 * Converts a string to pascal case.
 *
 * @param {string} str - The string to convert.
 * @returns {string} The pascal cased string.
 */
function pascalCase(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
