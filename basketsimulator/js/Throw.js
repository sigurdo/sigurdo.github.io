/*
Klassen throw representerer ett kast. Det eneste den gjør er å holde styr på en Ball
og en funksjon for å registrere treff. Det kan være hensiktsmessig at den kan ta inn
argumenter for å bestemme scoringsområde i konstruktøren
*/
class Throw {
	constructor(options) {
		let defaultOptions = {
			ballPos: [0, 0],
			ballFart: [0, 0],
			ballFarge: "white",
			kollisjonsVegger: [false, true, false, true],
			kurvPos: [0, 0],
			kurvWidth: 100,
			kurvHeight: 100,
		}

		for (index in defaultOptions) {
			if (!options[index]) {
				options[index] = defaultOptions[index];
			}
		}

		this.ball = new Ball({
			pos: options.ballPos,
			fart: options.ballFart,
			farge: options.ballFarge,
			kollisjonsVegger = options.kollisjonsVegger,
			kollisjonsPunkter = [kurvPos, [kurvPos[0] + kurvWidth, kurvPos[1]]]
		});
		this.kurvPos = options.kurvPos;
		this.kurvWidth = options.kurvWidth;
		this.kurvHeight = options.kurvHeight;
	}

	nextFrame() {
		this.ball.flytt();

		//Sjekk scoring...
	}
}