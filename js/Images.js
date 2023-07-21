

import * as THREE from 'three';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { resources } from './resources.js';

export class Images {
    constructor(env) {
        this.addFloor(env);
        this.addPanels(env);
        this.addText(env);
    }

    addFloor(env) {
        const galleryGeometry = new THREE.CircleGeometry(15, 29);
        const galleryMaterial = new THREE.MeshBasicMaterial({
            color: 0xc5ae8e,
            side: THREE.DoubleSide,
            wireframe: true
        });

        const gallery = new THREE.Mesh(galleryGeometry, galleryMaterial);
        gallery.rotation.x = Math.PI * 0.5;
        gallery.position.y = 0;

        env.scene.add(gallery);
    }

    addPanels(env) {
    }

    addText(env) {
        const fontLoader = new FontLoader();

        fontLoader.load(
            '/assets/fonts/Roboto_Regular.json',
            (font) =>
            {
                const textGeometry = new TextGeometry(
                    'Vándalos',
                    {
                        font: font,
                        size: 1,
                        height: 0.4
                    }
                );

                textGeometry.computeBoundingBox();
                textGeometry.translate(
                    -textGeometry.boundingBox.max.x * 0.5,
                    textGeometry.boundingBox.max.y * 0.2,
                    -textGeometry.boundingBox.max.z * 0.5
                )

                const textMesh = new THREE.Mesh(
                    textGeometry,
                    new THREE.MeshBasicMaterial({color: 0x4a342e})
                );
                env.scene.add(textMesh);
            }
        )
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
