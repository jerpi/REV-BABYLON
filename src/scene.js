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
        this.camera = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(5, 1.5, 5), this.scene);
        this.camera.speed = 0.5;
        this.mover = new Mover(this.camera.position, {});
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

        this.obstacles = [
            this.museum.hall.staircase,
            this.museum.hall.lift,
        ];
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
                    if (room.door.isClose(this.mover) || room.door.isClose(this.guide.mover)) {
                        room.door.open();
                    } else {
                        room.door.close();
                    }
                }
                if (!found) {
                    Painting.hideNameAuthor();
                }

                const target = this.mover.target || {};
                if (this.mover.applySteeringForce(target.position) === 1) {
                    this.mover.resetAttraction();
                    this.startLookAtAnimation(target.rotation);
                }
                this.mover.update();
                this.guide.update(this.mover);
            }
        );
        this.scene.actionManager = new BABYLON.ActionManager(this.scene);
        this.scene.actionManager.registerAction(action);
    }

    createGuide() {
        const position = this.museum.hall.position.clone();
        position.y = 0.75;
        const path = [{position}];
        for (let room of this.museum.rooms) {
            path.push(
                {position: room.door.position.add(new BABYLON.Vector3(0, 0, 5))},
                {position: room.door.position},                                         // door
                ...room.paintings.map(painting => ({                                    // each painting
                    position: painting.view.position,
                    rotation: painting.view.rotation,
                    watch: true,
                })),
                {position: room.door.position},                                         // door again
                {position: room.door.position.add(new BABYLON.Vector3(0, 0, 5))},
                {position}                                                              // back to beginning
            );
        }
        this.guide = new Guide(path, position, {}, this.scene);
    }

    startLookAtAnimation(target) {
        if (!target) {
            return;
        }
        const animation = new BABYLON.Animation(
            "lookAt",
            "rotation",
            60,
            BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
            BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
        );
        const animationKeys = [
            {
                frame: 0,
                value: this.camera.rotation
            },
            {
                frame: 60,
                value: target
            },
        ];
        animation.setKeys(animationKeys);
        this.camera.animations = [animation];
        this.scene.beginAnimation(this.camera, 0, 60, false);
    }

}