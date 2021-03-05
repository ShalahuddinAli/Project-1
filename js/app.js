$(() => {
	const $table = $("<table>");
	$table.attr("id", "ring").attr("cellspacing", "0");
	$("body").append($table);

	for (let i = 0; i < 11; i++) {
		//rows
		const $row = $("<tr>");
		$table.append($row);
		for (
			let j = 0;
			j < 11;
			j++ //collumn
		) {
			const $column = $("<td>");
			$column.attr("id", `${i}${j}`);
			$table.append($column);
		}
	}
	let snakePos = { x: 5, y: 5 };

	const drawSnake = () => {};

	// switch (control) {
	// 	case "Up":
	// 		return { x: x, y: y - 1 };
	// 	case "Right":
	// 		return { x: x + 1, y: y };
	// 	case "Down":
	// 		return { x: x, y: y + 1 };
	// 	case "Left":
	// 		return { x: x - 1, y: y };
	// }
});
