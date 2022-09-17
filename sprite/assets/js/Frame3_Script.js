import * as THREE from 'three';
import { FontLoader } from '/sprite/assets/jsm/loaders/FontLoader.js';
import { TextGeometry } from '/sprite/assets/jsm/geometries/TextGeometry.js';
import Stats from '/sprite/assets/js/stats.js';
import { OrbitControls } from "/sprite/assets/jsm/controls/OrbitControls.js";
import { OBJLoader } from '/sprite/assets/jsm/loaders/OBJLoader.js';  
import { MTLLoader } from '/sprite/assets/jsm/loaders/MTLLoader.js';


const stats = new Stats()
// stats.scale.x = 5;
// stats.scale.set(2, 3, 1);
stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom)


function createStats() {
      var stats = new Stats();
      stats.setMode(0);
      stats.domElement.style.position = 'absolute';
      stats.domElement.style.width = '150px';
      stats.domElement.style.height = '100px';
      stats.domElement.style.left = '0';
      stats.domElement.style.top = '0';

      return stats;
}

const canvas = document.querySelector('#c');
const renderer = new THREE.WebGLRenderer({canvas});

const fov = 45;
const aspect = 2;  // the canvas default
const near = 0.1;
const far = 100;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(0, 10, 20);
const controls = new OrbitControls(camera, canvas);
controls.target.set(0, 5, 0);
controls.update();

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xB1E1FF);

{
    const planeSize = 40;
    const loader = new THREE.TextureLoader();
    const texture = loader.load('https://media.istockphoto.com/vectors/green-grass-striped-realistic-textured-background-vector-id1208398773?k=20&m=1208398773&s=612x612&w=0&h=5U8Aztjxs172axZp8G4RRfNI-v0CHtC8HseTGK-7cUA=');
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.magFilter = THREE.NearestFilter;
    const repeats = planeSize / 12;
    texture.repeat.set(repeats, repeats);

    const planeGeo = new THREE.PlaneBufferGeometry(planeSize, planeSize);
    const planeMat = new THREE.MeshPhongMaterial({
        map: texture,
        side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(planeGeo, planeMat);
    mesh.rotation.x = Math.PI * -.5;
    scene.add(mesh);
}

{
    const color = 0xFFFFFF;
    const intensity = 0.6;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(0, 10, 0);
    light.target.position.set(-5, 0, 0);
    scene.add(light);
    scene.add(light.target);
}

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const objloader = new OBJLoader();
objloader.load(
    // resource URL
    'assets/obj/spaceship.obj',
    // called when resource is loaded
function ( object ) {
    object.scale.set(1, 1, 1);
    object.position.set(0, 2, 0)
    scene.add( object );

}
);


function draw() {
    requestAnimationFrame(draw);
	stats.begin();

    renderer.render(scene, camera); 
	stats.end();  
}

draw();