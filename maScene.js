const Walls = {
    thickness: 0.5,
    height: 3
};

const Doors = {
    thickness: 0.2,
    height: 2.2,
    width: 2.0
};

const Steps = {
    width: 5,
    depth: 0.5
};

const Pedestals = {
    height: 1,
    width: 0.5
};

function createScene(engine){

    const scene = new BABYLON.Scene(engine, true);
    const camera = createCamera(scene);
    camera.speed = 0.5;
    createLights(scene);

    enableGravity(scene, camera);
    enableCollisions(scene, camera);
    createGroundFloor(30, 30, scene);

    return scene;
}

function createLights(scene) {
    const light0 = new BABYLON.HemisphericLight("Hemi0", new BABYLON.Vector3(0, 1, 0), scene);
    light0.diffuse = new BABYLON.Color3(1, 1, 1);
    light0.specular = new BABYLON.Color3(1, 1, 1);

    new BABYLON.DirectionalLight("Dir0", new BABYLON.Vector3(0, 1, 0), scene);
}

function createGroundFloor(width, depth, scene) {

    const hallPosition = new BABYLON.Vector3(0, 0, depth/4);
    createHall(width, depth/2, hallPosition, scene);

    const roomsPosition = new BABYLON.Vector3(0, 0, -depth/4);
    createRooms(width, depth/2, roomsPosition, scene);
    createAllPaintings(width, depth/2, roomsPosition, scene);
    createAllBenchs(width, depth/2, roomsPosition, scene);
    createAllSigns(width, depth/2, roomsPosition, scene);

    const mezzaninePosition = new BABYLON.Vector3(0, Walls.height, -depth/4);
    createMezzanine(width, depth/2, mezzaninePosition, scene);

    const staircasePosition = new BABYLON.Vector3(-Steps.width*3/2, 0, Steps.depth/2);
    createStaircase(Walls.height, staircasePosition, scene);

    const liftPosition = new BABYLON.Vector3(Steps.width, 0, Steps.width/2);
    createLift(liftPosition, scene);
}

function createWall(name, width, height, thickness, position, scene, material) {
  position.y += height/2;
  const box = new BABYLON.Mesh.CreateBox(name, width, scene);
  box.scaling = new BABYLON.Vector3(1, height/width, thickness/width);
  box.position = position;
  box.material = material;
  box.checkCollisions = true;
  return box;
}

function createFloor(name, width, depth, scene, material) {
  const ground = new BABYLON.Mesh.CreateGround(name, width, depth, 2, scene);
  ground.material = material;
  ground.checkCollisions = true;
  return ground;
}

function createHall(width, depth, position, scene) {

    /**
     * Floor
     */
    const floorMaterial = new BABYLON.StandardMaterial('floor_material', scene);
    floorMaterial.diffuseTexture = new BABYLON.Texture('assets/textures/marbre.jpg', scene);

    const floor = createFloor('ground', width, depth, scene, floorMaterial);
    floor.position = new BABYLON.Vector3.Zero().add(position);

    /**
     * Ceiling
     */
    const ceilingMaterial = new BABYLON.StandardMaterial('ceiling_material', scene);
    ceilingMaterial.diffuseTexture = new BABYLON.Texture('assets/textures/marbre.jpg', scene);

    const ceiling = createFloor('ceiling', width, depth, scene, ceilingMaterial);
    ceiling.position = new BABYLON.Vector3(0, Walls.height*2, 0).add(position);
    ceiling.rotation.x = Math.PI;

    /**
     * Walls
     */
    const wallMaterial = new BABYLON.StandardMaterial('wall_material', scene);
    wallMaterial.diffuseTexture = new BABYLON.Texture('assets/textures/redWood.jpg', scene);

    const wall2Position = new BABYLON.Vector3(0, 0, depth/2).add(position);
    const wall3Position = new BABYLON.Vector3(-width/2, 0, 0).add(position);
    const wall4Position = new BABYLON.Vector3(width/2, 0, 0).add(position);

    const wall2 = createWall('wall2', width, Walls.height*2, Walls.thickness, wall2Position, scene, wallMaterial);
    const wall3 = createWall('wall3', depth, Walls.height*2, Walls.thickness, wall3Position, scene, wallMaterial);
    wall3.rotation.y = Math.PI/2;
    const wall4 = createWall('wall4', depth, Walls.height*2, Walls.thickness, wall4Position, scene, wallMaterial);
    wall4.rotation.y = Math.PI/2;
}

function createRooms(totalWidth, depth, position, scene) {

    const room1FloorMaterial = new BABYLON.StandardMaterial('room1_floor_material', scene);
    room1FloorMaterial.diffuseTexture = new BABYLON.Texture('assets/textures/acajou.jpg', scene);
    const room2FloorMaterial = new BABYLON.StandardMaterial('room2_floor_material', scene);
    room2FloorMaterial.diffuseTexture = new BABYLON.Texture('assets/textures/sable.png', scene);
    const room3FloorMaterial = new BABYLON.StandardMaterial('room3_floor_material', scene);
    room3FloorMaterial.diffuseTexture = new BABYLON.Texture('assets/textures/gold.jpg', scene);

    const room1CeilingMaterial = new BABYLON.StandardMaterial('room1_ceiling_material', scene);
    room1CeilingMaterial.diffuseTexture = new BABYLON.Texture('assets/textures/acajou.jpg', scene);
    const room2CeilingMaterial = new BABYLON.StandardMaterial('room2_ceiling_material', scene);
    room2CeilingMaterial.diffuseTexture = new BABYLON.Texture('assets/textures/sable.png', scene);
    const room3CeilingMaterial = new BABYLON.StandardMaterial('room3_ceiling_material', scene);
    room3CeilingMaterial.diffuseTexture = new BABYLON.Texture('assets/textures/gold.jpg', scene);

    const room1WallMaterial = new BABYLON.StandardMaterial('room1_wall_material', scene);
    room1WallMaterial.diffuseTexture = new BABYLON.Texture('assets/textures/Wood_Cherry.jpg', scene);
    const room2WallMaterial = new BABYLON.StandardMaterial('room2_wall_material', scene);
    room2WallMaterial.diffuseTexture = new BABYLON.Texture('assets/textures/wood.jpg', scene);
    const room3WallMaterial = new BABYLON.StandardMaterial('room3_wall_material', scene);
    room3WallMaterial.diffuseTexture = new BABYLON.Texture('assets/textures/gris.jpg', scene);

    const room1Position = new BABYLON.Vector3(-totalWidth/3, 0, 0);
    room1Position.addInPlace(position);
    const room2Position = new BABYLON.Vector3(0, 0, 0);
    room2Position.addInPlace(position);
    const room3Position = new BABYLON.Vector3(totalWidth/3, 0, 0);
    room3Position.addInPlace(position);

    createRoom('room1', totalWidth/3, depth, room1Position, scene, room1FloorMaterial, room1WallMaterial, room1CeilingMaterial);
    createRoom('room2', totalWidth/3, depth, room2Position, scene, room2FloorMaterial, room2WallMaterial, room2CeilingMaterial);
    createRoom('room3', totalWidth/3, depth, room3Position, scene, room3FloorMaterial, room3WallMaterial, room3CeilingMaterial);
}

function createRoom(name, width, depth, position, scene, floorMaterial, wallMaterial, ceilingMaterial) {

    const smallWallsWidth = (width-Doors.width)/2;

    /**
     * Walls
     */
    const wall1Position = new BABYLON.Vector3(0, 0, -depth/2 + Walls.thickness/4);
    wall1Position.addInPlace(position);
    const wall2aPosition = new BABYLON.Vector3(-(smallWallsWidth+Doors.width)/2, 0, depth/2);
    wall2aPosition.addInPlace(position);
    const wall2bPosition = new BABYLON.Vector3((smallWallsWidth+Doors.width)/2, 0, depth/2);
    wall2bPosition.addInPlace(position);
    const wall2cPosition = new BABYLON.Vector3(0, Doors.height, depth/2);
    wall2cPosition.addInPlace(position);
    const wall3Position = new BABYLON.Vector3(-width/2 + Walls.thickness/4, 0, 0);
    wall3Position.addInPlace(position);
    const wall4Position = new BABYLON.Vector3(width/2 - Walls.thickness/4, 0, 0);
    wall4Position.addInPlace(position);
    //const doorPosition = new BABYLON.Vector3(0, 0, depth/2);
    //doorPosition.addInPlace(position);

    createWall(name + '_wall1', width, Walls.height, Walls.thickness, wall1Position, scene, wallMaterial);
    if (name !== 'mezzanine') {
        createWall(name + '_wall2a', smallWallsWidth, Walls.height, Walls.thickness/2, wall2aPosition, scene, wallMaterial);
        createWall(name + '_wall2b', smallWallsWidth,  Walls.height, Walls.thickness/2, wall2bPosition, scene, wallMaterial);
        createWall(name + '_wall2c', Doors.width, Walls.height - Doors.height, Walls.thickness/2, wall2cPosition, scene, wallMaterial);
    }

    const wall3 = createWall(name + '_wall3', depth, Walls.height, Walls.thickness/2, wall3Position, scene, wallMaterial);
    wall3.rotation.y = Math.PI/2;
    const wall4 = createWall(name + '_wall4', depth, Walls.height, Walls.thickness/2, wall4Position, scene, wallMaterial);
    wall4.rotation.y = Math.PI/2;
    //const door =

    /**
     * Floor
     */
    const floor = createFloor(name + '_floor', width, depth, scene, floorMaterial);
    floor.position = new BABYLON.Vector3.Zero().add(position);

    /**
     * Ceiling
     */
    const ceiling = createFloor(name + '_floor', width, depth, scene, ceilingMaterial);
    ceiling.position = new BABYLON.Vector3(0, Walls.height, 0).add(position);
    ceiling.rotation.x = -Math.PI;
}

function createMezzanine(width, depth, position, scene) {
    const floorMaterial = new BABYLON.StandardMaterial('mezzanine_floor_material', scene);
    floorMaterial.diffuseTexture = new BABYLON.Texture('assets/textures/acajou.png', scene);
    const wallMaterial = new BABYLON.StandardMaterial('mezzanine_wall_material', scene);
    wallMaterial.diffuseTexture = new BABYLON.Texture('assets/textures/dante.jpg', scene);
    const ceilingMaterial = new BABYLON.StandardMaterial('mezzanine_ceiling_material', scene);
    ceilingMaterial.diffuseTexture = new BABYLON.Texture('assets/textures/acajou.png', scene);

    createRoom('mezzanine', width, depth, position, scene, floorMaterial, wallMaterial, ceilingMaterial);
    createSculptures(width, position, scene);
}

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

function createAllPaintings(width, depth, position, scene) {

    const room1Position = new BABYLON.Vector3(-width/3, 0, 0).add(position);
    const room2Position = new BABYLON.Vector3.Zero().add(position);
    const room3Position = new BABYLON.Vector3(width/3, 0, 0).add(position);

    const room1Srcs = [
        'assets/akov/arcimboldo_vertumne_p.jpg',
        'assets/akov/botticelli_naissance_venus_a.jpg',
        'assets/akov/cezanne_dr_gachet_p.jpg',
        'assets/akov/chagall_mariee_p.jpg',
        'assets/akov/dali_tentation-saint-antoine_a.jpg',
        'assets/akov/delacroix-la_liberte_guidant_le_peuple_a.jpg',
        'assets/akov/gericault_Le_Radeau_de_La_Meduse_a.jpg',
        'assets/akov/goya_3mai_a.jpg'
    ];
    const room2Srcs = [
        'assets/akov/hokusai_grande_vague_a.jpg',
        'assets/akov/Jan_van_Eyck_001_arnolfini_epoux_p.jpg',
        'assets/akov/JLD_jeudepaume_a.jpg',
        'assets/akov/kandinsky-jaune-rouge-bleu_a.jpg',
        'assets/akov/magritte-pipe.jpg',
        'assets/akov/manet_LeDejeunerSurLherbe_a.jpg',
        'assets/akov/matisse_nu_bleuII_p.jpg',
        'assets/akov/michel_ange_creation_dadam_a.jpg'
    ];
    const room3Srcs = [
        'assets/akov/modigliani_jeune-bonne_p.jpg',
        'assets/akov/monet_gare-saint-lazare_a.jpg',
        'assets/akov/munch_cri_p.jpg',
        'assets/akov/picasso_demoiselles-avignon.jpg',
        'assets/akov/raphael_ecole-athenes_a.jpg',
        'assets/akov/rembrandt_croix_p.jpg',
        'assets/akov/renoir_Bal_du_Moulin_de_la_Galette_1876_a.jpg',
        'assets/akov/rousseau_le_reve_a.jpg'
    ];

    createPaintingsInRoom(room1Position, width/3, depth, room1Srcs, scene);
    createPaintingsInRoom(room2Position, width/3, depth, room2Srcs, scene);
    createPaintingsInRoom(room3Position, width/3, depth, room3Srcs, scene);
}

function createPaintingsInRoom(pos, width, depth, srcs, scene) {

    const pos1 = pos.add(new BABYLON.Vector3(-width/2+Walls.thickness/2, Walls.height/2, -depth/4));
    const pos2 = pos.add(new BABYLON.Vector3(-width/2+Walls.thickness/2, Walls.height/2, 0));
    const pos3 = pos.add(new BABYLON.Vector3(-width/2+Walls.thickness/2, Walls.height/2, depth/4));
    const pos4 = pos.add(new BABYLON.Vector3(-width/4, Walls.height/2, -depth/2+Walls.thickness));
    const pos5 = pos.add(new BABYLON.Vector3(width/4, Walls.height/2, -depth/2+Walls.thickness));
    const pos6 = pos.add(new BABYLON.Vector3(width/2-Walls.thickness/2, Walls.height/2, -depth/4));
    const pos7 = pos.add(new BABYLON.Vector3(width/2-Walls.thickness/2, Walls.height/2, 0));
    const pos8 = pos.add(new BABYLON.Vector3(width/2-Walls.thickness/2, Walls.height/2, depth/4));

    const rotation1 = new BABYLON.Vector3(0, -Math.PI/2, 0);
    const rotation2 = new BABYLON.Vector3(0, -Math.PI/2, 0);
    const rotation3 = new BABYLON.Vector3(0, -Math.PI/2, 0);
    const rotation4 = new BABYLON.Vector3(0, 0, Math.PI);
    const rotation5 = new BABYLON.Vector3(0, 0, Math.PI);
    const rotation6 = new BABYLON.Vector3(0, Math.PI/2, 0);
    const rotation7 = new BABYLON.Vector3(0, Math.PI/2, 0);
    const rotation8 = new BABYLON.Vector3(0, Math.PI/2, 0);

    createPainting(pos1, rotation1, srcs[0], scene);
    createPainting(pos2, rotation2, srcs[1], scene);
    createPainting(pos3, rotation3, srcs[2], scene);
    createPainting(pos4, rotation4, srcs[3], scene);
    createPainting(pos5, rotation5, srcs[4], scene);
    createPainting(pos6, rotation6, srcs[5], scene);
    createPainting(pos7, rotation7, srcs[6], scene);
    createPainting(pos8, rotation8, srcs[7], scene);
}

function createPainting(position, rotation, src, scene) {
    const material = new BABYLON.StandardMaterial('step_material', scene);
    material.diffuseTexture = new BABYLON.Texture(src, scene);
    material.diffuseTexture.uScale = 1;
    material.diffuseTexture.vScale = 1;

    const painting = new BABYLON.Mesh.CreateBox('painting_' + src, Walls.height*3/4, scene);
    painting.position = position;
    painting.scaling.z = 0.01;
    painting.rotation = rotation;
    painting.material = material;
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

function createAllBenchs(totalWidth, depth, position, scene) {
    const room1Position = new BABYLON.Vector3(-totalWidth/3, 0, 0).add(position);
    const room2Position = new BABYLON.Vector3.Zero().add(position);
    const room3Position = new BABYLON.Vector3(totalWidth/3, 0, 0).add(position);

    createBenchsInRoom("room1", totalWidth/3, depth, room1Position, scene);
    createBenchsInRoom("room2", totalWidth/3, depth, room2Position, scene);
    createBenchsInRoom("room3", totalWidth/3, depth, room3Position, scene);
}

function createBenchsInRoom(name, width, depth, position, scene) {
    const material = new BABYLON.StandardMaterial("material_bench_"+ name, scene);
    material.diffuseTexture = new BABYLON.Texture("assets/textures/paves.png", scene);

    const bench1Position = new BABYLON.Vector3(width/2 - 2, 0.25, depth/4).add(position);
    const bench2Position = new BABYLON.Vector3(-width/2 + 2, 0.25, -depth/4).add(position);
    const bench1Rotation = new BABYLON.Vector3(0, Math.PI/2, 0);
    const bench2Rotation = new BABYLON.Vector3(0, Math.PI/2, 0);

    createBench(name+"1", 2, bench1Position, bench1Rotation, scene, material);
    createBench(name+"2", 2, bench2Position, bench2Rotation, scene, material);
}

function createBench(name, width, position, rotation, scene, material) {

    const bench = new BABYLON.Mesh.CreateBox('bench_'+name, width, scene);
    bench.position = position;
    bench.rotation = rotation;
    bench.material = material;
    bench.scaling.y = 0.5/width;
    bench.scaling.z = 0.5;
    bench.checkCollisions = true;
}

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



