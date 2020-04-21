/*
Litt om abstraksjonen Ball:
En Ball er en rund ting som beveger seg med tyngdeaksellerasjon i et koordinatsystem med en rekke
spesifiserte statiske punkter den kan kollidere med og opptil 4 vegger den kan kollidere med.

Sletting av baller skal flyttes ut av Ball-klassen, men håndteres 100% av interfacet rundt
Det samme gjelder deteksjon av scoring

Kall Ball.flytt() for å bevege ballen en frame
Kall Ball.tegn() for å tegne opp ballen i det globale canvaset, men denne bør fjernes
	Ball skal fortsatt holde en farge, men det er bare for å forenkle administrasjon på utsiden
	Eller, hmmmm, kanskje ikke... Når man kan sende ctx referanse som argument til tegn er det litt aktuelt å ta vare på den faktisk
	Jo, Ball-klassen skal være en såpass generell abstraksjon av et beveglig objekt at det bare blir rotete med grafikk-rammeverk-spesifikke tegnemetoder
*/
class Ball {
	constructor (options) {
		let defaultOptions = {
			pos: [0, 0],
			radius: 30,
			fart: [0, 0],
			farge: "white",
			kollisjonsVegger: [false, false, false, false],
			kollisjonsPunkter: []
		}
		for (let index in defaultOptions) {
			if (!options[index]) {
				options[index] = defaultOptions[index];
			}
		}

		this.pos = options.pos;
		this.x = options.pos[0];
		this.y = options.pos[1];
		this.radius = options.radius;
		this.fart = options.fart;
		this.farge = options.farge;
		this.kollisjonsVegger = options.kollisjonsVegger;
		this.kollisjonsPunkter = {
			punkter: options.kollisjonsPunkter,
			kollidert: new Array(options.kollisjonsPunkter.length).fill(false) //Om ballen kolliderte med punktet med gitt index forrige frame
		};
		this.truffet = false;
		this.kollidertVegg = false; //Om ballen koliderte med veggen forrige frame
		this.kollidertTakGulv = false; //Om ballen koliderte med tak/gulv forrige frame
		this.skalSlettes = false;
	}

	//Tegnemetode
	tegn(ctx) {
		//Tegner ball
		ctx.lineWidth = 8;
		ctx.beginPath();
		ctx.arc(this.x, this.y, 50, 0, Math.PI*2);
		ctx.strokeStyle = "black";
		ctx.stroke();
		ctx.fillStyle = this.farge;
		ctx.fill();
		ctx.closePath();
	}

	//x-flytt-metode
	flytt() {
		let annenhverTyngdeaksellerasjon = true;
		if (annenhverTyngdeaksellerasjon) {
			this.fart[1] += 1.16;
		}
		
		this.x += this.fart[0];
		this.y += this.fart[1];

		if (!annenhverTyngdeaksellerasjon) {
			this.fart[1] += 1.16;
		}

		annenhverTyngdeaksellerasjon = !annenhverTyngdeaksellerasjon;

		//Sjekker om ballen kolliderer med veggene
		if ((this.kollisjonsVegger[3] && this.x <= 0 + 18) || (this.kollisjonsVegger[1] && this.x >= canvas.width - 18)) {
			if (!this.kollidertVegg) {
				this.fart[0] = -0.92 * this.fart[0];
				this.kollidertVegg = true;
			}
		} else  {
			this.kollidertVegg = false;
		}

		//Sjekker om ballen kolliderer med tak/gulv
		if ((this.kollisjonsVegger[0] && this.y <= 0 + 18) || (this.kollisjonsVegger[2] && this.y >= canvas.height - 18)) {
			if (!this.kollidertTakGulv) {
				this.fart[1] = -0.92 * this.fart[1];
				this.kollidertTakGulv = true;
			}
		} else  {
			this.kollidertTakGulv = false;
		}

		//Sjekker om ballen kolliderer med kurvkanten (generelt alle punkter)
		for (let i = 0; i < this.kollisjonsPunkter.punkter.length; i++) {
			let punkt = this.kollisjonsPunkter.punkter[i];
			var ballPos = [this.x, this.y];
			var r = vektorPunkter(punkt, ballPos);
			var v0 = this.fart;
			if (lengde(r) <= 75) {
				if (!this.kollisjonsPunkter.kollidert[i]) {
					var vVinkel = retning(v0);
					var v = vektor(0.92 * lengde(v0), (Math.PI + 2*retning(r) - retning(v0)) % (Math.PI * 2));
					//console.log(vVinkel);
					this.fart = v;
					this.kollisjonsPunkter.kollidert[i] = true;
				}
			} else {
				this.kollisjonsPunkter.kollidert[i] = false;
			}
		}

		this.pos = [this.x, this.y];
	}

	getPos() {
		return JSON.parse(JSON.stringify(this.pos));
	}

	getX() {
		return this.pos[0];
	}

	getY() {
		return this.pos[1];
	}

	getRadius() {
		return this.radius;
	}

	getColor() {
		return this.farge;
	}
}