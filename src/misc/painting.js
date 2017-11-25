
class Painting {
    constructor(params, scene, mover) {
        this.position = params.position;
        this.rotation = params.rotation;
        this.painting = params.painting;
        this.mesh = new BABYLON.Mesh.CreateBox(params.name, params.height, scene);
        this.mesh.scaling.z = 0.01;
        this.mesh.position = params.position || this.mesh.position;
        this.mesh.rotation = params.rotation || this.mesh.rotation;
        this.mesh.material = new BABYLON.StandardMaterial('step_material', scene);
        this.mesh.material.diffuseTexture = new BABYLON.Texture(params.painting.src, scene);
        this.mesh.material.diffuseTexture.uScale = 1;
        this.mesh.material.diffuseTexture.vScale = 1;

        this.attachTriggers(scene, mover);
    }

    attachTriggers(scene, mover) {
        this.mesh.actionManager = new BABYLON.ActionManager(scene);
        this.attachClickedTrigger(mover);
        this.attachViewedTrigger(scene);
    }

    attachClickedTrigger(mover) {
        const attractAction = new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnPickTrigger,
            (event) => {
                // todo register force somewhere
                console.log("Force registered");
            }
        );
        const resetAction = new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnPickTrigger,
            (event) => {
                // todo un-register force
                console.log("Force unregistered");
            }
        );
        this.mesh.actionManager
            .registerAction(attractAction)
            .then(resetAction);
    }

    attachViewedTrigger(scene) {
        const showAction = new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnPointerOverTrigger,
            (event) => {
                this.displayDescription(scene);
            }
        );
        const hideAction = new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnPointerOutTrigger,
            (event) => {
                this.hideDescription(scene);
            }
        );
        this.mesh.actionManager.registerAction(showAction);
        this.mesh.actionManager.registerAction(hideAction);
    }

    displayNameAuthor(scene) {
        console.log(this.painting.name, this.painting.artist);
    }

    hideNameAuthor(scene) {

    }

    displayDescription(scene) {
        console.log(this.painting.description);
    }

    hideDescription(scene) {

    }

    isClose(camera) {
        // TODO returns a boolean when the camera is close

    }
}