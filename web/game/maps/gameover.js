(function() {
	game.ctx.font = "bold 12px sans-serif";
	game.ctx.fillText("game over.", 50, 50);
	
	document.getElementsByTagName('html')[0].onkeyup = function(e) {
		if (e.which === 32) {  // space 
			game.exit();
		}
	}
})();
