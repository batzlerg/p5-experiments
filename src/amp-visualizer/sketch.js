const CANVAS_WIDTH = 400
const CANVAS_HEIGHT = 400
const PARENT_EL_ID = 'canvas';
const DEFAULT_STROKE = 1;
const DEFAULT_FILL = 50;
const CONTROL_SPACING = 25;
const controlsSchema = [
  {
    name: 'sparseness',
    init: [5, 100, 50, 1],
    $el: null,
  },
  {
    name: 'culture',
    init: [1, 100, 5, 1],
    $el: null,
  },
  {
    name: 'thickness',
    init: [0.1, 10, 1, .1],
    $el: null,
  }
]
const CONTROLS_POS_Y = 20;
const CONTROLS_POS_X = 20;
const CONTROLS_LABEL = '⚙'
const CONTROLS_CLOSE_LABEL = 'X';
const TEXT_SIZE = 16;
const TEXT_LABEL_PADDING = 5;

let amp
let vol
let sound
let rand1 = 0
let rand2 = 0
let isControlPanelOpen = false
function preload() {
  sound = loadSound('./assets/dnb.wav')
}

function setup() {
  const canvas = createCanvas(400, 400);
  canvas.parent(PARENT_EL_ID);
  rectMode(CENTER);
  textSize(TEXT_SIZE);

  /*********/
  /* SOUND */
  /*********/
  amp = new p5.Amplitude()
  // Enable normalize to reduce the dynamic range
  amp.toggleNormalize(true);
  // Set the smooth value to reduce any artifacts from normalization
  amp.smooth(5);
  volCoeff = width;

  // enumerate sliders
  controlsSchema.forEach((sch, idx) => {
    sch.$el = createSlider(...sch.init);
    sch.$el.parent(PARENT_EL_ID);
    sch.$el.position(
      CONTROL_SPACING,
      height - CONTROL_SPACING * idx - sch.$el.height * 2
    );
    sch.$el.hide()
  });
}

function randomBoolean() { return random() < 0.5; }

function getControl(string) {
  return controlsSchema.find(c => c.name === string);
}

function getControlValue(control) {
  if (typeof control === 'string') {
    control = getControl(control)
  }
  return control?.$el?.value() ?? 0;
}

function drawVisualizer() {
  vol = amp.getLevel() * width;
  interRingDistance = getControlValue('sparseness')
  ringCulture = getControlValue('culture') / 4
  ringThickness = getControlValue('thickness')

  /***********/
  /* CULTURE */
  /***********/
  if (frameCount % 7 === 0) {
    rand1 = (random(-1 * ringCulture, ringCulture));
    rand2 = (random(-1 * ringCulture, ringCulture));
  }

  for (let i = 0; i < vol; i += interRingDistance) {
    const widthMod = randomBoolean ? rand1 : -rand1;
    const heightMod = randomBoolean ? rand2 : -rand2;

    noFill();
    strokeWeight(DEFAULT_STROKE + ringThickness);
    ellipse(
      width / 2 + widthMod,
      height / 2 + heightMod,
      i + interRingDistance / 2,
      i + interRingDistance / 2,
    )

    strokeWeight(DEFAULT_STROKE);
  }
}

function drawControls() {
  fill(DEFAULT_FILL);
  // draw icon
  textSize(TEXT_SIZE * 1.4);
  text(
    isControlPanelOpen ? CONTROLS_CLOSE_LABEL : CONTROLS_LABEL,
    TEXT_SIZE * 1.4,
    TEXT_SIZE * 1.4
  );
  textSize(TEXT_SIZE);

  if (isControlPanelOpen) {
    // controlsSchema.length * CONTROL_SPACING, 0);
    // Draw the labels for the controls
    controlsSchema.forEach((control, idx) => {
      highlightedText(
        control.name,
        control.$el.x * 2 + control.$el.width,
        height - CONTROL_SPACING * idx - CONTROL_SPACING,
        { backgroundColor: '#fff' }
      );
    });
  }
}

function highlightedText(string, x, y, { backgroundColor } = {}) {
  const w = textWidth(string);
  if (backgroundColor) {
    rectMode(CORNER);
    fill(backgroundColor);
    rect(
      x - TEXT_LABEL_PADDING,
      y - TEXT_SIZE,
      w + 2 * TEXT_LABEL_PADDING,
      TEXT_SIZE + TEXT_LABEL_PADDING
    );
    fill(DEFAULT_FILL);
    rectMode(CENTER);
  }
  text(string, x, y);
}

/*********/
/* EVENTS */
/*********/
function mouseClicked() {
  const messageWidth = textWidth(CONTROLS_LABEL);
  const messageTop = CONTROLS_POS_Y - textAscent();
  const messageBottom = CONTROLS_POS_Y + textDescent();
  const isSettingsButtonClick = mouseX > CONTROLS_POS_X && mouseX < CONTROLS_POS_X + messageWidth &&
    mouseY > messageTop && mouseY < messageBottom;

  if (isSettingsButtonClick) {
    // enumerate sliders
    if (isControlPanelOpen) {
      controlsSchema.forEach((control) => control.$el.hide());
    } else {
      controlsSchema.forEach((control) => control.$el.show());
    }
    isControlPanelOpen = !isControlPanelOpen;
    return false;
  } else {
    if (!sound.isPlaying()) {
      sound.loop();
    } else {
      sound.stop();
    }
  }
}

function draw() {
  const control = getControl('culture');
  const [controlMin, controlMax] = control?.init;
  const translucency = 0.8 - map(getControlValue(control), controlMin, controlMax, 0, .3);

  background(`rgba(220,220,220,${translucency})`);
  drawVisualizer();
  drawControls();
}