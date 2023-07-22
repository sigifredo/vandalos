

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// import { FirstPersonControls } from 'three/addons/controls/FirstPersonControls.js';
// import { FirstPersonControls } from './FirstPersonControls';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';
import * as imgs from './Images';
import * as lghts from './Lights';
import * as environment from './environment';

const env = environment.initEnvironment(true);
environment.initListeners(env);

const images = new imgs.Images(env);
// const lights = new lghts.Lights(env);

/**
 * Controls
 */
// const controls = new FirstPersonControls(env.camera, env.canvas);
// controls.movementSpeed = 4;
// controls.lookSpeed = 0.1;

// env.scene.add(controls.getObject());

const controls = new PointerLockControls(env.camera, env.canvas);
env.scene.add(controls.getObject());

/*
if (env.gui) {
    controls = new OrbitControls(env.camera, env.canvas);
    controls.enabled = true;
    controls.enableDamping = true;
} else {
    controls = new FirstPersonControls(env.camera, env.canvas);
    controls.movementSpeed = 4;
    controls.lookSpeed = 0.1;
}
*/
// controls = new FirstPersonControls(
//     env.camera
// );

const clock = new THREE.Clock();
let oldElapsedTime = 0;

const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    const deltaTime = elapsedTime - oldElapsedTime;
    oldElapsedTime = elapsedTime;

    // Render
    // controls.update();
    env.renderer.render(env.scene, env.camera);

    window.requestAnimationFrame(tick);
};

tick();
