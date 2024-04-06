class MenuButton {
  constructor(x, y, width, height, text, callback) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.text = text;
    this.callback = callback;
  }

  hitsPoint(x, y) {
    return !((x < this.x || x > this.x+this.width) ||
    (y < this.y || y > this.y+this.height))
  }

  tickdraw(surf) {
    let hits = this.hitsPoint(mouseX, mouseY);
    let color = hits ? [130, 130, 130] : [100, 100, 100];
    surf.stroke(255);
    surf.fill(color);
    surf.rect(this.x, this.y, this.width, this.height);
    surf.fill(255);
    surf.noStroke();
    surf.text(this.text, this.x+this.width/2, this.y+this.height/2)
    return hits;
  }
}

function initMenu() {
  backgroundSurf.clear();
  drawTiled(backgroundSurf, img_darkstone, 0, 0, CANVAS_SIZE, CANVAS_SIZE);
  backgroundSurf.fill(255);
  backgroundSurf.textFont(font_regular);
  backgroundSurf.textAlign(LEFT, BOTTOM);
  backgroundSurf.textSize(15);
  backgroundSurf.text("By Miles Burkart", 0, 640);
  backgroundSurf.textAlign(CENTER, CENTER);
  backgroundSurf.textSize(50);
  backgroundSurf.text("Gunpowder Grotto", CANVAS_SIZE/2, 100);
  
  foregroundSurf.drawingContext.setLineDash([]);
  foregroundSurf.textFont(font_regular);
  foregroundSurf.textAlign(CENTER, CENTER);
  foregroundSurf.textSize(30);
  foregroundSurf.strokeWeight(1);
}