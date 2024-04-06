function drawTiled(surf, img, x, y, width, height) {
  let widthIts = Math.floor(width/img.width);
  let heightIts = Math.floor(height/img.height);
  for (let i = 0; i < widthIts; i++) {
    for (let j = 0; j < heightIts; j++) {
      let ix = x+i*img.width;
      let iy = y+j*img.height;
      surf.image(img, ix, iy);
    }
  }
}

function drawGuideLine(surf) {
  let [px, py] = player.getCenter();
  surf.drawingContext.setLineDash([1, 15]);
  surf.stroke(200, 200, 200, 128);
  surf.strokeWeight(3);
  surf.line(mouseX, mouseY, px, py);
}

// for debugging, level creation
function drawGrid(surf) {
  surf.stroke(255, 255, 255, 30);
  for (let i = 0; i < TILES_PER_ROW; i++) {
    surf.line(i*TILE_SIZE, 0, i*TILE_SIZE, CANVAS_SIZE);
  }
  for (let i = 0; i < TILES_PER_ROW; i++) {
    surf.line(0, i*TILE_SIZE, CANVAS_SIZE, i*TILE_SIZE);
  }
  surf.noStroke();
}