import * as THREE from 'three';

export class Lights {
    constructor(env) {
        const ambient = new THREE.AmbientLight(0xb9d5ff, 0.5);
        const directional = new THREE.DirectionalLight(0xb9d5ff, 0.5);
        directional.position.set(4, 5, -2);

        env.scene.add(ambient);
        env.scene.add(directional);
    }
}

export default Lights;
