/*
Denne koden er basert på kodeeksempel ammoShapes2/myThreeHelper.js
https://source.coderefinery.org/3d/threejs_std/-/blob/main/src/del4/ammoShapes2/myThreeHelper.js
*/

import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export let g_scene, g_renderer, g_camera, g_controls;
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();


export function createThreeScene() {
	const canvas = document.getElementById("myCanvas");

	// Renderer:
	g_renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
	g_renderer.setSize(window.innerWidth*0.8, window.innerHeight*0.8);
	g_renderer.setClearColor(0xbfd104, 0xff); //farge, alphaverdi.
	g_renderer.shadowMap.enabled = true; //NB!
	g_renderer.shadowMapSoft = true;
	g_renderer.shadowMap.type = THREE.PCFSoftShadowMap; //THREE.BasicShadowMap;
	g_renderer.domElement.addEventListener('click', onPointerDown, false);

	// Scene
	g_scene = new THREE.Scene();
	g_scene.background = new THREE.Color(0xdddddd);

	// Sceneobjekter
	//await addSceneObjects();
	addLights();

	// Kamera:
	g_camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
	g_camera.position.x = 15;
	g_camera.position.y = 15;
	g_camera.position.z = -15;

	// OrbitControls:
	g_controls = new OrbitControls(g_camera, g_renderer.domElement);
	g_controls.enableDamping = true;
	g_controls.dampingFactor = 0.2;
	g_controls.minDistance = 10;
	g_controls.maxDistance = 50;
	g_controls.target = new THREE.Vector3(0, 0, 0);
	g_controls.addEventListener("change", renderScene);

}

export function addLights() {
	// Ambient:
	let ambientLight1 = new THREE.HemisphereLight(0xdddddd, 0xa8a8f8, 0.7);
	ambientLight1.visible = true;
	g_scene.add(ambientLight1);

	//** RETNINGSORIENTERT LYS (som gir skygge):
	let directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
	directionalLight.visible = true;
	directionalLight.position.set(0, 105, 0);
	// Viser lyskilden:
	const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 10, 0xff0000);
	directionalLightHelper.visible = true;
	g_scene.add(directionalLightHelper);
	directionalLight.castShadow = true; //Merk!
	directionalLight.shadow.mapSize.width = 1024;
	directionalLight.shadow.mapSize.height = 1024;
	directionalLight.shadow.camera.near = 5;
	directionalLight.shadow.camera.far = 110;
	directionalLight.shadow.camera.left = -50;
	directionalLight.shadow.camera.right = 50;
	directionalLight.shadow.camera.top = 50;
	directionalLight.shadow.camera.bottom = -50;
	g_scene.add(directionalLight);
	// Viser lyskildekamera (hva lyskilden "ser")
	const directionalLightCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
	directionalLightCameraHelper.visible = true;

	g_scene.add(directionalLightCameraHelper);

}

//Sjekker tastaturet:
export function handleKeys(delta, g_currentlyPressedKeys) {

}

export function onWindowResize() {
	g_camera.aspect = window.innerWidth / window.innerHeight;
	g_camera.updateProjectionMatrix();
	g_renderer.setSize(window.innerWidth, window.innerHeight);
	renderScene();
}

export function updateThree(deltaTime) {
	//Oppdater trackball-kontrollen:
	g_controls.update();
}

export function addMeshToScene(mesh) {
	g_scene.add(mesh);
}

export function onPointerDown(event) {
	event.preventDefault();

	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

	raycaster.setFromCamera(mouse, g_camera);

	var intersects = raycaster.intersectObjects(g_scene.children, true);

	if (intersects.length > 0) {

		const object = intersects[0].object;
		object.material.color.set("cyan");

	}
}

export function renderScene() {
	g_renderer.render(g_scene, g_camera);
}
