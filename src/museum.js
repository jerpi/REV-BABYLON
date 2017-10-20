function createMuseum(width, depth, scene) {
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