<?php
	$fname = "highscore.txt";
	$handle = fopen($fname, "r+");
	$highscore = (int) fread($handle, filesize($fname));
	fclose($handle);
	if ($_POST) {
		$newScore = (int) $_POST["score"];

		if ($newScore > $highscore) {
			$handle = fopen($fname, "w+");
			fwrite($handle, $newScore);
			fclose($handle);
			echo("success");
		}
		else {
			echo("fail");
		}
	}
	else {
		echo($highscore);
	}
?>