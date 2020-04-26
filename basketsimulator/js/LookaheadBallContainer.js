/*
 * Dette er en klasse som virker som abstraherer en ball som til å få beregnet bane
 * med mye høyere presisjon, men du kaller likevel nextFrame i en vanlig animasjonsloop
 * for å ikke breake tidligere funksjonalitet. Helt genialt egt.
 */

 class LookaheadBallContainer {
    constructor(options) {
        const defaultOptions = {
            pos: [0, 0],
            radius: 30,
            fart: [0, 0],
            vinkel: 0,
            vinkelfart: 0,
            fps: 60,
            mpf: 100, // Moves per frame
            farge: "white",
            kollisjonsVegger: [false, false, false, false],
            kollisjonsPunkter: []
        }
        for (let index in defaultOptions) {
            if (!options[index]) {
                options[index] = defaultOptions[index];
            }
        }

        options.fps *= options.mpf;
        this.ball = new Ball(options);
        this.mpf = options.mpf;
        this.pos = options.pos;
        this.speed = options.fart;
        this.angle = options.vinkel;
        // this.lookahead();
    }

    nextFrame() {
        for (let i = 0; i < this.mpf; i++) {
            this.ball.flytt();
        }
        this.pos = this.ball.getPos();
        this.speed = this.ball.getSpeed();
        this.speed = [this.speed[0] * this.mpf, this.speed[1] * this.mpf];
        this.angle = this.ball.getAngle();
    }

    flytt() { // Deprecated egt
        this.nextFrame();
    }

    getPos() {
        return this.pos;
    }

    getX() {
        return this.pos[0];
    }

    getY() {
        return this.pos[1];
    }

    getSpeed() {
        return [this.speed[0], this.speed[1]]
    }

    getAngle() {
        return this.angle;
    }

    getRadius() {
        return this.ball.getRadius();
    }

    getColor() {
        return this.ball.getColor();
    }

    setPos(pos) {
        this.ball.setPos(pos);
    }

    setSpeed(speed) {
        this.ball.setSpeed([speed[0] / this.mpf, speed[1] / this.mpf]);
    }

    setAngle(angle) {
        this.ball.setAngle(angle);
    }

    setAnglespeed(anglespeed) {
        this.ball.setAnglespeed(anglespeed / this.mpf);
    }
 }