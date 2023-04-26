/**
 * Animates a shape using a sine wave at a given angle.
 * @param {Object} shape - The shape to be animated.
 */
function sineWave(shape) {
  // Calculate the current angle based on the animation speed and direction
  let angle = (millis() / (1000 / 30));

  // Calculate the new y position based on the angle
  let distance = 1;
  let newY = shape.y + sin(angle) * distance / 2;

  // Update the shape's position
  shape.y = newY;
};