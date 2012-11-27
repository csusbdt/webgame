(function() {

	var MAX_WIDTH = 1024,
		MAX_HEIGHT = 720,
		MIN_WIDTH = 800,
		MIN_HEIGHT = 200,
		ASPECT_RATIO = MIN_WIDTH/MIN_HEIGHT,
		background = { };
		
	// Construct the background object.		
	(function() {
		var canvas = document.createElement('canvas');
		var context = canvas.getContext('2d');
		canvas.width = MAX_WIDTH;
		canvas.height = MAX_HEIGHT;
		background.image = canvas;
		background.x = 0;
		background.y = 0;		
		context.fillStyle="#00FF00";
		context.fillRect(0, 0, MAX_WIDTH, MAX_HEIGHT); 
		context.fillStyle="#FF0000";
		context.fillRect((MAX_WIDTH - MIN_WIDTH)/2, (MAX_HEIGHT - MIN_HEIGHT)/2, MIN_WIDTH, MIN_HEIGHT); 		
		background.draw = function(dt, ctx) {
			ctx.drawImage(background.image, background.x, background.y);
		};
	})();
	
	view.addDrawable(background);

	function resizeCanvas() {
		var canvasHeight;
		var canvasWidth;
		var canvasTopMargin = 0;
		var canvasLeftMargin = 0;
		var scale = 1;
		var screenWidth = $(window).innerWidth();
		var screenHeight = $(window).innerHeight();

		var	horizontalScale = screenWidth / MIN_WIDTH;
		var verticalScale = screenHeight / MIN_HEIGHT;
		var scale = Math.min(horizontalScale, verticalScale, 1);

		if (horizontalScale < verticalScale && horizontalScale < 1) {
			// case 1
			view.scale = horizontalScale;
			canvasWidth = screenWidth;
			canvasHeight = screenHeight;
			background.x = (MIN_WIDTH - MAX_WIDTH) / 2;
			background.y = (MIN_HEIGHT - MAX_HEIGHT) / 2;
		} else if (verticalScale < horizontalScale && verticalScale < 1) {
			// case 2
			
		} else if (screenWidth < MAX_WIDTH || screenHeight < MAX_HEIGHT) {
			// case 3
			view.scale = 1;
			canvasWidth = screenWidth;
			canvasHeight = screenHeight;
			background.x = (screenWidth - MAX_WIDTH) / 2;
			background.y = (screenHeight - MAX_HEIGHT) / 2;
		} else {
			// case 4
			view.scale = 1;
			canvasLeftMargin = (screenWidth - MAX_WIDTH) / 2;
			canvasTopMargin = (screenHeight - MAX_HEIGHT) / 2;
			canvasWidth = MAX_WIDTH;
			canvasHeight = MAX_HEIGHT;
		}
		$('#canvas').css('margin-left', canvasLeftMargin);
		$('#canvas').css('margin-top', canvasTopMargin);
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
