<!DOCTYPE html>
<html>
	<head>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
		<meta charset="utf-8">
		<title> </title>
		<link href='https://fonts.googleapis.com/css?family=Share Tech Mono' rel='stylesheet'>
		<link rel="stylesheet" type="text/css" href="css/basketStil.css">
	</head>

	<body>
		<canvas id="flyBoks" style="background-color: darkblue;"></canvas>
		<p>
			tid: <t id="tidsViser"> </t> frames <br>
			poeng: <t id="poengViser"> </t> poeng <br>
			rekord: <t id="rekordViser"> </t> poeng <br>
			baller: <t id="ballerViser"> </t> baller
		</p>
		<script type="text/javascript" src="js/Ball.js"></script> <!--Inkluderer klassen Ball-->
		<script type="text/javascript" src="js/Basket.js"></script>
		<script type="text/javascript" src="js/Throw.js"></script> <!--Inkluderer klassen Throw-->
		<script type="text/javascript" src="js/gamemodes/Game.js"></script>
		<script type="text/javascript" src="js/gamemodes/StreakGame.js"></script>
		<script type="text/javascript" src="js/gamemodes/CountPointsGame.js"></script>
		<script type="text/javascript" src="js/gamemodes/BestOfNGame.js"></script>
		<script type="text/javascript" src="js/MouseTracker.js"></script>
		<script type="text/javascript" src="js/CanvasDrawer.js"></script>
		<script type="text/javascript" src="js/FpsCounter.js"></script>
		<script type="text/javascript" src="js/vektorFunksjoner.js"></script> <!--Inkluderer en haug med generelle vektorfunksjoner-->
		<script type="text/javascript" src="js/diverseFunksjoner.js"></script> <!--Inkluderer noen diverse andre funksjoner-->

		

		<script>
			//Bruker strict for klasser
			"use strict"
			let antijuks = 0;

			let canvas = document.querySelector('#flyBoks');
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
			canvas.style.height = (window.innerHeight)+'px';

			let game = new <?php
				echo(array_key_exists("gamemode", $_GET) ? $_GET["gamemode"] : "CountPointsGame");
			?> ({
				canvasTag: '#flyBoks'
			});

			let t = 0;

			function animer() {
				game.nextFrame();
				
				document.getElementById("tidsViser").innerHTML = t; //Skrive ut tiden
				t++; //øke tiden

				requestAnimationFrame(animer);
			}

			requestAnimationFrame(animer);
		</script>
	</body>
</html>