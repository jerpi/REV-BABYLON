"use strict";

class Museum {

    constructor(params, scene, mover) {
        this.name = params.name || "Museum";
        this.width = params.width || 30;
        this.depth = params.depth || 30;
        this.height = params.height || 6;
        this.nbRooms = 3;

        this.createHall(scene, mover);
        this.createMezzanine(scene);

        const textures = [
            {
                wall: 'assets/textures/acajou.png',
                floor: 'assets/textures/sable.png',
                ceiling: 'assets/textures/gold.jpg'
            },
            {
                wall: 'assets/textures/acajou.png',
                floor: 'assets/textures/sable.png',
                ceiling: 'assets/textures/gold.jpg'
            },
            {
                wall: 'assets/textures/Wood_Cherry.jpg',
                floor: 'assets/textures/wood.jpg',
                ceiling: 'assets/textures/gris.jpg'
            },
        ];
        this.createRooms(scene, textures, mover);
    }

    createHall(scene, mover) {
        const position = new BABYLON.Vector3(0, 0, this.depth/4);
        const params = {
            name: "Hall",
            width: this.width,
            depth: this.depth/2,
            height: this.height,
            position
        };
        this.hall = new Hall(params, scene, mover);
    }

    createMezzanine(scene) {
        const position = new BABYLON.Vector3(0, this.height/2, -this.depth/4);
        const params = {
            name: "Mezzanine",
            width: this.width,
            depth: this.depth/2,
            height: this.height/2,
            position
        };
        this.mezzanine = new Mezzanine(params, scene);
    }

    createRooms(scene, textures, mover) {
        const roomsPosition = new BABYLON.Vector3(0, 0, -this.depth/4);

        this.rooms = [];
        for (let i = 0; i < this.nbRooms; i++) {

            const position = new BABYLON.Vector3((i-1)*this.width/3 , 0, 0).addInPlace(roomsPosition);
            let params = {
                name: this.name + '_room_' + i,
                width: this.width / this.nbRooms,
                depth: this.depth/2,
                height: this.height/2,
                position,
                textures: textures[i],
                paintings: PAINTINGS[i],
            };
            this.rooms[i] = new Room(params, scene, mover);
        }
        createAllSigns(this.width, this.depth/2, roomsPosition, scene);
    }
}