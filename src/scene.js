function createScene(engine){
    const scene = new BABYLON.Scene(engine, true);
    const camera = createCamera(scene);
    camera.speed = 0.5;
    createLights(scene);

    enableGravity(scene, camera);
    enableCollisions(scene, camera);
    createMuseum(30, 30, scene);

    return scene;
}

function createLights(scene) {
    const light0 = new BABYLON.HemisphericLight("Hemi0", new BABYLON.Vector3(0, 1, 0), scene);
    light0.diffuse = new BABYLON.Color3(1, 1, 1);
    light0.specular = new BABYLON.Color3(1, 1, 1);

    new BABYLON.DirectionalLight("Dir0", new BABYLON.Vector3(0, 1, 0), scene);
}

function enableGravity(scene, camera) {
    scene.gravity = new BABYLON.Vector3(0, -0.25, 0);
    camera.applyGravity = true;
}

function enableCollisions(scene, camera) {
    scene.collisionsEnabled = true;
    scene.workerCollisions = true;
    camera.ellipsoid = new BABYLON.Vector3(0.8, 0.8, 0.8);
    camera.checkCollisions = true;
}

