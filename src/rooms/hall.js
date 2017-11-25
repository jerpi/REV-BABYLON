"use strict";


class Hall {

    constructor(params, scene, camera, mover) {
        this.name = params.name || "Hall";
        this.width = params.width;
        this.depth = params.depth;
        this.height = params.height;
        this.position = params.position;

        this.createWalls(scene);
        this.createFloor(scene);
        this.createCeiling(scene);
        this.createStaircase(scene);
        this.createLift(scene, camera);
        this.createAttractingSphere(scene, mover);
    }

    createWalls(scene) {
        const wall1Params = {
            name: this.name + "_wall1",
            width: this.width,
            height: this.height,
            thickness: WALL_THICKNESS,
            position: new BABYLON.Vector3(0, 0, this.depth/2).addInPlace(this.position),
            texture: 'assets/textures/redWood.jpg'
        };
        const wall2Params = {
            name: this.name + "2",
            width: this.depth,
            height: this.height,
            thickness: WALL_THICKNESS,
            position: new BABYLON.Vector3(-this.width/2, 0, 0).addInPlace(this.position),
            rotation: new BABYLON.Vector3(0, Math.PI/2, 0),
            texture: 'assets/textures/redWood.jpg'
        };
        const wall3Params = {
            name: this.name + "_wall3",
            width: this.depth,
            height: this.height,
            thickness: WALL_THICKNESS,
            position: new BABYLON.Vector3(this.width/2, 0, 0).addInPlace(this.position),
            rotation: new BABYLON.Vector3(0, Math.PI/2, 0),
            texture: 'assets/textures/redWood.jpg'
        };

        const wall1 = Wall.create(wall1Params, scene);
        const wall2 = Wall.create(wall2Params, scene);
        const wall3 = Wall.create(wall3Params, scene);
        this.walls = {
            wall1,
            wall2,
            wall3
        };
    }

    createFloor(scene) {
        const params = {
            name: this.name + "_floor",
            width: this.width,
            depth: this.depth,
            position: this.position.clone(),
            texture: 'assets/textures/marbre.jpg'
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
            texture: 'assets/textures/marbre.jpg'
        };
        this.ceiling = Ground.create(params, scene);
    }

    createStaircase(scene) {
        const position = new BABYLON.Vector3(
            -(this.width*1/3)/2,
            0,
            -this.depth/2 // + epaisseur mur
        );

        position.addInPlace(this.position);
        const params = {
            width: 3,
            height: this.height/2,
            depth: 5,
            position
        };
        this.staircase = new Staircase(params, scene);
    }

    createLift(scene, camera) {
        const size = 3;
        const position = new BABYLON.Vector3(
            (this.width*1/3)/2,
            0,
            -(this.depth-size)/2 + WALL_THICKNESS/2// + epaisseur mur
        );
        position.addInPlace(this.position);

        const params = {
            size,
            height: this.height/2,
            position
        };
        this.lift = new Lift(params, scene, camera);
    }

    createAttractingSphere(scene, mover) {
        this.attractingSphere = new AttractingSphere(this.position.clone(), scene, mover);
    }
}