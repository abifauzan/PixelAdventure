import * as PIXI from 'pixi.js';
import * as Sound from 'pixi-sound';

const size = [1366, 768];
const ratio = size[0] / size[1];

//Create a Pixi Application
let app = new PIXI.Application({
  width: size[0], // default: 800
  height: size[1], // default: 600
  antialias: true, // default: false
  transparent: false, // default: false
  resolution: 1 // default:  1
});

// AUTO PLAY CODE HERE
// PIXI.sound.Sound.from({
//   url: './assets/sound/sample.ogg',
//   autoPlay: true,
//   complete: function() {
//     console.log('Sound finished');
//   }
// });

const sound = PIXI.sound.Sound.from('./assets/sound/sample.ogg');

PIXI.loader.add('./assets/images/polar_bear.png').load(setup);

let bear;

function setup() {
  bear = new PIXI.Sprite(
    PIXI.loader.resources['./assets/images/polar_bear.png'].texture
  );
  app.stage.addChild(bear);
  app.ticker.add(delta => gameLoop(delta));
}

function gameLoop(delta) {
  bear.x += 1;
  // console.log(delta);
}

function resize() {
  if (window.innerWidth / window.innerHeight >= ratio) {
      var w = window.innerHeight * ratio;
      var h = window.innerHeight;
  } else {
      var w = window.innerWidth;
      var h = window.innerWidth / ratio;
  }
  app.view.style.width = w + 'px';
  app.view.style.height = h + 'px';
}

window.onload = function(event) {
  resize();
}

window.onresize = function(event) {
  resize();
};

document.body.appendChild(app.view);

document.querySelector('#stopButton').addEventListener('click', function() {
  sound.stop();
});

document.querySelector('#playButton').addEventListener('click', function() {
  sound.play();
});


