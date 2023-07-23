import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as imgs from './Images';
import * as lghts from './Lights';
import { Controls } from './Controls';
import * as environment from './environment';

const env = environment.initEnvironment();
environment.initListeners(env);

const controls = new Controls(env);
const images = new imgs.Images(env);
const lights = new lghts.Lights(env);

const clock = new THREE.Clock();
let oldElapsedTime = 0;

const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    const deltaTime = elapsedTime - oldElapsedTime;
    oldElapsedTime = elapsedTime;

    // Render
    controls.update(deltaTime);
    env.renderer.render(env.scene, env.camera);

    window.requestAnimationFrame(tick);
};

tick();
