import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

//new textures
const textures = new THREE.TextureLoader();
const normalTextures = new textures.load("textures/normal-map.jpg");
// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Objects
// const geometry = new THREE.TorusGeometry( .7, .2, 16, 100 );
const geometry = new THREE.SphereBufferGeometry(0.5, 64, 64);

// Materials
//this is changed form basic to standard material
const material = new THREE.MeshStandardMaterial();
material.roughness = 0.2;
material.metalness = 0.7;
material.color = new THREE.Color(0x292929);
material.normalMap = normalTextures;

// Mesh
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.1);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);
//second light
const pointLight2 = new THREE.PointLight(0xff0000, 1);
pointLight2.position.set(1, 1, 1);
scene.add(pointLight2);

//----------dat gui(for control only not used in gui comment these)
gui.add(pointLight2.position, "y").min(-4).max(4).step(0.01);
gui.add(pointLight2.position, "x").min(-6).max(6).step(0.01);
gui.add(pointLight2.position, "z").min(-3).max(3).step(0.01);
gui.add(pointLight2, "intensity").min(1).max(4).step(0.1);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 2;
scene.add(camera);

///Image add
// Create a texture loader so we can load our image file
var loader2 = new THREE.TextureLoader();

// Load an image file into a custom material
var material2 = new THREE.MeshLambertMaterial({
  map: loader2.load(
    // "https://s3.amazonaws.com/duhaime/blog/tsne-webgl/assets/cat.jpg"
    "assets/halloween place.png"
  ),
});

// create a plane geometry for the image with a width of 10
// and a height that preserves the image's aspect ratio
var geometry2 = new THREE.PlaneBufferGeometry(1.2, 0.7, 4);

// combine our image geometry and material into a mesh
var mesh2 = new THREE.Mesh(geometry2, material2);

// set the position of the image mesh in the x,y,z dimensions
mesh2.position.set(1, 0.2, 0.5);

// add the image to the scene
scene.add(mesh2);

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */

const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  sphere.rotation.y = 0.5 * elapsedTime;

  // Update Orbital Controls
  // controls.update()

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
