$(() => {
	const rowCell = 24;
	const eatSound = new Audio("audio/eatPalette.mpeg");
	const loseSound = new Audio("audio/loser.wav");
	let snakePos = [
		{ tr: rowCell - 4, td: rowCell / 2 },
		{ tr: rowCell - 3, td: rowCell / 2 },
		{ tr: rowCell - 2, td: rowCell / 2 },
		{ tr: rowCell - 1, td: rowCell / 2 },
	];
	let speedCoeff = 6;
	let currentScore = 0;
	let $score = $("div:first")
		.attr("id", "score")
		.text("Score: " + currentScore)
		.hide();
	let $gameOver = $("div:last").attr("id", "game-over").hide();
	let resetCheck; // for stopping game loop
	let direction; // "+1" going Up and Left, "-1" Down and Right
	let lastTail;
	let pelette;

	const $start = $("<button>").text("Start").attr("id", "start");
	$("body").append($start);

	const $table = $("<table>");
	$table.attr("id", "ring").attr("cellspacing", "0").attr("border", "black");
	$("body").append($table);

	for (let i = 0; i < rowCell; i++) {
		//rows
		const $row = $("<tr>").attr("id", `tr${i}`);
		$table.append($row);
		for (let j = 0; j < rowCell; j++) {
			const $cell = $("<td>");
			$cell.attr("id", `tr${i}td${j}`);
			$table.append($cell);
		}
	}
	$table.css("opacity", "0.5");

	const speedAdjuster = () => {
		if (currentScore > 3) speedCoeff = 7;
		if (currentScore > 9) speedCoeff = 10;
		if (currentScore > 14) speedCoeff = 14;
		if (currentScore > 18) speedCoeff = 18;
		if (currentScore > 25) speedCoeff = 22;
		if (currentScore > 35) speedCoeff = 25;
		if (currentScore > 45) speedCoeff = 30;
		if (currentScore > 50) speedCoeff = 40;
	};

	// random pelette
	const randomPelette = () => {
		const randPeletteTrVal = Math.floor(Math.random() * rowCell);
		const randPeletteTdVal = Math.floor(Math.random() * rowCell);
		pelette = { tr: randPeletteTrVal, td: randPeletteTdVal };

		snakePos.forEach((item) => {
			// check for conlict with snake pos.
			if (pelette.tr === item.tr && pelette.td === item.td) {
				randomPelette(); //loop the function back if conflict occured
			} else {
				let $drawPelette = $(
					"#tr" + randPeletteTrVal + "td" + randPeletteTdVal
				);
				$drawPelette.attr("class", "pelette");
			}
		});
	};

	const updateScore = () => {
		// add up to score value
		currentScore++;
		$score.text("Score: " + currentScore);
	};
	//add snake tails
	const addSnake = () => {
		snakePos.push(lastTail);
	};

	const moveSnake = () => {
		if (snakePos[0].tr === pelette.tr && snakePos[0].td === pelette.td) {
			addSnake(); // snake length increasess
			randomPelette(); // make new pelette once its being hit
			updateScore();
			eatSound.currentTime = 0; // allow for replaying the sound without completing the prev played sound
			eatSound.play();
		} else {
			$("td").removeClass("snake").removeClass("head");
		}
		lastTail = snakePos[snakePos.length - 1];
		snakePos.unshift({
			tr: snakePos[0].tr - direction.tr,
			td: snakePos[0].td - direction.td,
		});
		snakePos.pop();
	};

	const reset = () => {
		snakePos = [
			{ tr: rowCell - 4, td: rowCell / 2 },
			{ tr: rowCell - 3, td: rowCell / 2 },
			{ tr: rowCell - 2, td: rowCell / 2 },
			{ tr: rowCell - 1, td: rowCell / 2 },
		];
		direction = { tr: 1, td: 0 };
		speedCoeff = 6;
		currentScore = 0;
		$score.text("Score: " + currentScore);
		resetCheck = false;
		$start.text("Restart");
		$("td").removeClass("snake").removeClass("head").removeClass("pelette");
		setTimeout(() => {
			$start.show(); // letting the game-over music ends first
		}, 3500);
	};

	const isGameOver = () => {
		//snake hit its own body
		snakePos.forEach((item, index) => {
			if (index > 0) {
				// to ommit snackPos[0]
				if (snakePos[0].tr == item.tr && snakePos[0].td == item.td) {
					loseSound.play();
					$table.css("opacity", "0.5");
					$gameOver.text(`Your Score: ${currentScore}`);
					$gameOver.show();
					$score.hide();
					reset();
				}
			}
		});
		if (
			snakePos[0].tr === -1 || // going outside of top border
			snakePos[0].tr === rowCell || // going outside of bottom border
			snakePos[0].td === -1 || // going outside of left border
			snakePos[0].td === rowCell //going outside of right border
		) {
			loseSound.play();
			$table.css("opacity", "0.5");
			$gameOver.text(`Your Score: ${currentScore}`);
			$gameOver.show();
			$score.hide();
			reset();
		}
	};
	const drawSnake = () => {
		moveSnake();
		for (let i = 0; i < snakePos.length; i++) {
			let $drawSnakePos = $(
				"#tr" + snakePos[i].tr + "td" + snakePos[i].td // assigning snake parts(object) to its corresponding cell
			);
			if (i === 0) {
				$drawSnakePos.attr("class", "head");
			} else {
				$drawSnakePos.attr("class", "snake"); //class assingment is for coloring of snake body.
			}
		}

		isGameOver();
		speedAdjuster();
	};

	$(document).on("keydown", (e) => {
		switch (e.keyCode) {
			case 38:
				if (direction.tr === 0) {
					direction.tr = 1;
					direction.td = 0;
					break;
				} else break;
			case 39:
				if (direction.td === 0) {
					direction.tr = 0;
					direction.td = -1;
					break;
				} else break;
			case 40:
				if (direction.tr === 0) {
					direction.tr = -1;
					direction.td = 0;
					break;
				} else break;
			case 37:
				if (direction.td === 0) {
					direction.tr = 0;
					direction.td = 1;
					break;
				} else break;
		}
	});
	const main = () => {
		if (resetCheck === true) {
			$table.css("opacity", "1");
			setTimeout(() => {
				drawSnake();
				main();
			}, 1000 / speedCoeff);
		}
	};
	$start.on("click", function () {
		resetCheck = true;
		$gameOver.hide();
		$start.hide();
		$score.show();
		direction = { tr: 1, td: 0 };
		randomPelette();
		main();
	});
});
