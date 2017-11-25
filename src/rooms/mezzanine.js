"use strict";

class Mezzanine {

    constructor(params, scene) {
        this.name = params.name || "Mezzanine";
        this.width = params.width;
        this.depth = params.depth;
        this.height = params.height;
        this.position = params.position;
        this.position.y += 0.001;

        this.createWalls(scene);
        this.createFloor(scene);
        this.createCeiling(scene);
        this.createSculptures(scene);
    }

    createWalls(scene) {
        const wall1Params = {
            name: this.name + "_wall1",
            width: this.width,
            height: this.height,
            thickness: WALL_THICKNESS,
            position: new BABYLON.Vector3(0, 0, -this.depth/2 + WALL_THICKNESS/4).addInPlace(this.position),
            texture: 'assets/textures/dante.jpg'
        };
        const wall2Params = {
            name: this.name + "_wall2",
            width: this.depth,
            height: this.height,
            thickness: WALL_THICKNESS,
            position: new BABYLON.Vector3(-this.width/2 + WALL_THICKNESS/4, 0, 0).addInPlace(this.position),
            rotation: new BABYLON.Vector3(0, Math.PI/2, 0),
            texture: 'assets/textures/dante.jpg'
        };
        const wall3Params = {
            name: this.name + "_wall3",
            width: this.depth,
            height: this.height,
            thickness: WALL_THICKNESS,
            position: new BABYLON.Vector3(this.width/2 - WALL_THICKNESS/4, 0, 0).addInPlace(this.position),
            rotation: new BABYLON.Vector3(0, Math.PI/2, 0),
            texture: 'assets/textures/dante.jpg'
        };

        const wall1 = Wall.create(wall1Params, scene);
        const wall2 = Wall.create(wall2Params, scene);
        const wall3 = Wall.create(wall3Params, scene);
        this.walls = [
            wall1,
            wall2,
            wall3,
        ];
    }

    createFloor(scene) {
        const params = {
            name: this.name + "_floor",
            width: this.width,
            depth: this.depth,
            position: this.position.clone(),
            texture: 'assets/textures/acajou.png'
        };
        this.floor = Ground.create(params, scene);
    }

    createCeiling(scene) {
        const params = {
            name: this.name + "_ceiling",
            width: this.width,
            depth: this.depth,
            position: new BABYLON.Vector3(0, this.height, 0).addInPlace(this.position),
            rotation: new BABYLON.Vector3(Math.PI, 0, 0),
            texture: 'assets/textures/acajou.png'
        };
        this.ceiling = Ground.create(params, scene);
    }

    createSculptures(scene) {
        createSculptures(this.width, this.position, scene);
    }
}