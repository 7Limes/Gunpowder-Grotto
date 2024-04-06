const PARTICLE_GRAVITY = 0.1;


class ParticleEffect {
  constructor(
    x, y, amount, strength=1, 
    color=[255, 255, 255], colorvar=[0, 0, 0], 
    spreadx=0, spready=0, 
    duration=60, durationvar=10,
    size=3, sizevar=0,
    gravity=true) {
    
    this.particles = [];
    for (let i = 0; i < amount; i++) {
      let px = x + randDecimal(-spreadx, spreadx);
      let py = y + randDecimal(-spready, spready);
      let pvx = randDecimal(-strength, strength);
      let pvy = randDecimal(-strength, strength);
      let pduration = duration + randInt(-durationvar, durationvar);
      let psize = clamp(size+randInt(-sizevar, sizevar), 0, size+sizevar);
      let pcolor = [
        color[0] + randInt(-colorvar[0], colorvar[0]),
        color[1] + randInt(-colorvar[1], colorvar[1]),
        color[2] + randInt(-colorvar[2], colorvar[2])
      ].map(x => clamp(x, 0, 255));
      let p = new Particle(px, py, createVector(pvx, pvy), pcolor, pduration, psize, gravity);
      this.particles.push(p);
    }
  }

  tickdraw(surf) {
    for (let i = 0; i < this.particles.length; i++) {
      if (this.particles[i].tickdraw(surf)) {
        this.particles.splice(i, 1);
        i -= 1;
      }
    }
    return this.particles.length == 0;
  }
}

class Particle {
  constructor(x, y, velocity, color, duration, size, gravity=false) {
    this.x = x;
    this.y = y;
    this.vel = velocity;
    this.color = color;
    this.duration = duration;
    this.accy = 0;
    this.size = size;
    if (gravity)
      this.accy = PARTICLE_GRAVITY;
  }

  tickdraw(surf) {
    this.vel.y += this.accy;
    this.x += this.vel.x;
    this.y += this.vel.y;
    surf.fill(this.color);
    surf.rect(this.x, this.y, this.size, this.size);
    this.duration -= 1;
    return this.duration <= 0;
  }
}