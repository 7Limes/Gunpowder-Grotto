const PLAYER_WIDTH = 16;
const PLAYER_HEIGHT = 32;
const PLAYER_ACCEL = 1.75;
const PLAYER_AIR_ACCEL = 0.5;
const PLAYER_GRAVITY = 0.5;
const PLAYER_FRICTION = 0.8;
const PLAYER_ICE_FRICTION = 0.05;
const PLAYER_AIR_FRICTION = 0.1;
const PLAYER_MAX_WALK_VEL = 5+PLAYER_FRICTION;
const PLAYER_MAX_VEL = 14;
const PLAYER_SHOOT_STRENGTH = 10;
const PLAYER_ANIMATION_FRAME_CHANGE = 10;

const PROJ_GRAVITY = 0.5;

const SPRING_LENGTH = 24;
const SPRING_THICKNESS = 4;
const SPRING_VERTICAL_STRENGTH = 12;
const SPRING_HORIZONTAL_STRENGTH = 8;

const ITEM_SIZE = 20;
const SPIKE_ROW_DEPTH = 16;

// player.ground
// 0 = in air
// 1 = on regular wall
// 2 = on ice

// wall types
// 0 = regular
// 1 = ice
// 2 = wood


function killPlayer() {
  let pe = new ParticleEffect(player.x, player.y, 25, 2, [150, 0, 0], [50, 0, 0], 5, 5, 60, 10, 3, 2);
  particleEffects.push(pe);
  loadLevel(levelNumber);
  player.vx = 0;
  player.vy = 0;
  deaths += 1;
}


class Hitbox {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  hits(other) {
    return !(this.x+this.width <= other.x || this.x >= other.x+other.width || this.y+this.height <= other.y || this.y >= other.y+other.height);
  }

  getVertices() {
    return [
      [this.x, this.y],
      [this.x+this.width, this.y],
      [this.x, this.y+this.height],
      [this.x+this.width, this.y+this.height]
    ];
  }

  getCenter() {
    return [this.x+this.width/2, this.y+this.height/2];
  }
}

class DynamicHitbox extends Hitbox {
  constructor(x, y, width, height, velocity) {
    super(x, y, width, height);
    this.velocity = velocity;
  }

  addVelocity(vector) {
    this.velocity.add(vector);
    let mag = this.velocity.mag();
    if (mag > PLAYER_MAX_VEL)
      this.velocity.setMag(PLAYER_MAX_VEL);
    if (mag < -PLAYER_MAX_VEL)
      this.velocity.setMag(-PLAYER_MAX_VEL);
  }
}

// hitbox is not exactly where the object is drawn
class DisjointHitbox extends Hitbox {
  constructor(x, y, width, height, gx, gy, gwidth, gheight) {
    super(x, y, width, height);
    this.gx = gx;
    this.gy = gy;
    this.gwidth = gwidth;
    this.gheight = gheight;
  }
}

class Player extends Hitbox {
  constructor(x, y, maxShots=0) {
    super(x, y, PLAYER_WIDTH, PLAYER_HEIGHT);
    this.vx = 0;
    this.vy = 0;
    this.ground = 0;
    this.shots = 0;
    this.maxShots = maxShots;
    this.projectiles = [];
    this.img = img_player_idle;
    this.animationCounter = 0;
    this.animationIndex = 0;
  }

  _xVelocityTick() {
    let aPressed = keyIsDown(65);
    let dPressed = keyIsDown(68);

    // animation
    if (dPressed) {
      this.animationCounter += 1;
      if (this.animationCounter > PLAYER_ANIMATION_FRAME_CHANGE) {
        this.animationCounter = 0;
        this.animationIndex += 1;
        this.animationIndex %= 2;
      }
      this.img = imgs_player_right[this.animationIndex];
    }
    else if (aPressed) {
      this.animationCounter += 1;
      if (this.animationCounter > PLAYER_ANIMATION_FRAME_CHANGE) {
        this.animationCounter = 0;
        this.animationIndex += 1;
        this.animationIndex %= 2;
      }
      this.img = imgs_player_left[this.animationIndex];
    }
    else {
      this.img = img_player_idle;
    }
    
    let acc = this.ground != 0 ? PLAYER_ACCEL : PLAYER_AIR_ACCEL;
    if (aPressed && this.vx > -PLAYER_MAX_WALK_VEL) {
      this.vx -= acc;
      if (this.vx < -PLAYER_MAX_WALK_VEL)
        this.vx = -PLAYER_MAX_WALK_VEL
    }
    if (dPressed && this.vx < PLAYER_MAX_WALK_VEL) {
      this.vx += acc;
      if (this.vx > PLAYER_MAX_WALK_VEL)
        this.vx = PLAYER_MAX_WALK_VEL;
    }
    this.vx = clamp(this.vx, -PLAYER_MAX_VEL, PLAYER_MAX_VEL);
    if (this.ground != 0) {
      let friction = PLAYER_FRICTION;
      if (this.ground == 2)
        friction = PLAYER_ICE_FRICTION
      if (this.vx < 0) {
        this.vx += friction;
        if (this.vx > 0)
          this.vx = 0;
      }
      if (this.vx > 0) {
        this.vx -= friction;
        if (this.vx < 0)
          this.vx = 0;
      }
    }
    if (this.ground == 0) {
      if (this.vx < 0) {
        this.vx += PLAYER_AIR_FRICTION;
        if (this.vx > 0)
            this.vx = 0;
      }
      if (this.vx > 0) {
        this.vx -= PLAYER_AIR_FRICTION;
        if (this.vx < 0)
            this.vx = 0;
      }
    }
  }

  _yVelocityTick() {
    this.vy += PLAYER_GRAVITY;
    this.vy = clamp(this.vy, -PLAYER_MAX_VEL, PLAYER_MAX_VEL)
  }

  _collideObjectsX(objects) {
    for (let i = 0; i < objects.length; i++) {
      let obj = objects[i];
      if (this.hits(obj)) {
        if (obj.hitResponseX(this)) {
          objects.splice(i, 1);
          i -= 1;
        }
      }
    }
  }
  _collideObjectsY(objects) {
    for (let i = 0; i < objects.length; i++) {
      let obj = objects[i];
      if (this.hits(obj)) {
        if (obj.hitResponseY(this)) {
          objects.splice(i, 1);
          i -= 1;
        }
      }
    }
    if (this.ground != 0)
      this.shots = this.maxShots;
  }

  _collisionTick(level) {
    this.x += this.vx;
    this._collideObjectsX(level["static"]);
    this._collideObjectsX(level["dynamic"]);
    this.ground = 0;
    this.y += this.vy;
    this._collideObjectsY(level["static"]);
    this._collideObjectsY(level["dynamic"]);
  }

  shoot() {
    if (this.shots <= 0)
      return;
    let vec = createVector(this.x-mouseX, this.y-mouseY);
    vec.normalize();
    vec.mult(PLAYER_SHOOT_STRENGTH);
    let [cx, cy] = this.getCenter();
    let p = new Projectile(cx, cy, -vec.x*2, -vec.y*2);
    this.projectiles.push(p);
    this.vx += vec.x;
    if (this.vy > 0)
      this.vy /= 4;
    this.vy += vec.y;
    this.shots -= 1;

    let pe = new ParticleEffect(cx, cy, 10, 1, [50, 50, 50], [5, 5, 5], 2, 2, 30, 5, 2, 1, false);
    particleEffects.push(pe);
  }

  tick() {
    this._xVelocityTick();
    this._yVelocityTick();
    this._collisionTick(level);
  }

  draw(surf) {
    surf.image(this.img, this.x-4, this.y);
    for (let i = 0; i < this.projectiles.length; i++) {
      let p = this.projectiles[i];
      if (p.tick()) {
        this.projectiles.splice(i, 1);
        i -= 1;
        continue;
      }
      p.draw(surf);
    }
    if (devMode) {
      surf.fill(255, 0, 0, 64);
      surf.rect(this.x, this.y, this.width, this.height);
    }
  }
}

class Wall extends Hitbox {
  constructor(x, y, width, height, type=0) {
    super(x, y, width, height);
    this.type = type;
    switch (type) {
      case 0:
        this.img = img_stone;
        break;
      case 1:
        this.img = img_ice;
        break;
      case 2:
        this.img = img_wood;
        break;
      case 3:
        this.img = img_darkstone;
        break;
      case 4:
        this.img = img_pillar;
    }
  }

  align() {
    this.x *= TILE_SIZE;
    this.y *= TILE_SIZE;
    this.width *= TILE_SIZE;
    this.height *= TILE_SIZE;
  }

  hitResponseX() {
    if (player.vx < 0)
      player.x = this.x+this.width;
    else
      player.x = this.x-player.width;
    player.vx = 0;
  }
  
  hitResponseY() {
    if (player.vy < 0)
      player.y = this.y+this.height;
    else {
      player.y = this.y-player.height;
      if (this.type == 1)
        player.ground = 2;
      else
        player.ground = 1;
    }
    player.vy = 0;
  }

  draw(surf) {
    drawTiled(surf, this.img, this.x, this.y, this.width, this.height);
  }
}

class Platform extends Hitbox {
  constructor(x, y, width) {
    super(x, y, width, 0);
  }

  align() {
    this.x *= TILE_SIZE;
    this.y *= TILE_SIZE;
    this.width *= TILE_SIZE;
  }

  hitResponseX() {}
  hitResponseY() {
    if (player.vy > 0) {
      player.y = this.y-player.height;
      player.vy = 0;
      player.ground = 1;
    }
  }

  draw(surf) {
    drawTiled(surf, img_bridge, this.x, this.y, this.width, TILE_SIZE);
  }
}

class SpikeRow extends DisjointHitbox {
  constructor(x, y, length, rotation) {
    let [gx, gy] = [x, y];
    let w, h, gw, gh;
    if (rotation % 2) {
      w = 0.5;
      h = length;
      gw = 1;
      gh = h;
      if (rotation == 1)
        x += 0.5;
    }
    else {
      w = length;
      h = 0.5;
      gw = w;
      gh = 1;
      if (rotation == 0)
        y += 0.5
    }
    super(x, y, w, h, gx, gy, gw, gh);
    this.img = imgs_spikes[rotation];
    this.rotation = rotation;
  }

  align() {
    this.x *= TILE_SIZE;
    this.y *= TILE_SIZE;
    this.width *= TILE_SIZE;
    this.height *= TILE_SIZE;
    this.gx *= TILE_SIZE;
    this.gy *= TILE_SIZE;
    this.gwidth *= TILE_SIZE;
    this.gheight *= TILE_SIZE;
  }

  hitResponseX() {
    killPlayer();
  }

  hitResponseY() {
    killPlayer();
  }

  draw(surf) {
    drawTiled(surf, this.img, this.gx, this.gy, this.gwidth, this.gheight);
    if (devMode) {
      surf.fill(255, 0, 0, 64);
      surf.rect(this.x, this.y, this.width, this.height);
    }
  }
}

class Spring extends Hitbox {
  constructor(x, y, rotation) {
    let w, h;
    if (rotation % 2) {
      w = SPRING_THICKNESS;
      h = SPRING_LENGTH;
    }
    else {
      w = SPRING_LENGTH;
      h = SPRING_THICKNESS;
    }
    super(x, y, w, h);
    this.rotation = rotation;
    this.img = imgs_spring[rotation];
    this.gx = x*TILE_SIZE;
    this.gy = y*TILE_SIZE;
  }

  align() {
    this.x *= TILE_SIZE;
    this.y *= TILE_SIZE;
    switch (this.rotation) {
      case 0:
        this.x += 4;
        this.y += 28;
        break;
      case 1:
        this.x += 28;
        this.y += 4;
        break;
      case 2:
        this.x += 4;
        break;
      case 3:
        this.y += 4;
    }
  }

  hitResponseX() {
    if (this.rotation == 1) {
      player.vx = -SPRING_HORIZONTAL_STRENGTH;
    }
    if (this.rotation == 3) {
      player.vx = SPRING_HORIZONTAL_STRENGTH;
    }
    player.shots = player.maxShots;
  }

  hitResponseY() {
    if (this.rotation == 0) {
      player.vy = -SPRING_VERTICAL_STRENGTH;
    }
    if (this.rotation == 2) {
      player.vy = SPRING_VERTICAL_STRENGTH;
    }
    player.shots = player.maxShots;
  }

  draw(surf) {
    drawTiled(surf, this.img, this.gx, this.gy, TILE_SIZE, TILE_SIZE);
    if (devMode) {
      surf.fill(0, 255, 0, 64);
      surf.rect(this.x, this.y, this.width, this.height);
    }
  }
}

class Projectile extends Hitbox {
  constructor(x, y, vx, vy) {
    super(x, y, 5, 5);
    this.vx = vx;
    this.vy = vy;
  }

  tick() {
    this.vy += PROJ_GRAVITY;
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > CANVAS_SIZE || this.y < 0 || this.y > CANVAS_SIZE)
      return true;
    return false;
  }

  draw(surf) {
    surf.fill(255, 216, 0);
    surf.ellipse(this.x, this.y, 5, 5);
  }
}

class Item extends Hitbox {
  constructor(x, y, onpickup, img=null, particle=true) {
    super(x, y, TILE_SIZE, TILE_SIZE);
    this.img = img;
    this.onpickup = onpickup;
    this.particle = particle;
  }

  align() {
    this.x *= TILE_SIZE;
    this.y *= TILE_SIZE;
  }

  draw(surf) {
    if (this.img == null) {
      surf.fill(0, 255, 0);
      surf.rect(this.x, this.y, this.width, this.height);
    }
    else {
      surf.image(this.img, this.x, this.y, this.img.width, this.img.height);
    }
    if (devMode) {
      surf.fill(255, 255, 0, 64);
      surf.rect(this.x, this.y, this.width, this.height);
    }
  }

  _hitResponse() {
    this.onpickup();
    let [cx, cy] = this.getCenter();
    if (this.particle) {
      let pe = new ParticleEffect(cx, cy, 15, 1, [255, 255, 0], [30, 30, 0], 0, 0, 30, 10, 3, 1, false);
      particleEffects.push(pe);
    }
    return true;
  }

  hitResponseX() {
    return this._hitResponse();
  }

  hitResponseY() {
    return this._hitResponse()
  }
}

class Decoration {
  constructor(x, y, img) {
    this.x = x;
    this.y = y;
    this.img = img;
  }

  align() {
    this.x *= TILE_SIZE;
    this.y *= TILE_SIZE;
  }

  draw(surf) {
    surf.image(this.img, this.x, this.y);
  }
}