function NPC(col, row) {
	this.col = col;
	this.row = row;
}

NPC.prototype.draw = function() {
	game.ctx.drawImage(
		this.image,
		this.col * game.cellSize + (game.cellSize - this.image.width) / 2, 
		this.row * game.cellSize + (game.cellSize - this.image.height) / 2
	);
};

NPC.prototype.init = function(name, completionCallback) {
	var npc = this;
	this.endInit = completionCallback;
	game.runScript('npcs/' + name + '.js');	
};

NPC.prototype.setImage = function(layerIndex, imageFile, completionCallback) {
	if (imageFile === null && typeof this.image !== undefined) {
		game.removeDrawable(layerIndex, this);
		delete this.image;
		if (completionCallback) {
			completionCallback();
		}
	} else {
		this.image = new Image();
		var npc = this;
		this.image.onload = function() {
			game.addDrawable(layerIndex, npc);
			if (completionCallback) {
				completionCallback();
			}
		};
		this.image.src = 'images/' + imageFile;
	}
};

// NPC.prototype.drawDialog = function(dialog) {
// 	game.ctx.font = "bold 12px sans-serif";
// 	game.ctx.fillText(dialog, 50, 50);
// };

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


// (function() {
// 
// 	window.NPC
// })();
