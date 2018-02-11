byttModell();

function byttModell() {
	var modellEl = document.querySelector("#modell");
	var modell = modellEl.value;

	bilVelgFarge.src = "media/velgFarge/" + modell + ".png";

	setTimeout(byttModell, 50);//Repeterer funksjonen for å følge med på om man bytter modell
}