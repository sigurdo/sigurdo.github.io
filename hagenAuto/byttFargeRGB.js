var angiFargeRGBEl = document.querySelector("#angiFargeRGB");
angiFargeRGBEl.addEventListener("click", byttFargeRGB);

function byttFargeRGB() {
	var rEl = document.querySelector("#r");
	var r = rEl.value;

	var gEl = document.querySelector("#g");
	var g = gEl.value;

	var bEl = document.querySelector("#b");
	var b = bEl.value;

	bilVelgFarge.style.backgroundColor = "rgb("+r+","+g+","+b+")";
}