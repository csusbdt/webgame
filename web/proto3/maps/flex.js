(function() {

	var backgroundImage = document.createElement('canvas'),
		pepperImage = new Image();

	backgroundImage.width = 1024;
	backgroundImage.height = 1024;
	var bkCtx = backgroundImage.getContext('2d');
	bkCtx.fillStyle="#00FF00";
	bkCtx.fillRect(0, 0, 1024, 1024); 	
	bkCtx.fillStyle="#FF0000";
	bkCtx.fillRect(256, 256, 512, 512); 
	
	view.addDrawable({
		draw: function(dt, ctx) {
			ctx.drawImage(backgroundImage, 0, 0);
		}
	});

	function resizeCanvas() {
		var ASPECT_RATIO = 5.0 / 3.0;
		var canvasHeight;
		var canvasWidth;
		var topMargin = 0;
		var leftMargin = 0;
		var innerWidth = $(window).innerWidth();
		var innerHeight = $(window).innerHeight();
		if (innerWidth / (1.0 * innerHeight) < ASPECT_RATIO) {
			canvasWidth = innerWidth;
			canvasHeight = innerHeight / ASPECT_RATIO;
			topMargin = (innerHeight - canvasHeight) / 2.0;
		} else {
			canvasHeight = innerHeight;
			canvasWidth = canvasHeight * ASPECT_RATIO;
			leftMargin = (innerWidth - canvasWidth) / 2.0;
		}
		view.resize(canvasWidth, canvasHeight);
	}
	
	resizeCanvas();
	$(window).resize(resizeCanvas);

// 	var timeout = null;
// 	$(window).resize(function() {
// 		clearTimeout(timeout);			
// 		timeout = setTimeout(function() {
// 			timeout = null;
// 			resizeCanvas();
// 		}, 1000);
// 	});

/*
	pepperImage.src = 'images/pepper.png';
	pc.draw = function(dt, ctx) {
		var delta = MOVE_SPEED * dt;
		if (pc.x < pc.destX) {
			pc.x += delta;
			if (pc.x > pc.destX - SNAP_DISTANCE) pc.x = pc.destX;
		} else if (pc.x > pc.destX) {
			pc.x -= delta;
			if (pc.x < pc.destX + SNAP_DISTANCE) pc.x = pc.destX;
		}
		ctx.drawImage(pepperImage, pc.x, pc.y - 32);
	}
*/
/*
	pc.x = 0;
	pc.destX = pc.x;
	pc.y = view.height - floorHeight;
	pc.destY = pc.y;

	floor.draw = function(dt, ctx) {
		ctx.save();
		ctx.lineWidth = 5;
		ctx.beginPath();
		ctx.moveTo(0, view.height - floorHeight);
		ctx.lineTo(view.width, view.height - floorHeight);
		ctx.stroke();
		ctx.restore();
	};

	view.addDrawable(pc, 1);
	view.addDrawable(floor);  // default layer is 0
	
	$('#content').click(function(e) {
		pc.destX = e.pageX - 16;
	});
*/

	map.endLoad();	

})();
