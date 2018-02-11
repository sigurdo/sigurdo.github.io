var angiFargeEl = document.querySelector("#angiFarge");
angiFargeEl.addEventListener("click", byttFarge);

function byttFarge() {
	var nyFargeEl = document.querySelector("#nyFarge");
	var nyFarge = nyFargeEl.value;

	var bilVelgFargeEl = document.querySelector("#bilVelgFarge");

	bilVelgFarge.style.backgroundColor = nyFarge;
}