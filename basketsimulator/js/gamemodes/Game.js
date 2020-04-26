/*
Dette er en veldig generell klasse for et spill. Meninga er å arve fra denne.
Et helt basic Game teller ingen poeng.
*/

class Game {
	constructor(options) {
		let defaultOptions = {
			canvasTag: "canvas",
			onGameOver: points => console.log('Game over:', points, 'poeng'),
			onSelfRestart: () => console.log('Restarter selv')
		}

		for (let index in defaultOptions) {
			if (!options[index]) {
				options[index] = defaultOptions[index];
			}
		}

		this.canvasTag = options.canvasTag;
		this.canvasEl = document.querySelector(this.canvasTag);
		this.drawer = new CanvasDrawer(this.canvasTag);
		this.onGameOver = options.onGameOver;
		this.onSelfRestart = options.onSelfRestart;

		this.touchTracker = new TouchTracker(this.canvasTag);
		this.touchTracker.slipp = (pos, speed) => this.createNewBall(pos, speed);
		this.rodStrekPos = this.canvasEl.width - 600;

		this.basket = new Basket({
			pos: [this.canvasEl.width - 150, 300],
			width: 150,
			height: 35,
		});

		this.throws = [];
	}

	treff() {
		console.log('hurra');
		antijuks = (antijuks + 113) % 42;
	}

	onThrow(index) {
		//Ingenting her i basic game
	}

	onDelete(index) {
		//Ingenting her i basic game
	}

	initFrame() {
		this.drawer.clear(); //fjerner alt i canvas
		this.rodStrekPos = this.canvasEl.width - 600; //Litt jalla juksesikring
	}

	createNewBall(pos, speed) {
		// if (pos[0] > this.rodStrekPos && pos[1] < 300) return;
		this.throws.push(new Throw({
			ballPos: pos,
			ballRadius: 50,
			ballFart: speed,
			ballVinkelfart: 0,
			ballFarge: 'orange',
			kollisjonsVegger: [false, true, false, true],
			basket: this.basket,
			treff: () => this.treff()
		}));

		this.onThrow(this.throws.length - 1);
	}
	
	drawLine() {
		this.drawer.drawVerticalLine({x: this.rodStrekPos}); //Tegner midtstrek
	}

	moveBalls() {
		//Flytter kastede baller
		for (let i = 0; i < this.throws.length; i++) {
			this.throws[i].nextFrame();
		}
	}

	drawBalls() {
		//Tegner kastede baller
		for (let i = 0; i < this.throws.length; i++) {
			this.drawer.drawBall({ball: this.throws[i].ball});
		}
	}


	drawHolder() {
		//Tegner holde-ball
		if (this.touchTracker.pressed) {
			if (this.touchTracker.pos[0] < this.rodStrekPos || this.touchTracker.pos[1] > 300) {
				let holder = new Ball({
					pos: this.touchTracker.copyPos(),
					radius: 50,
					farge: 'orange'
				});
				
				this.drawer.drawBall({ball: holder});
			}
		}
	}

	drawBasket() {
		//Tegner kurv
		this.drawer.drawBasket({
			basket: this.basket
		});
	}

	deleteBalls() {
		//Sletter baller
		for (let i = 0; i < this.throws.length; i++) {
			if (this.throws[i].ball.getPos()[1] > this.canvasEl.height) {
				this.onDelete(i);
				this.throws.splice(i, 1);
			}
		}
	}

	endFrame() {
	}

	drawAll() {
		this.drawLine();
		this.drawBalls();
		this.drawHolder();
		this.drawBasket();
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