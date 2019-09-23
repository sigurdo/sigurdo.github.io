/*
Dette er en veldig generell klasse for et spill. Meninga er å arve fra denne.
Et helt basic Game teller ingen poeng.
*/

class Game {
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

		this.mouse = new MouseSpeedTracker(this.canvasTag);
		this.rodStrekPos = this.canvasEl.width - 600;

		this.basket = new Basket({
			pos: [this.canvasEl.width - 200, 300],
			width: 200,
			height: 35
		});

		this.throws = [];

		this.mousedownLast = this.mouse.down;
	}

	treff() {
		console.log('hurra');
		antijuks = (antijuks + 113) % 42;
	}

	initFrame() {
		this.drawer.clear(); //fjerner alt i canvas
		this.mouse.nextFrame();
		this.rodStrekPos = this.canvasEl.width - 600; //Litt jalla juksesikring
	}

	newBall() {//Oppretter en ny ball hvis venstreklikk nettopp ble sluppet
		//Sjekker om det nettopp har blitt sluppet en ball
		if (!this.mouse.down && this.mousedownLast && this.mouse.getX() < this.rodStrekPos) {
			this.throws.push(new Throw({
				ballPos: this.mouse.getPos(),
				ballRadius: 50,
				ballFart: this.mouse.getSpeed(),
				ballFarge: 'orange',
				kollisjonsVegger: [false, true, false, true],
				basket: this.basket,
				treff: () => this.treff()
			}));
		}
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
		if (this.mouse.down) {
			if (this.mouse.getPos()[0] < this.rodStrekPos) {
				let holder = new Ball({
					pos: this.mouse.getPos(),
					radius: 50,
					fart: this.mouse.getSpeed(), 
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
				this.throws.splice(this.throws.indexOf(this.throws[i]), 1);
			}
		}
	}

	endFrame() {
		this.mousedownLast = this.mouse.down;
	}

	drawAll() {
		this.drawLine();
		this.drawBalls();
		this.drawHolder();
		this.drawBasket();
	}

	calcAll() {
		this.newBall();
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