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
	console.log($("#tr" + trValue + "td" + tdValue));

	const drawSnake = () => {
		let drawSnakePos = $("#tr" + trValue + "td" + tdValue);
		drawSnakePos.attr("class", "snake");
		console.log(trValue);
		if (
			trValue === -1 ||
			trValue === rowCell ||
			tdValue === -1 ||
			tdValue === rowCell
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
});
