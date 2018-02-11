//console.log('øhøhøø');

//Definerer elementer som kan vare nyttige, og vet blir nyttige
var bodyEl = document.querySelector('body');
var sendSvarSpm1 = document.querySelector('#sendSvarSpm1');
var sendSvarSpm2 = document.querySelector('#sendSvarSpm2');
var sendSvarSpm3 = document.querySelector('#sendSvarSpm3');
var sendSvarSpm4 = document.querySelector('#sendSvarSpm4');
var sendSvarSpm5 = document.querySelector('#sendSvarSpm5');/**/
var poengViserEl = document.querySelector('#poeng');
var nesteEl = document.querySelector('#neste');
var forrigeEl = document.querySelector('#forrige');

//Definerer globale variabler
var riktigFarge = '#22ff57'
var feilFarge = 'red';

//Poengene funker sånn her: hvert spørsmål har en egen variabel for sine poeng. Når man oppdaterer poengene summeres alle poengene fra hvert spørsmål til en total poengsum
var poeng = 0;
var poengSpm1 = 0;
var poengSpm2 = 0;
var poengSpm3 = 0;
var poengSpm4 = 0;
var poengSpm5 = 0;

var startSpm = 1;
var spmNr = startSpm - 1;
var antSpm = 5;
nesteSpm();//Dette ser ulogisk ut men det er den letteste måten å bare vise det første spørsmålet på starten

//Lager lyttere for alle sendSvar-knappene
sendSvarSpm1.addEventListener('click', sjekkSvarSpm1);
sendSvarSpm2.addEventListener('click', sjekkSvarSpm2);
sendSvarSpm3.addEventListener('click', sjekkSvarSpm3);
sendSvarSpm4.addEventListener('click', sjekkSvarSpm4);
sendSvarSpm5.addEventListener('click', sjekkSvarSpm5);/**/

//Definerer alle svarsjekkerfunksjonene
function sjekkSvarSpm1() {
	var svarEl = document.querySelector('#inputSpm1');
	var svar = svarEl.value;
	var fasit = 5.974;
	if (Math.abs(fasit - svar) <= 0.01) {var riktig = true;}
	else {var riktig = false;}

	if (riktig) {
		svarEl.style.color = riktigFarge;
		poengSpm1 = 1;
		oppdaterPoeng();
	}
	else {
		svarEl.style.color = feilFarge;
		poengSpm1 = 0;
		oppdaterPoeng();
	}
}

function sjekkSvarSpm2() {
	var svarEl = document.querySelector('#inputSpm2');
	var svar = svarEl.value.toLowerCase();
	var fasit = 'potassium';
	if (svar == fasit) {var riktig = true;}
	else {var riktig = false;}

	if (riktig) {
		svarEl.style.color = riktigFarge;
		poengSpm2 = 1;
		oppdaterPoeng();
	}
	else {
		svarEl.style.color = feilFarge;
		poengSpm2 = 0;
		oppdaterPoeng();
	}
}

function sjekkSvarSpm3() {
	var svarAEl = document.querySelector('#inputSpm3A');
	var svarBEl = document.querySelector('#inputSpm3B');
	var svarCEl = document.querySelector('#inputSpm3C');
	var svarDEl = document.querySelector('#inputSpm3D');

	if (svarAEl.checked) {var svar = 'A';}
	if (svarBEl.checked) {var svar = 'B';}
	if (svarCEl.checked) {var svar = 'C';}
	if (svarDEl.checked) {var svar = 'D';}
	var altEl = document.querySelector('#alt'+svar+'Spm3');
	
	if (svar == 'C') {var riktig = true;}
	else {var riktig = false;}

	//Her må jeg i tillegg resette alle svaralternativ-fargene til svart.
	document.querySelector('#altASpm3').style.color = 'black';
	document.querySelector('#altBSpm3').style.color = 'black';
	document.querySelector('#altCSpm3').style.color = 'black';
	document.querySelector('#altDSpm3').style.color = 'black';
		
	if (riktig) {
		altEl.style.color = riktigFarge;
		poengSpm3 = 1;
		oppdaterPoeng();
	}
	else {
		altEl.style.color = feilFarge;
		poengSpm3 = 0;
		oppdaterPoeng();
	}
}

function sjekkSvarSpm4() {
	var altAEl = document.querySelector('#altASpm4');
	var altBEl = document.querySelector('#altBSpm4');
	var svarAEl = document.querySelector('#inputSpm4A');
	var svarBEl = document.querySelector('#inputSpm4B');

	if (svarAEl.checked) {var riktigA = true;}
	else {var riktigA = false;}
	if (svarBEl.checked) {var riktigB = true;}
	else {var riktigB = false;}

	//Her må jeg i tillegg resette alle svaralternativ-fargene til svart.
	document.querySelector('#altASpm4').style.color = 'black';
	document.querySelector('#altBSpm4').style.color = 'black';
		
	if (riktigA) {
		altAEl.style.color = riktigFarge;
		var poengSpm4A = 0.5;
	}
	else {
		altAEl.style.color = feilFarge;
		var poengSpm4A = 0;
		window.alert('Jo, fugler kan fly');
	}

	if (riktigB) {
		altBEl.style.color = riktigFarge;
		var poengSpm4B = 0.5;
	}
	else {
		altBEl.style.color = feilFarge;
		var poengSpm4B = 0;
		window.alert('Pingviner kan ikke fly');
	}
	poengSpm4 = poengSpm4A + poengSpm4B;
	oppdaterPoeng();
}

function sjekkSvarSpm5() {
	var svarEl = document.querySelector('#inputSpm5');
	var svar = svarEl.value.toLowerCase();
	var fasit = '#b22222';
	if (svar == fasit) {var riktig = true;}
	else {var riktig = false;}

	if (riktig) {
		svarEl.style.backgroundColor = riktigFarge;
		poengSpm5 = 1;
		oppdaterPoeng();
	}
	else {
		svarEl.style.backgroundColor = feilFarge;
		poengSpm5 = 0;
		oppdaterPoeng();
	}
}

//Og til slutt en funksjon som oppdater poengene
function oppdaterPoeng() {
	poeng = poengSpm1 + poengSpm2 + poengSpm3 + poengSpm4 + poengSpm5;
	poengViserEl.innerHTML = poeng+'/'+antSpm;
	if (poeng == antSpm) {
		window.alert('Gratuerer, du fikk '+poeng+' av '+antSpm+' poeng!');
	}
}
oppdaterPoeng();


//Så var det navigasjonen
//Lager først lyttere for neste og forrige spørsmål-knapper
nesteEl.addEventListener('click', nesteSpm);
forrigeEl.addEventListener('click', forrigeSpm);

function nesteSpm() {
	if (spmNr < antSpm) {
		spmNr++;
	}

	for (var i = 1; i <= antSpm; i++) {//forløkke som først gjør at ingen av spørsmålene synes
		document.querySelector('#spm'+i+'Boks').style.display = 'none';
	}

	document.querySelector('#spm'+spmNr+'Boks').style.display = 'block';
}

function forrigeSpm() {
	if (spmNr > 1) {
		spmNr--;
	}

	for (var i = 1; i <= antSpm; i++) {//forløkke som først gjør at ingen av spørsmålene synes
		document.querySelector('#spm'+i+'Boks').style.display = 'none';
	}

	document.querySelector('#spm'+spmNr+'Boks').style.display = 'block';
}