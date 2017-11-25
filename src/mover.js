"use strict";

/**
 * First apply all forces with calls to applyForce(force : BABLYON.Vector3),
 * then call update()
 * @param initialPosition Initial position of the object
 * @param _mass Mass of the object
 * @param _dt time step
 * @constructor
 */

class Mover {

    constructor(position, mass, dt) {
        this.position = position || new BABYLON.Vector3.Zero();
        this.speed = new BABYLON.Vector3.Zero();
        this.acceleration = new BABYLON.Vector3.Zero();
        this.mass = mass || 1;
        this.dt = dt || 1;
    }

    applyForce(force) {
        let keys = ["x", "y", "z"];
        for (let key in keys) {
            this.acceleration[key] += force[key] / this.mass;
        }
    }

    updateSpeed() {
        let keys = ["x", "y", "z"];
        for (let key in keys) {
            this.speed[key] += this.acceleration[key] * this.dt;
        }
    }

    updatePosition() {
        let keys = ["x", "y", "z"];
        for (let key in keys) {
            this.position[key] += this.speed[key] * this.dt;
        }
    }

    update() {
        this.updateSpeed();
        this.updatePosition();
        this.acceleration = new BABYLON.Vector3.Zero();
    }
}