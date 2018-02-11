var randomColorKnappEl = document.querySelector("#randomColorKnapp");
randomColorKnappEl.addEventListener("click", byttFargeRandom);

function byttFargeRandom() {
	var r = getRndInteger(0, 255); //Kan ikke kjøre uten getRndInteger.js
	var g = getRndInteger(0, 255);
	var b = getRndInteger(0, 255);

	bilVelgFarge.style.backgroundColor = "rgb("+r+","+g+","+b+")";

	//setTimeout(byttFargeRandom, 2500);//Gjør at bilen automatisk bytter farge med jevne mellomrom(kan ikke skrus av)
}