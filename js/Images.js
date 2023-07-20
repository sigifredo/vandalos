

import * as THREE from 'three';
import { resources } from './resources.js';
import { CSS3DRenderer, CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js';

export class Images {
    constructor(env) {
        const material = new THREE.LineBasicMaterial({ color: 0x808080 });

        resources.forEach(resource => {
            if (resource.type == 'img') {
                let objectCSS = this.createImage(resource);
                env.scene.add(this.createLine(objectCSS.position, material));
                env.scene.add(objectCSS);
            } else if (resource.type == 'yt') {
                // let objectCSS = createYTVideo(resource);
                // scene.add(this.createLine(objectCSS.position, material));
                // scene.add(objectCSS);
            }
        });
    }

    update() {
    }

    createImage(image) {
        const imgElement = document.createElement('img');
        imgElement.className = 'element';
        imgElement.setAttribute('src', image.path);
        imgElement.setAttribute('data-type', image.type);
        imgElement.onclick = (ev) => {
            // controls.enabled = false;
            let type = ev.target.getAttribute('data-type');
        
            if (type === 'img') {
                console.log('image selected');
                // selectImage(ev);
            } else if (type === 'yt') {
                console.log('video selected');
                // selectYTVideo(ev);
            }
        };
    
        return this.createCSSRandomObject(imgElement);
    }

    createLine(point, material) {
        const points = [];
        points.push( new THREE.Vector3(0, 0, 0));
        points.push(point);
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
    
        return new THREE.Line(geometry, material);
    }

    createCSSRandomObject(element) {
        const objectCSS = new CSS3DObject(element);
    
        objectCSS.position.x = Math.random() * 4000 - 2000;
        objectCSS.position.y = Math.random() * 4000 - 2000;
        objectCSS.position.z = Math.random() * 4000 - 2000;
    
        return objectCSS;
    }
}

export default Images;
