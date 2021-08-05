'use strict';

import { resources } from "./resources.js";
import * as THREE from '/build/three.module.js';

import { FirstPersonControls } from '/build/jsm/controls/FirstPersonControls.js';
import { CSS3DRenderer, CSS3DObject } from '/build/jsm/renderers/CSS3DRenderer.js';

let camera, scene, rendererGl, rendererCSS;
let controls;
const clock = new THREE.Clock();

init();
animate();
render();

function addMWEventListener() {
    let mwindow = document.getElementById('mdlwd');

    if (mwindow) {
        mwindow.addEventListener('hidden.bs.modal', function (event) {
            controls.enabled = true;
            let image = document.querySelector('#info img');
            let videoContainer = document.querySelector('#info .video-container');

            image.style.display = 'none';
            videoContainer.style.display = 'none';
        });
    }
}

function createCSSRandomObject(element) {
    const objectCSS = new CSS3DObject(element);

    objectCSS.position.x = Math.random() * 4000 - 2000;
    objectCSS.position.y = Math.random() * 4000 - 2000;
    objectCSS.position.z = Math.random() * 4000 - 2000;

    return objectCSS;
}

function createImage(resource) {
    const element = document.createElement('img');
    element.className = 'element';
    element.setAttribute('src', resource.path);
    element.setAttribute('rs-type', resource.type);
    element.onclick = selectElement;

    return createCSSRandomObject(element);
}

function createLine(point, material) {
    const points = [];
    points.push( new THREE.Vector3(0, 0, 0));
    points.push(point);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    return new THREE.Line(geometry, material);
}

function createOrigin(origin) {
    const point = document.createElement('div');
    point.className = 'origin';
    const object = new CSS3DObject(point);
    object.position.copy(origin);

    return object;
}

function createYTVideo(resource) {
    const element = document.createElement('img');
    element.className = 'element';
    element.setAttribute('src', 'https://img.youtube.com/vi/' + resource.path + '/hqdefault.jpg');
    element.setAttribute('rs-type', resource.type);
    element.setAttribute('rs-path', resource.path);
    element.onclick = selectElement;

    return createCSSRandomObject(element);
}

function init() {
    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 3000;
    const material = new THREE.LineBasicMaterial({ color: 0x808080 });

    scene = new THREE.Scene();

    scene.add(createOrigin(new THREE.Vector3(0, 0, 0)));

    // resources
    resources.forEach(resource => {
        if (resource.type == 'img') {
            let objectCSS = createImage(resource);
            scene.add(createLine(objectCSS.position, material));
            scene.add(objectCSS);
        } else if (resource.type == 'yt') {
            let objectCSS = createYTVideo(resource);
            scene.add(createLine(objectCSS.position, material));
            scene.add(objectCSS);
        }
    });

    rendererGl = new THREE.WebGLRenderer({ alpha: true });
    rendererGl.setClearColor(0x000000, 0);
    rendererGl.setPixelRatio(window.devicePixelRatio);
    rendererGl.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(rendererGl.domElement);

    rendererCSS = new CSS3DRenderer();
    rendererCSS.setSize(window.innerWidth, window.innerHeight);
    rendererCSS.domElement.style.position = 'absolute';
    rendererCSS.domElement.style.top = 0;
    document.body.appendChild(rendererCSS.domElement);

    document.getElementById('container').appendChild(rendererCSS.domElement);

    controls = new FirstPersonControls(camera, rendererCSS.domElement);
    controls.movementSpeed = 400;
    controls.lookSpeed = 0.1;

    window.addEventListener('resize', onWindowResize);
    addMWEventListener();
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    controls.handleResize();
    render();
}

function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {
    controls.update( clock.getDelta() );
    rendererCSS.render(scene, camera);
    rendererGl.render(scene, camera);
}

function selectElement(ev) {
    controls.enabled = false;
    let type = ev.target.getAttribute('rs-type');

    if (type == 'img') {
        selectImage(ev);
    } else if (type == 'yt') {
        selectYTVideo(ev);
    }
}

function selectImage(ev) {
    controls.enabled = false;
    let image = document.querySelector('#info img');

    if (image != null && ev.target.currentSrc != '') {
        let myModalEl = document.querySelector('#mdlwd');
        let modal = bootstrap.Modal.getOrCreateInstance(myModalEl);

        image.style.display = 'block';
        image.setAttribute('src', ev.target.currentSrc);

        modal.show();
    } else {
        console.error('No es posible mostrar la imagen');
        controls.enabled = true;
    }
}

function selectYTVideo(ev) {
    controls.enabled = false;
    let videoContainer = document.querySelector('#info .video-container');

    if (videoContainer != null) {
        let iframe = document.querySelector('#info .video-container iframe');
        let myModalEl = document.querySelector('#mdlwd');
        let modal = bootstrap.Modal.getOrCreateInstance(myModalEl);
        let path = ev.target.getAttribute('rs-path');

        videoContainer.style.display = 'block';
        iframe.setAttribute('src', 'https://www.youtube.com/embed/' + path);

        modal.show();
    } else {
        console.error('No es posible mostrar la imagen');
        controls.enabled = true;
    }
}