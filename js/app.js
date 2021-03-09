$(() => {
	const $table = $("<table>");
	$table.attr("id", "ring").attr("cellspacing", "0").attr("border", "black");
	$("body").append($table);
	const rowCell = 20;

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
	const $start = $("<button>").text("Start").attr("id", "start");
	$("body").append($start);

	const snakePos = [{ tr: rowCell - 1, td: rowCell / 2 }];
	const direction = { tr: 1, td: 0 };
	let speedCoeff = 6;
	let randPeletteTrVal = Math.floor(Math.random() * rowCell);
	let randPeletteTdVal = Math.floor(Math.random() * rowCell);
	let currentScore = 0;
	let $score = $("div")
		.attr("id", "score")
		.text("Score: " + currentScore);
	let lastTail;
	let pelette;

	// const speedAdjuster = () => {
	// 	if (currentScore > 5) {
	// 		speedCoeff = 30;
	// 	}
	// 	if (currentScore > 10) speedCoeff = 14;
	// 	if (currentScore > 15) speedCoeff = 18;
	// 	if (currentScore > 20) speedCoeff = 22;
	// 	if (currentScore > 25) speedCoeff = 26;
	// 	if (currentScore > 30) speedCoeff = 30;
	// 	if (currentScore > 35) speedCoeff = 34;
	// };
	// random pelette
	const randomPelette = () => {
		randPeletteTrVal = Math.floor(Math.random() * rowCell);
		randPeletteTdVal = Math.floor(Math.random() * rowCell);
		pelette = { tr: randPeletteTrVal, td: randPeletteTdVal };

		snakePos.forEach((item) => {
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

	const gameOver = () => {
		//snake hit its own body
		snakePos.forEach((item, index) => {
			if (index > 0) {
				if (snakePos[0].tr == item.tr && snakePos[0].td == item.td) {
					alert("GAME OVER!");
				}
			}
		});
		if (
			snakePos[0].tr === -1 || // going outside of top border
			snakePos[0].tr === rowCell || // going outside of bottom border
			snakePos[0].td === -1 || // going outside of left border
			snakePos[0].td === rowCell //going outside of right border
		)
			alert("GAME OVER!");
	};
	const drawSnake = () => {
		moveSnake();
		for (let index in snakePos) {
			let $drawSnakePos = $(
				"#tr" + snakePos[index].tr + "td" + snakePos[index].td
			);
			$drawSnakePos.attr("class", "snake");
		}
		gameOver();
		// speedAdjuster();
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
	setInterval(() => {
		drawSnake();
	}, 1000 / speedCoeff);
});

//create table
//global variables
//random pelette
//snake render
//start game
//control snake
//snake move
