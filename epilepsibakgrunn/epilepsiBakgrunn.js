byttBgFargeRandom();
function byttBgFargeRandom() {
	var r = getRndInteger(0, 255);
	var g = getRndInteger(0, 255);
	var b = getRndInteger(0, 255);

	var bodyEl = document.querySelector('body');
	bodyEl.style.backgroundColor = "rgb("+r+","+g+","+b+")";
	setTimeout(byttBgFargeRandom, 50);
}

var h = 0;
var s = 100;
var l = 50;

function byttBgFargeRandomAlternativ() {
	h += 20;

	var bodyEl = document.querySelector('body');
	bodyEl.style.backgroundColor = "hsl("+h+","+s+"%,"+l+"%)";
	requestAnimationFrame(byttBgFargeRandomAlternativ);
}

function getRndInteger(min, max) {//Nødvendig funksjon for å generere tilfeldige heltall
    return Math.floor(Math.random() * (max - min)) + min;
}