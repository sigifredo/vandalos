

import * as THREE from 'three';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';

export class Controls {
    constructor(env) {
		const scope = this;
		scope.moveBackward = false;
		scope.moveLeft = false;
		scope.moveRight = false;
		scope.canJump = false;
		scope.controls = new PointerLockControls(env.camera, document.body);

		const instructions = document.getElementById('instructions');
		instructions.addEventListener('click', () => {
			scope.controls.lock();
		});

		scope.controls.addEventListener('lock', () => {
			instructions.style.display = 'none';
		});

		scope.controls.addEventListener('unlock', () => {
			instructions.style.display = 'flex';
		});

		env.scene.add(scope.controls.getObject());

		const onKeyDown = function(event) {

			switch(event.code) {

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

		}

		const onKeyUp = function(event) {

			switch(event.code) {

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
}

export default Controls;
