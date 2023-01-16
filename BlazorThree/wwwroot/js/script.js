import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { doTheThing } from './helper.js';

function setupCube() {
    // create the scene
    var scene = new THREE.Scene();

    // create the camera
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    // create the renderer
    var renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("myCanvas") });
    renderer.setClearColor("white");
    renderer.setSize(window.innerWidth, window.innerHeight);

    var controls = new OrbitControls(camera, renderer.domElement);

    // create the cube
    var cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    var cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.name = "cube";
    scene.add(cube);

    var cubeGeometry2 = new THREE.BoxGeometry(4, 0.1, 4);
    var cubeMaterial2 = new THREE.MeshBasicMaterial({ color: 0x00ffff });
    var cube2 = new THREE.Mesh(cubeGeometry2, cubeMaterial2);
    cube2.position.set(0, -1, 0);
    scene.add(cube2);

    camera.position.z = 5;

    // render the scene
    function render() {
        requestAnimationFrame(render);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        controls.update();
        renderer.render(scene, camera);
    }
    render();
    doTheThing();
}
window.onload = setupCube;

function getInfo(name) {

}