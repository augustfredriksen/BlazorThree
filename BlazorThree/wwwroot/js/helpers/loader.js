import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { addMeshToScene } from './threeHelper.js';

export async function create() {
    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/draco/");
    loader.setDRACOLoader(dracoLoader);
    loader.load("../../assets/models/golf_ball.glb", (gltf) => {
        const golfBall = gltf.scene;
        golfBall.position.setX(5);
        golfBall.position.setY(4);
        golfBall.position.setZ(-5);
        golfBall.name = "golf_ball";
        golfBall.userData.isContainer = true;
        golfBall.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
        //golfCart.position.set(position.x, position.y, position.z);
        addMeshToScene(golfBall);
    });
}