

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as imgs from './Images';
import * as environment from './environment';

const env = environment.initEnvironment(true);
environment.initListeners(env);

const images = new imgs.Images(env);

/**
 * Controls
 */
const controls = new OrbitControls(env.camera, env.canvas);
controls.enabled = true;
controls.enableDamping = true;

const clock = new THREE.Clock();
let oldElapsedTime = 0;

const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    const deltaTime = elapsedTime - oldElapsedTime;
    oldElapsedTime = elapsedTime;

    // Render
    controls.update();
    env.renderer.render(env.scene, env.camera);

    window.requestAnimationFrame(tick);
};

tick();
