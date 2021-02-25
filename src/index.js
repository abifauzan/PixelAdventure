import * as PIXI from 'pixi.js';
import * as Sound from 'pixi-sound';

let Application = PIXI.Application,
    Container = PIXI.Container,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    TextureCache = PIXI.utils.TextureCache,
    Sprite = PIXI.Sprite,
    Utils = PIXI.utils,
    Texture = PIXI.Texture,
    TilingSprite = PIXI.TilingSprite,
    Rectangle = PIXI.Rectangle;

let app = new Application({
    width: 960,
    height: 640,
    antialias: true,
    transparent: true,
    resolution: 1
});

document.body.appendChild(app.view);

loader.add([
  "assets/images/Bg-Blue.png",
  "assets/images/Terrain.png",
  "assets/images/Terrain.json",
  "assets/images/WorldMap.json",
]).load(init);

let worldMap, level, map;

function init() {

  let bg = TextureCache["assets/images/Bg-Blue.png"];
  worldMap = loader.resources["assets/images/Terrain.json"].textures; 
  level = loader.resources["assets/images/WorldMap.json"];

  const tilingBg = new TilingSprite(
    bg,
    app.screen.width,
    app.screen.height,
);
  app.stage.addChild(tilingBg);

  let count = 0;

  app.ticker.add(() => {
    count += 0.05;
    tilingBg.tilePosition.x += 1;
    tilingBg.tilePosition.y += 1;
  });

  const { data } = level;
  const tileHeight = data.tileheight;
  const tileWidth = data.tilewidth;
  const height = data.height;
  const width = data.width;
  // console.log(data)
  const dataLayer = data.layers[0];
  let x = 0;
  let y = 0;

  if (dataLayer.type === "tilelayer") {
    for (let d = 0; d < dataLayer.data.length; d++) {
      // console.log(dataLayer.data[d]);
      
      if (d % width == 0 && d != 0) {
        y += tileHeight;
        x = 0;
      }

      if (dataLayer.data[d] != 0) {
        let spriteIdx = dataLayer.data[d] - 1;
        map = new Sprite(worldMap["Terrain"+spriteIdx+".png"]);
        map.position.set(x, y);
        app.stage.addChild(map);
        app.stage.scale.set(2);
      }

      x += tileWidth;

    }
  }
}