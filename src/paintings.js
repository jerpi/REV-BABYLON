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