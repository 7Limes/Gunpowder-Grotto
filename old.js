// unused functions / features

function compileLevel(rawLevel) {
  let compiled = {
    "player": rawLevel["player"],
    "static": [],
    "dynamic": []
  };
  for (let obj of rawLevel["static"]) {
    obj = [...obj];
    let objType = obj.splice(0, 1)[0];
    let compiledObject;
    switch (objType) {
      case 0:
        compiledObject = new Wall(...obj);
        break;
      case 1:
        compiledObject = new Spring(...obj);
        break;
    }
    compiled["static"].push(compiledObject);
  }

  for (let obj of rawLevel["dynamic"]) {
    obj = [...obj];
    let objType = obj.splice(0, 1);
    let compiledObject;
    switch (objType) {
      case 0:
        compiledObject = new Item(...obj);
        break;
    }
    compiled["dynamic"].push(compiledObject);
  }
  return compiled;
}

function genShadowTexture(img) {
  let shadowImg = createImage(img.width, img.height);
  let isSquare = true;
  shadowImg.loadPixels();
  for (let r = 0; r < img.height; r++) {
    for (let c = 0; c < img.width; c++) {
      let color = img.get(c, r);
      if (color[3] == 0) {
        isSquare = false;
      }
      else {
        color = [0, 0, 0, SHADOW_ALPHA];
      }
      shadowImg.set(c, r, color);
      //shadowImg.pixels[index] = color;
    }
  }
  shadowImg.updatePixels();
  return isSquare ? null : shadowImg;
}

function setShadowTextures() {
  imgs_spikes_shadow = imgs_spikes.map(x => genShadowTexture(x));
  imgs_spring_shadow = imgs_spring.map(x => genShadowTexture(x));
  img_bridge_shadow = genShadowTexture(img_bridge);
  img_key_shadow = genShadowTexture(img_key);
}