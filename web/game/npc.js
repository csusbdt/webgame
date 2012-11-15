function NPC(col, row) {
	this.col = col;
	this.row = row;
	this.x = col * game.cellSize;
	this.y = row * game.cellSize;
	game.grid[col][row].push(this);
}

NPC.moveSpeed = 0.1;   // pixels per millisecond
NPC.snapDistance = 5;  // pixels

NPC.prototype.draw = function(ctx) {
	ctx.drawImage(
		this.image,
		this.x + (game.cellSize - this.image.width) / 2, 
		this.y + (game.cellSize - this.image.height) / 2
	);
};

NPC.prototype.init = function(name, completionCallback) {
	var npc = this;
	this.endInit = completionCallback;
	game.runScript('npcs/' + name + '.js');	
};

NPC.prototype.setImage = function(layerIndex, imageFile, completionCallback) {
	if (imageFile === null && typeof this.image !== undefined) {
		view.removeDrawable(layerIndex, this);
		delete this.image;
		if (completionCallback) {
			completionCallback();
		}
	} else {
		this.image = new Image();
		var npc = this;
		this.image.onload = function() {
			view.addDrawable(layerIndex, npc);
			if (completionCallback) {
				completionCallback();
			}
		};
		this.image.src = 'images/' + imageFile;
	}
};

NPC.prototype.canMoveUp = function() {
	if (this.row <= 0) return false;
	var cellOccupants = game.grid[this.col][this.row - 1];
	for (var i = 0; i < cellOccupants.length; ++i) {
		if (cellOccupants[i].blocking) return false;
	}
	return true;
};

NPC.prototype.moveUp = function(completionCallback) {
	var npc = this;
	var destY = this.y - game.cellSize;
	function loop() {
		npc.y -= NPC.moveSpeed * view.dt;
		if (npc.y <= destY + NPC.snapDistance) {
			npc.y = destY;
			--npc.row;
			if (completionCallback) completionCallback();
		} else {
			requestAnimationFrame(loop);
		}
	};
	requestAnimationFrame(loop);
};

// universal greetings

(function() {
	var greetings = [
		'Hi.',
		'How\'s it goin\'?',
		'How goes it?',
		'Be safe.',
		'I\'m not sure I\'m happy to see you right now.',
		'You shoes laces are untied.',
		'Hail the mighty zoar.',
		'I voted, did you?',
		'This is a boring map.',
		'I think I\'ll take a nap.',
		'I heard the sky is falling in Pekorea.',
		'Never say never.',
		'Never say always.',
		'Hello.'
	];
	
	var nextGreeting = 0;
/*
	NPC.prototype.interact = function() {	
		game.drawFunctions.drawDialog = this.drawDialog(greetings[nextGreeting]);
		nextGreeting = (nextGreeting + 1) % greetings.length;
		game.controllerStack.push(function(e) {
			if (e.which === 32) {
				
			}
		});
	};
*/	

})();
