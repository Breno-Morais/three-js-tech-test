import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

// ---------------- PLACEHOLDER -----------------------
// First, we must establish the renderer, the 3d engine
const renderer = new THREE.WebGLRenderer();
renderer.setSize(900, 800);
document.body.appendChild( renderer.domElement );
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Second, we must create the scene that will represent the universe that contains the objects
const scene = new THREE.Scene();

// Third we must create the camera that will be the point of view that will be used to render the scene
const camera = new THREE.PerspectiveCamera(45, 900 / 800);
camera.position.set(0, 0, 100);
camera.lookAt(new THREE.Vector3(0, 0, 0));

// We must not forget to add the light source for the scene
const ambientLight = new THREE.AmbientLight( 0x404040, 0.5 );
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight( 0xffffff, 2 );
directionalLight.position.set(-5, 5, 0);
directionalLight.castShadow = true;
scene.add( directionalLight );

// Setting of the shadow map
directionalLight.shadow.mapSize.width = 512;
directionalLight.shadow.mapSize.height = 512; // default
directionalLight.shadow.camera.near = 0.5; // default
directionalLight.shadow.camera.far = 500; // default

// Because the sphere has a texture, we must add a texture loader
const loader = new THREE.TextureLoader();

// Add the controls
// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 3;

//--------------------- OBJECTS  -----------------------
// The 3 objects that will be added will be a Sphere, a Cube and a Torus Knot,
// all these geometries are native to three.js and each one will have a different material

// TORUS KNOT
const knotGeometry = new THREE.TorusKnotGeometry( 15, 2, 100, 16 );
const knotMaterial = new THREE.MeshToonMaterial({ 
    map: loader.load('tiled.jpg')
});
const torusKnot = new THREE.Mesh( knotGeometry, knotMaterial );
torusKnot.castShadow = true;
torusKnot.receiveShadow = true;
scene.add( torusKnot );

// SPHERE
// The Sphere will be special because it will have the texture
const sphereGeometry = new THREE.SphereGeometry( 5, 30, 30);
const sphereMaterial = new THREE.MeshLambertMaterial({
    map: loader.load('tex.jpg')
});
const sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
sphere.castShadow = true;
sphere.receiveShadow = true;
scene.add( sphere );

// CUBE
const cubeGeometry = new THREE.BoxGeometry( 10, 1, 1 );
const cubeMaterial = new THREE.MeshNormalMaterial();
const cube = new THREE.Mesh( cubeGeometry, cubeMaterial );
cube.castShadow = true;
cube.receiveShadow = true;
sphere.add( cube ); // I'll add it to the sphere so the rotation of the sphere is applied to the cube

cube.position.set(35, 0, 0);

//------------- RENDERING AND ANIMATION  ---------------
function rendering() {
    torusKnot.rotation.x -= 0.002;
    torusKnot.rotation.z += 0.0015;

    sphere.rotation.y += 0.005;

    cube.rotation.z += 0.02;

    controls.update();

    requestAnimationFrame( rendering );
    renderer.render( scene, camera );
}

rendering();