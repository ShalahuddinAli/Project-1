$(() => {
	const $table = $("<table>");
	$table.attr("id", "ring").attr("cellspacing", "0");
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

	const snakePos = [{ tr: rowCell / 2, td: rowCell / 2 }];

	let randPelletteTrVal = Math.floor(Math.random() * rowCell);
	let randPelletteTdVal = Math.floor(Math.random() * rowCell);

	let $score = $("div").attr("id", "score").text(0);
	let currentScore = 0;

	// auto move

	// random pellette
	const randomPellette = () => {
		randPelletteTrVal = Math.floor(Math.random() * rowCell);
		randPelletteTdVal = Math.floor(Math.random() * rowCell);
		if (
			$("#tr" + randPelletteTrVal + "td" + randPelletteTdVal).attr("class") !==
			"snake"
		) {
			let $drawPellete = $(
				"#tr" + randPelletteTrVal + "td" + randPelletteTdVal
			);
			$drawPellete.attr("class", "pellette");
		} else {
			randomPellette();
			console.log("clash");
		}
	};
	randomPellette();

	const updateScore = () => {
		// add up to score value
		currentScore++;
		$score = $("div").attr("id", "score").text(currentScore);
	};
	//add snake tails
	const addSnake = () => {
		snakePos.push({});
		console.log(snakePos);
	};

	const drawSnake = () => {
		if (
			$("#tr" + snakePos[0].tr + "td" + snakePos[0].td).attr("class") ===
			"pellette"
		) {
			addSnake(); // snake length increasess
			randomPellette(); // make new pellette once its being hit
			updateScore();

			console.log(snakePos);
		} else {
			$("td").removeClass("snake");
		}

		for (let i = 0; i < snakePos.length; i++) {
			let $drawSnakePos = $("#tr" + snakePos[i].tr + "td" + snakePos[i].td);
			$drawSnakePos.attr("class", "snake");
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
				snakePos.unshift({ tr: snakePos[0].tr - 1, td: snakePos[0].td });
				snakePos.pop();
				drawSnake();
				break;
			case 39:
				snakePos.unshift({ tr: snakePos[0].tr, td: snakePos[0].td + 1 });
				snakePos.pop();
				drawSnake();
				break;
			case 40:
				snakePos.unshift({ tr: snakePos[0].tr + 1, td: snakePos[0].td });
				snakePos.pop();
				drawSnake();
				break;
			case 37:
				snakePos.unshift({ tr: snakePos[0].tr, td: snakePos[0].td - 1 });
				snakePos.pop();
				drawSnake();
				break;
		}
	});

	// setInterval(() => {
	// 	drawSnake();
	// }, 1000);
	//start button/reset
	//snake auto moves

	// const addSnake = () => {
	// 	snakePos.push({ tr: prevTrValue, td: prevTdValue });
	// };
});
