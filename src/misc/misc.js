class Bench {
    constructor(params, scene) {
        const bench = new BABYLON.Mesh.CreateBox(params.name, params.width, scene);
        bench.position = params.position;
        bench.rotation = params.rotation;
        bench.material = new BABYLON.StandardMaterial(params.name + "_material", scene);
        bench.material.diffuseTexture = new BABYLON.Texture(params.texture, scene);
        bench.scaling.y = 0.5/params.width;
        bench.scaling.z = 0.5;
        bench.checkCollisions = true;
    }
}

class Sign {
    //TODO
    constructor() {

    }
}

function createAllSigns(totalWidth, depth, position, scene) {

    const pos1 = position.add(new BABYLON.Vector3(-totalWidth/3, 0.5, 0));
    const pos2 = position.add(new BABYLON.Vector3(0, 0.5, 0));
    const pos3 = position.add(new BABYLON.Vector3(totalWidth/3, 0.5, 0));

    const rotation1 = new BABYLON.Vector3(Math.PI, Math.PI, 0);
    const rotation2 = new BABYLON.Vector3(Math.PI, Math.PI, 0);
    const rotation3 = new BABYLON.Vector3(Math.PI, Math.PI, 0);

    createSign("A-G", pos1, rotation1, scene);
    createSign("H-M", pos2, rotation2, scene);
    createSign("M-R", pos3, rotation3, scene);
}

function createSign(text, position, rotation, scene) {
    const material = new BABYLON.StandardMaterial("material_sign"+text, scene);
    material.diffuseTexture = new BABYLON.DynamicTexture("dynamic+text", 520, scene);
    material.diffuseTexture.drawText(text, 150, 300, "100px Segoe UI", "#000000", "#ffffff");

    const sign = new BABYLON.Mesh.CreateBox("sign"+text, 1.5, scene);
    sign.position = position;
    sign.rotation = rotation;
    sign.material = material;
    sign.scaling.y = 0.5;
    sign.scaling.z = 0.01;
}

class AttractingSphere {

    constructor(position, scene, mover) {
        this.segments = 10;
        this.size = 1;
        this.position = new BABYLON.Vector3(0, 1.5, 0).addInPlace(position);
        this.createSphere(scene);
        this.registerAction(scene, mover);

        this.view = {
            position: this.position
        }
    }

    createSphere(scene) {
        this.sphere = new BABYLON.Mesh.CreateSphere(
            "sculpture_attracting_sphere",
            this.segments,
            this.size,
            scene
        );
        this.sphere.material = new BABYLON.StandardMaterial("attracting_sphere_material", scene);
        this.sphere.position = this.position;
        this.sphere.visibility = 0.5;
        //      this.sphere.material.diffuseTexture = new BABYLON.Texture("assets/textures/glassWindow.jpg", scene);
        this.sphere.material.ambientColor = new BABYLON.Color3(0.5, 0.5, 0.5);
    }

    registerAction(scene, mover) {
        const action = new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnPickTrigger,
            (event) => {
                if (mover.target === this.view) {
                    mover.resetAttraction();
                } else {
                    mover.target = this.view;
                }
            }
        );
        this.sphere.actionManager = new BABYLON.ActionManager(scene);
        this.sphere.actionManager.registerAction(action);
    }
}