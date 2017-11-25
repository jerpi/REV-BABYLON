"use strict";

class Scene {

    constructor(engine) {
        this.scene = new BABYLON.Scene(engine, true);
        this.createCamera();
        this.createLights();
        this.enableGravity();
        this.enableCollisions();
        this.createMuseum();
        this.createTriggers();
    }

    createCamera() {
        this.camera = new BABYLON.FreeCamera("cam", new BABYLON.Vector3(2, 2, -5), this.scene);
        this.camera.speed = 0.5;
    }

    createLights() {
        const light0 = new BABYLON.HemisphericLight("Hemi0", new BABYLON.Vector3(0, 1, 0), this.scene);
        light0.diffuse = new BABYLON.Color3(1, 1, 1);
        light0.specular = new BABYLON.Color3(1, 1, 1);

        new BABYLON.DirectionalLight("Dir0", new BABYLON.Vector3(0, 1, 0), this.scene);
    }

    enableGravity() {
        this.scene.gravity = new BABYLON.Vector3(0, -0.25, 0);
        this.camera.applyGravity = true;
    }

    enableCollisions() {
        this.scene.collisionsEnabled = true;
        this.scene.workerCollisions = true;
        this.camera.ellipsoid = new BABYLON.Vector3(0.6, 0.9, 0.6);
        this.camera.checkCollisions = true;
    }

    createMuseum() {
        const params = {
            width: 30,
            depth: 30,
            height: 6
        };
        this.museum = new Museum(
            params,
            this.scene,
            this.camera,
        );
    }

    createTriggers() {
        const action = new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnEveryFrameTrigger,
            (event) => {
                for (let room of this.museum.rooms) {
                    room.enableLights(room.isInRoom(this.camera));

                    for (let painting of room.paintings) {
                        if (painting.isClose(this.camera)) {
                            painting.displayNameAuthor(scene);
                        }
                    }

                    if (room.door.isClose(this.camera)) {
                        room.door.open();
                    } else {
                        room.door.close();
                    }
                }
            }
        );

        this.scene.actionManager = new BABYLON.ActionManager(this.scene);
        this.scene.actionManager.registerAction(action);
    }

}