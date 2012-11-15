function GridLines(cellSize, cols, rows, colOffset, rowOffset) {
	if (cellSize === undefined) cellSize = game.cellSize;
	if (cols === undefined) cols = game.cols;
	if (rows === undefined) rows = game.rows;
	if (colOffset === undefined) {
		this.colOffset = 0;
	} else {
		this.colOffset = colOffset;
	}
	if (rowOffset === undefined) {
		this.rowOffset = 0;
	} else {
		this.rowOffset = rowOffset;
	}
	this.canvas = document.createElement('canvas');
	this.canvas.width = cellSize * cols;
	this.canvas.height = cellSize * rows;
	var context = this.canvas.getContext('2d');
	for (var col = 0; col < cols; ++col) {
		for (var row = 0; row < rows; ++row) {
			context.setTransform(1, 0, 0, 1, cellSize * col, cellSize * row);
			context.strokeRect(0, 0, cellSize, cellSize);
		}
	}		
};

GridLines.prototype.draw = function(ctx) {
	ctx.drawImage(this.canvas, this.colOffset, this.rowOffset);
};
