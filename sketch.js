let buildingWidth = 100;  //
let buildingHeight = 400; //
let windowSize = 40;      // 
let buildingSpeed = 2;
let numWindows = 6;
let buildings;
let buildingColors;
let windowColors;
let movingUp;
let amplitude;
let angle = 0;

function setup() {
  createCanvas(800, 600);
  buildings = new Array(floor(width / (buildingWidth + 20)) + 1); // Adjusted gap for larger buildings
  buildingColors = new Array(buildings.length);
  windowColors = new Array(buildings.length * numWindows);
  movingUp = new Array(buildings.length);
  amplitude = height / 5;
  
  for (let i = 0; i < buildings.length; i++) {
    buildings[i] = createVector(i * (buildingWidth + 20), height * 3 / 5);
    buildingColors[i] = color(random(255), random(255), random(255));
    movingUp[i] = random(1) > 0.5;
    
    for (let j = 0; j < numWindows; j++) {
      windowColors[i * numWindows + j] = randomWindowColor();
    }
  }
}

function draw() {
  drawGradientBackground();
  drawSun();
  
  for (let i = 0; i < buildings.length; i++) {
    fill(buildingColors[i]);
    
    // Move building up and down
    if (movingUp[i]) {
      buildings[i].y -= 0.5;
      if (buildings[i].y < height * 3 / 5 - amplitude) {
        movingUp[i] = false;
      }
    } else {
      buildings[i].y += 0.5;
      if (buildings[i].y > height * 3 / 5 + amplitude) {
        movingUp[i] = true;
      }
    }
    
    rect(buildings[i].x, buildings[i].y, buildingWidth, buildingHeight);
    drawWindows(buildings[i], i);
    buildings[i].x -= buildingSpeed;
    
    if (buildings[i].x + buildingWidth < 0) {
      buildings[i].x = width;
      buildingColors[i] = color(random(255), random(255), random(255));
      movingUp[i] = random(1) > 0.5;
      
      for (let j = 0; j < numWindows; j++) {
        windowColors[i * numWindows + j] = randomWindowColor();
      }
    }
  }
}

function drawGradientBackground() {
  for (let i = 0; i < height; i++) {
    let inter = map(i, 0, height, 0, 1);
    let c;
    if (i < height / 2) {
      c = lerpColor(color(0, 0, 139), color(255, 192, 203), map(i, 0, height / 2, 0, 1)); // Dark blue to pink
    } else {
      c = lerpColor(color(255, 192, 203), color(255, 140, 0), map(i, height / 2, height, 0, 1)); // Pink to orange
    }
    stroke(c);
    line(0, i, width, i);
  }
}

function drawSun() {
  let sunX = width / 2;
  let sunY = height / 2; // Centered sun
  let sunRadius = 50;
  
  fill(255, 0, 0);
  ellipse(sunX, sunY, sunRadius * 2, sunRadius * 2);
  
  // Orange ring of triangles
  push();
  translate(sunX, sunY);
  rotate(angle);
  fill(255, 165, 0);
  for (let i = 0; i < 12; i++) {
    let x = cos(TWO_PI / 12 * i) * (sunRadius + 20);
    let y = sin(TWO_PI / 12 * i) * (sunRadius + 20);
    triangle(x, y - 10, x + 10, y + 10, x - 10, y + 10);
  }
  pop();
  
  // Yellow ring of triangles
  push();
  translate(sunX, sunY);
  rotate(-angle);
  fill(255, 255, 0);
  for (let i = 0; i < 18; i++) {
    let x = cos(TWO_PI / 18 * i) * (sunRadius + 40);
    let y = sin(TWO_PI / 18 * i) * (sunRadius + 40);
    triangle(x, y - 10, x + 10, y + 10, x - 10, y + 10);
  }
  pop();
  
  angle += 0.02;
}

function drawWindows(building, index) {
  let rows = 3;
  let cols = 2;
  let gapX = (buildingWidth - cols * windowSize) / (cols + 1);
  let gapY = (buildingHeight - rows * windowSize) / (rows + 1);
  
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let x = building.x + gapX + j * (windowSize + gapX);
      let y = building.y + gapY + i * (windowSize + gapY);
      fill(windowColors[index * numWindows + i * cols + j]);
      rect(x, y, windowSize, windowSize);
    }
  }
}

function randomWindowColor() {
  let choice = int(random(3));
  if (choice == 0) {
    return color(255);
  } else if (choice == 1) {
    return color(0);
  } else {
    return color(255, 255, 0);
  }
}
