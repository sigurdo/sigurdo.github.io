//Lager metronom:
var bpm = 72;

klikk = document.querySelector('#klikk');

function slag() {
	console.log('bb');
	klikk.play();
}

var timing = setInterval(slag, 60 / bpm * 1000);

function startMetronom() {
	clearInterval(timing);
	timing = setInterval(slag, 60 / bpm * 1000);
}

slag();

//Lager navigasjon:
function byttOvelse(nr) {
	if (nr >= 0 && nr < antOvelser) {
		document.querySelector('#ovelse'+aktivOvelse).style.display = 'none';
		aktivOvelse = nr;
		document.querySelector('#ovelse'+aktivOvelse).style.display = 'block';
		kjorOvelse();
	}
}

//Nivaer til ovelse5:
function nyeNivaer() {
	var nivaer = document.querySelectorAll('#nivaer .niva');

	for (var i = 0; i < nivaer.length; i++) {
		var n = ssf.randInt(1, 6);

		nivaer[i].innerHTML = '';
		for (var j = 0; j < n; j++) {
			nivaer[i].innerHTML += '<div></<div>';
		}
	}
}

var antOvelser = 6;
var aktivOvelse = 0;
kjorOvelse(0);

function kjorOvelse() {
	var nr = aktivOvelse;
	if (nr == 0) {
		bpm = 72;
	}

	if (nr == 1) {
		bpm = 72;
	}

	if (nr == 2) {
		bpm = 72;
	}

	if (nr == 3) {
		bpm = 92;
	}

	if (nr == 4) {
		bpm = 112;
	}

	if (nr == 5) {
		bpm = 72;
		nyeNivaer();
	}
}

