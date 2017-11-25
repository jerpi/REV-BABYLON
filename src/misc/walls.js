"use strict";

const WALL_THICKNESS = 0.5;

class Wall {
    static create(params, scene) {
        const wall = new BABYLON.Mesh.CreateBox(params.name, params.width, scene);
        wall.scaling = new BABYLON.Vector3(1, params.height/params.width, params.thickness/params.width);
        wall.position = params.position || wall.position;
        wall.position.y += params.height/2;
        wall.rotation = params.rotation || wall.rotation;
        wall.material = new BABYLON.StandardMaterial(params.name + "_material", scene);
        wall.material.diffuseTexture = new BABYLON.Texture(params.texture, scene);
        wall.checkCollisions = params.checkCollisions !== false;
        return wall;
    }
}

class Ground {
    static create(params, scene) {
        const ground = new BABYLON.Mesh.CreateGround(params.name, params.width, params.depth, 2, scene);
        ground.position = params.position || ground.position;
        ground.rotation = params.rotation || ground.rotation;
        ground.material = new BABYLON.StandardMaterial(params.name + '_material', scene);
        ground.material.diffuseTexture = new BABYLON.Texture(params.texture, scene);
        ground.checkCollisions = params.checkCollisions !== false;
        return ground;
    }
}

class Door {
    constructor(params, scene) {
        this.width = params.width;
        this.height = params.height;
        this.depth = params.depth;

        this.mesh = new BABYLON.Mesh.CreateBox(params.name, this.width, this.depth, 2, scene);
        this.position = this.mesh.position = params.position || this.mesh.position;
        this.mesh.position.y += params.width/2;
        this.position = this.mesh.position.clone();
        this.mesh.scaling.z = 0.05;
        this.mesh.rotation = params.rotation || this.mesh.rotation;
        this.scene = scene;
    }

    open() {

        if (this.isOpened) { return; }

        const animation = new BABYLON.Animation(
            "open",
            "position.x",
            60,
            BABYLON.Animation.ANIMATIONTYPE_FLOAT,
            BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
        );
        const animationKeys = [
            {
                frame: 0,
                value: this.mesh.position.x
            },
            {
                frame: 60,
                value: this.width + this.position.x + 0.001
            },
        ];
        animation.setKeys(animationKeys);
        this.mesh.animations = [animation];
        this.scene.beginAnimation(this.mesh, 0, 60, false);
        this.isOpened = true;
    }

    close() {
        if (!this.isOpened) { return; }

        const animation = new BABYLON.Animation(
            "open",
            "position.x",
            60,
            BABYLON.Animation.ANIMATIONTYPE_FLOAT,
            BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
        );
        const animationKeys = [
            {
                frame: 0,
                value: this.mesh.position.x
            },
            {
                frame: 60,
                value: this.position.x
            },
        ];
        animation.setKeys(animationKeys);
        this.mesh.animations = [animation];
        this.scene.beginAnimation(this.mesh, 0, 60, false);
        this.isOpened = false;
    }

    isClose(camera) {
        return Math.sqrt(
            (camera.position.x - this.position.x)**2
            + (camera.position.y - this.position.y)**2
            + (camera.position.z - this.position.z)**2
        ) < 6;
    }
}