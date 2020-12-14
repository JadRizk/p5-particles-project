// Create the list of particle rendered on screen
const particles = [];

const computeParticleNumber = () => {
  // Determine the number of particle depending on the screen W/H
  const particlesLength = Math.floor(width / 10);

  // Clean the Particles array (in case filled)
  particles.length = 0;

  // Create the particles
  for (let i = 0; i < particlesLength; i++) {
    // Push a new particle to the array
    particles.push(new Particle());
  }
};

function setup() {
  // Create our main workspace
  createCanvas(window.innerWidth, window.innerHeight);

  computeParticleNumber();
}

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
  computeParticleNumber();
}

function draw() {
  // We set the background to remove the particule trail (Every time)
  background("#1a5eab");

  // Update each particle
  particles.forEach((p, i) => {
    // Update the particle position
    p.update();
    // Draw the particle on screen
    p.draw();
    // Check the particles for the remaing items in the particules array
    p.checkParticles(particles.slice(i));
  });
}

function mouseClicked() {
  // Generate a random number of particle (1-5)
  const randCount = Math.floor(random(1, 5));

  console.log(randCount);
  // Generate new Particles witht he mouse coord.
  for (let i = 0; i < randCount; i++) {
    // Push a new particle to the array
    particles.push(new Particle(mouseX, mouseY));
  }
}

class Particle {
  constructor(pWidth, pHeight) {
    // Set the Particle position
    // The `width` and `height` are global variable holding the window.inner values
    // We will use the random function to randomize the position inside the canvas
    if (pWidth && pHeight) {
      this.pos = createVector(pWidth, pHeight);
    } else {
      this.pos = createVector(random(width), random(height));
    }

    // Add the particle velocity
    // For faster particlue, increase the range
    this.vel = createVector(random(-1, 1), random(-1, 1));
    // Particle Size
    // Generate a random number for the size
    this.size = random(1, 4);
  }

  // Handle the particle update
  update() {
    // Take the postion on the particle and add the velocity
    this.pos.add(this.vel);

    this.detectCanvasEdges();
  }

  // Draw single particle
  draw() {
    noStroke();
    fill("rgba(255, 255, 255, 0.7)");
    circle(this.pos.x, this.pos.y, this.size);
  }

  // Detect canvas edges
  detectCanvasEdges() {
    // This test if it hits either sides (X-Axis)
    if (this.pos.x < 0 || this.pos.x > width) {
      // Rotate the particle around, goes to the other direction
      this.vel.x *= -1;
    }

    // This test if it hits either sides (Y-Axis)
    if (this.pos.y < 0 || this.pos.y > height) {
      // Rotate the particle around, goes to the other direction
      this.vel.y *= -1;
    }
  }

  checkParticles(particles) {
    particles.forEach((p) => {
      // Calculate the distance between the class particle and the other particle in the remaining
      const distance = dist(this.pos.x, this.pos.y, p.pos.x, p.pos.y);

      //   Make sure the particles are not to far away
      if (distance < 50) {
        // Draw the line
        stroke("rgba(255, 255, 255, 0.3)");
        line(this.pos.x, this.pos.y, p.pos.x, p.pos.y);
      } else if (distance < 100) {
        // Draw the line
        stroke("rgba(255, 255, 255, 0.2)");
        line(this.pos.x, this.pos.y, p.pos.x, p.pos.y);
      } else if (distance < 150) {
        // Draw the line
        stroke("rgba(255, 255, 255, 0.1)");
        line(this.pos.x, this.pos.y, p.pos.x, p.pos.y);
      }
    });
  }
}
