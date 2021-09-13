const width = 2000;
const height = 1600;

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
ctx.globalAlpha = 0.5;
ctx.globalCompositeOperation = 'hue';

class FueledMover {
  constructor(eraser) {
    this.fuel = 50;
    this.vx = 5;
    this.vy = 5;
    this.ax = 5;
    this.ay = 5;
    this.eraser = eraser;
  }

  step() {
    if (--this.fuel) {
      this.vx += this.ax;
      this.vy += this.ay;
      this.ax = (Math.random() * 2 - 1) * 5;
      this.ay = (Math.random() * 2 - 1) * 5;
    } else {
      this.eraser.erase(this);
    }
  }
}

class Sphere {
  constructor() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.baseColor = Math.floor(Math.random()*16777215);
    this.color = '#' + this.baseColor.toString(16);
    this.radiusX = this.baseRadius = 150;
    this.radiusY = this.baseRadius = 150;
    this.mover = new FueledMover(() => this.mover = null);
  }
  step() {
    if (this.mover) {
      this.mover.step();
      this.x += this.mover.vx;
      this.y += this.mover.vy;
      if (this.x > width) this.x -= width;
      if (this.x < 0) this.x += width;
      if (this.y > height) this.y -= height;
      if (this.y < 0) this.y += height;
    }
    this.radiusX = this.baseRadius * Math.abs(Math.sin(Date.now()));
    this.radiusY = this.baseRadius * Math.abs(Math.sin(Date.now() - Math.PI / 2 + 0.1));
    this.color = '#' + Math.floor((this.baseColor * Math.abs(Math.sin((Date.now() - Math.PI / 2 + 0.1))))).toString(16);
  }
  draw() {
    this.step();
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.ellipse(this.x, this.y, this.radiusX, this.radiusY, Math.sin(Date.now()) * Math.PI * 2, 0, Math.PI * 2, true);
    ctx.fill();
  }
}

var shouldStop  = false;

document.addEventListener('keydown', () => { shouldStop = true }, {once: true});

var spheres = Array.from({length:5}).map(() => new Sphere());

function draw() {
  ctx.fillStyle = 'cyan';
  ctx.fillRect(0, 0, width, height);
  spheres.forEach(sphere => {
    sphere.draw();
  })
  if (!shouldStop) setTimeout(() => requestAnimationFrame(draw), 5 * 1000 / 60);
}

draw();