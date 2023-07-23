import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as THREE from 'three';
import * as imgs from './Images';
import * as lghts from './Lights';
import { Controls } from './Controls';
import * as environment from './environment';

const env = environment.initEnvironment();
environment.initListeners(env);

const controls = new Controls(env);
new imgs.Images(env);
new lghts.Lights(env);

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
