"use strict";

class Room {

    constructor(params, scene, mover) {
        this.name = params.name || "Room";
        this.width = params.width;
        this.depth = params.depth;
        this.height = params.height;
        this.position = params.position || new BABYLON.Vector3.Zero();
        this.lights = [];

        this.createDoor(scene);
        this.createWalls(scene, params.textures.wall);
        this.createFloor(scene, params.textures.floor);
        this.createCeiling(scene, params.textures.ceiling);
        this.createPaintings(scene, params.paintings, mover);
        this.createBenchs(scene);
    }

    createWalls(scene, texture) {
        const smallWallsWidth = (this.width - this.door.width)/2;

        const wall1Params = {
            name: this.name + "_wall1",
            width: this.width,
            height: this.height,
            thickness: WALL_THICKNESS,
            position: new BABYLON.Vector3(0, 0, -this.depth/2 + WALL_THICKNESS/4).addInPlace(this.position),
            texture
        };
        const wall2aParams = {
            name: this.name + "_wall2a",
            width: smallWallsWidth,
            height: this.height,
            thickness: WALL_THICKNESS,
            position: new BABYLON.Vector3(-(smallWallsWidth + this.door.width)/2, 0, this.depth/2).addInPlace(this.position),
            texture
        };
        const wall2bParams = {
            name: this.name + "_wall2b",
            width: smallWallsWidth,
            height: this.height,
            thickness: WALL_THICKNESS,
            position: new BABYLON.Vector3((smallWallsWidth+this.door.width)/2, 0, this.depth/2).addInPlace(this.position),
            texture
        };
        const wall2cParams = {
            name: this.name + "_wall2c",
            width: this.door.width,
            height: this.height - this.door.height,
            thickness: WALL_THICKNESS,
            position: new BABYLON.Vector3(0, this.door.height, this.depth/2).addInPlace(this.position),
            texture
        };
        const wall3Params = {
            name: this.name + "_wall3",
            width: this.depth,
            height: this.height,
            thickness: WALL_THICKNESS,
            position: new BABYLON.Vector3(-this.width/2 + WALL_THICKNESS/4, 0, 0).addInPlace(this.position),
            rotation: new BABYLON.Vector3(0, Math.PI/2, 0),
            texture
        };
        const wall4Params = {
            name: this.name + "_wall4",
            width: this.depth,
            height: this.height,
            thickness: WALL_THICKNESS,
            position: new BABYLON.Vector3(this.width/2 - WALL_THICKNESS/4, 0, 0).addInPlace(this.position),
            rotation: new BABYLON.Vector3(0, Math.PI/2, 0),
            texture
        };

        const wall1 = Wall.create(wall1Params, scene);
        const wall2a = Wall.create(wall2aParams, scene);
        const wall2b = Wall.create(wall2bParams, scene);
        const wall2c = Wall.create(wall2cParams, scene);
        const wall3 = Wall.create(wall3Params, scene);
        const wall4 = Wall.create(wall4Params, scene);
        this.walls = [
            wall1,
            wall2a,
            wall2b,
            wall2c,
            wall3,
            wall4,
        ];
    }

    createFloor(scene, texture) {
        const params = {
            name: this.name + "_floor",
            width: this.width,
            depth: this.depth,
            position: this.position.clone(),
            texture: texture
        };
        this.floor = Ground.create(params, scene);
    }

    createCeiling(scene, texture) {
        const params = {
            name: this.name + "_ceiling",
            width: this.width,
            depth: this.depth,
            position: new BABYLON.Vector3(0, this.height, 0).addInPlace(this.position),
            rotation: new BABYLON.Vector3(Math.PI, 0, 0),
            texture: texture
        };
        this.ceiling = Ground.create(params, scene);
    }

    createPaintings(scene, paintings, mover) {
        const positions = [
            new BABYLON.Vector3(-this.width/2 + WALL_THICKNESS, this.height/2, this.depth/4)
                .addInPlace(this.position),
            new BABYLON.Vector3(-this.width/2 + WALL_THICKNESS, this.height/2, 0)
                .addInPlace(this.position),
            new BABYLON.Vector3(-this.width/2 + WALL_THICKNESS, this.height/2, -this.depth/4)
                .addInPlace(this.position),
            new BABYLON.Vector3(-this.width/4, this.height/2, -this.depth/2 + WALL_THICKNESS)
                .addInPlace(this.position),
            new BABYLON.Vector3(this.width/4, this.height/2, -this.depth/2 + WALL_THICKNESS)
                .addInPlace(this.position),
            new BABYLON.Vector3(-(-this.width/2 + WALL_THICKNESS), this.height/2, -this.depth/4)
                .addInPlace(this.position),
            new BABYLON.Vector3(-(-this.width/2 + WALL_THICKNESS), this.height/2, 0)
                .addInPlace(this.position),
            new BABYLON.Vector3(-(-this.width/2 + WALL_THICKNESS), this.height/2, this.depth/4)
                .addInPlace(this.position),
        ];
        const rotations = [
            new BABYLON.Vector3(0, -Math.PI/2, 0),
            new BABYLON.Vector3(0, -Math.PI/2, 0),
            new BABYLON.Vector3(0, -Math.PI/2, 0),
            new BABYLON.Vector3(0, 0, Math.PI),
            new BABYLON.Vector3(0, 0, Math.PI),
            new BABYLON.Vector3(0, Math.PI/2, 0),
            new BABYLON.Vector3(0, Math.PI/2, 0),
            new BABYLON.Vector3(0, Math.PI/2, 0),
        ];

        this.paintings = [];
        for (let i = 0; i < 8; i++) {
            let params = {
                name: paintings[i].name,
                position: positions[i],
                rotation: rotations[i],
                height: this.height * 0.75,
                painting: paintings[i]
            };
            this.paintings[i] = new Painting(params, scene, mover);
            if (i === 2 || i === 5) {
                this.createLight(params, scene);
            }
        }
    }

    enableLights(enable) {
        for (let light of this.lights) {
            light.setEnabled(enable);
        }
    }

    createLight(params, scene) {
        const position = new BABYLON.Vector3.Zero().addInPlace(params.position);
        const direction = new BABYLON.Vector3.Zero();
        switch (params.rotation.y) {
            case Math.PI:
            case -Math.PI:
                direction.z = 1;
                position.z -= 5;
                break;
            case Math.PI/2:
                direction.x = -1;
                position.x -= 5;
                break;
            case -Math.PI/2:
                direction.x = 1;
                position.x += 5;
                break;
            default:
                direction.z = -1;
                position.z += 5;
        }

        const light = new BABYLON.SpotLight(params.name + "_spot", position, direction, 0.7, 10, scene);
        light.ambientColor = new BABYLON.Color3(1, 1, 1);
        light.setEnabled(false);
        this.lights.push(light);
    }

    createBenchs(scene) {
        this.benchs = [
            new Bench({
                name: this.name + "_bench" + 1,
                width: 2,
                position: new BABYLON.Vector3(this.width/2 - 2, 0.25, this.depth/4).addInPlace(this.position),
                rotation: new BABYLON.Vector3(0, Math.PI/2, 0),
                texture: "assets/textures/paves.png"
            }, scene),
            new Bench({
                name: this.name + "_bench" + 2,
                width: 2,
                position: new BABYLON.Vector3(-this.width/2 + 2, 0.25, -this.depth/4).addInPlace(this.position),
                rotation: new BABYLON.Vector3(0, Math.PI/2, 0),
                texture: "assets/textures/paves.png"
            }, scene)
        ];
    }

    createDoor(scene) {
        const position = new BABYLON.Vector3(0, 0, this.depth/2).addInPlace(this.position);
        const params = {
            name: this.name + "_door",
            width: 2,
            height: 2,
            position
        };
        this.door = new Door(params, scene);
    }

    isInRoom(camera) {
        return camera.position.y > this.position.y
            && camera.position.y < this.position.y + this.height
            && camera.position.x < this.position.x + this.width/2
            && camera.position.x > this.position.x - this.width/2
            && camera.position.z < this.position.z + this.depth/2
            && camera.position.z > this.position.z - this.depth/2;
    }
}