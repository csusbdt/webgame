(function() {

	var cellSize = 64,
		cols = 5,
		rows = 6,
		MOVE_SPEED = 0.1,   // pixels per millisecond
		SNAP_DISTANCE = 2,  // pixels
		PROB_UP = .18,
		PROB_LEFT = .20,
		PROB_RIGHT = .20,
		pc = { }, 
		grid = [ ],
		pepperImage;

	function Cell(col, row, up, down, left, right) {
		this.col = col;
		this.row = row;
		this.up = up;
		this.down = down;
		this.left = left;
		this.right = right;
	};
	
	Cell.prototype.draw = function(dt, ctx) {
		var len = cellSize;
		var halfLen = len / 2;
		ctx.save();
		ctx.setTransform(1, 0, 0, 1, len * this.col, len * this.row);
		ctx.beginPath();
		if (this.up) { ctx.moveTo(halfLen, halfLen); ctx.lineTo(halfLen, 0); }
		if (this.down) { ctx.moveTo(halfLen, halfLen); ctx.lineTo(halfLen, len); }
		if (this.left) { ctx.moveTo(halfLen, halfLen); ctx.lineTo(0, halfLen); }
		if (this.right) { ctx.moveTo(halfLen, halfLen); ctx.lineTo(len, halfLen); }
		ctx.stroke();
		ctx.restore();
	};

	function pathHandler(e) {
		var pcCell = grid[pc.col][pc.row];
		if (e.which === 87) {         // 'w'
			if (pc.row > 0 && pcCell.up) {
				--pc.row;
 				input.handlerStack.push(input.nullHandler);
			}
		} else if (e.which === 83) {  // 's'
			if (pcCell.down) {
				++pc.row;
 				input.handlerStack.push(input.nullHandler);
			}
		} else if (e.which === 65) {  // 'a'
			if (pcCell.left) {
				--pc.col;
 				input.handlerStack.push(input.nullHandler);
			}
		} else if (e.which === 68) {  // 'd'
			if (pcCell.right) {
				++pc.col;
 				input.handlerStack.push(input.nullHandler);
			}
		} else if (e.which === 32) {  // space
//			TODO: display help in HTML 
		}
	};
	
	view.resize(cols * cellSize, rows * cellSize);
	
	// Populate grid with empty cells.
	(function() {
		for (var x = 0; x < cols; ++x) {
			var row = [ ];
			for (var y = 0; y < rows; ++y) {
				var cell = new Cell(x, y);
				row.push(cell);
				view.addDrawable(0, cell);
			}
			grid.push(row);
		}
	})();
	
	// Initialize player character.
	
	pc.col = Math.floor(Math.random() * cols / 2);
	pc.row = 0;
	pc.x = pc.col * cellSize;
	pc.y = pc.row * cellSize;
	pc.drawOffsetX = 0;
	pc.drawOffsetY = 0;

	pc.draw = function(dt, ctx) {
		var destX = pc.col * cellSize;
		var destY = pc.row * cellSize;
		var delta = MOVE_SPEED * dt;
		if (pc.x < destX) {
			pc.x += delta;
			if (pc.x > destX - SNAP_DISTANCE) pc.x = destX;
		} else if (pc.x > destX) {
			pc.x -= delta;
			if (pc.x < destX + SNAP_DISTANCE) pc.x = destX;
		}
		if (pc.y < destY) {
			pc.y += delta;
			if (pc.y > destY - SNAP_DISTANCE) pc.y = destY;
		} else if (pc.y > destY) {
			pc.y -= delta;
			if (pc.y < destY + SNAP_DISTANCE) pc.y = destY;
		}
		if (input.handlerStack[input.handlerStack.length - 1] === input.nullHandler && 
			destX === pc.x && 
			destY === pc.y) {
			input.handlerStack.pop();
			if (pc.row >= rows) {
				input.handlerStack.pop();
				map.startLoad('pathmaps/gameover');
			}
		}
		ctx.drawImage(pepperImage, pc.x + pc.drawOffsetX, pc.y + pc.drawOffsetY);
	};
	
	pepperImage = util.getImage('pepper.png', function() {
		pc.drawOffsetX = (cellSize - pepperImage.width) / 2;
		pc.drawOffsetY = (cellSize - pepperImage.height) / 2;
	});

	// Create random path.
	(function() {
		var x = pc.col;
		var y = pc.row;
		grid[x][y].up = true;
		while (y < rows) {
			var p = Math.random();
			if (p < PROB_LEFT) { // move left
				if (x > 0) {
					grid[x][y].left = true;
					--x;
					grid[x][y].right = true;
				}
			} else if (p < PROB_LEFT + PROB_RIGHT) { // move right
				if (x < cols - 1) {
					grid[x][y].right = true;
					++x;
					grid[x][y].left = true;
				}
			} else if (p < PROB_LEFT + PROB_RIGHT + PROB_UP) {  // move up
				if (y > 0) {
					grid[x][y].up = true;
					--y;
					grid[x][y].down = true;
				}
			} else {  // move down
				grid[x][y].down = true;
				++y;
				if (y < rows) grid[x][y].up = true;
			}
			if (y < rows) view.addDrawable(0, grid[x][y]);
		}
	})();

	view.addDrawable(1, pc);
	
	input.handlerStack.push(pathHandler);
	
	map.endLoad();	

})();
