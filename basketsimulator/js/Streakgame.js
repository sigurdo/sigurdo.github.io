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
		console.log(this);

		this.mouse = new MouseSpeedTracker(this.canvasTag);
		this.throws = [];
		this.poeng = 0;

		this.mousedownLast = this.mouse.down;
	}

	nextFrame() {
		this.mouse.nextFrame();

		let ctx = this.ctx;
		let canvas = this.canvasEl;

		const rodStrekPos = canvas.width - 600;
		//fjerner alt i canvas
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		//Tegner midtstrek
		//console.log(canvas.height);
		ctx.lineWidth = 8;
		ctx.beginPath();
		ctx.moveTo(rodStrekPos, 0);
		ctx.lineTo(rodStrekPos, canvas.height);
		ctx.closePath();
		ctx.strokeStyle = 'red';
		ctx.stroke();

		if (!this.mouse.down && this.mousedownLast) {
			this.throws.push(new Throw({
				ballPos: this.mouse.getPos(),
				ballFart: this.mouse.getSpeed(),
				ballFarge: 'orange',
				kollisjonsVegger: [false, true, false, true],
				kurvPos: [canvas.width - 200, 300],
				kurvWidth: 200,
				kurvHeight: 50,
				treff: () => this.poeng++
			}));
		}

		if (this.mouse.down) {
			if (this.mouse.getPos()[0] < rodStrekPos) {
				let holder = new Ball({
					pos: this.mouse.getPos(),
					fart: this.mouse.getSpeed(), 
					farge: 'orange'
				});
				
				holder.tegn(ctx);
				//this.baller.push(holder);
			}
		}

		
		for (let i = 0; i < this.throws.length; i++) {
			this.throws[i].nextFrame();
			this.throws[i].ball.tegn(ctx);
		}

		//Sletter baller
		for (let i = 0; i < this.throws.length; i++) {
			if (this.throws[i].ball.pos[1] > this.canvasEl.height) {
				//this.throws.splice(this.throws.indexOf(this.throws[i]), 1);
			}
		}

		//Tegner kurv
		ctx.lineWidth = 16;
		ctx.beginPath();
		ctx.moveTo(canvas.width, 300);
		ctx.lineTo(canvas.width-200, 300);
		ctx.closePath();
		ctx.strokeStyle = 'grey';
		ctx.stroke();

		//Skriver ut poeng
		ctx.fillStyle = 'white';
		ctx.font = '200px Consolas';
		if (this.poeng < 10) {ctx.fillText('0'+this.poeng, canvas.width - 250, 200);}
		else {ctx.fillText(this.poeng, this.canvasEl.width - 250, 200);}

		document.getElementById('poengViser').innerHTML = this.poeng;
		document.getElementById("rekordViser").innerHTML = 0;
		document.getElementById('ballerViser').innerHTML = this.throws.length;

		/*document.querySelector('#poengViser').innerHTML = this.mouse.getPos();
		document.querySelector('#rekordViser').innerHTML = this.mouse.getSpeed();
		document.querySelector('#ballerViser').innerHTML = this.mouse.down;*/

		this.mousedownLast = this.mouse.down;
	}
}