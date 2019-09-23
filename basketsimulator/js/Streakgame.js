/*
Klassen Streakgame holder styr på et canvas, en haug med kast og tar imot musetrykk på canvaset
og holder dermed et helt basketspill i gang. Bredde og høyde til canvaset må settes utenifra.
Klassen StreakGame vil bare bruke canvaset som det er.
Streakgame kan ikke animere seg selv, så det er viktig at nextFrame kalles jevnlig i en ekstern
animasjonsloop.
Museposisjoner må også sendes inn som argumenter i nextFrame() utenifra klassen.

DENNE KLASSEN ER VELDIG IKKE FERDIG
*/
class StreakGame extends Game {
	constructor(options) {
		super(options);

		this.poeng = 0;
	}

	treff() {
		this.poeng++;
	}

	drawAll() {
		this.drawLine();
		this.drawBalls();
		if (this.throws.length == 0) {
			this.drawHolder();
		}
		this.drawBasket();
	}

	nextFrame() {
		this.initFrame();

		if (this.throws.length == 0) {
			this.newBall();
		}

		this.moveBalls();

		//Sjekker om en ball har havna utafor uten å ha truffet
		for (let i = 0; i < this.throws.length; i++) {
			if (this.throws[i].ball.getY() > this.canvasEl.height && this.throws[i].status == 'none') {
				this.poeng = 0;
			}
		}

		this.deleteBalls();

		/*Skriver ut poeng*/
		this.drawer.drawPointsBasket({
			basket: this.basket,
			points: this.poeng,
			color: 'white'
		});/**/

		this.drawAll();
		this.endFrame();
	}
}