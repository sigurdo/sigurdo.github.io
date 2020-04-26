/* 
 * Optimalisert versjon av Game for 1 ball
 * Gir forhåpentligvis mindre lag
 * I tillegg er det ofte en nice feature å bare ha en ball i spill. Når du lager ny ball
 * med denne blir den gamle ballen overskrevet. Ellers funker den helt likt.
 * Kan ikke se noen stor ytelsesforskjell heller, egt...
 */

class OneBallGame extends Game {
    constructor(options) {
        super(options);

        this.throws.push(new Throw({
            ballPos: [0, 10000],
            ballRadius: 50,
            ballFart: [0, 0],
            ballFarge: 'orange',
            kollisjonsVegger: [false, true, false, true],
            basket: this.basket,
            treff: () => this.treff()
        }));

        this.deleted = true;
    }

    createNewBall(pos, speed) {
        if (pos[0] > this.rodStrekPos) return;
        this.onDelete(0);
        this.throws[0].setBallPos(pos);
        this.throws[0].setBallFart(speed);
        this.throws[0].setBallVinkel(0);
        this.throws[0].setBallVinkelfart(0); // speed[1] / this.throws[0].getBallRadius()
        this.throws[0].resetStatus();
        this.deleted = false;
        this.onThrow(0);
    }

    deleteBalls() {
        // Sletter ikke baller. Bare gjenbruker isteden.
        if (!this.deleted && this.throws[0].ball.getPos()[1] > this.canvasEl.height) {
            this.deleted = true;
            this.onDelete(0);
        }
    }
}