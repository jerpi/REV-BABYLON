"use strict";

class Lift {

    constructor(params, scene, camera) {
        this.name = params.name || "Lift";
        this.position = params.position.clone();
        this.size = params.size;
        this.scalingY = 0.1;
        this.thickness = this.size * this.scalingY;
        this.height = params.height;

        this.createLift(scene);
        this.createCage(scene);
        this.createButton(scene, camera);
    }

    createLift(scene) {
        this.lift = new BABYLON.Mesh.CreateBox(this.name + "_lift", this.size - WALL_THICKNESS/2, scene);
        this.lift.scaling.y = this.scalingY;
        this.lift.material = new BABYLON.StandardMaterial('step_material', scene);
        this.lift.material.diffuseTexture = new BABYLON.Texture('assets/textures/dante.jpg', scene);
        this.lift.position = this.position;
        this.lift.checkCollisions = true;
    }

    createCage(scene) {
        const wall1Params = {
            name: this.name + "_wall1",
            width: this.size - WALL_THICKNESS,
            height: this.height,
            thickness: WALL_THICKNESS/2,
            position: new BABYLON.Vector3(0, 0, -this.size/2 + WALL_THICKNESS/4).addInPlace(this.position),
            texture: 'assets/textures/wood.jpg'
        };
        const wall2Params = {
            name: this.name + "_wall2",
            width: this.size,
            height: this.height *2,
            thickness: WALL_THICKNESS/2,
            position: new BABYLON.Vector3(-this.size/2 + WALL_THICKNESS/4, 0, 0).addInPlace(this.position),
            rotation: new BABYLON.Vector3(0, Math.PI/2, 0),
            texture: 'assets/textures/dante.jpg'
        };
        const wall3Params = {
            name: this.name + "_wall3",
            width: this.size,
            height: this.height *2,
            thickness: WALL_THICKNESS/2,
            position: new BABYLON.Vector3(this.size/2 - WALL_THICKNESS/4, 0, 0).addInPlace(this.position),
            rotation: new BABYLON.Vector3(0, Math.PI/2, 0),
            texture: 'assets/textures/dante.jpg'
        };

        const wall1 = Wall.create(wall1Params, scene);
        const wall2 = Wall.create(wall2Params, scene);
        const wall3 = Wall.create(wall3Params, scene);
        this.cage = [
            wall1,
            wall2,
            wall3,
        ];
    }


    createButton(scene, camera) {
        this.button = BABYLON.MeshBuilder.CreateCylinder(
            this.name + "_button",
            {
                height: 0.05,
                diameterTop: 0.1,
                diameterBottom: 0.1
            },
            scene
        );
        this.button.material = new BABYLON.StandardMaterial(this.name + "button_material", scene);
        this.button.material.diffuseColor = new BABYLON.Color3(1, 0, 0);
        this.button.position = new BABYLON.Vector3(this.size/2 - WALL_THICKNESS/2, this.height/2, 0).addInPlace(this.position);
        this.button.rotation.z = Math.PI/2;

        this.registerActions(scene, camera);
    }

    registerActions(scene, camera) {
        const upAction = new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnPickTrigger,
            (event) => {
                if (this.isInLift(camera)) {
                    this.startUpAnimation(scene);
                }
            }
        );
        const downAction = new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnPickTrigger,
            (event) => {
                if (this.isInLift(camera)) {
                    this.startDownAnimation(scene);
                }
            }
        );
        this.button.actionManager = new BABYLON.ActionManager(scene);
        this.button.actionManager
            .registerAction(upAction)
            .then(downAction);
    }

    startUpAnimation(scene) {
        for (let animated of [this.lift, this.button]) {
            const animation = new BABYLON.Animation(
                "up",
                "position.y",
                60,
                BABYLON.Animation.ANIMATIONTYPE_FLOAT,
                BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
            );
            const animationKeys = [
                {
                    frame: 0,
                    value: animated.position.y
                },
                {
                    frame: 120,
                    value: animated === this.button ? this.height*3/2 : this.height
                },
            ];
            animation.setKeys(animationKeys);
            animated.animations = [animation];
            scene.beginAnimation(animated, 0, 120, false);
        }
    }

    startDownAnimation(scene) {
        for (let animated of [this.lift, this.button]) {
            const animation = new BABYLON.Animation(
                "up",
                "position.y",
                60,
                BABYLON.Animation.ANIMATIONTYPE_FLOAT,
                BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
            );
            const animationKeys = [
                {
                    frame: 0,
                    value: animated.position.y
                },
                {
                    frame: 120,
                    value: (animated === this.button ? this.height / 2 : 0)
                },
            ];
            animation.setKeys(animationKeys);
            animated.animations = [animation];
            scene.beginAnimation(animated, 0, 120, false);
        }
    }

    isInLift(camera) {
        return camera.position.y > this.lift.position.y
            && camera.position.x < this.lift.position.x + this.size/2
            && camera.position.x > this.lift.position.x - this.size/2
            && camera.position.z < this.lift.position.z + this.size/2
            && camera.position.z > this.lift.position.z - this.size/2;
    }
}
