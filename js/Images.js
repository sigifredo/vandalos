import * as THREE from 'three';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { resources } from './resources.js';

export class Images {
    constructor(env) {
        this.addBackground(env);
        this.addFloor(env);
        this.addPanels(env);
        this.addText(env);

        const domeGeometry = new THREE.SphereGeometry(60, 32, 16);
        const domeMaterial = new THREE.MeshStandardMaterial({
            color: 0xfffff0,
            side: THREE.DoubleSide,
            transparent: true,
            wireframe: true,
        });
        const dome = new THREE.Mesh(domeGeometry, domeMaterial);
        env.scene.add(dome);

        if (env.gui) {
            const domeGroup = env.gui.addFolder('Dome material');
            domeGroup.addColor(domeMaterial, 'color');
            domeGroup.add(domeMaterial, 'metalness').min(0).max(1).step(0.0001);
            domeGroup.add(domeMaterial, 'roughness').min(0).max(1);
            domeGroup.add(domeMaterial, 'wireframe');
            domeGroup.add(domeMaterial, 'wireframeLinewidth').min(1).max(10).step(0.01);
            domeGroup.add(domeMaterial, 'opacity').min(0).max(1).step(0.01);
        }
    }

    addBackground(env) {
        // objects
        const color = new THREE.Color();
        color.setHSL(Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75, THREE.SRGBColorSpace);

        const boxGeometry = new THREE.BoxGeometry(20, 20, 20).toNonIndexed();
        const position = boxGeometry.attributes.position;
        const colorsBox = [];

        for (let i = 0, l = position.count; i < l; i++) {
            color.setHSL(Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75, THREE.SRGBColorSpace);
            colorsBox.push(color.r, color.g, color.b);
        }

        boxGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colorsBox, 3));
        const origin = new THREE.Vector3(0, 0, 0);

        for (let i = 0; i < 500; i++) {
            const boxMaterial = new THREE.MeshPhongMaterial({
                specular: 0xffffff,
                flatShading: true,
                vertexColors: true,
            });
            boxMaterial.color.setHSL(Math.random() * 0.2 + 0.5, 0.75, Math.random() * 0.25 + 0.75, THREE.SRGBColorSpace);

            const box = new THREE.Mesh(boxGeometry, boxMaterial);

            const newPosition = new THREE.Vector3();

            do {
                newPosition.x = Math.floor(Math.random() * 20 - 10) * 20;
                newPosition.y = Math.floor(Math.random() * 20) * 20 + 10;
                newPosition.z = Math.floor(Math.random() * 20 - 10) * 20;
            } while (newPosition.distanceTo(origin) < 60.0);

            box.position.copy(newPosition);

            env.scene.add(box);
        }
    }

    addFloor(env) {
        const floorGeometry = new THREE.CircleGeometry(15, 29);
        const floorMaterial = new THREE.MeshStandardMaterial({
            color: 0xc5ae8e,
            side: THREE.DoubleSide,
            // wireframe: true
        });

        const floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.rotation.x = Math.PI * 0.5;
        floor.position.y = 0;

        env.scene.add(floor);

        if (env.gui) {
            const floorGroup = env.gui.addFolder('Floor material');
            floorGroup.addColor(floorMaterial, 'color');
            floorGroup.add(floorMaterial, 'metalness').min(0).max(1).step(0.0001);
            floorGroup.add(floorMaterial, 'roughness').min(0).max(1);
            floorGroup.add(floorMaterial, 'wireframe');
        }
    }

    addPanels(env) {
        const N_PANELS = 29;
        let angleStep = (Math.PI * 2.0) / N_PANELS;

        const material = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            // wireframe: true
        });
        material.metalness = 0.2;
        material.roughness = 0.5;

        for (let i = 0; i < N_PANELS; i++) {
            const theta = i * angleStep;
            const geometry = new THREE.BoxGeometry(1, 2, 0.3);
            const panel = new THREE.Mesh(geometry, material);

            const lightPosition = new THREE.Vector3();

            let x = 15.5 * Math.cos(theta);
            let z = 15.5 * Math.sin(theta);

            lightPosition.x = 14.5 * Math.cos(theta);
            lightPosition.y = 0.2;
            lightPosition.z = 14.5 * Math.sin(theta);

            panel.rotation.y = Math.PI * 0.5 - theta;
            panel.position.x = x;
            panel.position.y = 1.1;
            panel.position.z = z;

            env.scene.add(panel, this._getPointLight(lightPosition.x, lightPosition.y, lightPosition.z));
        }

        if (env.gui) {
            const panelGroup = env.gui.addFolder('Panel material');
            panelGroup.addColor(material, 'color');
            panelGroup.add(material, 'metalness').min(0).max(1).step(0.0001);
            panelGroup.add(material, 'roughness').min(0).max(1);
            panelGroup.add(material, 'wireframe');
        }
    }

    addText(env) {
        const fontLoader = new FontLoader();

        fontLoader.load('/assets/fonts/Roboto_Regular.json', font => {
            const textGeometry = new TextGeometry('Vándalos', {
                font: font,
                size: 1,
                height: 0.4,
            });

            textGeometry.computeBoundingBox();
            textGeometry.translate(-textGeometry.boundingBox.max.x * 0.5, textGeometry.boundingBox.max.y * 0.2, -textGeometry.boundingBox.max.z * 0.5);

            const textMesh = new THREE.Mesh(textGeometry, new THREE.MeshBasicMaterial({ color: 0x4a342e }));
            env.scene.add(textMesh, this._getPointLight(0, 1, 0));
        });
    }

    _getPointLight(x, y, z) {
        const light = new THREE.PointLight(0xff7d46, 0.7, 3);
        light.position.set(x, y, z);

        return light;
    }

    update() {}

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
