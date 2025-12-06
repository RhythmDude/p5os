function setup() {
  createCanvas(windowWidth, windowHeight);
  background(230);
  noCursor();
  frameRate(60);
}

let UIm = [
  ["test", 2, "$text:150:75:test", "$text:0:0:test12", 200, 200, 300, 150],
  [
    "hello",
    2,
    "$text:0:0:hi",
    "$rect:50:50:100:60:#ff0000:#000000",
    400,
    300,
    250,
    150,
  ],
];
let sprites = {};
function systemProcesses() {
  
}

let cursorx = 0;
let cursory = 0;

function hexToRGB(hex) {
  hex = hex.replace(/^#/, "");
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((c) => c + c)
      .join("");
  }
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return [r, g, b];
}

function windowSimple(UImID) {
  let baseIndex = 2 + UIm[UImID][1];

  if (UIm[UImID][baseIndex + 2] < 150 || UIm[UImID][baseIndex + 3] < 150) {
    console.log(
      "window with UI id of " +
        str(UImID) +
        " failed to initialize: one or both dimensions was too low"
    );
    return "error_low_value";
  } else {
    push();

    fill(255);
    stroke(100);
    textSize(25);

    let x = UIm[UImID][baseIndex];
    let y = UIm[UImID][baseIndex + 1];
    let w = UIm[UImID][baseIndex + 2];
    let h = UIm[UImID][baseIndex + 3];

    rect(x, y, w, h);
    fill(240);
    rect(x, y, w, 30);
    fill(0);
    stroke(240);
    text(UIm[UImID][0], x + 5, y + 22);

    drawingContext.save();
    drawingContext.beginPath();
    drawingContext.rect(x, y + 30, w, h - 30);
    drawingContext.clip();

    for (let i = 0; i < UIm[UImID][1]; i++) {
      let cUIitem = UIm[UImID][2 + i];
      if (cUIitem.startsWith("$text:")) {
        let [, offsetX, offsetY, textValue] = cUIitem.split(":");
        text(textValue, Number(offsetX) + x, Number(offsetY) + y + 50);
      }
      if (cUIitem.startsWith("$rect:")) {
        let [, offsetX, offsetY, W, H, fillHex, strokeHex] = cUIitem.split(":");
        let fillRGB = hexToRGB(fillHex || "#cccccc");
        let strokeRGB = hexToRGB(strokeHex || "#000000");
        fill(...fillRGB);
        stroke(...strokeRGB);
        rect(
          Number(offsetX) + x,
          Number(offsetY) + y + 30,
          Number(W),
          Number(H)
        );
      }
    }

    drawingContext.restore();
    pop();
  }
}

function draw() {
  background(230);

  windowSimple(0);
  windowSimple(1);

  //mouse
  beginShape();
  vertex(mouseX, mouseY);
  vertex(mouseX, mouseY + 15);
  vertex(mouseX + 4, mouseY + 10)
  vertex(mouseX + 10, mouseY + 10);
  endShape(CLOSE);

  if (keyIsDown(DOWN_ARROW)) {
    UIm[1][5] += 2;
  }
  if (keyIsDown(UP_ARROW)) {
    UIm[1][5] -= 2;
  }
  if (keyIsDown(LEFT_ARROW)) {
    UIm[1][4] -= 2;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    UIm[1][4] += 2;
  }
}
