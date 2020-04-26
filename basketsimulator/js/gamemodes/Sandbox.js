/*
 * Bare en sandbox for fysikk
 */

class Sandbox {
    constructor(options) {
        let defaultOptions = {
            canvasTag: "canvas"
        }

        for (let index in defaultOptions) {
            if (!options[index]) {
                options[index] = defaultOptions[index];
            }
        }

        this.canvasTag = options.canvasTag;
        this.canvasEl = document.querySelector(this.canvasTag);
        this.drawer = new CanvasDrawer(this.canvasTag);

        this.touchTracker = new TouchTracker(this.canvasTag);
        this.touchTracker.slipp = (pos, speed) => this.createNewBall(pos, speed);

        this.balls = [];
    }

    initFrame() {
        this.drawer.clear(); //fjerner alt i canvas
    }

    createNewBall(pos, speed) {
        this.balls.push(new LookaheadBallContainer({
            pos: pos,
            radius: 50,
            fart: speed,
            vinkelfart: 0,
            elastisitetNormalt: 0.94,
            farge: 'orange',
            kollisjonsVegger: [true, true, true, true],
        }));
    }

    moveBalls() {
        //Flytter kastede baller
        for (let i = 0; i < this.balls.length; i++) {
            this.balls[i].flytt();
        }
    }

    drawBalls() {
        //Tegner kastede baller
        for (let i = 0; i < this.balls.length; i++) {
            this.drawer.drawBall({ball: this.balls[i]});
        }
    }


    drawHolder() {
        //Tegner holde-ball
        if (this.touchTracker.pressed) {
            let holder = new Ball({
                pos: this.touchTracker.copyPos(),
                radius: 50,
                farge: 'orange'
            });
                
            this.drawer.drawBall({ball: holder});
        }
    }

    deleteBalls() {
        //Sletter baller
        for (let i = 0; i < this.balls.length; i++) {
            if (this.balls[i].getPos()[1] > this.canvasEl.height + 1000) {
                this.balls.splice(i, 1);
            }
        }
    }

    endFrame() {
    }

    drawAll() {
        this.drawBalls();
        this.drawHolder();
    }

    calcAll() {
        this.moveBalls();
        this.deleteBalls();
    }

    nextFrame() {
        this.initFrame();
        this.calcAll();
        this.drawAll();
        this.endFrame();
    }
}