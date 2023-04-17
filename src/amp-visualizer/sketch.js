const DEFAULT_STROKE = 1;
const DEFAULT_FILL = 50;
const CONTROL_SPACING = 25;
const controlsSchema = [
  {
    name: 'sparseness',
    init: [5, 100, 50, 1],
  },
  {
    name: 'culture',
    init: [1, 100, 5, 1],
  },
  {
    name: 'thickness',
    init: [0.1, 10, 1, .1]
  }
]

let amp
let vol
let sound
let controls = {}
let rand1 = 0
let rand2 = 0
function preload() {
  sound = loadSound('./assets/vocal.wav')
}

function setup() {
  canvas = createCanvas(400, 400);
  amp = new p5.Amplitude()
  volCoeff = width;

  // Attach the mousePressed() event listener to the canvas
  canvas.mousePressed(playSound);

  // enumerate sliders
  controlsSchema.forEach((sch, idx) => {
    controls[sch.name] = createSlider(...sch.init);
    controls[sch.name].position(10, height - CONTROL_SPACING * (idx + 1));
  });
}

function playSound() {
  if (!sound.isPlaying()) {
    sound.loop();
  } else {
    sound.stop();
  }
}

function drawCircles() {
  vol = amp.getLevel() * volCoeff
  interRingDistance = controls['sparseness'].value()
  ringCulture = controls['culture'].value() / 10
  ringThickness = controls['thickness'].value()

  if (frameCount % 7 === 0) {
    rand1 = (random(-1 * ringCulture, ringCulture));
    rand2 = (random(-1 * ringCulture, ringCulture));
  }

  for (let i = 0; i < vol; i += interRingDistance) {
    rectMode(CENTER);
    translate(radians(rand1 + rand2));

    noFill();
    strokeWeight(DEFAULT_STROKE + ringThickness);
    rect(
      width / 2 + rand1,
      height / 2 + rand2,
      i + interRingDistance / 2,
      i + interRingDistance / 2,
    )

    translate(-radians(rand1 + rand2));
    strokeWeight(DEFAULT_STROKE);
  }
}

function drawLabels() {
  fill(DEFAULT_FILL);
  textSize(16);
  Object.entries(controls).forEach(([name, slider], idx) => {
    text(name, slider.x * 2 + slider.width, height - CONTROL_SPACING * (idx + 1) + 15);
  })
}

function draw() {
  background(220);
  drawCircles();
  drawLabels();
}