var angiFargeHTMLEl = document.querySelector("#angiFargeHTML");
angiFargeHTMLEl.addEventListener("click", byttFargeHTML);

function byttFargeHTML() {
	var nyFargeHTMLEl = document.querySelector("#nyFargeHTML");
	var nyFargeHTML = nyFargeHTMLEl.value;

	bilVelgFarge.style.backgroundColor = nyFargeHTML;
}