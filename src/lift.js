function createLift(liftPosition, scene, material) {

    const position   = new BABYLON.Vector3(0, 0, 0);
    position.addInPlace(liftPosition);

    const scalingY = 0.1;

    const lift = new BABYLON.Mesh.CreateBox("lift", Steps.width, scene);
    lift.scaling.y = scalingY;
    lift.material = material;
    lift.position = position;
    lift.checkCollisions = true;

    const animation = new BABYLON.Animation(
        "up-and-down",
        "position.y",
        60,
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
    );

    const keys = [
        {
            frame: 0,
            value: -Steps.width*scalingY
        },
        {
            frame: 120,
            value: Walls.height*1.2
        },
        {
            frame: 240,
            value: -Steps.width*scalingY
        }
    ];
    animation.setKeys(keys);
    lift.animations = [animation];
    scene.beginAnimation(lift, 0, 240, true);
}