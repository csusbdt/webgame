(function() {
	game.ctx.font = "bold 12px sans-serif";
	game.ctx.fillText("welcome to the forest.", 50, 50);
	
	document.getElementsByTagName('html')[0].onkeyup = function(e) {
		if (e.which === 87) {         // 'w'
		} else if (e.which === 83) {  // 's'
		} else if (e.which === 65) {  // 'a'
		} else if (e.which === 68) {  // 'd'
		} else if (e.which === 32) {  // space 
			game.loadMap("gameover");
		}
	}
})();
