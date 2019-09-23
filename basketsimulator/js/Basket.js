/*
Basket er en klasse som representerer en kurv. Se på det som en datastruktur for posisjon, bredde
og høyde
*/

class Basket {
	constructor(options) {
		const defaultOptions = {
			pos: [0, 0],
			width: 100,
			height: 50
		}
		for (let i in defaultOptions) {
			if (!options[i]) {
				options[i] = defaultOptions[i];
			}
		}

		this.pos = options.pos;
		this.width = options.width;
		this.height = options.height;
	}

	getPos() {
		return JSON.parse(JSON.stringify(this.pos));
	}

	getWidth() {
		return this.width;
	}

	getHeight() {
		return this.height;
	}
}