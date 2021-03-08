$(() => {
	const $table = $("<table>");
	$table.attr("id", "ring").attr("cellspacing", "0");
	$("body").append($table);
	const rowCell = 10;

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
	let snakePos = { tr: 4, td: 5 };
	let trValue = snakePos.tr;
	let tdValue = snakePos.td;

	let randPelletteTrVal = Math.floor(Math.random() * rowCell);
	let randPelletteTdVal = Math.floor(Math.random() * rowCell);

	let $score = $("div").attr("id", "score").text(0);
	let currentScore = 0;

	console.log(currentScore);

	// random pellette
	const randomPellette = () => {
		randPelletteTrVal = Math.floor(Math.random() * rowCell);
		randPelletteTdVal = Math.floor(Math.random() * rowCell);
		let $drawPellete = $("#tr" + randPelletteTrVal + "td" + randPelletteTdVal);
		$drawPellete.attr("class", "pellette");
	};
	randomPellette();

	const updateScore = () => {
		currentScore++;
		$score = $("div").attr("id", "score").text(currentScore);
	};

	const drawSnake = () => {
		if ($("#tr" + trValue + "td" + tdValue).attr("class") === "pellette") {
			randomPellette(); // make new pellette once its being hit
			updateScore();
			console.log(currentScore);
		}
		let $drawSnakePos = $("#tr" + trValue + "td" + tdValue);
		$drawSnakePos.attr("class", "snake");
		console.log(trValue);
		if (
			trValue === -1 || // going outside of top border
			trValue === rowCell || // going outside of bottom border
			tdValue === -1 || // going outside of left border
			tdValue === rowCell //going outside of right border
		)
			alert("GAME OVER!");
	};

	drawSnake();

	document.addEventListener("keydown", (e) => {
		switch (e.keyCode) {
			case 38:
				$("td").removeClass("snake");
				trValue--;
				drawSnake();
				break;
			case 39:
				$("td").removeClass("snake");
				tdValue++;
				drawSnake();
				break;
			case 40:
				$("td").removeClass("snake");
				trValue++;
				drawSnake();
				break;
			case 37:
				$("td").removeClass("snake");
				tdValue--;
				drawSnake();
				break;
		}
	});

	// let randPelletteTrVal = Math.floor(Math.random() * rowCell);
	// let randPelletteTdVal = Math.floor(Math.random() * rowCell);
	// const randomPellette = () => {
	// 	randPelletteTrVal = Math.floor(Math.random() * rowCell);
	// 	randPelletteTdVal = Math.floor(Math.random() * rowCell);
	// 	// console.log(randPelletteTdVal);
	// 	// console.log(randPelletteTrVal);
	// 	let $drawPellete = $("#tr" + randPelletteTrVal + "td" + randPelletteTdVal);
	// 	$drawPellete.attr("class", "pellette");
	// };
	// randomPellette();
	//hit pellette
	//start button/reset
	// score
	// const updateScore = () => {
	// 	currentScore++;
	// 	$score = $("div").attr("id", "score").text(currentScore);
	// };
	//snake auto moves
	//snake tails
	//snake hit its own body
});
