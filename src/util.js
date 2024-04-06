function clamp(x, lower, upper) {
  if (x < lower)
    return lower;
  if (x > upper)
    return upper;
  return x;
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randDecimal(min, max) {
  return Math.random() * (max - min) + min;
}

function formatTime(time) {
  let minutes = Math.floor(time / 3600);
  time %= 3600;
  let seconds = Math.floor(time / 60);
  time %= 60;
  let ms = Math.round(time * ((1/FRAME_RATE)*1000));

  seconds = ('0'+seconds).slice(-2);
  ms = ('00'+ms).slice(-3);
  return `${minutes}:${seconds}.${ms}`;
}