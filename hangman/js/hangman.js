//Definerer funksjoner
function stringHarBokstav(string, bokstav) {
	for (var i = 0; i < string.length; i++) {
		if(string[i] == bokstav) {
			return true;
		}
	}

	return false;
}

function forgrunnsinfo(tekst) {
	var bodyEl = document.querySelector('body');
	var rammeEl = document.querySelector('.ramme');
	var linjeEl = document.createElement('div');
	var boksEl = document.createElement('div');
	boksEl.innerHTML = tekst;
	boksEl.style.padding = '15px';
	boksEl.style.backgroundColor = 'lightgrey';

	linjeEl.style.display = 'flex';
	linjeEl.style.width = '100%';
	linjeEl.style.justifyContent = 'center';
	linjeEl.style.position = 'fixed';
	linjeEl.style.top = window.innerHeight / 4 + 'px';

	linjeEl.appendChild(boksEl);	
	bodyEl.appendChild(linjeEl);
}

//forgrunnsinfo('sejkhtjksejkfhjsfhjsdfhjhsdfhjb <br> aeklfsjkwehsjkhsefnjk <br> askjh');

function tegnGalge() {
	ctx.beginPath();
	ctx.moveTo(50, 400);
	ctx.lineTo(50, 50);
	ctx.lineTo(215, 50);
	ctx.strokeStyle = 'black';
	ctx.lineWidth = 4;
	ctx.stroke();
	ctx.closePath();

	ctx.beginPath();
	ctx.moveTo(150, 50);
	ctx.lineTo(50, 150);
	ctx.stroke();
	ctx.closePath();

	ctx.beginPath();
	ctx.moveTo(200, 50);
	ctx.lineTo(200, 100);
	ctx.lineWidth = 2;
	ctx.stroke();
	ctx.closePath();
}

function tegnHode() {
	ctx.beginPath()
	ctx.arc(200, 125, 25, 0, 2 * Math.PI);
	ctx.closePath();
	ctx.lineWidth = 4;
	ctx.stroke();
}

function tegnMage() {
	ctx.moveTo(200, 150);
	ctx.lineTo(200, 250);
	ctx.stroke();
}

function tegnArmV() {
	ctx.moveTo(200, 150);
	ctx.lineTo(150, 200);
	ctx.stroke();
}

function tegnArmH() {
	ctx.moveTo(200, 150);
	ctx.lineTo(250, 200);
	ctx.stroke();	
}

function tegnBeinV() {
	ctx.moveTo(200, 250);
	ctx.lineTo(150, 350);
	ctx.stroke();
}

function tegnBeinH() {
	ctx.moveTo(200, 250);
	ctx.lineTo(250, 350);
	ctx.stroke();
}

function oppdaterCanvas() {
	ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
	tegnGalge();
	var j = 0;
	for (var i = 1; i < gjettaBokstaver.length; i++) {
		if (!stringHarBokstav(losningsord.toLowerCase(), gjettaBokstaver[i])) {
			tegnemetoder[j]();
			j++;
			if (j >= tegnemetoder.length) {
				console.log('Buhu');
				forgrunnsinfo('Beklager, men du ble hengt');
				bodyEl.removeEventListener('keydown', tastTrykket);
			}
		}
	}
}

function oppdaterGjettaBokstaver() {
	gjettaBokstaverEl.innerHTML = '';
	var losningsordOrd = losningsord.split(' ');
	gjettaBokstaverEl.style.flexWrap = 'wrap';

	var ingenBlirTomme = true;

	for (var i = 0; i < losningsordOrd.length; i++) {
		var ordEl = document.createElement('div');
		ordEl.style.display = 'flex';
		ordEl.style.flexWrap = 'wrap';

		for (var j = 0; j < losningsordOrd[i].length; j++) {
			var plassEl = document.createElement('div');
		
			plassEl.style.fontSize = '50px';
			//plassEl.style.color = '#00E676';
			plassEl.style.minWidth = '25px';
			plassEl.style.height = '60px';
			plassEl.style.margin = '10px';
			plassEl.style.textAlign = 'center';
			
			if (losningsordOrd[i][j] != ' ') {
				plassEl.style.borderBottom = '3px solid black';
			}

			if (stringHarBokstav(gjettaBokstaver, losningsordOrd[i][j].toLowerCase())) {
				plassEl.innerHTML = losningsordOrd[i][j];
			} else {
				ingenBlirTomme = false;
			}

			ordEl.appendChild(plassEl);

			if (j == losningsordOrd[i].length - 1) {
				var plassEl = document.createElement('div');
			
				plassEl.style.fontSize = '50px';
				plassEl.style.minWidth = '25px';
				plassEl.style.height = '60px';
				plassEl.style.margin = '10px';
				plassEl.style.textAlign = 'center';

				ordEl.appendChild(plassEl);
			}
		}
		
		gjettaBokstaverEl.appendChild(ordEl);
	}

	if (ingenBlirTomme) {
		console.log('Juhu');
		forgrunnsinfo('Gratuelerer, du fant løsningsordet');
		bodyEl.removeEventListener('keydown', tastTrykket);
	}
}

function oppdaterFeilGjettaBokstaver() {
	feilGjettaBokstaverEl.innerHTML = '';
	feilGjettaBokstaverEl.style.maxWidth = (window.innerWidth - canvasEl.width) + 'px';
	feilGjettaBokstaverEl.style.flexWrap = 'wrap';
	for (var i = 0; i < gjettaBokstaver.length; i++) {
		if(!stringHarBokstav(losningsord.toLowerCase(), gjettaBokstaver[i])) {
			var bokstavEl = document.createElement('div');
			bokstavEl.style.fontSize = '50px';
			bokstavEl.style.margin = '10px';
			bokstavEl.style.color = 'red';
			bokstavEl.innerHTML = gjettaBokstaver[i];
			feilGjettaBokstaverEl.appendChild(bokstavEl);
		}
	}
}

function tastTrykket(e) {
	if (e.keyCode >= 65 && e.keyCode <= 90) {
		var tast = String.fromCharCode(e.keyCode).toLowerCase();
	} else if (e.keyCode == 192 || e.keyCode == 221 || e.keyCode == 222) {
		var tast = bokstav[e.keyCode];
	}

	if (!stringHarBokstav(gjettaBokstaver, tast) && tast != undefined) {
		gjettaBokstaver += tast;
		oppdaterCanvas();
		oppdaterGjettaBokstaver();
		oppdaterFeilGjettaBokstaver();
	}
}

function velgLosningsord(e) {
	losningsord = window.prompt('Skriv inn et løsningsord');
	gjettaBokstaver = ' '; //Mellomrommet er der fordi man skal slippe å gjette mellomrommene
	oppdaterCanvas();
	oppdaterGjettaBokstaver();
	oppdaterFeilGjettaBokstaver();
}

//Definerer globale variabler
var losningsordArr = [
	'test',
	'Banan',
	'test med mellomrom',
	'Fesk e sunt året rundt',
	//'Llanfairpwllgwyngyllgogerychywrndropwllllantysiliogogogoch',
	//'methionylglutaminylarginyltyrosylglutamylserylleucyl phenylalanylalanylglutaminylleucyllysylglutamylarginyl lysylglutamylglycylalanylphenylalanylvalylprolylphenyl alanylvalylthreonylleucylglycylaspartylprolylglycylisol eucylglutamylglutaminylserylleucyllysylisoleucylaspartyl threonylleucylisoleucylglutamylalanylglycylalanylaspartyl alanylleucylglutamylleucylglycylisoleucylprolylphenyl alanylserylaspartylprolylleucylalanylaspartylglycylprolyl threonylisoleucylglutaminylasparaginylalanylthreonylleucyl arginylalanylphenylalanylalanylalanylglycylvalylthreonyl prolylalanylglutaminylcysteinylphenylalanylglutamyl methionylleucylalanylleucylisoleucylarginylglutaminyllysyl histidylprolylthreonylisoleucylprolylisoleucylglycylleucyl leucylmethionyltyrosylalanylasparaginylleucylvalylphenyl alanylasparaginyllysylglycylisoleucylaspartylglutamylphenyl alanyltyrosylalanylglutaminylcysteinylglutamyllysylvalyl glycylvalylaspartylserylvalylleucylvalylalanylaspartylvalyl prolylvalylglutaminylglutamylserylalanylprolylphenylalanyl arginylglutaminylalanylalanylleucylarginylhistidylasparaginyl valylalanylprolylisoleucylphenylalanylisoleucylcysteinyl prolylprolylaspartylalanylaspartylaspartylaspartylleucyl leucylarginylglutaminylisoleucylalanylseryltyrosylglycyl arginylglycyltyrosylthreonyltyrosylleucylleucylserylarginyl alanylglycylvalylthreonylglycylalanylglutamylasparaginyl arginylalanylalanylleucylprolylleucylasparaginylhistidyl leucylvalylalanyllysylleucyllysylglutamyltyrosylasparaginyl alanylalanylprolylprolylleucylglutaminylglycylphenylalanyl glycylisoleucylserylalanylprolylaspartylglutaminylvalyllysyl alanylalanylisoleucylaspartylalanylglycylalanylalanylglycyl alanylisoleucylserylglycylserylalanylisoleucylvalyllysylisol eucylisoleucylglutamylglutaminylhistidylasparaginylisoleucyl glutamylprolylglutamyllysylmethionylleucylalanylalanylleucyl lysylvalylphenylalanylvalylglutaminylprolylmethionyllysyl alanylalanylthreonylarginylserine',
	'minoritetsladningsbærerdiffusjonskoeffisientmålingsapparatur',
	//'fylkestrafikksikkerhetsutvalgssekretariatslederfunksjonene',
	//'Nanananananananananananananananana BATMAN',
	'God dag man økseskaft',
	'Den står sterkest som står mest alene',
	'Sola er ikke gul',
	'Null delt på null er hull'
];
var losningsord = losningsordArr[ssf.randInt(0, losningsordArr.length - 1)];

var gjettaBokstaver = ' '; //Mellomrommet er der fordi man skal slippe å gjette mellomrommene

var bokstav = [];
bokstav[222] = 'æ';
bokstav[192] = 'ø';
bokstav[221] = 'å';

var tegnemetoder = [tegnHode, tegnMage, tegnArmV, tegnArmH, tegnBeinV, tegnBeinH];

//Henter inn elementer
var bodyEl = document.querySelector('body');

var canvasEl = document.querySelector('#hangman');
canvasEl.width = '400';
canvasEl.height = '400';
canvasEl.style = 'width: 400px; height: 400px; border: 4px solid black;';

var ctx = canvasEl.getContext('2d');

var gjettaBokstaverEl = document.querySelector('#gjettaBokstaver');
var feilGjettaBokstaverEl = document.querySelector('#feilGjettaBokstaver');
var velgLosningsordKnappEl = document.querySelector('#velgLosningsordKnapp');

//Legger til lyttere
bodyEl.addEventListener('keydown', tastTrykket)
velgLosningsordKnappEl.addEventListener('click', velgLosningsord);

//------------------------------------
oppdaterCanvas();
oppdaterGjettaBokstaver();