/*
Her er det om å gjøre å treffe så mange som mulig av N baller
*/

class BestOfNGame extends Game {
	constructor(options) {
		super(options);

		this.N = 10;
		this.attemptsLeft = this.N;
		this.points = 0;
	}

	treff() {
		this.points++;
	}

	onThrow() {
		this.attemptsLeft--;
		if (this.attemptsLeft <= 0) {
			this.newBall = function() {};
		}
	}

	onDelete() {
		if (this.attemptsLeft == 0 && this.throws.length == 1) {
			console.log('Game over, du fikk', this.points, 'poeng');
		}
	}

	nextFrame() {
		this.initFrame();
		this.calcAll();

		/*Skriver ut poeng*/
		this.drawer.drawPointsBasket({
			basket: this.basket,
			points: this.attemptsLeft,
			color: 'yellow'
		});/**/

		this.drawAll();
		this.endFrame();
	}
}