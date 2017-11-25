"use strict";

class Staircase {
    constructor(params, scene) {
        if (!params.nbSteps) { params.nbSteps = 10; }

        const material = new BABYLON.StandardMaterial('step_material', scene);
        material.diffuseTexture = new BABYLON.Texture('assets/texture/stairs.jpg', scene);
        const step = {
            width: params.width,
            height: params.height/params.nbSteps,
            depth: params.depth/params.nbSteps,
            position : new BABYLON.Vector3(0, params.height, 0).addInPlace(params.position),
            material
        };

        this.steps = [];
        for (let i = 0; i <= params.nbSteps; i++) {
            step.position = step.position.add(
                new BABYLON.Vector3(0, -step.height, step.depth)
            );
            this.steps[i] = new Step('step' + i, step, scene);
        }
    }
}

class Step {
    constructor(name, step, scene) {
        const scaling = new BABYLON.Vector3(
            1,
            step.height/step.width,
            step.depth/step.width,
        );
        this.step = new BABYLON.Mesh.CreateBox(name, step.width, scene);
        this.step.scaling = scaling;
        this.step.position = step.position;
        this.step.position.y += step.height/step.width / 2;
        this.step.material = step.material;
        this.step.checkCollisions = true;
    }
}
