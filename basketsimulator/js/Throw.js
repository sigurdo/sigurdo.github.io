/*
Klassen throw representerer ett kast. Det eneste den gjør er å holde styr på en Ball
og en funksjon for å registrere treff. Det kan være hensiktsmessig at den kan ta inn
argumenter for å bestemme scoringsområde i konstruktøren
*/
class Throw {
	constructor(options) {
		let defaultOptions = {
			ballPos: [0, 0],
			ballRadius: 30,
			ballFart: [0, 0],
			ballVinkel: 0,
			ballVinkelfart: 0,
			ballFarge: "white",
			kollisjonsVegger: [false, true, false, true],
			basket: undefined,
			treff: function() {
				console.log("Treff registrert med default treff() funksjon");
			}
		}

		for (let index in defaultOptions) {
			if (!options[index]) {
				options[index] = defaultOptions[index];
			}
		}

		this.basket = options.basket;
		this.kurvPos = this.basket.getPos();
		this.kurvWidth = this.basket.getWidth();
		this.kurvHeight = this.basket.getHeight();
		this.ball = new LookaheadBallContainer({
			pos: options.ballPos,
			radius: options.ballRadius,
			fart: options.ballFart,
			vinkel: options.ballVinkel,
			vinkelfart: options.ballVinkelfart,
			fps: 60,
			farge: options.ballFarge,
			kollisjonsVegger: options.kollisjonsVegger,
			kollisjonsPunkter: [this.kurvPos, [this.kurvPos[0] + this.kurvWidth, this.kurvPos[1]]]
		});
		this.treff = options.treff;
		this.status = "none"; //Status er "none" hvis den ikke har truffet kurven, og "hit" hvis den har truffet kurven
	}

	nextFrame() {
		this.ball.flytt();

		//Sjekk scoring...
		//Lang if-setning sjekker om det er scoring. Denne er ikke perfekt men ganske god, nesten alle reelle treff vil registreres mens noen få ikke reelle treff vil registreres
		let x = this.ball.getX();
		let y = this.ball.getY();
		let fart = this.ball.getSpeed();
		if (x > this.kurvPos[0]
		 && x < this.kurvPos[0] + this.kurvWidth
		 && y > this.kurvPos[1]
		 && y < this.kurvPos[1] + this.kurvHeight
		 && fart[1] > 0
		 && this.status == "none"
		) {
			this.status = "hit";
			this.treff();
		}
	}

	setBallPos(pos) {
		this.ball.setPos(pos);
	}

	setBallFart(fart) {
		this.ball.setSpeed(fart);
	}

	setBallVinkel(vinkel) {
		this.ball.setAngle(vinkel);
	}

	setBallVinkelfart(vinkelfart) {
		this.ball.setAnglespeed(vinkelfart);
	}

	setStatus(status) {
		this.status = status;
	}

	resetStatus() {
		this.status = 'none';
	}
}