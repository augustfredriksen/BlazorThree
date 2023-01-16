import * as THREE from "three";
import { addMeshToScene } from "../helpers/threeHelper.js";

export async function createRoomExterior(position = { x: 0, y: 0, z: 0 }) {
	let groupMesh = new THREE.Group();
	await createRoomExteriorParts(groupMesh);
	addMeshToScene(groupMesh);
}

async function createRoomExteriorParts(groupMesh) {
	let width = 20;
	let height = 0.1;
	let depth = 20;
	let floorMaterial = new THREE.MeshPhongMaterial({
		color: new THREE.Color("firebrick"),
		flatShading: true
	});
	let wallMaterial = new THREE.MeshPhongMaterial({
		color: new THREE.Color("firebrick"),
		flatShading: true
	});
	let floorGeometry = new THREE.BoxGeometry(width, height, depth);
	let floorMesh = new THREE.Mesh(floorGeometry, floorMaterial);
	floorMesh.receiveShadow = true;
	floorMesh.name = "floor";
	groupMesh.add(floorMesh);

	let wall1Geometry = new THREE.BoxGeometry(width, depth/2, height);
	let wall1Mesh = new THREE.Mesh(wall1Geometry, wallMaterial);
	wall1Mesh.position.set(floorMesh.position.x, floorMesh.position.y + wall1Mesh.geometry.parameters.height / 2, floorMesh.position.z + floorMesh.geometry.parameters.width / 2);
	wall1Mesh.name = "wall1";
	groupMesh.add(wall1Mesh);


	let wall2Geometry = new THREE.BoxGeometry(height, depth/2, width);
	let wall2Mesh = new THREE.Mesh(wall2Geometry, wallMaterial);
	wall2Mesh.position.set(floorMesh.position.x - floorMesh.geometry.parameters.width/2, floorMesh.position.y + wall1Mesh.geometry.parameters.height/2, floorMesh.position.z);
	wall2Mesh.name = "wall2";
	groupMesh.add(wall2Mesh);

}