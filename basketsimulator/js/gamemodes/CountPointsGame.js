/*
Et spill som teller antall treff siden spillet ble starta
*/

class CountPointsGame extends Game {
	constructor(options) {
		super(options);

		this.points = 0;
	}

	treff() {
		this.points++;
	}

	nextFrame() {
		this.initFrame();
		this.calcAll();

		/*Skriver ut poeng*/
		this.drawer.drawPointsBasket({
			basket: this.basket,
			points: this.points,
			color: 'lime'
		});/**/

		this.drawAll();
		this.endFrame();
	}
}