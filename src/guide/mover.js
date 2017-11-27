"use strict";

class Mover {
    constructor(position, params) {
        this.position = position;
        this.speed = new BABYLON.Vector3.Zero();
        this.acceleration = new BABYLON.Vector3.Zero();
        this.mass = params.mass || 1;
        this.dt = params.dt || 1/60;
        this.maxVelocity = 2;
    };

    applyForce(force) {
        let keys = ["x", "y", "z"];
        for (let key of keys) {
            this.acceleration[key] += force[key] / this.mass;
        }
    }

    updateSpeed() {
        let keys = ["x", "y", "z"];
        for (let key of keys) {
            this.speed[key] += this.acceleration[key] * this.dt;
        }
    }

    updatePosition() {
        let keys = ["x", "y", "z"];
        for (let key of keys) {
            this.position[key] += this.speed[key] * this.dt;
        }
    }

    update() {
        this.updateSpeed();
        this.updatePosition();
        this.acceleration = new BABYLON.Vector3.Zero();
    }

    calculateSteeringForce(targetPosition, obstacles) {
        const distance =  targetPosition.subtract(this.position);
        const length = distance.length();

        if (length < 0.01) {
            return;
        }

        const velocity = distance
            .normalize()
            .scale(Math.min(length/2, this.maxVelocity));

        if (obstacles) {
            for (let obstacle of obstacles) {

            }
        }


        return velocity.subtract(this.speed);
    }

    applySteeringForce(targetPosition) {
        if (!targetPosition) {
            return;
        }
        const steering = this.calculateSteeringForce(targetPosition);
        if (steering) {
            this.applyForce(steering);
        } else {
            return 1;
        }
    }

    resetAttraction() {
        this.target = undefined;
        this.speed = new BABYLON.Vector3.Zero();
    }

}