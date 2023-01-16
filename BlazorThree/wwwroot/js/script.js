import { main } from "./world.js";

export async function start() {
    await main();
}
window.onload = start();

function getInfo(name) {

}