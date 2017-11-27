"use strict";

class Guide {
    constructor(path, position, params, scene) {
        this.name = "Guide";
        this.scene = scene;
        this.path = path;
        this.size = params.size || 0.8;
        this.position = position.clone();
        this.height = this.position.y;
        this.createMesh(scene);
        this.mover = new Mover(
            this.position,
            params,
        );
        this.pathIndex = 0;
        this.state = new CalmState(this);
    }

    createMesh(scene) {
        this.sphere = new BABYLON.Mesh.CreateSphere(
            this.name,
            10,
            this.size,
            scene
        );
        this.sphere.material = new BABYLON.StandardMaterial(this.name + "_material", this.scene);
        this.sphere.material.diffuseColor = new BABYLON.Color3(0.5, 0.5, 0.5);
        this.sphere.position = this.position;
    }

    set color(color) {
        this.sphere.material.diffuseColor = color;
    }

    update(mover) {
        if (this.state) {
            this.state.step(mover);
        }
    }

    jump() {
        const animation = new BABYLON.Animation(
            "jump",
            "position.y",
            60,
            BABYLON.Animation.ANIMATIONTYPE_FLOAT,
            BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
        );
        const animationKeys = [
            {
                frame: 0,
                value: this.height
            },
            {
                frame: 30,
                value: this.height*2
            },
            {
                frame: 60,
                value: this.height
            }
        ];
        animation.setKeys(animationKeys);
        this.sphere.animations = [animation];
        this.scene.beginAnimation(this.sphere, 0, 60, true);
    }

    stopJump() {
        const animation = new BABYLON.Animation(
            "stop_jump",
            "position.y",
            60,
            BABYLON.Animation.ANIMATIONTYPE_FLOAT,
            BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
        );
        const animationKeys = [
            {
                frame: 0,
                value: this.position.y
            },
            {
                frame: 60,
                value: this.height
            }
        ];
        animation.setKeys(animationKeys);
        this.sphere.animations = [animation];
        this.scene.beginAnimation(this.sphere, 0, 60, false);
    }

    isClose(mover) {
        return mover.position.subtract(this.position).length() < 5;
    }
}
