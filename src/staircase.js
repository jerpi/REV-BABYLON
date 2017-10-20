const Steps = {
    width: 5,
    depth: 0.5
};

function createStaircase(height, position, scene, nbSteps) {

    if (!nbSteps) { nbSteps = 10; }
    const stepHeight = height/nbSteps;

    const stepMaterial = new BABYLON.StandardMaterial('step_material', scene);
    stepMaterial.diffuseTexture = new BABYLON.Texture('assets/textures/stairs.jpg', scene);

    var stepPosition = new BABYLON.Vector3(0, height, 0);
    stepPosition.addInPlace(position);
    const rotation = 0;
    for (var i = 0; i <= nbSteps; i++) {
        const step = createStaircaseStep('step' + i, Steps.width, stepHeight, Steps.depth, stepPosition, rotation, scene, stepMaterial);
        stepPosition = stepPosition.add(new BABYLON.Vector3(0, -stepHeight, Steps.depth));
    }
}

function createStaircaseStep(name, width, height, depth, position, rotation, scene, material) {
    const scaling = new BABYLON.Vector3(1, height/width, depth/width);
    const localTranslation = new BABYLON.Vector3(Steps.width/2, 0, 0);

    const box = new BABYLON.Mesh.CreateBox(name, width, scene);
    box.scaling = scaling;
    box.position = position;
    box.material = material;
    box.rotation.y = rotation;
    box.checkCollisions = true;
    box.locallyTranslate(localTranslation);

    return box;
}