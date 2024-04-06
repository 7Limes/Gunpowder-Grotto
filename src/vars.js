const CANVAS_SIZE = 640;
const FRAME_RATE = 60;
const TILE_SIZE = 32;
const TILES_PER_ROW = CANVAS_SIZE/TILE_SIZE;
const SHADOW_ALPHA = 128;

var img_stone, imgs_spikes, imgs_spring, img_bridge, img_key, img_ice, img_wood, img_darkstone, img_crystal, img_sandwich, img_bullet;
var img_stalagtite, img_stalagtite, img_rockpile, img_rockpilesmall, img_rockpilesmaller, img_pillar;
var img_player_idle, imgs_player_right, imgs_player_left;

var LEVELS;
var player, level, levelNumber;
var particleEffects = [];
var foregroundSurf, backgroundSurf;
var tooltip = "";
var tooltipDuration = 0;

var deaths = 0;
var time = 0;
var finishedGame = false;

var font_regular;

var devMode = false;