(function() {

	game.setGrid(64, 14, 9);
	
	var title = {
		'text': "welcome home.",
		'draw': function(ctx) {
			ctx.font = "bold 12px sans-serif";
			ctx.fillText(this.text, 50, 50);
		}
	};

	view.addDrawable(0, title, 2000);
	
	var nullController = function(e) { };
	
	var controller = function(e) {
		var pc = game.npcs['pepper'];
		if (e.which === 87) {         // 'w'
			if (pc.canMoveUp()) {
				game.controllerStack.push(nullController);
				pc.moveUp(function() {
					game.controllerStack.pop();
				});
			}
		} else if (e.which === 83) {  // 's'
			if (pc.canMoveDown()) {
				game.controllerStack.push(nullController);
				pc.moveDown(function() {
					game.controllerStack.pop();
				});
			}
		} else if (e.which === 65) {  // 'a'
			if (pc.canMoveLeft()) {
				game.controllerStack.push(nullController);
				pc.moveLeft(function() {
					game.controllerStack.pop();
				});
			}
		} else if (e.which === 68) {  // 'd'
			if (pc.canMoveRight()) {
				game.controllerStack.push(nullController);
				pc.moveRight(function() {
					game.controllerStack.pop();
				});
			}
		} else if (e.which === 32) {  // space
			game.loadMap('forest')
		}
	};
	
	var staticPepper = new NPC(2, 2);
	game.npcs['staticPepper'] = staticPepper;
	staticPepper.setImage(0, 'pepper.png');
	staticPepper.blocking = true;

	game.loadNpc('pepper', 2, 5, function() {
		game.controllerStack.push(controller);
	});

})();
