"use strict";

class Guide {
    constructor(params, scene) {

        this.name = params.name || "Guide";
        this.segments = params.segments || 10;
        this.size = params.size || 2;
        this.color = params.color || new BABYLON.Color3(0.5, 0.5, 0.5);

        this.position = new BABYLON.Vector3(0, this.size/2, 0)
            .addInPlace(params.position || new BABYLON.Vector3.Zero());

        this.createMesh(scene);
        this.mover = new Mover(
            this.position,
            params,
        );
    }

    createMesh(scene) {
        this.sphere = new BABYLON.Mesh.CreateSphere(
            this.name,
            this.segments,
            this.size,
            scene
        );
        this.sphere.material = new BABYLON.StandardMaterial(this.name + "_material", scene);
        this.sphere.material.diffuseColor = this.color;
        this.sphere.position = this.position;
    }

    update() {

    }
}
