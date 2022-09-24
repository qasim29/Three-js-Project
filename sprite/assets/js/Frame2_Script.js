import * as THREE from "three";
import { FontLoader } from "/sprite/assets/jsm/loaders/FontLoader.js";
import { TextGeometry } from "/sprite/assets/jsm/geometries/TextGeometry.js";
import Stats from "/sprite/assets/js/stats.js";

// create scene
const scene = new THREE.Scene();
// add camera with fov(field of view) = 45 , aspect ratio , near and far
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  100.5
);
//set camera position
camera.position.set(
  window.innerWidth / window.innerHeight + 1,
  window.innerWidth / window.innerHeight - 1.5,
  10
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Adding Backgroud Image
// Create a texture loader so we can load our image file
var back_loader = new THREE.TextureLoader();

// Load an image file into a custom material
var imgMaterial = new THREE.MeshLambertMaterial({
  map: back_loader.load("assets/textures/neon_back.jpg"),
});
// create a plane geometry for the image with a width of 10
// and a height that preserves the image's aspect ratio
// current aspect ratio 160/100 = 1.6
// my screen aspect ratio 16/9 = 1.777
var imgGeometry = new THREE.PlaneGeometry(25, 13);

// combine our image geometry and material into a mesh
var mesh = new THREE.Mesh(imgGeometry, imgMaterial);

// set the position of the image mesh in the x,y,z dimensions
mesh.position.set(2.5, 0.6, -5);

// add the image to the scene
scene.add(mesh);

let lightIntensity = 1;

// Add a point light with #fff color, .7 intensity, and 0 distance
var light = new THREE.PointLight(0xffffff, lightIntensity, 0);

// Specify the light's position
light.position.set(100, 100, 100);

// Add the light to the scene
scene.add(light);

const stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom);

function createStats() {
  var stats = new Stats();
  stats.setMode(0);
  stats.domElement.style.position = "absolute";
  stats.domElement.style.left = "0";
  stats.domElement.style.top = "0";
  return stats;
}

// press 'w' to run sprite animation

document.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown(event) {
  var keyCode = event.which;
  if (keyCode == 87) {
    keypress = 1;
  }
}

const map = new THREE.TextureLoader().load("assets/textures/door.png");

// door spritesheet
function doorSprite() {
  map.repeat.set(1 / 5.27, 1);
  //map.offset.x = 3/4;
  const material = new THREE.SpriteMaterial({ map: map, color: 0xffffff });
  const sprite = new THREE.Sprite(material);
  sprite.position.x = 5.5;
  sprite.position.y = -1;
  //sprite.scale.set(2, 3, 1)
  return sprite;
}

// dragon spritesheet
const dragon_map = new THREE.TextureLoader().load(
  "assets/textures/dragon3.png"
);
function dragonSprite() {
  dragon_map.repeat.set(1 / 9.9, 1);
  //dragon_map.offset.x = 7/8;
  const dragon_material = new THREE.SpriteMaterial({
    map: dragon_map,
    color: 0xffffff,
  });
  const dragon_sprite = new THREE.Sprite(dragon_material);
  dragon_sprite.position.x = 0;
  dragon_sprite.position.y = -1.2;
  //sprite.scale.set(2, 3, 1)
  return dragon_sprite;
}

// create show text function
function showText(x, y, z, msg, font) {
  var textsShapes = font.generateShapes(msg, 0.2);
  var textsGeometry = new THREE.ShapeGeometry(textsShapes);
  var textsMaterial = new THREE.MeshBasicMaterial({ color: 0xeeeeee });
  var text = new THREE.Mesh(textsGeometry, textsMaterial);
  text.position.set(x, y, z);
  scene.add(text);
}

if (window.location.pathname.includes("frame1")) {
  const loader = new FontLoader();
  loader.load("assets/fonts/Roboto_Bold.json", function (font) {
    showText(0, 1.5, 0, "Syed Rehan Hussain Rizvi (B21110004007)", font);
    showText(0, 0.5, 0, "Muhammad Farooq (B21110004003)", font);
    showText(0, 0, 0, "Abdullah Bin Abdul Qadeer (B21110004001)", font);
    showText(0, 1, 0, "Syed Muhammad Qasim Ali (B19102142)", font);
    showText(0.7, -3.8, -3, "Press W to run sprite animation", font);
  });
} else if (window.location.pathname.includes("frame2")) {

    const loader = new FontLoader();
    loader.load("assets/fonts/Roboto_Bold.json", function (font) {
    showText(0, 1, 0, "Miss Humeira Tariq (Computer Graphics)", font);
    showText(0.7, -3.8, -3, "Press W to run sprite animation", font);
    });  
} 

// setInterval(()=>{
//     const loader = new FontLoader();
//     loader.load( 'fonts/Roboto_Bold.json', function ( font ) {
//         press_w = showText(0.7, -3.8, -3, 'Press W to run sprite animation',font)
//         scene.add(press_w);
//     });
//     setTimeout(function(){
//         scene.remove(press_w);
//     },200);
// },1000)

//scene.remove(press_w);

let door = doorSprite();
scene.add(door);
let currframe = 0;
let clock = new THREE.Clock();
let door_accurate = 0;

let dragon = dragonSprite();
scene.add(dragon);
let dragon_currframe = 3;
let dragon_clock = new THREE.Clock();
let dragon_accurate = 0;
let keypress = 0;

function draw() {
  stats.begin();

  if (keypress == 1) {
    door_accurate += clock.getDelta();
    dragon_accurate += dragon_clock.getDelta();

    if (dragon_accurate > 0.28) {
      dragon_currframe += 1;
      if (dragon_currframe < 8) {
      } else {
        dragon_currframe = 5;
      }
      dragon_map.offset.x = dragon_currframe / 7.9;
      dragon_accurate = 0;
      if (dragon.position.x < 5) {
        dragon.position.x += 0.25;
      } else {
        if (window.location.pathname.includes("frame1")) {
          window.location.href = "/sprite/frame2.html";
        } else if (window.location.pathname.includes("frame2")) {
          window.location.href = "/sprite/frame3.html";
        }
      }
    }
    if (door_accurate > 5) {
      currframe += 1;
      if (currframe > 4) {
        currframe = 4;
      }
      map.offset.x = currframe / 5.16;
    }
  }
  stats.end();

  requestAnimationFrame(draw);
  renderer.render(scene, camera);
}

draw();
