

import * as THREE from 'three';

export class Lights {
    constructor(env) {
        const ambient = new THREE.AmbientLight(0xffffff, 0.5);
        const directional = new THREE.DirectionalLight();

        env.scene.add(ambient);
        env.scene.add(directional);
    }
}

export default Lights;
