var preload, setup, draw, mousePressed, keyPressed, windowResized;

function nextLevelTick() {
  let exit = level["exit"];
  switch (exit) {
    case 0:
      return (player.y > CANVAS_SIZE);
    case 1:
      return (player.x > CANVAS_SIZE);
    case 2:
      return (player.y+player.height < 0);
    case 3:
      return (player.x+player.width < 0);
  }
  return false;
}

(function() {
  let canvas;
  let menuButtons;
  let selectedMenuButton = null;
  let onMenu = true;
  player = new Player(0, 0, 0);
  levelNumber = 0;

  preload = function() {
    img_player_idle = loadImage("assets/player_idle.png");
    imgs_player_right = [
      loadImage("assets/player_right_f1.png"),
      loadImage("assets/player_right_f2.png")
    ];
    imgs_player_left = [
      loadImage("assets/player_left_f1.png"),
      loadImage("assets/player_left_f2.png")
    ];
    imgs_spikes = [
      loadImage("assets/spikes0.png"),
      loadImage("assets/spikes1.png"),
      loadImage("assets/spikes2.png"),
      loadImage("assets/spikes3.png")
    ];
    imgs_spring = [
      loadImage("assets/spring0.png"),
      loadImage("assets/spring1.png"),
      loadImage("assets/spring2.png"),
      loadImage("assets/spring3.png")
    ];
    img_stone = loadImage("assets/stone.png");
    img_bridge = loadImage("assets/bridge.png");
    img_wood = loadImage("assets/wood.png");
    img_ice = loadImage("assets/ice.png");
    
    img_key = loadImage("assets/keyglow.png");
    img_crystal = loadImage("assets/crystalglow.png");
    img_sandwich = loadImage("assets/sandwich.png");
    img_bullet = loadImage("assets/bullet.png");

    img_darkstone = loadImage("assets/darkstone.png");
    img_pillar = loadImage("assets/pillar.png");

    img_stalagtite = loadImage("assets/stalagtite.png");
    img_stalagtitebig = loadImage("assets/stalagtitebig.png");
    img_rockpile = loadImage("assets/rockpile.png");
    img_rockpilesmall = loadImage("assets/rockpilesmall.png");
    img_rockpilesmaller = loadImage("assets/rockpilesmaller.png");

    font_regular = loadFont("assets/NeuePixelSans.ttf");
  }
  
  setup = function() {
    setLevelData();
    
    canvas = createCanvas(CANVAS_SIZE, CANVAS_SIZE);
    let halfSize = CANVAS_SIZE/2;
    canvas.position(windowWidth/2-halfSize, windowHeight/2-halfSize);
    backgroundSurf = createGraphics(CANVAS_SIZE, CANVAS_SIZE);
    foregroundSurf = createGraphics(CANVAS_SIZE, CANVAS_SIZE);

    backgroundSurf.noStroke();
    foregroundSurf.noStroke();

    menuButtons = [
      new MenuButton(CANVAS_SIZE/2-75, 300, 150, 75, "Play", () => {
        loadLevel(levelNumber);
        onMenu = false;
        draw = gameLoop;
      }),
    ]
    initMenu();
    frameRate(FRAME_RATE);
  }

  let menuLoop = function() {
    foregroundSurf.textSize(30);
    selectedMenuButton = null;
    for (let mb of menuButtons) {
      if (mb.tickdraw(foregroundSurf))
        selectedMenuButton = mb;
    }
    
    image(backgroundSurf, 0, 0);
    image(foregroundSurf, 0, 0);

    foregroundSurf.clear();
  }
  draw = menuLoop;
  
  let gameLoop = function() {
    player.tick();
    
    if (nextLevelTick()) {
      levelNumber += 1;
      loadLevel(levelNumber);
    }
    // Drawing
    blitObjects(foregroundSurf, level["dynamic"]);
    if (player.maxShots > 0)
      drawGuideLine(foregroundSurf);
    foregroundSurf.noStroke();
    player.draw(foregroundSurf);

    // Draw particles
    for (let i = 0; i < particleEffects.length; i++) {
      if (particleEffects[i].tickdraw(foregroundSurf)) {
        particleEffects.splice(i, 1);
        i -= 1;
      }
    }

    // Draw tooltip
    if (tooltipDuration > 0) {
      tooltipDuration -= 1;
      foregroundSurf.fill(255);
      foregroundSurf.textAlign(CENTER);
      foregroundSurf.textFont(font_regular);
      foregroundSurf.textSize(20);
      foregroundSurf.text(tooltip, CANVAS_SIZE/2, 600);
    }

    background([135, 206, 250]);
    image(backgroundSurf, 0, 0);
    image(foregroundSurf, 0, 0);

    if (devMode) {
      fill(0);
      text(Math.round(frameRate()), 5, 15);
      text(player.vx.toFixed(2) + ", " + player.vy.toFixed(2), 5, 30);
      text(Math.floor(mouseX) + ", " + Math.floor(mouseY), 5, 45);
      text(Math.floor(mouseX/TILE_SIZE) + ", " + Math.floor(mouseY/TILE_SIZE), 5, 60);
      text("level " + levelNumber, 5, 75);
      text(player.maxShots + " " + player.shots, 5, 90);
      text(formatTime(time), 5, 105);
    }
    foregroundSurf.clear();

    if (!finishedGame)
      time += 1;
  }

  mousePressed = function() {
    if (onMenu) {
      if (selectedMenuButton != null)
        selectedMenuButton.callback();
    }
    else
      player.shoot();
  }

  keyPressed = function() {
    if (!onMenu) {
      if (keyCode == 27) {
        initMenu();
        onMenu = true;
        draw = menuLoop;
      }
      if (keyCode == 32)
        player.shoot();
      if (keyCode == 220) {
        devMode = !devMode;
        console.log("toggled developer mode");
      }
      if (devMode) {
        if (keyCode == 219) {
          levelNumber -= 1;
          levelNumber = clamp(levelNumber, 0, LEVELS.length-1);
          loadLevel(levelNumber);
        }
        if (keyCode == 221) {
          levelNumber += 1;
          levelNumber = clamp(levelNumber, 0, LEVELS.length-1);
          loadLevel(levelNumber);
        }
      }
    }
  }

  windowResized = function() {
    let halfSize = CANVAS_SIZE/2;
    canvas.position(windowWidth/2-halfSize, windowHeight/2-halfSize);
  }
})();