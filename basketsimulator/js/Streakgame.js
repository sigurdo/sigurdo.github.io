/*
Klassen Streakgame holder styr på et canvas, en haug med kast og tar imot musetrykk på canvaset
og holder dermed et helt basketspill i gang. Bredde og høyde til canvaset må settes utenifra.
Klassen StreakGame vil bare bruke canvaset som det er.
Streakgame kan ikke animere seg selv, så det er viktig at nextFrame kalles jevnlig i en ekstern
animasjonsloop.
Museposisjoner må også sendes inn som argumenter i nextFrame() utenifra klassen.

DENNE KLASSEN ER VELDIG IKKE FERDIG
*/
class Streakgame {
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
		this.ctx = this.canvasEl.getContext('2d');
		this.drawer = new CanvasDrawer(this.canvasTag);

		this.mouse = new MouseSpeedTracker(this.canvasTag);

		this.basket = new Basket({
			pos: [this.canvasEl.width - 200, 300],
			width: 200,
			height: 35
		});

		this.throws = [];

		this.poeng = 0;

		this.mousedownLast = this.mouse.down;
	}

	treff() {
		this.poeng++;
		antijuks = (antijuks + 113) % 42;
	}

	nextFrame() {
		this.drawer.clear(); //fjerner alt i canvas
		this.mouse.nextFrame();

		let ctx = this.ctx;
		let canvas = this.canvasEl;

		const rodStrekPos = canvas.width - 600;
		

		this.drawer.drawVerticalLine({x: rodStrekPos}); //Tegner midtstrek

		//Skriver ut poeng
		let options = {
			basket: this.basket,
			points: this.poeng,
			color: 'lime'
		};
		this.drawer.drawPointsBasket(options);
		
		//Gammel metode:
		/*ctx.fillStyle = 'white';
		ctx.font = '200px Consolas';
		if (this.poeng < 10) {ctx.fillText('0'+this.poeng, canvas.width - 250, 200);}
		else {ctx.fillText(this.poeng, this.canvasEl.width - 250, 200);}*/

		if (!this.mouse.down && this.mousedownLast && this.mouse.getX() < rodStrekPos) {
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

		if (this.mouse.down) {
			if (this.mouse.getPos()[0] < rodStrekPos) {
				let holder = new Ball({
					pos: this.mouse.getPos(),
					radius: 50,
					fart: this.mouse.getSpeed(), 
					farge: 'orange'
				});
				
				this.drawer.drawBall({ball: holder});
			}
		}

		
		for (let i = 0; i < this.throws.length; i++) {
			this.throws[i].nextFrame();
			this.drawer.drawBall({ball: this.throws[i].ball});
		}

		//Sletter baller
		for (let i = 0; i < this.throws.length; i++) {
			if (this.throws[i].ball.getPos()[1] > this.canvasEl.height) {
				this.throws.splice(this.throws.indexOf(this.throws[i]), 1);
			}
		}

		//Tegner kurv
		this.drawer.drawBasket({
			basket: this.basket
		});

		document.getElementById('poengViser').innerHTML = this.poeng;
		document.getElementById("rekordViser").innerHTML = 0;
		document.getElementById('ballerViser').innerHTML = this.throws.length;

		/*document.querySelector('#poengViser').innerHTML = this.mouse.getPos();
		document.querySelector('#rekordViser').innerHTML = this.mouse.getSpeed();
		document.querySelector('#ballerViser').innerHTML = this.mouse.down;*/

		this.mousedownLast = this.mouse.down;
	}
}