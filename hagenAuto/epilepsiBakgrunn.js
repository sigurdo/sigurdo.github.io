//Body må ha id="body" for at epilepsibakgrunnen skal funke
byttBgFargeRandom();

function byttBgFargeRandom() {
	var r = getRndInteger(0, 255); //Kan ikke kjøre uten getRndInteger.js
	var g = getRndInteger(0, 255);
	var b = getRndInteger(0, 255);

	body.style.backgroundColor = "rgb("+r+","+g+","+b+")";
	setTimeout(byttBgFargeRandom, 50);
}