function gjennomsnitt(array) {
	var sum = 0;
	for (var i = 0; i < array.length; i++) {
		if (array[i] === Number(array[i])) {
			sum += array[i];
		} else {
			console.error('Arrayen kan bare ha tall');
		}
	}
	return sum / array.length;
}