/*
Dette er en klasse som brukes til å tracke museposisjon.
Den er veldig enkel: Den bare tracker musas posisjon hele tida og gjør det enkelt å få tilgang til
x og y verdier og om venstreklikk holdes nede eller oppe.
*/

class MouseTracker {
	constructor(elTag) {
		this.pos = [0, 0];
		this.x = 0;
		this.y = 0;
		this.down = false;
		this.el = document.querySelector(elTag);

		this.el.addEventListener('mousemove', e => this.musBevegelse(e));
		this.el.addEventListener('mousedown', e => this.musNed(e));
		this.el.addEventListener('mouseup', e => this.musOpp(e));
	}

	musBevegelse(e) {
		this.pos = [e.clientX, e.clientY];
		this.x = this.pos[0];
		this.y = this.pos[1];
		//console.log('MouseTracker.musBvegelse', this.pos, this.x, this.y);
		//console.log(posisjon);
	}

	musNed(e) {
		this.down = true;
		//console.log('MouseTracker.musNed', this.pos, this.x, this.y);
		//console.log('ned');
	}

	musOpp(e) {
		this.down = false;
	}

	getPos() { //For å få en kopi av pos
		//console.log('Kopi: ', this.pos, this.x, this.y);
		return JSON.parse(JSON.stringify(this.pos));
	}

	getX() {
		return this.pos[0];
	}

	getY() {
		return this.pos[1];
	}
}

/*
MouseSpeedTracker er en applikasjon som bygger på MouseTracker. Den trenger ingen ting for å tracke fart
til musa. Den oppretter et eget MouseTracker-objekt, som den benytter til å holde styr på fart og
retning til musepekeren i forhold til en animasjonssyklus som den må kalles fra eksternt. Den
holder i likhet med alle de andre klassene mine ikke en egen animasjonssyklus.

Constructor-argumenter:
elTag: String som kan brukes i querySelector til å finne target-elementet, bruk gjerne 'body'
*/

class MouseSpeedTracker extends MouseTracker {
	constructor(elTag) {
		super(elTag);

		//this.mouseTracker = new MouseTracker(elTag);
		this.lastPos = this.getPos();
		
		this.speedLastFrames = [];
		let nFrames = 2; //nFrames: Antall frames man skal bruke til å regne gj.snitt av for å finne nåværende fart
		for (let i = 0; i < nFrames; i++) {
			this.speedLastFrames[i] = [0, 0];
		}
	}

	nextFrame() {
		//console.log('MouseSpeedTracker.nextFrame()');
		let lastPos = this.lastPos;
		let pos = this.getPos();
		//console.log(pos);

		for (let i = 0; i < this.speedLastFrames.length - 1; i++) {
			this.speedLastFrames[i] = this.speedLastFrames[i + 1];
		}

		this.speedLastFrames[this.speedLastFrames.length - 1] = [pos[0]-lastPos[0], pos[1]-lastPos[1]];

		this.lastPos = pos;
	}

	getSpeed() {
		let sum = [0, 0];

		for (let i = 0; i < this.speedLastFrames.length; i++) {
			sum[0] += this.speedLastFrames[i][0];
			sum[1] += this.speedLastFrames[i][1];
		}

		return [sum[0] / this.speedLastFrames.length, sum[1] / this.speedLastFrames.length];
	}
}