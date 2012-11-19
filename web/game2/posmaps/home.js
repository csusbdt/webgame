(function() {

	var pepperImage = util.getImage('pepper.png');
	
	view.resize(window.innerWidth, window.innerHeight);	
	
	var pepperNpc = {
		draw: function(ctx) {
			ctx.drawImage(pepperImage, 100, 100);
		}
	};

	view.addDrawable(0, pepperNpc);
	
	function positionSelectHandler(e) {
		var x = e.clientX;
		var y = e.clientY;
		if (x > 100 && x < 100 + pepperImage.width &&
			y > 100 && y < 100 + pepperImage.height) {
				alert('hi');
		}
	}
	
	input.handlerStack.push(positionSelectHandler);

	map.endLoad();	

})();
