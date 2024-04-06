// object ids
// 0 = wall
// 1 = platform
// 2 = spring
// 3 = spike row
// 10 = item
// 11 = decoration

// exit
// 0 = bottom
// 1 = right;
// 2 = top;
// 3 = left;

function compileObject(objType, objData) {
  let compiledObject;
  switch (objType) {
    case 0:
      compiledObject = new Wall(...objData);
      break;
    case 1:
      compiledObject = new Platform(...objData);
      break;
    case 2:
      compiledObject = new Spring(...objData);
      break;
    case 3:
      compiledObject = new SpikeRow(...objData);
      break;
    case 11:
      compiledObject = new Decoration(...objData);
  }
  compiledObject.align();
  return compiledObject;
}

function compileStaticObject(obj) {
  obj = [...obj];
  let objType = obj.splice(0, 1)[0];
  let compiledObject = compileObject(objType, obj);
  return compiledObject;
}

function compileDynamicObject(obj) {
  obj = [...obj];
  let objType = obj.splice(0, 1)[0];
  let objId = "";
  if (typeof obj[0] === "string")
    objId = obj.splice(0, 1)[0];
  let compiledObject;
  if (objType == 10) {
      compiledObject = new Item(...obj);
      compiledObject.align();
  }
  else
    compiledObject = compileObject(objType, obj);
  if (objId !== "")
    compiledObject.id = objId;
  return compiledObject;
}

// level manipulation functions
function deleteObject(id) {
  for (let i = 0; i < level["dynamic"].length; i++) {
    let obj = level["dynamic"][i];
    if (obj.hasOwnProperty("id") && obj.id === id) {
      level["dynamic"].splice(i, 1);
      return;
    }
  }
}

function addObject(obj) {
  let compiledObject = compileDynamicObject(obj);
  level["dynamic"].push(compiledObject);
}

function showTooltip(message, duration) {
  tooltip = message;
  tooltipDuration = duration;
}

function setLevelData() {
LEVELS = [
  // 0
  {
    "onload": () => {
      showTooltip("\"Can't believe I dropped my sandwich into this cave.\"", 300);
    },
    "start": [64, 288],
    "exit": 0,
    "static": [
      [0, -1, 0, 1, 10],
      [0, 0, 10, 7, 10],
      [0, 7, 11, 3, 9],
      [0, 10, 13, 3, 7],
      [0, 13, 15, 1, 5],
      
      [0, 5, 0, 1, 3],
      [0, 6, 0, 3, 6],
      [0, 9, 0, 4, 7],
      [0, 13, 0, 2, 8],
      [0, 15, 0, 3, 10],
      [0, 18, 0, 2, 20],
    ],
    "dynamic": [],
    "deco": [
      [0, 10, 11, 8, 9, 3],
      [0, 12, 7, 6, 4, 3],
      [0, 11, 8, 1, 3, 3],

      [11, 7, 6, img_stalagtite],
      [11, 9, 7, img_stalagtitebig],
      [11, 3, 9, img_rockpile],
    ]
  },
  // 1
  {
    "onload": () => {
      showTooltip('"Guess I have to go find it."', 300);
    },
    "start": [320, -32],
    "exit": 0,
    "static": [
      [0, 0, 0, 1, 20],
      [0, 1, 0, 2, 19],
      [0, 3, 0, 2, 18],
      [0, 5, 0, 1, 15],

      [0, 19, 0, 1, 20],
      [0, 17, 0, 2, 19],
      [0, 15, 0, 2, 18],
      [0, 14, 0, 1, 15],
    ],
    "dynamic": [],
    "deco": [
      [0, 0, 0, 20, 20, 3],
      [11, 5, 15, img_stalagtite],
      [11, 15, 18, img_stalagtitebig],
      [11, 3, 18, img_stalagtite],
    ]
  },
  // 2
  {
    "start": [128, -32],
    "exit": 1,
    "static": [
      [0, 0, 13, 10, 7],
      [0, 10, 14, 2, 6],
      [0, 12, 15, 5, 5],
      [0, 17, 11, 3, 9],
      [0, 1, 12, 1, 1],

      [0, 0, 0, 1, 13],
      [0, 1, 0, 1, 5],
      [0, 2, 0, 1, 2],
      [0, 7, 0, 13, 2],
      [0, 9, 2, 11, 1],
      [0, 14, 3, 2, 2],
      [0, 16, 3, 4, 4],

      [2, 15, 14, 0]
      
    ],
    "dynamic": [],
    "deco": [
      [0, 0, 0, 20, 6, 3],
      [0, 0, 6, 5, 7, 3],
      [0, 5, 10, 15, 5, 3],
      [0, 14, 6, 6, 4, 3],
      [0, 5, 9, 3, 1, 3],
      [0, 5, 6, 1, 1, 3],
      [0, 12, 6, 2, 1, 3],

      [11, 1, 5, img_stalagtitebig],
      [11, 3, 12, img_rockpilesmall],
      [11, 16, 7, img_stalagtitebig],
      [11, 14, 5, img_stalagtite],
    ]
  },
  // 3
  {
    "start": [32, 384],
    "exit": 0,
    "static": [
      [0, 0, 13, 3, 7],
      [0, 3, 18, 12, 2],
      [0, 6, 14, 2, 4],
      [0, 11, 14, 4, 4],
      [0, 14, 8, 1, 6],
      [0, 5, 10, 6, 1],
      [0, 8, 6, 4, 1],
      [0, 12, 6, 3, 2],
      [0, 3, 3, 2, 8],

      [0, -1, 10, 1, 3],
      [0, 0, 0, 18, 3],
      [0, 0, 3, 3, 7],
      [0, 18, 0, 2, 20],

      [2, 4, 17, 0],
      [2, 9, 17, 0],
      [2, 12, 13, 0],
      [2, 13, 10, 1],
      [2, 13, 9, 1],
      [2, 6, 9, 0]
    ],
    "dynamic": [],
    "deco": [
      [0, 0, 0, 20, 20, 3],
      [0, 8, 7, 1, 3, 4],

      [11, 6, 13, img_rockpilesmall],
      [11, 5, 17, img_rockpilesmaller],
      [11, 12, 5, img_rockpile],
      [11, 5, 3, img_stalagtitebig],
    ]
  },
  // 4
  {
    "start": [96, -32],
    "exit": 1,
    "static": [
      [0, 0, 0, 2, 20],
      [0, 2, 15, 5, 5],
      [0, 7, 16, 5, 4],
      [0, 12, 12, 3, 8],
      [0, 5, 8, 7, 1],
      [0, 5, 0, 2, 8],
      [0, 11, 4, 9, 1],
      [0, 7, 0, 13, 1],
      [0, 16, 5, 4, 3],
      [0, 15, 8, 5, 12],

      [1, 9, 12, 3],
      [1, 12, 8, 3],
      [1, 7, 4, 4],

      [2, 10, 15, 0],
      [2, 13, 11, 0],
      [2, 8, 7, 0],
    ],
    "dynamic": [],
    "deco": [
      [0, 0, 0, 20, 20, 3],
      
      [11, 7, 9, img_stalagtitebig],
      [11, 6, 9, img_stalagtite],
      [11, 5, 9, img_stalagtite],
      [11, 7, 15, img_rockpilesmall],
      [11, 15, 5, img_stalagtite],
    ]
  },
  // 5
  {
    "start": [0, 352],
    "exit": 1,
    "static": [
      [0, -1, 9, 1, 3],
      [0, 0, 12, 9, 8],
      [0, 7, 6, 2, 6],
      [0, 9, 6, 5, 2],
      [0, 1, 8, 3, 1],
      [0, 0, 2, 1, 7],
      [0, 12, 4, 2, 2],
      [0, 0, 0, 20, 2],
      [0, 17, 12, 3, 8],
      [0, 16, 2, 4, 6],

      [1, 9, 12, 3],

      [2, 5, 11, 0],
      [2, 6, 8, 1],
      [2, 3, 7, 0],
      [2, 2, 7, 0],
      [2, 1, 4, 3],

      [3, 9, 18, 8, 0],
      [0, 9, 19, 8, 1],
    ],
    "dynamic": [
      [10, 9, 5, () => {
        player.maxShots = 1;
        showTooltip("Press LMB or Space to shoot.", 600);
      }, img_bullet]
    ],
    "deco": [
      [0, 0, 0, 20, 20, 3],
      [0, 3, 9, 1, 3, 4],
      [0, 11, 12, 1, 7, 4],

      [11, 1, 7, img_rockpilesmaller],
      [11, 5, 2, img_stalagtitebig],
      [11, 6, 2, img_stalagtite],
      [11, 9, 8, img_stalagtite],
      [11, 9, 5, img_rockpilesmall],
    ]
  },
  // 6
  {
    "onload": () => {
      showTooltip('"Good thing I happened to bring my overly powerful gun in here."', 300)
    },
    "start": [0, 448],
    "exit": 0,
    "static": [
      [0, -1, 11, 1, 4],
      [0, 0, 15, 9, 5],
      [0, 8, 10, 1, 5],
      [0, 7, 9, 2, 1],
      [0, 4, 8, 5, 1],
      [0, 15, 8, 2, 4],
      [0, 9, 11, 6, 1],
      [0, 11, 16, 9, 4],
      [0, 0, 0, 1, 11],
      [0, 19, 0, 1, 16],
      [0, 1, 0, 18, 3],
      [0, 1, 3, 3, 1],
      [0, 16, 3, 3, 1],

      [1, 1, 9, 3],
      [1, 17, 14, 2],

      [2, 6, 14, 0],
      [2, 7, 11, 1],

      [3, 9, 10, 6, 0],
      [3, 11, 15, 8, 0],
    ],
    "dynamic": [],
    "deco": [
      [0, 0, 0, 20, 20, 3],
      [0, 17, 14, 1, 2, 4],

      [11, 4, 9, img_stalagtite],
      [11, 6, 7, img_rockpile],
      [11, 13, 3, img_stalagtitebig],
      [11, 5, 3, img_stalagtite],
    ]
  },
  // 7
  {
    "start": [96, -32],
    "exit": 3,
    "static": [
      [0, 0, 6, 16, 1],
      [0, 0, 0, 1, 6],
      [0, 6, 0, 14, 1],
      [0, 13, 5, 1, 1],
      [0, 19, 1, 1, 19],
      [0, 13, 12, 1, 8],
      [0, 8, 16, 3, 4],
      [0, 0, 13, 1, 7],

      [1, 1, 13, 2],

      [2, 7, 5, 0],
      [2, 10, 5, 0],
      [2, 13, 4, 0],
      [2, 8, 15, 0],
      [2, 9, 15, 0],
      [2, 10, 15, 0],

      [3, 6, 1, 13, 2],
      [3, 13, 11, 1, 0],
      [3, 1, 19, 7, 0],
      [3, 11, 19, 2, 0],
      [3, 14, 19, 5, 0]
    ],
    "dynamic": [],
    "deco": [
      [0, 0, 0, 20, 20, 3],
      [0, 13, 7, 1, 5, 4],
      [0, 5, 7, 1, 13, 4],

      [11, 1, 5, img_rockpile],
      [11, 9, 1, img_stalagtitebig],
      [11, 8, 15, img_rockpilesmaller],
    ]
  },
  // 8
  {
    "start": [624, 448],
    "exit": 3,
    "static": [
      [0, 20, 12, 1, 3],
      [0, 0, 15, 20, 5],
      [0, 10, 6, 1, 4],

      [0, 0, 0, 2, 12],
      [0, 2, 0, 16, 2],
      [0, 18, 0, 2, 12],

      [1, 3, 11, 3],
      [1, 9, 9, 1],
      [1, 3, 7, 3],
      [1, 13, 7, 3],

      [2, 4, 14, 0],

      [3, 10, 5, 1, 0],
    ],
    "dynamic": [
      [10, 14, 6, () => {deleteObject("door")}, img_key],
      [0, "door", 1, 12, 1, 3, 2]
    ],
    "deco": [
      [0, 0, 0, 20, 20, 3],
      [0, 10, 10, 1, 5, 4],
      [0, 4, 7, 1, 8, 4],

      [11, 14, 14, img_rockpile],
      [11, 2, 2, img_stalagtitebig],
      [11, 4, 2, img_stalagtite],
      [11, 16, 2, img_stalagtite],
    ]
  },
  // 9
  {
    "start": [624, 128],
    "exit": 1,
    "static": [
      [0, 20, 2, 1, 3],
      [0, 16, 5, 4, 2],
      [0, 17, 10, 3, 10],
      [0, 9, 8, 1, 7],
      [0, 4, 6, 1, 4],
      [0, 6, 14, 2, 6],
      [0, 5, 9, 4, 2],
      [0, 9, 18, 1, 2],

      [0, 0, 0, 20, 2],
      [0, 0, 2, 1, 18],
      [0, 1, 2, 1, 1],

      [1, 14, 10, 3],
      [1, 4, 14, 2],
      [1, 10, 18, 1],

      [2, 14, 9, 0],
      [2, 9, 7, 0],
      [2, 10, 17, 0],

      [3, 4, 5, 1, 0],
      [3, 5, 8, 4, 0],
      [3, 1, 19, 5, 0],
      [3, 8, 19, 1, 0],
      [3, 10, 19, 7, 0]
    ],
    "dynamic": [
      [10, 7, 13, () => {deleteObject("door");}, img_key],
      [0, "door", 17, 7, 1, 3, 2]
    ],
    "deco": [
      [0, 0, 0, 20, 20, 3],
      [0, 9, 15, 1, 3, 4],
      [0, 4, 10, 1, 10, 4],

      [11, 1, 3, img_stalagtite],
      [11, 11, 2, img_stalagtitebig],
      [11, 6, 8, img_rockpilesmall],
    ]
  },
  // 10
  {
    "start": [0, 256],
    "exit": 3,
    "static": [
      [0, -1, 6, 1, 9],
      [0, 0, 15, 2, 5],
      [0, 17, 15, 3, 5],
      [0, 0, 4, 2, 2],
      [0, 0, 9, 2, 3],
      [0, 7, 1, 1, 4],
      [0, 19, 0, 1, 15],
      [0, 0, 0, 19, 1],

      [0, 1, 12, 1, 3, 2],

      [3, 2, 19, 15, 0],
      [3, 7, 5, 1, 2],
    ],
    "dynamic": [
      [10, 18, 14, () => {
        deleteObject("bridge");
        deleteObject("real_door");
        addObject([1, 14, 13, 1]);
        addObject([1, 18, 11, 1]);
        addObject([1, 14, 9, 2]);
        addObject([1, 10, 7, 1]);
        addObject([1, 4, 10, 3]);
        addObject([1, 3, 7, 1]);
        addObject([1, 5, 5, 1]);
        addObject([0, 0, 12, 2, 3]);
      }, img_key],
      [1, "bridge", 2, 15, 15],
      [0, "real_door", 0, 1, 2, 3],
    ],
    "deco": [
      [0, 0, 0, 20, 20, 3],

      [11, 4, 19, img_rockpile],
      [11, 15, 19, img_rockpile],
      [11, 9, 1, img_stalagtitebig],
      [11, 16, 1, img_stalagtite],
    ]
  },
  // 11
  {
    "onload": () => {
      showTooltip("Blue crystals give you an extra shot.", 600);
    },
    "start": [616, 192],
    "exit": 3,
    "static": [
      [0, 20, 0, 1, 7],
      [0, 17, 7, 3, 13],
      [0, 18, 0, 2, 3],
      [0, 7, 6, 1, 2],
      [0, 8, 7, 8, 1],
      [0, 12, 11, 1, 2],

      [0, 0, 0, 4, 14],
      [0, 0, 17, 3, 3],
      [0, 4, 0, 14, 1],

      [1, 16, 7, 1],
      [1, 8, 12, 4],
      [1, 4, 13, 4],
      [1, 8, 18, 3],

      [2, 16, 6, 0],

      [3, 7, 5, 1, 0],
      [3, 4, 1, 6, 2],
      [3, 8, 6, 8, 0],
      [3, 4, 12, 4, 0],
      [3, 12, 10, 1, 0],
      [3, 12, 13, 1, 2],
      [3, 12, 17, 1, 0],
      [3, 3, 19, 14, 0],

      [0, 12, 18, 1, 2],
    ],
    "dynamic": [
      [10, 5, 6, () => {player.shots += 1}, img_crystal],
      [10, 14, 13, () => {player.shots += 1}, img_crystal],
    ],
    "deco": [
      [0, 0, 0, 20, 20, 3],
      [0, 12, 13, 1, 5, 4],
      [0, 12, 8, 1, 3, 4],
      [0, 9, 18, 1, 2, 4],

      [11, 7, 8, img_stalagtitebig],
      [11, 8, 8, img_stalagtite],
      [11, 17, 1, img_stalagtite],
      [11, 10, 6, img_rockpile],
    ]
  },
  // 12
  {
    "start": [624, 160],
    "exit": 1,
    "static": [
      [0, 20, 3, 1, 3],
      [0, 15, 6, 5, 8],
      [0, 16, 3, 1, 2],
      [0, 11, 0, 9, 3],
      [0, 6, 10, 4, 1, 1],
      [0, 7, 11, 2, 2],
      [0, 2, 8, 2, 5],
      [0, 1, 17, 5, 1, 1],
      [0, 1, 18, 5, 2],
      [0, 2, 13, 13, 1],
      [0, 15, 18, 5, 1, 1],
      [0, 15, 19, 5, 1],

      [0, 0, 0, 1, 20],
      [0, 1, 0, 10, 2],

      [1, 14, 6, 1],

      [2, 15, 4, 1],
      [2, 6, 9, 0],
      [2, 1, 16, 3],

      [3, 11, 3, 1, 2],
      [3, 2, 7, 2, 0],
      [3, 4, 12, 3, 0],
      [3, 9, 12, 6, 0],
      [3, 6, 19, 9, 0],
    ],
    "dynamic": [
    ],
    "deco": [
      [0, 0, 0, 20, 20, 3],
      [0, 3, 14, 2, 3, 4],

      [11, 3, 2, img_stalagtite],
      [11, 4, 2, img_stalagtitebig],
      [11, 10, 12, img_rockpile],
      [11, 12, 19, img_rockpilesmall],
    ]
  },
  // 13
  {
    "start": [0, 544],
    "exit": 1,
    "static": [
      [0, -1, 15, 1, 3],
      [0, 0, 18, 20, 2],
      [0, 1, 12, 2, 1],
      [0, 3, 3, 1, 1],
      [0, 0, 0, 20, 1],
      [0, 8, 4, 1, 11],
      [0, 13, 1, 1, 14],
      [0, 14, 14, 1, 1, 1],
      [0, 16, 12, 1, 1, 1],
      [0, 15, 5, 1, 2],
      [0, 16, 6, 1, 2],

      [0, 18, 1, 2, 14],
      [0, 0, 0, 1, 15],
      [0, 6, 0, 1, 15],

      [1, 1, 9, 2],
      [1, 5, 6, 1],
      [1, 4, 8, 2],
      [1, 7, 13, 1],
      [1, 7, 8, 1],
      [1, 9, 6, 2],
      [1, 14, 9, 1],
      [1, 10, 10, 1],
      [1, 11, 11, 2],

      [2, 4, 17, 0],
      [2, 1, 6, 3],
      [2, 5, 5, 0],
      [2, 7, 17, 0],
      [2, 7, 12, 0],
      [2, 7, 7, 0],
      [2, 12, 7, 1],
      [2, 15, 17, 0],
      [2, 14, 8, 0],

      [3, 4, 7, 2, 0],
      [3, 3, 4, 1, 2],
      [3, 3, 12, 1, 3],
      [3, 1, 11, 2, 0],
      [3, 9, 5, 2, 0],
      [3, 10, 9, 1, 0],
      [3, 11, 10, 2, 0],
      [3, 15, 4, 1, 0],
      [3, 16, 5, 1, 0],
    ],
    "dynamic": [
      [10, 3, 2, () => {deleteObject("door1");}, img_key],
      [10, 9, 12, () => {deleteObject("door2")}, img_key],
      [10, 17, 3, () => {deleteObject("door3")}, img_key],
      [0, "door1", 6, 15, 1, 3, 2],
      [0, "door2", 13, 15, 1, 3, 2],
      [0, "door3", 18, 15, 1, 3, 2],
    ],
    "deco": [
      [0, 0, 0, 20, 20, 3],
      [0, 8, 15, 1, 3, 4],

      [11, 1, 13, img_stalagtite],
      [11, 9, 17, img_rockpilesmall],
      [11, 11, 1, img_stalagtitebig],
      [11, 2, 17, img_rockpilesmaller],
    ]
  },
  // 14
  {
    "start": [0, 96],
    "exit": 1,
    "static": [
      [0, -1, 0, 1, 5],
      [0, 0, 4, 2, 16],
      [0, 4, 0, 1, 12],
      [0, 2, 3, 1, 2],
      [0, 3, 11, 1, 2],
      [0, 8, 14, 3, 1, 1],
      [0, 15, 14, 4, 1, 1],
      [0, 18, 5, 2, 5],
      [0, 10, 10, 5, 1],

      [0, 19, 10, 1, 10],
      [0, 5, 0, 15, 2],
      [0, 17, 15, 2, 1],
      [0, 18, 16, 1, 4],

      [1, 2, 18, 2],
      [1, 5, 10, 2],
      [1, 16, 8, 2],

      [2, 2, 17, 3],
      [2, 2, 17, 0],
      [2, 18, 13, 1],
      [2, 5, 9, 0],
      [2, 5, 6, 3],
      [2, 17, 7, 0],

      [3, 2, 2, 1, 0],
      [3, 3, 10, 1, 0],
      [3, 12, 6, 1, 0],
      [3, 2, 19, 16, 0],
      [3, 10, 9, 5, 0],

      [0, 12, 7, 1, 3],
      [0, 9, 15, 1, 5],
    ],
    "dynamic": [
      [10, 17, 13, () => {addObject([2, 8, 13, 0]);}, img_key],
    ],
    "deco": [
      [0, 0, 0, 20, 20, 3],
      [0, 10, 11, 1, 3, 4],
      [0, 14, 11, 1, 9, 4],

      [11, 6, 2, img_stalagtitebig],
      [11, 7, 2, img_stalagtite],
      [11, 18, 4, img_rockpilesmall],
    ]
  },
  // 15
  {
    "start": [0, 128],
    "exit": 0,
    "static": [
      [0, -1, 0, 1, 5],
      [0, 0, 5, 3, 15],
      [0, 5, -5, 1, 15],
      [0, 8, 5, 1, 15],
      [0, 12, 5, 1, 15],
      [0, 14, 4, 1, 10],

      [0, 19, 0, 1, 20],
      [0, 14, -5, 1, 6],

      [1, 6, 8, 2],
      [1, 5, 16, 1],
      [1, 13, 19, 1],
      [1, 15, 12, 1],
      [1, 18, 9, 1],
      [1, 15, 6, 1],
      [1, 18, 3, 1],

      [2, 5, 15, 0],
      [2, 6, 7, 0],
      [2, 7, 7, 0],
      [2, 13, 9, 1],
      [2, 13, 18, 3],
      [2, 13, 18, 0],

      [3, 8, 4, 1, 0],
      [3, 12, 4, 1, 0],
      [3, 3, 19, 5, 0],
      [3, 15, 13, 1, 3],
      [3, 13, 19, 6, 0],
    ],
    "dynamic": [
      [10, 16, 1, () => {
        deleteObject("door1");
        deleteObject("door2");
        deleteObject("door_spikes");
      }, img_key],
      [0, "door1", 9, 5, 3, 1, 2],
      [0, "door2", 14, 1, 1, 3, 2],
      [3, "door_spikes", 9, 4, 3, 0]
    ],
    "deco": [
      [0, 0, 0, 20, 20, 3],
      [0, 5, 10, 1, 10, 4],
      [0, 14, 14, 1, 6, 4],

      [11, 2, 4, img_rockpilesmaller],
    ]
  },
  // 16
  {
    "start": [64, -32],
    "exit": 1,
    "static": [
      [0, 0, -4, 1, 8],
      [0, 4, -4, 1, 4],
      [0, 4, 0, 16, 1],
      [0, 0, 4, 4, 1],
      [0, 8, 10, 1, 6],
      [0, 12, 6, 1, 10],
      [0, 9, 15, 3, 1],
      [0, 7, 4, 1, 1],
      [0, 10, 4, 1, 1],
      [0, 16, 4, 3, 1],
      [0, 0, 18, 20, 2],
      [0, 0, 5, 8, 1],
      [0, 10, 5, 10, 1],
      [0, 19, 1, 1, 5],
      [0, 0, 6, 1, 12],
      [0, 19, 9, 1, 9],
      [0, 5, 6, 1, 7],
      [0, 1, 10, 2, 1],
      [0, 15, 10, 1, 1],
      [0, 4, 8, 1, 1],
      
      [1, 7, 15, 1],
      [1, 6, 12, 1],
      [1, 13, 11, 1],

      [2, 1, 17, 0],

      [3, 4, 4, 3, 0],
      [3, 11, 4, 5, 0],
      [3, 15, 9, 1, 0],
      [3, 16, 6, 1, 2],
      [3, 1, 11, 2, 2],
    ],
    "dynamic": [
      [10, 17, 3, () => {deleteObject("door1");}, img_key],
      [10, 4, 7, () => {deleteObject("door2");}, img_key],
      [0, "door1", 8, 4, 2, 1, 2],
      [0, "door2", 9, 10, 3, 1, 2],
      [10, 10, 14, () => {player.maxShots = 2;}, img_bullet],
    ],
    "deco": [
      [0, 0, 0, 20, 20, 3],
      [0, 8, 16, 1, 2, 4],
      [0, 12, 16, 1, 2, 4],

      [11, 1, 3, img_rockpilesmall],
      [11, 18, 1, img_stalagtitebig],
      [11, 1, 9, img_rockpilesmaller],
      [11, 15, 17, img_rockpile],
    ]
  },
  // 17
  {
    "start": [0, 448],
    "exit": 1,
    "static": [
      [0, -1, 10, 1, 5],
      [0, 0, 15, 3, 5],
      [0, 2, 14, 1, 1],

      [0, 4, 12, 6, 1, 1],
      [0, 17, 12, 2, 1, 1],
      [0, 5, 8, 6, 1, 1],
      [0, 5, 4, 8, 1, 1],

      [0, 2, 0, 18, 1],
      [0, 0, 0, 2, 10],
      [0, 3, 18, 16, 2],
      [0, 19, 4, 1, 16],

      [1, 18, 4, 1],

      [2, 18, 11, 0],
      [2, 18, 8, 1],
      [2, 5, 7, 0],
      [2, 2, 3, 3],
      [2, 2, 4, 3],
      [2, 2, 5, 3],

      [3, 2, 13, 1, 0],
      [3, 3, 17, 16, 0],
    ],
    "dynamic": [],
    "deco": [
      [0, 0, 0, 20, 20, 3],
      [0, 10, 5, 1, 13, 4],
      [0, 5, 5, 1, 13, 4],

      [1, 5, 5, 8],
      [1, 5, 9, 6],
      [1, 4, 13, 6],

      [11, 0, 10, img_stalagtite],
      [11, 0, 14, img_rockpilesmall],
    ]
  },
  // 18
  {
    "start": [0, 128],
    "exit": 2,
    "static": [
      [0, -1, 0, 1, 5],
      [0, 0, 5, 3, 15],
      [0, 3, 4, 1, 4],
      [0, 3, 8, 6, 1],
      [0, 8, 0, 5, 2],
      [0, 9, 7, 1, 2],
      [0, 13, 0, 1, 10],
      [0, 3, 19, 16, 1],
      [0, 14, 3, 1, 6],
      [0, 15, 5, 1, 3],
      
      [0, 19, 0, 1, 20],

      [1, 7, 17, 2],
      [1, 16, 14, 1],

      [2, 7, 16, 0],
      [2, 8, 16, 0],
      [2, 16, 13, 0],
      [2, 14, 2, 0],

      [3, 3, 3, 1, 0],
      [3, 9, 6, 1, 0],
      [3, 4, 7, 5, 0],
      [3, 8, 2, 5, 2],
      [3, 0, 0, 8, 2],
      [3, 9, 13, 1, 0],
      [3, 6, 14, 1, 0],
      [3, 3, 18, 16, 0],
      [3, 13, 14, 1, 0],
      [3, 16, 7, 1, 3],
      [3, 15, 4, 1, 0],

      [0, 6, 15, 1, 4],
      [0, 9, 14, 1, 5],
      [0, 13, 15, 1, 5],
    ],
    "dynamic": [
      [10, 11, 7, () => {player.shots += 1}, img_crystal],
      
      [10, 4, 16, () => {deleteObject("door");}, img_key],
      [0, "door", 13, 10, 1, 4, 2],
    ],
    "deco": [
      [0, 0, 0, 20, 20, 3],
      [0, 16, 14, 1, 5, 4],

      [11, 14, 9, img_stalagtite],
      [11, 2, 4, img_rockpilesmaller],
      [11, 5, 9, img_stalagtitebig],
      [11, 4, 9, img_stalagtite],
    ]
  },
  // 19
  {
    "onload": () => {
      showTooltip('"Finally, that took a while."', 300)
    },
    "start": [64, 576],
    "exit": 2,
    "static": [
      [0, 5, 19, 4, 1],
      [0, 9, 18, 3, 2],
      [0, 12, 17, 6, 3],

      [0, 18, 0, 2, 20],
      [0, 0, 0, 1, 20],

      [1, 15, 16, 1],
      [1, 1, 19, 4],
    ],
    "dynamic": [
      [10, 15, 15, () => {
        addObject([2, 1, 18, 0]);
        addObject([1, 1, 14, 1]);
        addObject([2, 1, 13, 0]);
        addObject([1, 1, 9, 1]);
        addObject([2, 1, 8, 0]);
        addObject([1, 1, 4, 1]);
        addObject([2, 1, 3, 0]);
        showTooltip("\"Well that's convenient.\"", 300);
      }, img_sandwich],
    ],
    "deco": [
      [0, 1, 5, 20, 15, 3],
      [0, 1, 4, 11, 1, 3],
      [0, 1, 3, 5, 1, 3],

      [11, 5, 18, img_rockpile],
      [11, 17, 16, img_rockpilesmall],
    ]
  },
  // 20
  {
    "onload": () => {
      finishedGame = true;
      showTooltip("Time: " + formatTime(time) + " Deaths: " + deaths, 3600);
    },
    "start": [64, 576],
    "exit": 2,
    "static": [
      [0, -1, 0, 1, 20],
      [0, 20, 0, 1, 20],
      [0, 5, 19, 15, 1],
      [0, 0, -1, 20, 1],

      [0, 1, 1, 3, 1, 1],
      [0, 2, 2, 1, 4, 1],
      [0, 5, 1, 1, 5, 1],
      [0, 7, 1, 1, 5, 1],
      [0, 6, 3, 1, 1, 1],
      [0, 9, 1, 1, 5, 1],
      [0, 11, 1, 1, 5, 1],
      [0, 10, 1, 1, 1, 1],
      [0, 10, 3, 1, 1, 1],
      [0, 13, 1, 1, 5, 1],
      [0, 15, 1, 1, 5, 1],
      [0, 14, 1, 1, 1, 1],
      [0, 17, 1, 1, 5, 1],
      [0, 18, 3, 1, 1, 1],
      [0, 19, 1, 1, 2, 1],
      [0, 19, 4, 1, 2, 1],

      [0, 2, 7, 1, 2, 1],
      [0, 4, 7, 1, 2, 1],
      [0, 3, 9, 1, 2, 1],
      [0, 6, 7, 1, 4, 1],
      [0, 8, 7, 1, 4, 1],
      [0, 7, 7, 1, 1, 1],
      [0, 7, 10, 1, 1, 1],
      [0, 10, 7, 1, 4, 1],
      [0, 12, 7, 1, 4, 1],
      [0, 11, 10, 1, 1, 1],
      [0, 14, 7, 1, 2, 1],
      [0, 14, 10, 1, 1, 1],
      
      [1, 0, 19, 5],

      [2, 16, 18, 0],
    ],
    "dynamic": [
      [10, 19, 0, () => {player.maxShots = 100}, img_sandwich]
    ],
    "deco": [
      [0, 0, 16, 2, 1, 3],
      [0, 0, 17, 6, 3, 3],
      [0, 6, 18, 4, 1, 3],

      [11, 5, 18, img_rockpile],
      [11, 13, 18, img_rockpilesmaller],
    ]
  }
];
}

function compileLevel(rawLevel) {
  let compiled = {
    "start": rawLevel["start"],
    "exit": rawLevel["exit"],
    "bg": rawLevel["bg"],
    "static": [],
    "dynamic": [],
    "deco": [],
  }
  if ("onload" in rawLevel)
    compiled["onload"] = rawLevel["onload"];
  
  for (let objData of rawLevel["static"]) {
    let compiledObject = compileStaticObject(objData);
    compiled["static"].push(compiledObject);
  }
  for (let objData of rawLevel["dynamic"]) {
    let compiledObject = compileDynamicObject(objData);
    compiled["dynamic"].push(compiledObject);
  }

  for (let objData of rawLevel["deco"]) {
    let compiledObject = compileStaticObject(objData);
    compiled["deco"].push(compiledObject);
  }
  return compiled;
}

function blitObjects(surf, objects) {
  for (let obj of objects) {
    obj.draw(surf);
  }
}

function loadLevel(loadLevelNum) {
  level = compileLevel(LEVELS[loadLevelNum]);
  if ("onload" in level)
    level["onload"]();
  backgroundSurf.clear();
  blitObjects(backgroundSurf, level["deco"]);
  blitObjects(backgroundSurf, level["static"]);
  if (devMode)
    drawGrid(backgroundSurf);
  let [px, py] = level["start"];
  player.x = px;
  player.y = py;
}