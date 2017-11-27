"use strict";

class State {
    constructor(guide) {
        this.guide = guide;
        this.init();
    }
    init() {};
    step(mover) {};
    end() {};
}

class CalmState extends State {
    constructor(guide) {
        super(guide);
    }
    init() {
        this.guide.color = new BABYLON.Color3(0, 1, 0);
        this.guide.stopJump();
    }
    step(mover) {
        const res = this.guide.mover.applySteeringForce(
            this.guide.path[this.guide.pathIndex].position
        );
        if (res === 1) {
            if (this.guide.path[this.guide.pathIndex].watch) {
                this.guide.state = new WatchingState(this.guide);
                this.end();
            }
            this.guide.pathIndex ++;
            if (this.guide.pathIndex === this.guide.path.length) {
                this.guide.pathIndex = 0;
            }
            return;
        } else {
            this.guide.mover.update();
        }
        if (!this.guide.isClose(mover)) {
            this.guide.state = new WaitState(this.guide);
            this.end();
        }
    }
    end() {

    }
}

class WaitState extends State{
    constructor(guide) {
        super(guide);
    }
    init() {
        this.guide.jump();
        this.start = Date.now();
    }
    step(camera) {
        if (this.guide.isClose(camera)) {
            this.guide.state = new CalmState(this.guide);
            this.end();
        }
        if (Date.now() > (this.start + 5000)) {
            this.guide.state = new WaitLongState(this.guide);
            this.end();
        }
    }
    end() {

    }
}

class WaitLongState extends State {
    constructor(guide) {
       super(guide);
    }
    init() {
        this.guide.color = new BABYLON.Color3(1, 0, 0);
    }
    step(camera) {
        if (this.guide.isClose(camera)) {
            this.guide.state = new CalmState(this.guide);
            this.end();
        }
    }
    end() {

    }
}

class WatchingState extends State {
    constructor(guide) {
        super(guide);
    }
    init() {
        this.start = Date.now();
        this.guide.color = new BABYLON.Color3(1, 1, 0);
    }
    step() {
        if (Date.now() > (this.start + 5000)) {
            this.guide.state = new CalmState(this.guide);
        }
    }
    end() {

    }
}