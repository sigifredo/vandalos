

import * as THREE from 'three';

class FirstPersonControls {
    constructor(camera, domElement) {
        let scope = this;

		this.domElement = domElement;
        scope.MouseMoveSensitivity = 0.002;
        scope.speed = 800.0;
        scope.height = 30.0;
        scope.jumpHeight = scope.height + 350.0;
        scope.click = false;

		scope.enabled = true;
        let moveForward = false;
        let moveBackward = false;
        let moveLeft = false;
        let moveRight = false;
        let canJump = false;
        let run = false;

        let velocity = new THREE.Vector3();
        let direction = new THREE.Vector3();

        let prevTime = performance.now();

        camera.rotation.set(0, 0, 0);

        let pitchObject = new THREE.Object3D();
        pitchObject.add(camera);

        let yawObject = new THREE.Object3D();
        yawObject.position.y = 10;
        yawObject.add(pitchObject);

        const PI_2 = Math.PI / 2;

        let onMouseMove = function (event) {
            if (scope.enabled === true) {
				let movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
				let movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

				yawObject.rotation.y -= movementX * scope.MouseMoveSensitivity;
				pitchObject.rotation.x -= movementY * scope.MouseMoveSensitivity;

				pitchObject.rotation.x = Math.max(-PI_2, Math.min(PI_2, pitchObject.rotation.x));
			}
        };

        let onKeyDown = function (event) {
            if (scope.enabled === true) {
				switch (event.key.toLowerCase()) {
					case 'arrowup': // up
					case 'w': // w
						moveForward = true;
						break;

					case 'arrowleft': // left
					case 'a': // a
						moveLeft = true;
						break;

					case 'arrowdown': // down
					case 's': // s
						moveBackward = true;
						break;

					case 'arrowright': // right
					case 'd': // d
						moveRight = true;
						break;

					case ' ': // space
						if (canJump === true) {
							if (run === false) {
								velocity.y += scope.jumpHeight;
							} else {
								velocity.y += scope.jumpHeight + 50
							}
						}
						canJump = false;
						break;

					case 'shift': // shift
						run = true;
						break;
				}
			}
        }.bind(this);

        var onKeyUp = function (event) {
            if (scope.enabled === true) {
				switch (event.key.toLowerCase()) {
					case 'arrowup': // up
					case 'w':
						moveForward = false;
						break;

					case 'arrowleft': // left
					case 'a':
						moveLeft = false;
						break;

					case 'arrowdown': // down
					case 's':
						moveBackward = false;
						break;

					case 'arrowright': // right
					case 'd':
						moveRight = false;
						break;

					case 'shift': // shift
						run = false;
						break;
				}
			}
        }.bind(this);

        var onMouseDownClick = function (event) {
            if (scope.enabled === true) {
				scope.click = true;
			}
        }.bind(this);

        var onMouseUpClick = function (event) {
            if (scope.enabled === true) {
				scope.click = false;
			}
        }.bind(this);

        scope.dispose = function () {
            document.removeEventListener('mousemove', onMouseMove, false);
            document.removeEventListener('keydown', onKeyDown, false);
            document.removeEventListener('keyup', onKeyUp, false);
            document.removeEventListener('mousedown', onMouseDownClick, false);
            document.removeEventListener('mouseup', onMouseUpClick, false);
        };

        document.addEventListener('mousemove', onMouseMove, false);
        document.addEventListener('keydown', onKeyDown, false);
        document.addEventListener('keyup', onKeyUp, false);
        document.addEventListener('mousedown', onMouseDownClick, false);
        document.addEventListener('mouseup', onMouseUpClick, false);

        scope.getObject = function () {
            return yawObject;
        };

        scope.update = function () {
            let time = performance.now();
            let delta = (time - prevTime) / 1000;
			let currentSpeed = scope.speed;

            velocity.y -= 9.8 * 100.0 * delta;
            velocity.x -= velocity.x * 10.0 * delta;
            velocity.z -= velocity.z * 10.0 * delta;

            direction.z = Number(moveForward) - Number(moveBackward);
            direction.x = Number(moveRight) - Number(moveLeft);
            direction.normalize();

            if (run && (moveForward || moveBackward || moveLeft || moveRight)) {
				currentSpeed = currentSpeed + currentSpeed * 1.1;
			}
            if (moveForward || moveBackward) {
				velocity.z -= direction.z * currentSpeed * delta;
			}
            if (moveLeft || moveRight) {
				velocity.x -= direction.x * currentSpeed * delta;
			}

            scope.getObject().translateX(-velocity.x * delta);
            scope.getObject().translateZ(velocity.z * delta);

            scope.getObject().position.y += velocity.y * delta;

            if (scope.getObject().position.y < scope.height) {
                velocity.y = 0;
                scope.getObject().position.y = scope.height;

                canJump = true;
            }
            prevTime = time;
        };
    }
}

export { FirstPersonControls };