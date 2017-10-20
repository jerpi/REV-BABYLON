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