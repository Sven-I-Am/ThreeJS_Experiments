import * as THREE from 'https://cdn.skypack.dev/three'
import { OrbitControls } from 'https://cdn.skypack.dev/three/examples/jsm/controls/OrbitControls.js';
import { HemisphereLight } from 'https://cdn.skypack.dev/three/src/lights/HemisphereLight.js';
import { SpotLight } from 'https://cdn.skypack.dev/three/src/lights/SpotLight.js';
import { SpotLightHelper } from 'https://cdn.skypack.dev/three/src/helpers/SpotLightHelper.js';
import { Group } from 'https://cdn.skypack.dev/three/src/objects/Group.js';

let camera, scene, renderer;
let geometry, material;

//Set scene
scene = new THREE.Scene();
//Set camera
camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.01, 100 );
camera.position.z = 5;
//Set renderer
renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0x00ffff);
renderer.setAnimationLoop( animation );
document.body.appendChild( renderer.domElement );
const controls = new OrbitControls(camera, renderer.domElement);

//Add lights
const light = new HemisphereLight( 0xffffbb, 0x080820, 1 ); //warm yellow light from sky to floor
scene.add( light );

const roomLight = new SpotLight(0xffffff, 0.5, 4, Math.PI/2.5, 0.5, 0.8);
roomLight.position.set(0,3,0);
roomLight.castShadow = true;

scene.add( roomLight );
const spotLightHelper = new SpotLightHelper( roomLight );
scene.add( spotLightHelper );


//make groups
const room = new Group();
const table = new Group();
const tableFeet = new Group();

//Build room
geometry = new THREE.BoxGeometry(3, 0.1, 3);
material = new THREE.MeshStandardMaterial({color: 0xebd7be});
const floor = new THREE.Mesh(geometry, material);
floor.receiveShadow = true;

geometry = new THREE.BoxGeometry(0.1,3,3.1);
material = new THREE.MeshStandardMaterial({color: 0x00ffff})
let wallE = new THREE.Mesh(geometry, material);
wallE.position.set(-1.55,1.45, -0.05)
wallE.receiveShadow = true;
room.add(wallE);

geometry = new THREE.BoxGeometry(3.1,3,0.1);
material = new THREE.MeshStandardMaterial({color: 0x00ffff})
const wallN = new THREE.Mesh(geometry, material);
wallN.position.set(-0.05,1.45, -1.55);
wallN.receiveShadow = true;
room.add(wallN);

//Build element 1=> table
geometry = new THREE.CylinderGeometry(0.5, 0.52, 0.02,32);
material = new THREE.MeshStandardMaterial({color: 0x9fc4d4});
const tableTop = new THREE.Mesh(geometry, material);

geometry = new THREE.CylinderGeometry(0.03,0.02,0.5,32);
material = new THREE.MeshStandardMaterial({color: 0x4f3b19});
for(let i=1; i<=4;i++){
    let foot = new THREE.Mesh(geometry, material);
    switch(i){
        case 1:
            foot.position.set (-0.3, -0.25, -0.3);
            break;
        case 2:
            foot.position.set (0.3, -0.25, -0.3);
            break;
        case 3:
            foot.position.set (-0.3, -0.25, 0.3);
            break;
        case 4:
            foot.position.set (0.3, -0.25, 0.3);
            break;
    }
    tableFeet.add(foot);
}
table.add(tableTop);
table.add(tableFeet);
table.position.set(0,0.5,0);
table.castShadow = true;




//Add elements to room
room.add(floor);

//Add groups to scene
scene.add(room);
scene.add(table);

function animation() {
    requestAnimationFrame(animation);
    renderer.render( scene, camera );
}
animation();

// //const controls = new OrbitControls(camera, renderer.domElement);
//
// //Build scene
//


//
//
// //Add elements
// //Basic blocks for elements
// let geometry; //defines shape
// let material; //defines material
//


//

//

//

//




function animate(){
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();