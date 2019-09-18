//Ball har x, y, fart, tegn(), flytt()
class BallGammel {
	constructor (x, y, fart, tid, farge) {
		this.x0 = x;
		this.x = x;
		this.y0 = y;
		this.y = y;
		this.fart = fart;
		this.tid = tid;
		this.farge = farge;
		this.truffet = false;
		this.kollidertVegg = false; //Om ballen koliderte med veggen forrige frame
		this.kollidertTakGulv = false;
		this.kollidertKurvkant = false;
		this.kollidertBaller = []; //Om ballen kolliderte med ballen med gitt index forrige frame
		this.skalSlettes = false;

		for (var i = 0; i < baller.length; i++) {
			if(lengde(vektorPunkter([this.x, this.y], [baller[i].x, baller[i].y])) <= 100) {
				this.kollidertBaller[i] = true;
			} else {
				this.kollidertBaller[i] = false;
			}
		}
	}

	//Tegnemetode
	tegn() {
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
		if (annenhverTyngdeaksellerasjon) {
			this.fart[1] += 1.16;
		}
		//parabelbane
		/**/this.x += this.fart[0];// * this.tid) + this.x0;
		this.y += this.fart[1];// (0.5 * (this.tid**2)) + (this.fart[1] * this.tid) + this.y0;/**/

		if (!annenhverTyngdeaksellerasjon) {
			this.fart[1] += 1.16;
		}

		annenhverTyngdeaksellerasjon = !annenhverTyngdeaksellerasjon;

		this.tid++;

		//Sjekker om ballen kolliderer med veggene
		if (this.x <= 0 + 18 || this.x >= canvas.width - 18) {
			if (!this.kollidertVegg) {
				this.fart[0] = -0.92 * this.fart[0];
				this.kollidertVegg = true;
			}
		} else  {
			this.kollidertVegg = false;
		}

		if (this.y > canvas.height) {
			if (!this.truffet) {
				endStreak();
				for (var i = 0; i < baller.length; i++) {
					//baller[i].skalSlettes = true;
				}
			}
			this.skalSlettes = true; //Kan ikke slette med en gang fordi da funker ikke forløkka i animer()
		}

		//Sjekker om ballen kolliderer med kurvkanten
		var ballPos = [this.x, this.y];
		var r = vektorPunkter(kurvkantPos, ballPos);
		var v0 = this.fart;
		if (lengde(r) <= 75) {
			if (!this.kollidertKurvkant) {
				var vVinkel = retning(v0);
				var v = vektor(0.92 * lengde(v0), (Math.PI + 2*retning(r) - retning(v0)) % (Math.PI * 2));
				//console.log(vVinkel);
				this.fart = v;
				this.kollidertKurvkant = true;
			}
		} else {
			this.kollidertKurvkant = false;
		}

		//Lang if-setning sjekker om det er scoring. Denne er ikke perfekt men ganske god, nesten alle reelle treff vil registreres mens noen få ikke reelle treff vil registreres
		if (this.x >= canvas.width - 200 && this.y > 300 && this.y < 350 && this.fart[1] > 0 && !this.truffet) {
			this.truffet = true;
			console.log('hurra');
			poeng++;
			checkHighScore(poeng);
		}
	}
}