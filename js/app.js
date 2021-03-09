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

	const snakePos = [{ tr: 9, td: 10 }];

	let randPeletteTrVal = Math.floor(Math.random() * rowCell);
	let randPeletteTdVal = Math.floor(Math.random() * rowCell);
	let $score = $("div").attr("id", "score").text(0);
	let currentScore = 0;
	let lastTail;
	let pelette;
	let direction = { tr: 1, td: 0 };

	// auto move

	// random pelette
	const randomPelette = () => {
		randPeletteTrVal = Math.floor(Math.random() * rowCell);
		randPeletteTdVal = Math.floor(Math.random() * rowCell);
		// randPeletteTrVal = 4;
		// randPeletteTdVal = 5;
		pelette = { tr: randPeletteTrVal, td: randPeletteTdVal };
		console.log(pelette.tr);
		snakePos.forEach((i) => {
			if (pelette.tr === i.tr && pelette.td === i.td) {
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
	// console.log(pelette);
	const updateScore = () => {
		// add up to score value
		currentScore++;
		$score = $("div").attr("id", "score").text(currentScore);
	};
	//add snake tails
	const addSnake = () => {
		snakePos.push(lastTail);
		console.log(lastTail);
	};

	const drawSnake = () => {
		if (snakePos[0].tr === pelette.tr && snakePos[0].td === pelette.td) {
			addSnake(); // snake length increasess
			randomPelette(); // make new pelette once its being hit
			updateScore();
			console.log("working");
		} else {
			$("td").removeClass("snake");
		}
		lastTail = snakePos[snakePos.length - 1];
		snakePos.unshift({
			tr: snakePos[0].tr - direction.tr,
			td: snakePos[0].td - direction.td,
		});
		snakePos.pop();

		for (let i = 0; i < snakePos.length; i++) {
			let $drawSnakePos = $("#tr" + snakePos[i].tr + "td" + snakePos[i].td);
			$drawSnakePos.attr("class", "snake");
			// console.log(3, snakePos);
		}

		//snake hit its own body
		snakePos.forEach((i, j) => {
			if (j > 0) {
				if (snakePos[0].tr == i.tr && snakePos[0].td == i.td) {
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

	drawSnake();
	document.addEventListener("keydown", (e) => {
		switch (e.keyCode) {
			case 38:
				direction.tr = 1;
				direction.td = 0;
				break;
			case 39:
				direction.tr = 0;
				direction.td = -1;
				break;
			case 40:
				direction.tr = -1;
				direction.td = 0;
				break;
			case 37:
				direction.tr = 0;
				direction.td = 1;
				break;
		}
	});
	setInterval(() => {
		drawSnake();
	}, 200);
});
