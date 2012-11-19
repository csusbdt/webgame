(function() {

	var canvas = document.getElementById('canvas'),
		context = canvas.getContext('2d'),
		drawableLayers = [ ],
		WEIGHT = 0.03,
		currentTime = new Date().getTime(),
		previousTime = currentTime;

	view = { 
		width: null,
		height: null
	};
	
	view.resize = function(width, height) {
		canvas.width = view.width = width;
		canvas.height = view.height = height;
	};

	view.addDrawable = function(layerIndex, drawable, duration) {
		if (typeof drawableLayers[layerIndex] === 'undefined') {
			drawableLayers[layerIndex] = [ ];
		}
		var layer = drawableLayers[layerIndex];
		for (var i = 0; i < layer.length; ++i) {
			if (layer[i] === drawable) {
				return;
			}
		}
		layer.push(drawable);
		if (typeof duration !== 'undefined') {
			setTimeout(function() {
				view.removeDrawable(layerIndex, drawable);
			}, duration);
		}
	};
	
	view.removeDrawable = function(layerIndex, drawable) {
		var layer = drawableLayers[layerIndex];
		for (var i = 0; i < layer.length; ++i) {
			if (layer[i] === drawable) {
				layer[i] = layer[layer.length - 1];
				layer.pop();
				return;
			}
		}
	};

	//////////////////////////////////////////////////////////////////////////////
	//
	// Note: Javascript Date object does not give reliable time values, so we
	//       maintain a moving average of the milliseconds per frame.
	//
	//////////////////////////////////////////////////////////////////////////////
	
	view.dt = 16;  // average milliseconds per frame
	
	function animationLoop() {
		currentTime = new Date().getTime();
		var elapsedTime = currentTime - previousTime;
		previousTime = currentTime;
		view.dt = view.dt * (1 - WEIGHT) + elapsedTime * WEIGHT;
		context.clearRect(0, 0, view.width, view.height);
		for (var layerIndex = 0; layerIndex < drawableLayers.length; ++layerIndex) {
			var layer = drawableLayers[layerIndex];
			for (var i = 0; i < layer.length; ++i) {
				layer[i].draw(context);
			}
		}
		requestAnimationFrame(animationLoop);
	};
	
	requestAnimationFrame(animationLoop);

})();
