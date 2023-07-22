import * as THREE from 'three';

export class Lights {
    constructor(env) {
        const ambient = new THREE.AmbientLight(0xb9d5ff, 0.5);
        const directional = new THREE.DirectionalLight(0xb9d5ff, 0.5);

        directional.position.set(2, 2, -1);

        env.scene.add(ambient, directional);

        if (env.gui) {
            const directionalHelper = new THREE.DirectionalLightHelper(directional, 0.2);
            env.scene.add(directionalHelper);
        }
    }
}

export default Lights;
