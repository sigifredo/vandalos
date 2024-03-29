import * as THREE from 'three';
import * as dat from 'lil-gui';

export function initEnvironment() {
    const env = {
        camera: null,
        canvas: null,
        renderer: null,
        scene: null,
        gui: null,
        textureLoader: null,
    };
    const debug = isDebugging();
    env.canvas = document.querySelector('canvas.webgl');
    const canvasSize = {
        height: window.innerHeight,
        width: window.innerWidth,
    };

    env.lights = areLightsActive();
    env.scene = new THREE.Scene();
    env.scene.fog = new THREE.Fog(0xffffff, 0, 750);

    env.camera = new THREE.PerspectiveCamera(75, canvasSize.width / canvasSize.height);
    env.scene.add(env.camera);

    env.renderer = new THREE.WebGLRenderer({
        canvas: env.canvas,
        alpha: true,
    });
    env.renderer.setClearColor(0x000000, 0);
    env.renderer.setSize(canvasSize.width, canvasSize.height);
    env.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    env.renderer.render(env.scene, env.camera);

    env.textureLoader = new THREE.TextureLoader();

    if (debug) {
        env.scene.add(new THREE.AxesHelper());
        env.gui = new dat.GUI();
    }

    return env;
}

export function initListeners(env) {
    window.addEventListener('resize', () => {
        env.canvas.height = window.innerHeight;
        env.canvas.width = window.innerWidth;

        env.camera.aspect = env.canvas.width / env.canvas.height;
        env.camera.updateProjectionMatrix();

        env.renderer.setSize(env.canvas.width, env.canvas.height);
        env.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });
    window.addEventListener('dblclick', () => {
        const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement;

        if (fullscreenElement) {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        } else {
            if (env.canvas.requestFullscreen) {
                env.canvas.requestFullscreen();
            } else if (env.canvas.webkitRequestFullscreen) {
                env.canvas.webkitRequestFullscreen();
            }
        }
    });
}

function isDebugging() {
    const debug = new URLSearchParams(window.location.search).get('debug');
    return debug != null && debug === 'true';
}

function areLightsActive() {
    let lights = new URLSearchParams(window.location.search).get('lights');

    if (lights !== null) {
        return lights.toLowerCase() === 'true';
    } else {
        return false;
    }
}

export default initEnvironment;
