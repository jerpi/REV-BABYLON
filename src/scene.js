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
        this.createGuide();
    }

    createCamera() {
        this.camera = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(0, 2, 5), this.scene);
        this.camera.speed = 0.5;
        this.mover = new Mover(this.camera.position, 1, 1/60);
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
            this.mover,
        );
    }

    createTriggers() {
        const action = new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnEveryFrameTrigger,
            (event) => {
                let found = false;
                for (let room of this.museum.rooms) {
                    room.enableLights(room.isInRoom(this.camera));
                    if (!found) {
                        for (let painting of room.paintings) {
                            if (painting.isClose(this.camera)) {
                                painting.displayNameAuthor();
                                found = true;
                                break;
                            }
                        }
                    }
                    if (room.door.isClose(this.camera)) {
                        room.door.open();
                    } else {
                        room.door.close();
                    }
                }
                if (!found) {
                    Painting.hideNameAuthor();
                }

                this.mover.applySteeringForce(this.mover.target);
                this.mover.update();
                this.guide.update();
            }
        );

        this.scene.actionManager = new BABYLON.ActionManager(this.scene);
        this.scene.actionManager.registerAction(action);
    }

    createGuide() {
        const params = {
            mass: 1,
            dt: 1/60,
            position: this.museum.hall.position.clone(),
        };
        this.guide = new Guide(params, this.scene);
    }

}