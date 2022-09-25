import * as THREE from 'three';
import { Color, MathUtils, Path, Points, Vector2, Vector3 } from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);


const canvas = document.querySelector('#farooq');
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 10

// function createLine(x1,y1,x2,y2) {
//     const material = new THREE.LineBasicMaterial({color: 0x0000ff});
//     const point = [];
//     point.push(new THREE.Vector3(x1,y1,0));
//     point.push(new THREE.Vector3(x2,y2,0));
//     const geomatry = new THREE.BufferGeometry().setFromPoints(point)
//     const line = new THREE.Line(geomatry, material);
//     scene.add( line );
//     renderer.render(scene, camera)
// }
// var material ;
function createFlower() {
    

// path.lineTo( 0, 5 );
// path.quadraticCurveTo( 1, 1, 3,4 );
// // path.moveTo(5,1)
// path.lineTo( 3, 0 );


// const points = path.getPoints();

// const geometry = new THREE.BufferGeometry().setFromPoints( points );
// const material = new THREE.LineBasicMaterial( { color: 0xffffff } );

// const line = new THREE.Line( geometry, material );
// scene.add( line );


var x = 0

for (let x = 0; x < 6; x++) {
    // scene.position.x = angle
    // turn(angle)
    // scene.position.y = angle;
    // console.log("test ",angle);
    createLeaf( x*(2*Math.PI/6))
    // x ++
    // turn(2*Math.PI/6)
    // createLeaf(60)
    // createLeaf(60)
    // createLeaf(60)
    
}



}


function createLeaf(angle) {
    const path = new THREE.Path();

    var cosAngle = Math.cos(Math.PI/3)
    var sinAngle = Math.sin(Math.PI/3)
    path.moveTo(0,0)
    const length = 5
    const xDelta = length*cosAngle
    const yDelta = length*sinAngle
        // path.moveTo(0,0)
// for (let index = 1; index < 5; index++) {
    
    path.lineTo(xDelta, yDelta)
    path.lineTo(2*xDelta, 0)
    path.lineTo(xDelta, -yDelta)
     path.lineTo(0, 0)
    // path.closePath()

//    if(index == 1){
//         path.lineTo(3*cosAngle,2*sinAngle)
//         path.moveTo(3*cosAngle,2*sinAngle)
//     }else if(index == 2){
//         path.lineTo( 0*cosAngle,5*sinAngle)
//         path.moveTo(0*cosAngle,5*sinAngle)
//     }else if(index == 3){
//         path.lineTo( -2*cosAngle,2*sinAngle)
//         path.moveTo(-2*cosAngle,2*sinAngle)
//     } else{
//         path.lineTo(0,0)
//         path.moveTo(0,0)
//     }
//     if (index == 2) {
//         turn(120)
//        }else{
//         turn(Math.PI/2)                  
//        }
    // path.rotation +=angle
// }

   const points = path.getPoints();

   const geometry = new THREE.BufferGeometry().setFromPoints( points );
   const material = new THREE.LineBasicMaterial({color: new Color(Math.random()*255, Math.random()*255, Math.random()*255)});
//    material.color = new Color(Math.random()*255, Math.random()*255, Math.random()*255)
//    geometry.center()  // When change it change
//    geometry.translate(5,0,0) // When change it change

   const line = new THREE.Line( geometry, material );
//    line.translateX(5)    
    line.rotateZ(angle)
//    turn(60)
line.material.needsUpdate = true; // When change it change
   scene.add( line );
   console.log(line)
   renderer.render(scene, camera);
}


btnLeft.addEventListener("click", function() {
    turn(Math.PI * 0.5)
  });
btnRight.addEventListener("click", function() {
    turn(-Math.PI * 0.5)
  });

  function turn(angle) {
    // console.log(point);
    scene.rotateOnWorldAxis(new THREE.Vector3(1,1,1), angle)
    //  = angle
    // scene.rotateZ = angle
  }

createFlower();

function animate() {
    // createLine(0,0,0,5);
    // scene.rotation.y += 0.01;
    scene.rotation.z += 0.01;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
animate()


