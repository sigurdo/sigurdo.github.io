function lengde(vektor) {
	return Math.sqrt(vektor[0] ** 2 + vektor[1] ** 2);
}

function vektorPunkter(startpunkt, sluttpunkt) {
	return [sluttpunkt[0] - startpunkt[0] , sluttpunkt[1] - startpunkt[1]];
}

function avstand(punkt1, punkt2) {
	var avstandVektor = vektorPunkter(punkt1, punkt2);
	var avstand = lengde(avstandVektor);
	return avstand;
}

function retning(vektor) {
	function lengde(vektor) {
		return Math.sqrt(vektor[0] ** 2 + vektor[1] ** 2);
	}

	if (lengde(vektor) == 0) {
		return 0;
	}

	var lengde = lengde(vektor);
	//console.log(lengde, vektor[0]);
	var vinkel = Math.asin(vektor[1] / lengde);

	if (vektor[0] < 0 && vektor[1] >= 0) {vinkel = Math.PI - vinkel;}
	else if (vektor[0] < 0 && vektor[1] < 0) {vinkel = -Math.PI - vinkel;}
	
	if (vektor[1] < 0) {vinkel = vinkel + 2 * Math.PI;}
	return vinkel;
}

function vinkel(vektor1, vektor2) {
	return retning(vektor2) - retning(vektor1);
}

function vektor(lengde, vinkel) {
	if (vinkel < Math.PI * 1/2) {
		var vektor = [lengde * Math.cos(vinkel), lengde * Math.sin(vinkel)];
	}
	else if (vinkel < Math.PI * 2/2) {
		var vektor = [lengde * Math.cos(vinkel), lengde * Math.sin(vinkel)];
	}
	else if (vinkel < Math.PI * 3/2) {
		var vektor = [lengde * Math.cos(vinkel), lengde * Math.sin(vinkel)];
	}
	else if (vinkel < Math.PI * 4/2) {
		var vektor = [lengde * Math.cos(vinkel), lengde * Math.sin(vinkel)];
	}
	return vektor;
}