"use strict";

class Guide {
    constructor(position, dt) {
        const mass = 1;
        this.mover = new Mover(position, mass, dt);
    }
}