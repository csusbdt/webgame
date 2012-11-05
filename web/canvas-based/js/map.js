define([], function() {
	var drawFunctions = [];
	var npcs = [];
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
	var cellSize = 0;
	var cols = 0;
	var rows = 0;
	
	function drawGrid() {
		var col = 0,
			row = 0,
			x = 0,
			y = 0;
		for (col = 0; col < cols; ++col) {
			for (row = 0; row < rows; ++row) {
				ctx.setTransform(1, 0, 0, 1, cellSize * col, cellSize * row);
				ctx.strokeRect(0, 0, cellSize, cellSize);
			}
		}
		ctx.setTransform(1, 0, 0, 1, 0, 0);
	}
	
	function redraw() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		drawFunctions.forEach(function(draw) {
			draw();
		});
	}

	var map = {
		'init': function(CellSize, Cols, Rows) {
			cellSize = CellSize;
			cols = Cols;
			rows = Rows;
			canvas.width = cellSize * cols;
			canvas.height = cellSize * rows;
			drawGrid();
			drawFunctions.push(drawGrid);
		},
		'addNPC': function(npc, col, row) {
			npcs.push(npc);
			npc.col = col;
			npc.row = row;
			var image = new Image();
			image.onload = function() {
				npc.image = image;
				npc.draw = function() {
					ctx.drawImage(
						image, 
						col * cellSize + (cellSize - image.width) / 2, 
						row * cellSize + (cellSize - image.height) / 2
					);
				}
				drawFunctions.push(npc.draw);
				npc.draw();
			}
			image.src = '../images/' + npc.imageFile;
		},
		'addPC': function(pc, col, row) {
			this.pc = pc;
			pc.col = col;
			pc.row = row;
			pc.moveUp = function() {
				if (this.row === 0) return;
				var blocked = false;
				npcs.forEach(
					function(npc) {
						if (npc.col === pc.col && npc.row === pc.row - 1) {
							npc.interact();
							blocked = true;
						}
					}
				);
				if (!blocked) {
					--this.row;
					redraw();
				}
			}
			var image = new Image();
			image.onload = function() {
				pc.image = image;
				pc.draw = function() {
					ctx.drawImage(
						image, 
						pc.col * cellSize + (cellSize - image.width) / 2, 
						pc.row * cellSize + (cellSize - image.height) / 2
					);
				}
				drawFunctions.push(pc.draw);
				pc.draw();
			}
			image.src = '../images/' + pc.imageFile;
		}
	}

	document.getElementsByTagName('html')[0].onkeyup = function(e) {
		if (e.which === 87) {         // 'w'
			map.pc.moveUp();
		} else if (e.which === 83) {  // 's'
			alert('s');
		} else if (e.which === 65) {  // 'a'
			alert('a');
		} else if (e.which === 68) {  // 'd'
			alert('d');
		} else if (e.which === 32) {  // space 
			alert('space');
		}
	}
	return map;
});
