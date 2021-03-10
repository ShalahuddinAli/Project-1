$(() => {
	const rowCell = 20;
	let snakePos = [
		{ tr: rowCell - 4, td: rowCell / 2 },
		{ tr: rowCell - 3, td: rowCell / 2 },
		{ tr: rowCell - 2, td: rowCell / 2 },
		{ tr: rowCell - 1, td: rowCell / 2 },
	];
	let direction = { tr: 1, td: 0 };
	let speedCoeff = 6;
	let currentScore = 0;
	let $score = $("div")
		.attr("id", "score")
		.text("Score: " + currentScore);
	let resetCheck; // for stopping game loop
	let lastTail;
	let pelette;

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
	$table.css("opacity", "0.6");

	const $start = $("<button>").text("Start").attr("id", "start");
	$("body").append($start);

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
				randomPelette();
				console.log("clash");
			} else {
				let $drawPelette = $(
					"#tr" + randPeletteTrVal + "td" + randPeletteTdVal
				);
				$drawPelette.attr("class", "pelette");
			}
		});
	};

	randomPelette();

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
		} else {
			$("td").removeClass("snake");
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
		$start.show();
	};

	const isGameOver = () => {
		//snake hit its own body
		snakePos.forEach((item, index) => {
			if (index > 0) {
				if (snakePos[0].tr == item.tr && snakePos[0].td == item.td) {
					$table.css("opacity", "0.6");
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
			// alert(`GAME OVER! your score: ${currentScore}`);
			$table.css("opacity", "0.6");
			reset();
		}
	};
	const drawSnake = () => {
		moveSnake();
		for (let index in snakePos) {
			let $drawSnakePos = $(
				"#tr" + snakePos[index].tr + "td" + snakePos[index].td
			);
			$drawSnakePos.attr("class", "snake");
		}
		isGameOver();
		speedAdjuster();
	};

	document.addEventListener("keydown", (e) => {
		switch (e.keyCode) {
			case 38:
				if (direction.tr === 0) {
					direction.tr = 1;
					direction.td = 0;
					break;
				} else return;
			case 39:
				if (direction.td === 0) {
					direction.tr = 0;
					direction.td = -1;
					break;
				} else return;
			case 40:
				if (direction.tr === 0) {
					direction.tr = -1;
					direction.td = 0;
					break;
				} else return;
			case 37:
				if (direction.td === 0) {
					direction.tr = 0;
					direction.td = 1;
					break;
				} else return;
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
		main();
		$("#start").hide();
	});
});

//create table
//global variables
//random pelette
//snake render
//start game
//control snake
//snake move
