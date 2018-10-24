<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title> </title>
		<style>
/*Til grid*/
* {
    box-sizing: border-box;
}

.row::after {
    content: "";
    clear: both;
    display: table;
}

[class*="col-"] {
    float: left;
    padding: 15px;
    /*border: 1px solid red;*/
}

.col-1 {width: 8.33%;}
.col-2 {width: 16.66%;}
.col-3 {width: 25%;}
.col-4 {width: 33.33%;}
.col-5 {width: 41.66%;}
.col-6 {width: 50%;}
.col-7 {width: 58.33%;}
.col-8 {width: 66.66%;}
.col-9 {width: 75%;}
.col-10 {width: 83.33%;}
.col-11 {width: 91.66%;}
.col-12 {width: 100%;}

/* alt vanlig stilsetting kommer under her*/
html, body {
	margin: 0px;
	height: 100%;/*Tillater høydeflexing*/
	font-size: 35px;
	background-color: #282828;
}

body {
	display: -webkit-flex;
	display: flex;
	-webkit-justify-content: center;
	justify-content: center;
	-webkit-align-items: center;
	align-items: center;
}

h1 {
	margin: 0px;
	padding: 25px 10px 25px 10px;/*Bytter avstand til padding fordi dette kan ødelegge høydeflexing*/
}

.ramme {
	margin: none;
	border: 5px solid white;
	background-color:#098E4E;
	padding: 25px;
}

.meny {
	background-color: #bb6bce;
}

.meny a { /*Når man lager meny med denne stilen, blir a-tagen selv en block, med standard utseende*/
			/*Bruk gjerne sammen med class vannrett*/
	display: block;
	text-decoration: none;
	color: white;
	padding: 25px;
}

.meny a:hover {
	background-color: #824a90;
}

.input {
	margin: 25px;
	padding: 5px;
	background-color: white;
}

table, #eksakt {
	margin: 25px;
}

table, th, td, #eksakt {
	background-color: white;
	border: 1px solid black;
	border-collapse: collapse;
}

th, td, #eksakt {
	padding: 25px;
	font-size: 50px;

}

#a, #b, #c, button {
	width: 120px;
	height: 45px;
	font-size: 35px;
}

button {
	width: 150px;
}

.vannrett { /*Dette vil si at alle med class vannrett i navnet sitt vil flexes vannrett*/
	display: -webkit-flex;
	display: flex;
	-webkit-flex-direction: row;
	flex-direction: row;
	-webkit-justify-content: center;
	justify-content: center;
	-webkit-flex-wrap: wrap;
	flex-wrap: wrap;
}
		</style>
	</head>

	<body>
		<div class="ramme">
			<div class="input">
				<input type="number" id="a" placeholder="a"> x^2 + 
				<input type="number" id="b" placeholder="b"> x + 
				<input type="number" id="c" placeholder="c"> = 0 
				<button onclick="regnUt();"> Regn ut </button>
			</div>
			<table>
				<tr>
					<th> <?php echo "x_1PHP";?>: </th>
					<td> <span id="x_1"> - </span> </td>
				</tr>

				<tr>
					<th> x_2: </th>
					<td> <span id="x_2"> - </span> </td>
				</tr>
			</table>

			<div id="eksakt">
				Eksakt: (-b +/- sqrt(b**2 - 4*a*c))/(2*a)
			</div>

			<script>
				function regnUt() {
					//a x^2 + b x + c = 0
					var a = document.querySelector("#a").value;
					console.log(a);
					var b = document.querySelector("#b").value;
					var c = document.querySelector('#c').value;

					var x_1 = (- b + Math.sqrt(b**2 - 4*a*c)) / (2*a);
					var x_2 = (- b - Math.sqrt(b**2 - 4*a*c)) / (2*a);
					console.log('x_1: '+x_1+', x_2: '+x_2);

					document.getElementById('x_1').innerHTML = x_1;
					document.getElementById('x_2').innerHTML = x_2;

					var eksakt = "Eksakt: (-"+b+" +/- sqrt("+(b**2-4*a*c)+"))/("+(2*a)+")";
					document.getElementById('eksakt').innerHTML = eksakt;

				}
			</script>
		</div>
	</body>
</html>