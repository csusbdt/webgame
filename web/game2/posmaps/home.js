(function() {

	var pepperImage = util.getImage('pepper.png');
	
	view.resize(document.getElementById('content').clientWidth, 
				document.getElementById('content').clientHeight);	
	
	var pepperNpc = {
		draw: function(dt, ctx) {
			ctx.drawImage(pepperImage, 100, 100);
		}
	};

	view.addDrawable(0, pepperNpc);
	
	function positionSelectHandler(e) {
		var x = e.clientX;
		var y = e.clientY;
		if (x > 100 && x < 100 + pepperImage.width &&
			y > 100 && y < 100 + pepperImage.height) {
				util.exit();
		}
	}
	
	input.handlerStack.push(positionSelectHandler);

	map.endLoad();	

})();
