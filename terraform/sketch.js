const CANVAS_SIZE = 500;

let angleX = 0;
let angleY = 0;
let sphereRadius = 100;
let lightPosX = 0;
let lightPosY = -200;
let ctrlDown = false
let prevMouseX = 0;
let prevMouseY = 0;

function setup() {
  createCanvas(CANVAS_SIZE, CANVAS_SIZE, WEBGL);

  // Set up the lighting
  ambientLight(50);
  directionalLight(255, 255, 255, 0, 0, -1);
}

function draw() {
  background(200);

  rotateX(angleX);
  rotateY(angleY);

  // Draw the sphere with lighting
  ambientLight(70);
  pointLight(50, 50, 50, -lightPosX, lightPosY, 200);
  specularMaterial(255, 255, 255);
  shininess(15);
  sphere(sphereRadius);
}

function mouseMoved() {
  // Move the light source based on mouse position
  if (mouseIsPressed === false) {
    lightPosX = map(mouseX, 0, width, CANVAS_SIZE, -CANVAS_SIZE);
    lightPosY = map(mouseY, 0, height, -CANVAS_SIZE, CANVAS_SIZE);
  }
}

function mouseDragged() {
  // Calculate the angle based on mouse position
  if (ctrlDown) {
    cursor('grabbing');
    let deltaX = mouseX - prevMouseX;
    let deltaY = mouseY - prevMouseY;
    angleY += deltaX * 0.01;
    angleX -= deltaY * 0.01;
    prevMouseX = mouseX;
    prevMouseY = mouseY;
  }
}

function mousePressed() {
  prevMouseX = mouseX;
  prevMouseY = mouseY;
}

function mouseReleased() {
  cursor('default');
}

function keyPressed() {
  if (keyCode === CONTROL) {
    ctrlDown = true;
    cursor('grab')
  }
}

function keyReleased() {
  if (keyCode === CONTROL) {
    ctrlDown = false;
    cursor('default')
  }
}
