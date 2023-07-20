

import * as THREE from 'three';
import { resources } from './resources.js';
import { CSS3DRenderer, CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

export class Images {
    constructor(env) {

        let galleryMaterial = new THREE.MeshBasicMaterial({color: 0xc5ae8e, side: THREE.DoubleSide});
        let galleries = new Array();

        galleries.push(this.createGallery(10, 10, galleryMaterial));
        galleries.push(this.createGallery(10, 3, galleryMaterial));
        galleries.push(this.createGallery(3, 10, galleryMaterial));
        galleries.push(this.createGallery(10, 3, galleryMaterial));

        galleries[1].position.x = 10;
        galleries[2].position.z = 10;
        galleries[3].position.x = -10;

        galleries.forEach(g => {
            env.scene.add(g);
        });
    }

    createGallery(width, height, galleryMaterial) {
        let gallery = new THREE.Mesh(
            new THREE.PlaneGeometry(width, height),
            galleryMaterial
        );

        gallery.rotation.x = Math.PI * 0.5;
        gallery.position.y = 0;

        return gallery;
    }

    update() {
    }

    /*
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
    */
}

export default Images;
