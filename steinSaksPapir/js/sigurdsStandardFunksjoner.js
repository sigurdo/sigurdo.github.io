function getRndInteger(min, max) {//Tilfeldig heltallgenerator
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function terning() {//Returnerer et tall fra 1 til 6
	var n = Math.floor(Math.random() * 6) + 1;;
	return n
}

function getRndColor() {//Denne gir tilfeldig kombinasjon av rgb-verdier
	r = Math.floor(Math.random() * 256);
	g = Math.floor(Math.random() * 256);
	b = Math.floor(Math.random() * 256);

	return 'rgb('+r+', '+g+', '+b+')';
}

function getRndColorHsl(s, l) {//Denne gir tilfeldig hsl-fargekode med tilfeldig hue og gitt saturation og value. Ikke bruk %-tegn i argumenter i funskjonskallet
	var h = Math.floor(Math.random() * 356);
	return 'hsl('+h+', '+s+'%, '+l+'%)';
}

function gangetabell(n) {//Gir en tekstvariabel som ved å skrives ut gir en gangetabell på n rader og n kolonner
	var tabell = '<table>';

	for(var k = 1; k<=n; k++) {
		tabell += ('<tr>');
		for(var r = 1; r<=n; r++) {
			tabell += ('<td>'+k*r+'</td>');
		}
		tabell += ('</tr>');
	}

	tabell += '</table>';

	return tabell;
}

function losPolynom(a, b, c) {//Funksjon som returnerer en array med løsningene for likningen a x^2 + b x + c = 0
	if(a != 0) {
		var x_1 = (- b + Math.sqrt(b**2 - 4*a*c)) / (2*a);
		var x_2 = (- b - Math.sqrt(b**2 - 4*a*c)) / (2*a);
		console.log('x_1: '+x_1+', x_2: '+x_2);
		return [x_1, x_2];
	}
	else {
		var x_1 = - c/b;
		return [x_1, x_1];
	}
}