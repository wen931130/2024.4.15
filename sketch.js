let bg = "#FAEBCD";
let c = ["#E06A4E", "#DEB853", "#789F8A"];
let flowers = [];

class Flower {
  constructor(x, y, size, colors) {
    this.x = x;
    this.y = y;
    this.size = random(50,150); 
//隨機大小
    this.colors = colors;
    this.angle = 0;
    this.rotationSpeed = random(-1, 1);
    this.d = random(15, 15);
    this.vx = random(-1, 1); // 水平速度
    this.vy = random(-1, 1); // 垂直速度
  }

  draw() {
    push();
    translate(this.x, this.y);

    for (let r = 0; r < 360; r += 72) {
      fill(random(this.colors));
      let d = this.size / random(15, 15);
      let x = -d * 1.5 * cos(r);
      let y = -d * 1.5 * sin(r);
      circle(x, y, d * 3);

      stroke("#5A3D2B");
      strokeWeight(d / 1.5);
      drawingContext.setLineDash([2, 5]);

      beginShape();
      vertex(0, 0);
      vertex(-d, -d);
      line(0, 0, -d, -d * 2);
      line(0, 0, -d * 2, -d);
      endShape();
    }

    pop();
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > width) {
      this.vx *= -1;
    }
    if (this.y < 0 || this.y > height) {
      this.vy *= -1;
    }
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  background(bg);

  let cols = int(5);
  let rows = cols;
  let cellW = width / cols;
  let cellH = height / rows;
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * cellW + cellW / 2;
      let y = j * cellH + cellH / 2;
      let size = cellW;
      let flower = new Flower(x, y, size, c);
      flowers.push(flower);
    }
  }
}

function draw() {
  background(bg); 
  for (let j = 0; j < flowers.length; j++) {
    let flower = flowers[j];
    flower.draw();
    flower.update();
  }
}
