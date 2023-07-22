import * as THREE from 'three';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';

/**
 * Based on: https://threejs.org/examples/#misc_controls_pointerlock
 */
export class Controls {
    constructor(env) {
        const scope = this;

        this.canJump = false;
        this.direction = new THREE.Vector3();
        this.moveBackward = false;
        this.moveLeft = false;
        this.moveRight = false;
        this.pointerLockControls = new PointerLockControls(env.camera, document.body);
        this.pointerLockControls.getObject().position.y = 1.0;
        this.pointerLockControls.getObject().position.z = 5.0;
        this.velocity = new THREE.Vector3();

        const instructions = document.getElementById('instructions');
        instructions.addEventListener('click', () => {
            scope.pointerLockControls.lock();
        });

        scope.pointerLockControls.addEventListener('lock', () => {
            instructions.style.display = 'none';
        });

        scope.pointerLockControls.addEventListener('unlock', () => {
            instructions.style.display = 'flex';
        });

        env.scene.add(scope.pointerLockControls.getObject());

        const onKeyDown = function (event) {
            switch (event.code) {
                case 'ArrowUp':
                case 'KeyW':
                    scope.moveForward = true;
                    break;

                case 'ArrowLeft':
                case 'KeyA':
                    scope.moveLeft = true;
                    break;

                case 'ArrowDown':
                case 'KeyS':
                    scope.moveBackward = true;
                    break;

                case 'ArrowRight':
                case 'KeyD':
                    scope.moveRight = true;
                    break;

                case 'Space':
                    if (scope.canJump === true) {
                        velocity.y += 350;
                    }
                    scope.canJump = false;
                    break;
            }
        };

        const onKeyUp = function (event) {
            switch (event.code) {
                case 'ArrowUp':
                case 'KeyW':
                    scope.moveForward = false;
                    break;

                case 'ArrowLeft':
                case 'KeyA':
                    scope.moveLeft = false;
                    break;

                case 'ArrowDown':
                case 'KeyS':
                    scope.moveBackward = false;
                    break;

                case 'ArrowRight':
                case 'KeyD':
                    scope.moveRight = false;
                    break;
            }
        };

        document.addEventListener('keydown', onKeyDown);
        document.addEventListener('keyup', onKeyUp);
    }

    update(delta) {
        if (this.pointerLockControls.isLocked === true) {
            this.velocity.x -= this.velocity.x * 80.0 * delta;
            this.velocity.z -= this.velocity.z * 80.0 * delta;

            this.direction.z = Number(this.moveForward) - Number(this.moveBackward);
            this.direction.x = Number(this.moveRight) - Number(this.moveLeft);
            this.direction.normalize(); // this ensures consistent movements in all directions

            if (this.moveForward || this.moveBackward) {
                this.velocity.z -= this.direction.z * 400.0 * delta;
            }
            if (this.moveLeft || this.moveRight) {
                this.velocity.x -= this.direction.x * 400.0 * delta;
            }

            this.pointerLockControls.moveRight(-this.velocity.x * delta);
            this.pointerLockControls.moveForward(-this.velocity.z * delta);

            if (this.position() > 13.0) {
                this.pointerLockControls.moveRight(this.velocity.x * delta);
                this.pointerLockControls.moveForward(this.velocity.z * delta);
            }

            this.pointerLockControls.getObject().position.y += this.velocity.y * delta; // new behavior
        }
    }

    position() {
        return this.pointerLockControls.getObject().position.distanceTo(new THREE.Vector3(0, 1, 0));
    }
}

export default Controls;
