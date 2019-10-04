/*
Dette er en klasse som teller fps
*/

class FpsCounter {
	constructor(options) {
		let defaultOptions = {
			period: 30
		}

		for (let index in defaultOptions) {
			if (!options[index]) {
				options[index] = defaultOptions[index];
			}
		}

		this.period = options.period;
		this.t = 0;
		this.oldDate = new Date();
		this.sumFps = 0;
		this.avgFps = 0;

		this.veryLow = false;
		this.veryLowFps = 0;
		this.veryLowCounter = 0;
	}

	nextFrame() {
		let date = new Date();
		let fps = 1000 / (date.getTime() - this.oldDate.getTime())

		this.sumFps += fps;
		if (this.t == this.period - 1) {
			this.avgFps = this.sumFps / this.period;
			this.sumFps = 0;
		}

		this.veryLow = this.avgFps < 20;
		if (this.veryLow) {
			this.veryLowCounter = 60;
		}
		this.veryLowCounter--;

		this.oldDate = date;
		this.t++; //øke tiden
		this.t %= this.period;
	}

	getFps() {
		if (this.veryLowCounter > 0) return 20;
		return this.avgFps;
	}
}