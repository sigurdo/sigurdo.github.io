/*
En praktisk klasse for å tegne ting i canvas
*/

class CanvasDrawer {
	constructor(canvasTag) {
		this.canvasTag = canvasTag;
		this.canvasEl = document.querySelector(canvasTag);
		this.ctx = this.canvasEl.getContext('2d');
	}

	clear() {
		this.ctx.clearRect(0, 0, this.canvasEl.width, this.canvasEl.height);
	}

	drawVerticalLine(options) {
		const defaultOptions = {
			x: 0,
			color: 'red',
			thickness: 8
		}
		for (let i in defaultOptions) {
			if (!options[i]) {
				options[i] = defaultOptions[i];
			}
		}

		//Tegner vertikal strek
		this.ctx.lineWidth = options.thickness;
		this.ctx.beginPath();
		this.ctx.moveTo(options.x, 0);
		this.ctx.lineTo(options.x, this.canvasEl.height);
		this.ctx.closePath();
		this.ctx.strokeStyle = options.color;
		this.ctx.stroke();
	}

	drawBall(options) {
		if (!options.ball) {
			console.error('CanvasDrawer.drawBall kan ikke kalles uten en ball');
			return;
		}
		const defaultOptions = {
			borderColor: 'black',
			lineWidth: 8
		}
		for (let i in defaultOptions) {
			if (!options[i]) {
				options[i] = defaultOptions[i];
			}
		}

		//Tegner ball
		/* this.ctx.lineWidth = options.lineWidth;
		this.ctx.beginPath();
		this.ctx.arc(options.ball.getPos()[0], options.ball.getPos()[1], options.ball.getRadius(), 0, Math.PI*2);
		this.ctx.strokeStyle = options.borderColor;
		this.ctx.stroke();
		this.ctx.fillStyle = options.ball.getColor();
		this.ctx.fill();
		this.ctx.closePath();*/

		let img = document.querySelector('img');
		let r = options.ball.getRadius();
		let x = options.ball.getPos()[0];//-options.ball.getRadius();
		let y = options.ball.getPos()[1]//;-options.ball.getRadius();
		let t = options.ball.getAngle();
		this.ctx.translate(x, y)
		this.ctx.rotate(t);
		this.ctx.drawImage(img, -r, -r);
		this.ctx.rotate(-t);
		this.ctx.translate(-x, -y);
	}

	drawBasket(options) {
		const defaultOptions = {
			basket: new Basket({
				pos: [0, 0],
				width: 100,
				height: 50
			}),
			thickness: 10,
			color: 'grey'
		}
		for (let i in defaultOptions) {
			if (!options[i]) {
				options[i] = defaultOptions[i];
			}
		}

		const pos = options.basket.pos;
		const width = options.basket.width;
		const height = options.basket.height;

		//Tegner kurv
		/**/for (let i = 0; i < width; i += 25) {
			this.ctx.lineWidth = 5;
			this.ctx.strokeStyle = 'white';
			this.ctx.beginPath();
			this.ctx.moveTo(pos[0] + i, pos[1]);
			this.ctx.lineTo(pos[0] + i + 25, pos[1] + height);
			this.ctx.moveTo(pos[0] + i, pos[1] + height);
			this.ctx.lineTo(pos[0] + i + 25, pos[1]);
			this.ctx.closePath();
			this.ctx.stroke();
		}/**/

		this.ctx.lineWidth = options.thickness;
		this.ctx.strokeStyle = options.color;

		this.ctx.beginPath();
		this.ctx.moveTo(pos[0], pos[1]);
		this.ctx.lineTo(pos[0] + width, pos[1]);
		this.ctx.closePath();
		this.ctx.stroke();

		this.ctx.beginPath();
		this.ctx.moveTo(pos[0], pos[1]);
		this.ctx.arc(pos[0], pos[1], 5, 0, 2 * Math.PI);
		this.ctx.closePath();
		this.ctx.fillStyle = 'grey';
		this.ctx.fill();
	}

	drawPointsBasket(options) {//Tegner ut poeng over en kurv
		if (!options.basket) {
			console.error('CanvasDrawer.drawPointsBasket kan ikke kalles uten en kurv');
			return;
		}
		const defaultOptions = {
			basket: undefined,
			points: 0,
			color: 'white',
			fontSize: 140,
			fontFamily: 'Consolas'
		}
		for (let i in defaultOptions) {
			if (!options[i]) {
				options[i] = defaultOptions[i];
			}
		}

		const pos = options.basket.getPos();
		const width = options.basket.getWidth();
		const height = options.basket.getHeight();

		//Skriver ut poeng
		this.ctx.fillStyle = options.color;
		this.ctx.font = options.fontSize+'px '+options.fontFamily;
		if (options.points < 10) {this.ctx.fillText('0'+options.points, pos[0] + 20, pos[1] - 50);}
		else {this.ctx.fillText(options.points, pos[0] + 20, pos[1] - 50);}
	}
}