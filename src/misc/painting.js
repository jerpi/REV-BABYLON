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

        this.computeViewPosition();
        this.attachTriggers(scene, mover);
    }

    attachTriggers(scene, mover) {
        this.mesh.actionManager = new BABYLON.ActionManager(scene);
        this.attachClickedTrigger(mover);
        this.attachViewedTrigger(mover);
    }

    attachClickedTrigger(mover) {
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
        this.mesh.actionManager.registerAction(action);
    }

    attachViewedTrigger(mover) {
        const showAction = new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnPointerOverTrigger,
            (event) => {
                if (this.isClose(mover)) {
                    this.displayDescription();
                }
                this.showDescription = true;
            }
        );
        const hideAction = new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnPointerOutTrigger,
            (event) => {
                this.hideDescription();
                this.showDescription = false;
            }
        );
        this.mesh.actionManager.registerAction(showAction);
        this.mesh.actionManager.registerAction(hideAction);
    }

    computeViewPosition() {
        const position = this.position.clone();
        const rotation = this.rotation.clone();
        switch(this.rotation.y) {
            case Math.Pi:
            case -Math.PI:
                position.z -= 2.5;
                break;
            case Math.PI/2:
                position.x -= 2.5;
                break;
            case -Math.PI/2:
                position.x += 2.5;
                break;
            default:
                position.z += 2.5;
                rotation.y += Math.PI;
        }

        this.view = {
            position,
            rotation
        }
    }

    displayNameAuthor() {
        const element = document.getElementById("painting");
        element.classList.remove("hide");
        const title = document.getElementById("title");
        if (!title.firstChild) {
            let text = document.createTextNode('');
            title.appendChild(text);
        }
        title.firstChild.nodeValue = this.painting.name;
        const artist = document.getElementById("artist");
        if (!artist.firstChild) {
            let text = document.createTextNode('');
            artist.appendChild(text);
        }
        artist.firstChild.nodeValue = this.painting.artist;
        if (this.showDescription) {
            this.displayDescription();
        } else {
            this.hideDescription();
        }
    }

    static hideNameAuthor() {
        const element = document.getElementById("painting");
        element.classList.add("hide");
        const title = document.getElementById("title");
        if (title.firstChild) {
            title.removeChild(title.firstChild);
        }
        const artist = document.getElementById("artist");
        if (artist.firstChild) {
            artist.removeChild(artist.firstChild);
        }
    }

    displayDescription() {
        const element = document.getElementById("description");
        if (!element.firstChild) {
            let text = document.createTextNode('');
            element.appendChild(text);
        }
        element.firstChild.nodeValue = this.painting.description;
    }

    hideDescription() {
        const element = document.getElementById("description");
        if (element.firstChild && element.firstChild.nodeValue === this.painting.description) {
            element.removeChild(element.firstChild);
        }
    }

    isClose(mover) {
        return this.view.position.subtract(mover.position).length() < 1.5;
    }
}