function rundAv(tall, desimaler) {
	//Dette er akkurat som toFixed, bare at den returnerer tall og ikke string, og den funker med negative verdier av desimaler
	return (tall * 10**desimaler).toFixed(0) / (10**desimaler);
}

class Oppskrift {
	constructor(navn, enhet, antall, ingredienser, beskrivelse) {
		this.navn = navn;
		this.enhet = enhet;
		this.antall = antall;
		this.ingredienser = ingredienser;
		this.beskrivelse = beskrivelse;
	}

	consoleLog() {
		console.log("Hvordan lage "+this.navn);
		console.log("For "+this.antall+" "+this.enhet);
		console.log("Ingredienser:");
		for (var i = 0; i < this.ingredienser.length; i++) {
			console.log(this.ingredienser[i].pentAntall()+" "+this.ingredienser[i].enhet+" "+this.ingredienser[i].navn);
		}
		console.log(this.beskrivelse);
	}

	konverterAntall(antall) {
		let res = new Oppskrift(
			this.navn,
			this.enhet,
			antall,
			[],
			this.beskrivelse
		);

		for (var i = 0; i < this.ingredienser.length; i++) {
			res.ingredienser[i] = (this.ingredienser[i].konverterAntall((this.ingredienser[i].antall/this.antall) * antall));
		}

		return res;
	}
}

class OppskriftMedForm extends Oppskrift {
	constructor(navn, enhet, antall, ingredienser, beskrivelse, formtype, dimensjoner) {
		super(navn, enhet, antall, ingredienser, beskrivelse);
		this.kakeform = new Kakeform(formtype, dimensjoner);
	}

	konverterAntall(antall) {
		let res = new Oppskrift(
			this.navn,
			this.enhet,
			antall,
			[],
			this.beskrivelse,
			this.kakeform
		);

		for (var i = 0; i < this.ingredienser.length; i++) {
			res.ingredienser[i] = (this.ingredienser[i].konverterAntall((this.ingredienser[i].antall/this.antall) * antall));
		}

		return res;
	}
}

class Kakeform {
	//type 0 er sirkel
	//type 1 er rektangel
	constructor(ftype, dimensjoner) {
		this.ftype = ftype;
		this.dimensjoner = dimensjoner;
	}

	getAreal() {
		if (ftype == 0) {
			return Math.PI * dimensjoner[0]**2;
		}
		else if (ftype == 1) {
			return dimensjoner[0] * dimensjoner[1];
		}
	}
}

class Ingrediens {
	constructor(navn, antall, enhet, desimaler) {
		this.navn = navn;
		this.antall = antall;
		this.enhet = enhet;
		this.desimaler = desimaler;
	}

	konverterAntall(antall) {
		return new Ingrediens(this.navn, antall, this.enhet, this.desimaler);
	}

	pentAntall() {
		return rundAv(this.antall, this.desimaler);
	}
}

function lagIngrediensListe(ting) {
	for (var i = 0; i < ting.length; i++) {
		ting[i] = new Ingrediens(ting[i][0], ting[i][1], ting[i][2],
			(ting[i][3] == undefined ? 8 : ting[i][3])
		);
	}

	return ting;
}



let testkake = new OppskriftMedForm(
	"testkake",
	"stykker",
	16,
	lagIngrediensListe([
		["mel", 1, "kg", 1],
		["sukker", 500, "g", -1],
		["egg", 3, "stk", 0],
		["melk", 2.5, "dL", 1]
	]),
	"Du blander alle tingene i en bolle, og steker på 200 grader i 30 min",
	0,
	[20, 30]
);

testkake.consoleLog();
testkake = testkake.konverterAntall(15);
testkake.consoleLog();
