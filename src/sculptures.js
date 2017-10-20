const Pedestals = {
    height: 1,
    width: 0.5
};



function createSculptures(roomWidth, initialPosition, scene) {
    createSculpturePedestal(initialPosition, 'sphere', scene);
    const leftSculpturePosition = initialPosition.add(new BABYLON.Vector3(roomWidth/4, 0, 0));
    createSculpturePedestal(leftSculpturePosition, 'torus', scene);
    const rightSculpturePosition = initialPosition.add(new BABYLON.Vector3(-roomWidth/4, 0, 0));
    createSculpturePedestal(rightSculpturePosition, 'knot', scene);

    createSculptureSphere(initialPosition, scene);
    createSculptureTorus(leftSculpturePosition, scene);
    createSculptureTorusKnot(rightSculpturePosition, scene);
}

function createSculpturePedestal(position, name, scene, material) {

    const pos = new BABYLON.Vector3(0, Pedestals.height/2, 0);
    pos.addInPlace(position);

    const pedestal = new BABYLON.Mesh.CreateBox("pedestal_" + name, Pedestals.width, scene);
    pedestal.scaling.y = 2;
    pedestal.position = pos;
    pedestal.material = material;
    pedestal.checkCollisions = true;
    return pedestal;
}

function createSculptureSphere(position, scene) {

    const Sphere = {
        segments: 10,
        size: 1.0
    };

    const sculpture = new BABYLON.Mesh.CreateSphere(
        "sculpture_sphere",
        Sphere.segments,
        Sphere.size,
        scene
    );
    sculpture.material = new BABYLON.StandardMaterial("sculpture_torus_material", scene);
    sculpture.position = position.add(
        new BABYLON.Vector3(0,
            Pedestals.height + Sphere.size/2,
            0)
    );


    const animation = new BABYLON.Animation(
        "inflate-deflate",
        "scaling",
        60,
        BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
    );

    const keys = [
        {
            frame: 0,
            value: new BABYLON.Vector3(1, 1, 1)
        },
        {
            frame: 30,
            value: new BABYLON.Vector3(0.2, 0.2, 0.2)
        },
        {
            frame: 60,
            value: new BABYLON.Vector3(1, 1, 1)
        }
    ];

    animation.setKeys(keys);
    sculpture.animations = [animation];
    scene.beginAnimation(sculpture, 0, 60, true);

    return sculpture;
}

function createSculptureTorusKnot(position, scene) {

    const Knot = {
        radius: 0.5,
        tube: 0.2,
        radialSegments: 128,
        tubularSegments: 64,
        p: 2,
        q: 3
    };

    const sculpture = new BABYLON.Mesh.CreateTorusKnot(
        "sculpture_knot",
        Knot.radius,
        Knot.tube,
        Knot.radialSegments,
        Knot.tubularSegments,
        Knot.p,
        Knot.q,
        scene
    );
    sculpture.material = new BABYLON.StandardMaterial("sculpture_torus_material", scene);
    sculpture.position = position.add(
        new BABYLON.Vector3(
            0,
            Pedestals.height + Knot.radius * 2,
            0
        )
    );

    const animation = new BABYLON.Animation(
        "rotate",
        "rotation.y",
        60,
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
    );

    const keys = [
        {
            frame: 0,
            value: 0
        },
        {
            frame: 30,
            value: Math.PI
        },
        {
            frame: 60,
            value: 2*Math.PI
        }
    ];

    animation.setKeys(keys);
    sculpture.animations = [animation];
    scene.beginAnimation(sculpture, 0, 60, true);

    return sculpture;
}

function createSculptureTorus(position, scene) {

    const Torus = {
        thickness: 0.3,
        diameter: 0.5,
        tesselation: 10
    };

    const sculpture = new BABYLON.Mesh.CreateTorus(
        "sculpture_torus",
        Torus.diameter,
        Torus.thickness,
        Torus.tesselation,
        scene
    );
    sculpture.material = new BABYLON.StandardMaterial("sculpture_torus_material", scene);
    sculpture.position = position.add(
        new BABYLON.Vector3(0,
            Pedestals.height + Torus.diameter,
            0
        )
    );

    const animation = new BABYLON.Animation(
        "rotateChaotic",
        "rotation",
        60,
        BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
    );

    const keys = [
        {
            frame: 0,
            value: new BABYLON.Vector3(0, 0, 0)
        },
        {
            frame: 30,
            value: new BABYLON.Vector3(0, Math.PI/2, Math.PI)
        },
        {
            frame: 60,
            value: new BABYLON.Vector3(Math.PI/2, Math.PI, 0)
        },
        {
            frame: 90,
            value: new BABYLON.Vector3(Math.PI, 0, 2*Math.PI)
        },
        {
            frame: 120,
            value: new BABYLON.Vector3(0, 0, Math.PI/2)
        },
        {
            frame: 150,
            value: new BABYLON.Vector3(2*Math.PI, 2*Math.PI, 0)
        }
    ];

    animation.setKeys(keys);
    sculpture.animations = [animation];
    scene.beginAnimation(sculpture, 0, 150, true);

    return sculpture;
}