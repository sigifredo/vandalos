import * as THREE from 'three';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { vandalsImages } from './VandalsImages.js';

export class Geometry {
    constructor(env) {
        this.env = env;

        this.addBackground();
        this.addFloor();
        this.addPanels();
        this.addText();

        if (env.gui) {
            const domeGeometry = new THREE.SphereGeometry(60, 32, 16);
            const domeMaterial = new THREE.MeshStandardMaterial({
                color: 0xfffff0,
                side: THREE.DoubleSide,
                transparent: true,
                wireframe: true,
            });
            const dome = new THREE.Mesh(domeGeometry, domeMaterial);
            env.scene.add(dome);

            const domeGroup = env.gui.addFolder('Dome material');
            domeGroup.addColor(domeMaterial, 'color');
            domeGroup.add(domeMaterial, 'metalness').min(0).max(1).step(0.0001);
            domeGroup.add(domeMaterial, 'roughness').min(0).max(1);
            domeGroup.add(domeMaterial, 'wireframe');
            domeGroup.add(domeMaterial, 'wireframeLinewidth').min(1).max(10).step(0.01);
            domeGroup.add(domeMaterial, 'opacity').min(0).max(1).step(0.01);
        }
    }

    addBackground() {
        // objects
        const color = new THREE.Color();
        color.setHSL(Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75, THREE.SRGBColorSpace);

        // const boxGeometry = new THREE.BoxGeometry(20, 20, 20).toNonIndexed();
        const boxGeometry = new THREE.BoxGeometry(10, 20, 3).toNonIndexed();
        const position = boxGeometry.attributes.position;
        const colorsBox = [];

        for (let i = 0, l = position.count; i < l; i++) {
            color.setHSL(Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75, THREE.SRGBColorSpace);
            colorsBox.push(color.r, color.g, color.b);
        }

        boxGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colorsBox, 3));
        const origin = new THREE.Vector3(0, 0, 0);

        for (let i = 0; i < 400; i++) {
            const boxMaterial = new THREE.MeshPhongMaterial({
                specular: 0xffffff,
                flatShading: true,
                vertexColors: true,
            });
            boxMaterial.color.setHSL(Math.random() * 0.2 + 0.5, 0.75, Math.random() * 0.25 + 0.75, THREE.SRGBColorSpace);

            const box = new THREE.Mesh(boxGeometry, boxMaterial);
            box.rotation.y = Math.random() * Math.PI * 2.0;

            const newPosition = new THREE.Vector3();

            do {
                newPosition.x = Math.floor(Math.random() * 20 - 10) * 20;
                newPosition.y = Math.floor(Math.random() * 20) * 20 + 10;
                newPosition.z = Math.floor(Math.random() * 20 - 10) * 20;
            } while (newPosition.distanceTo(origin) < 60.0);

            box.position.copy(newPosition);

            this.env.scene.add(box);
        }
    }

    addFloor() {
        const floorGeometry = new THREE.CircleGeometry(15, 29);
        const floorMaterial = new THREE.MeshStandardMaterial({
            color: 0xc5ae8e,
            side: THREE.DoubleSide,
        });

        const floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.rotation.x = Math.PI * 0.5;
        floor.position.y = 0;

        this.env.scene.add(floor);

        if (this.env.gui) {
            const floorGroup = this.env.gui.addFolder('Floor material');
            floorGroup.addColor(floorMaterial, 'color');
            floorGroup.add(floorMaterial, 'metalness').min(0).max(1).step(0.0001);
            floorGroup.add(floorMaterial, 'roughness').min(0).max(1);
            floorGroup.add(floorMaterial, 'wireframe');
        }
    }

    addPanels() {
        let angleStep = (Math.PI * 2.0) / vandalsImages.length;

        const material = new THREE.MeshStandardMaterial({
            color: 0xffffff,
        });
        material.metalness = 0.2;
        material.roughness = 0.5;

        vandalsImages.forEach((vandalImage, index) => {
            const theta = index * angleStep;
            const panel = this._createPanel(vandalImage, material);
            let x = 15.5 * Math.cos(theta);
            let z = 15.5 * Math.sin(theta);

            panel.rotation.y = -(Math.PI * 0.5 + theta);
            panel.position.x = x;
            panel.position.y = 1.1;
            panel.position.z = z;

            this.env.scene.add(panel);
        });

        if (this.env.gui) {
            const panelGroup = this.env.gui.addFolder('Panel material');
            panelGroup.addColor(material, 'color');
            panelGroup.add(material, 'metalness').min(0).max(1).step(0.0001);
            panelGroup.add(material, 'roughness').min(0).max(1);
            panelGroup.add(material, 'wireframe');
        }
    }

    _createPanel(vandalImage, material) {
        const group = new THREE.Group();

        const panelGeometry = new THREE.BoxGeometry(1, 2, 0.3);
        const panel = new THREE.Mesh(panelGeometry, material);

        this.env.textureLoader.load('./assets/vandals/' + vandalImage, texture => {
            const ar = texture.image.width / texture.image.height;
            const width = 1.2;
            const height = width / ar;

            const imageMaterial = new THREE.MeshBasicMaterial({ map: texture });
            const imageGeometry = new THREE.PlaneGeometry(width, height);
            const imagePlane = new THREE.Mesh(imageGeometry, imageMaterial);

            imagePlane.position.z = 0.25;

            group.add(imagePlane);
        });

        const lightPosition = new THREE.Vector3();

        lightPosition.y = -0.9;
        lightPosition.z = 1.1;

        group.add(panel);

        if (this.env.lights) {
            group.add(this._getPointLight(lightPosition.x, lightPosition.y, lightPosition.z, 0.7, 3));
        }

        return group;
    }

    addText() {
        const fontLoader = new FontLoader();
        const scope = this;

        fontLoader.load('./assets/fonts/Roboto_Regular.json', font => {
            const textGeometry = new TextGeometry('Vándalos', {
                font: font,
                size: 1,
                height: 0.4,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 5,
            });

            scope.env.textureLoader.load('./assets/matcap.jpg', texture => {
                const textMesh = new THREE.Mesh(textGeometry, new THREE.MeshMatcapMaterial({ matcap: texture }));

                textGeometry.center();
                textMesh.position.y = 0.7;

                this.env.scene.add(textMesh);

                if (this.env.lights) {
                    this.env.scene.add(this._getPointLight(0, 1, 0, 1, 7));
                }
            });
        });
    }

    _getPointLight(x, y, z, intensity, distance) {
        const light = new THREE.PointLight(0xff7d46, intensity, distance);
        light.position.set(x, y, z);

        return light;
    }
}

export default Geometry;
