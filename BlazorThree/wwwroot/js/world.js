import * as THREE from "three";
import { createRoomExterior } from "./components/plane.js";
import { create } from "./helpers/loader.js";
import { createThreeScene, handleKeys, onWindowResize, renderScene, updateThree, onPointerDown, g_renderer } from "./helpers/threeHelper.js";

let g_clock;
const g_currentlyPressedKeys = [];

export async function main() {
	//Input - standard Javascript / WebGL:
	document.addEventListener("keyup", handleKeyUp, false);
	document.addEventListener("keydown", handleKeyDown, false);
	


	// three:
	createThreeScene();

	await addSceneObjects();

	// Klokke for animasjon
	g_clock = new THREE.Clock();

	//Håndterer endring av vindusstørrelse:
	window.addEventListener("resize", onWindowResize, false);
	//Input - standard Javascript / WebGL:
	document.addEventListener("keyup", handleKeyUp, false);
	document.addEventListener("keydown", handleKeyDown, false);

	// Start animasjonsløkka:
	animate(0);
}

function handleKeyUp(event) {
	g_currentlyPressedKeys[event.code] = false;
}

function handleKeyDown(event) {
	g_currentlyPressedKeys[event.code] = true;
}

async function addSceneObjects() {
	createRoomExterior();
	create();
}

function animate(currentTime, myThreeScene) {
	window.requestAnimationFrame((currentTime) => {
		animate(currentTime, myThreeScene);
	});
	let deltaTime = g_clock.getDelta();

	//Oppdaterer grafikken:
	updateThree(deltaTime);
	//Sjekker input:
	handleKeys(deltaTime, g_currentlyPressedKeys);
	//Tegner scenen med gitt kamera:
	renderScene();
}
