/*
 * Dette er en klasse som er inspirert av og liknende MouseTracker, men basert på Hammer.js
 * og fungerer dermed med touch.
 * En viktig forskjell er likevel at TouchTracker er event-basert, mens MouseTracker er (var)
 * animationframes-basert.
 */

class TouchTracker {
    constructor(elTag) {
        this.pos = [0, 0];
        this.pressed = false;
        this.el = document.querySelector(elTag);
        this.mc = new Hammer.Manager(this.el);
        this.mc.add(new Hammer.Pan({ threshold: 0, pointers: 0 }));
        this.mc.on('panstart', e => this.onPanStart(e));
        this.mc.on('panmove', e => this.onPanMove(e));
        this.mc.on('hammer.input', e => { if (e.isFinal) this.onPanEnd(e); });
    }

    onPanStart(e) {
        this.pos[0] = e.srcEvent.clientX;
        this.pos[1] = e.srcEvent.clientY;
        if (window.innerHeight < 400) {
            this.pos[0] *= 2;
            this.pos[1] *= 2;
        }
        this.pressed = true;
    }

    onPanMove(e) {
        this.pos[0] = e.srcEvent.clientX;
        this.pos[1] = e.srcEvent.clientY;
        if (window.innerHeight < 400) {
            this.pos[0] *= 2;
            this.pos[1] *= 2;
        }
    }

    onPanEnd(e) {
        this.pressed = false;
        if (window.innerHeight < 400) {
            this.slipp([2*e.srcEvent.clientX, 2*e.srcEvent.clientY],
                [e.velocityX * 50/3, e.velocityY * 50/3]);
        }
        else {
            this.slipp([e.srcEvent.clientX, e.srcEvent.clientY],
                [e.velocityX * 50/3, e.velocityY * 50/3]);
        }
    }

    slipp(pos, speed) {
        // Fylles ut instans-spesifikt
    }

    copyPos() {
        return JSON.parse(JSON.stringify(this.pos));
    }
}