const Walls = {
    thickness: 0.5,
    height: 3
};

const Doors = {
    thickness: 0.2,
    height: 2.2,
    width: 2.0
};

function createFloor(name, width, depth, scene, material) {
    const ground = new BABYLON.Mesh.CreateGround(name, width, depth, 2, scene);
    ground.material = material;
    ground.checkCollisions = true;
    return ground;
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