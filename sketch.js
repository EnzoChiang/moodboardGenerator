/*
Mood Board Generator
Designer: Yen-Yi Chiang, n10859543

Dicription:
Emoji Mood Board Generator is a tool you can make your unique mood board by selecting some emoji that describe the expected style of your project.

Instruction for the sketch:
1.select the emoji
2.select the font style
3.click "load asset" and wait for a few second. Then, click"generate".
*/

//Assets in array
let myMoodBoard;
let fontData = [
  "RobotoCondensed-Bold",
  "RobotoCondensed-Regular",
  "SigmarOne-Regular",
  "Oswald-VariableFont_wght",
  "PlayfairDisplay-VariableFont_wght",
  "CormorantGaramond-Light",
];
let emoji = ["🌱","😁","😙","💸","🧘","🎩","🔥","➖","🌬","🏖","🌈","🧹","⬛️","📻"];
let word = [
  "Nature",
  "Happy",
  "Cozy",
  "Luxury",
  "Relaxed",
  "Classic",
  "Warm",
  "Mininal",
  "Fresh",
  "Casual",
  "Colourful",
  "Clean",
  "Dark",
  "Vintage",
];
let fonts = [];
let selectFont = 0;
let imageAsset;
let moods = [];
let colour;

//states control
let currentMillis;
let state = 0;
let status;

//User Interface
let submitButton;
let saveButton;
let loadButton;
let dropdown;
let emojiSelect = [];

function preload() {
  for (let x = 0; x < fontData.length; x++) {
    fonts.push(loadFont(fontData[x] + ".ttf"));
  }
}

function setup() {
  //instructions
  let p = [0, 0];
  p[0] = createP("1.Select emoji (at least 3 options)");
  p[0].position(20, 605);
  p[1] = createP("2.Select a font style");
  p[1].position(20, 730);
  loadPage();
}

function loadPage() {
  myMoodBoard = createCanvas(1200, 600);
  title();

  //emoji checkboxes
  for (let b = 0; b < word.length; b++) {
    let buttonName = emoji[b] + " " + word[b];
    emojiSelect.push();
    emojiSelect[b] = createCheckbox(buttonName);
    emojiSelect[b].name = word[b];
    
    if (b < 7) {
      emojiSelect[b].position(15 + 125 * b, 650);
    } else {
      emojiSelect[b].position(15 + 125 * (b - 7), 690);
    }
    emojiSelect[b].size(115, 30);
    emojiSelect[b].style("font-size", "14px");
    emojiSelect[b].style("background-color", "LightGray");
    emojiSelect[b].style("border", "none");
    emojiSelect[b].style("color", "Ivory");
    emojiSelect[b].style("border-radius", "17px");
    emojiSelect[b].changed(checkedEvent);
  }

  //Style dropdown
  dropdown = createSelect();
  dropdown.position(15, 770);
  dropdown.size(100, 30);
  dropdown.option("Modern", 0);
  dropdown.option("Cute", 2);
  dropdown.option("Elegant", 4);
  dropdown.selected(0);
  dropdown.changed(selectEvent);

  //load button
  loadButton = createButton("⬆️ Load Assets");
  loadButton.position(900, 690);
  loadButton.size(300, 50);
  loadButton.style("font-size", "20px");
  loadButton.style("background-color", "LightSlateGray");
  loadButton.style("border", "none");
  loadButton.style("color", "Ivory");
  loadButton.style("border-radius", "17px");
  loadButton.mousePressed(loadAsset);
}

function draw() {
  //add a timer to control states
  timer();
}

function saveStoryBoard() {
  saveCanvas(myMoodBoard, "myMoodBoard", "jpg");
}

function loadAsset() {
  //loading images with specific moods from unsplash and store them in an array
  imageAsset = [];
  for (let x = 0; x < 7; x++) {
    let source1 = int(random(moods.length));
    let source2 = int(random(moods.length));
    let source3 = int(random(moods.length));
    let url =
      "https://source.unsplash.com/150x100/?" +
      moods[source1] +
      "," +
      moods[source2] +
      "," +
      moods[source3];
    imageAsset.push();
    imageAsset[x] = loadImage(url);
  }
  state = 1;
}

function generate() {
  state = 0;
  submitButton.remove();
  title();

  //generate colour palette from source image and display their colour code
  for (let y = 0; y < 5; y++) {
    colour = color(imageAsset[y].get(75, 50));
    noStroke();
    fill(colour);
    square(-350 + y * 90, 470, 50);
    fill(0);
    textFont(fonts[1]);
    textSize(15);
    text(colour.toString("#rrggbb"), -325 + y * 90, 540);
  }

  //font suggestion for title & paragraph and display emoji selections
  textAlign(LEFT);
  textFont(fonts[selectFont]);
  textSize(20);
  text(fontData[selectFont], 230, 350);
  selectFont++;
  textFont(fonts[selectFont]);
  textSize(15);
  text(
    "The most suitable pairing font we suggest for the paragraph is " +
      fontData[selectFont] +
      ". " +
      "The emoji and moods you selected are : " +
      moods,
    230,
    360,
    320,
    180
  );
  selectFont--;
  textAlign(CENTER);
  
  //save button
  saveButton = createButton("💾  Save Mood Board");
  saveButton.position(900, 630);
  saveButton.size(300, 50);
  saveButton.style("font-size", "20px");
  saveButton.style("background-color", "LightSlateGray");
  saveButton.style("border", "none");
  saveButton.style("color", "Ivory");
  saveButton.style("border-radius", "17px");
  saveButton.mousePressed(saveStoryBoard);

  // generate images with random position& three different sizes
  for (let x = 0; x < 4; x++) {
    let picSizeX, picSizeY;
    let randomNumber = random(3);
    
    if (randomNumber < 3 && randomNumber > 2) {
      picSizeX = 150;
      picSizeY = 100;
    }
    if (randomNumber < 2 && randomNumber > 1) {
      picSizeX = 165;
      picSizeY = 110;
    }
    if (randomNumber < 1) {
      picSizeX = 180;
      picSizeY = 120;
    }
    image(imageAsset[x], -420 + 190 * x, random(140, 180), picSizeX, picSizeY);
    image(
      imageAsset[x + 4],
      -400 + 190 * x,
      random(300, 340),
      picSizeX,
      picSizeY
    );
  }
}

//put the value of selected emoji into an array
function checkedEvent() {
  if (this.checked()) {
    moods.push(this.name);
  } else {
    order = moods.indexOf(this.name);
    moods.splice(order, 1);
  }
}

function selectEvent() {
  selectFont = dropdown.value();
}

//setting a timer for loading images
function timer() {
  currentMillis = frameCount % 800;

  if (state == 1 && currentMillis < 798) {
    status = createP("Loading assets...");
    status.position(550, 750);
    state = 2;
  }

  if (state == 2 && currentMillis > 798) {
    status.remove();

    //submit Button
    submitButton = createButton("✅ Generate my mood board");
    submitButton.position(900, 750);
    submitButton.size(300, 50);
    submitButton.style("font-size", "20px");
    submitButton.style("background-color", "LimeGreen");
    submitButton.style("border", "none");
    submitButton.style("color", "Ivory");
    submitButton.style("border-radius", "17px");
    submitButton.mousePressed(generate);

    state = 0;
  }
}

function title() {
  background(245);
  translate(600, 0);
  textAlign(CENTER);

  //ToolTitle
  textFont(fonts[0]);
  textSize(40);
  text("Mood Board Generator", 0, 80);
  textFont(fonts[1]);
  textSize(20);
  text("By Yen-Yi Chiang", 0, 105);
}
