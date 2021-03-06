(function() {

	var canvas = document.getElementById('canvas'),
		context = canvas.getContext('2d'),
		drawableLayers = [ ],
		WEIGHT = 0.03,
		currentTime = new Date().getTime(),
		previousTime = currentTime,
		dt = 16;  // average milliseconds per frame

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

	// The following code removes all occurrences of the given drawable.
	view.removeDrawable = function(drawable) {
		for (var layerIndex = 0; layerIndex < drawableLayers.length; ++layerIndex) {
			var layer = drawableLayers[layerIndex];
			for (var i = layer.length - 1; i > 0; --i) {
				if (layer[i] === drawable) {
					// Overwrite with the last element and then pop.
					layer[i] = layer[layer.length - 1];
					layer.pop();
				}
			}
		}
	};
	
	view.removeAllDrawables = function() {
		drawableLayers.length = 0;
	};

	//////////////////////////////////////////////////////////////////////////////
	//
	// Note: Javascript Date object does not give reliable time values, so we
	//       maintain a moving average of the milliseconds per frame.
	//
	//////////////////////////////////////////////////////////////////////////////
	
	function animationLoop() {
		currentTime = new Date().getTime();
		var elapsedTime = currentTime - previousTime;
		previousTime = currentTime;
		dt = dt * (1 - WEIGHT) + elapsedTime * WEIGHT;
		context.clearRect(0, 0, view.width, view.height);
		for (var layerIndex = 0; layerIndex < drawableLayers.length; ++layerIndex) {
			var layer = drawableLayers[layerIndex];
			for (var i = 0; i < layer.length; ++i) {
				layer[i].draw(dt, context);
			}
		}
		requestAnimationFrame(animationLoop);
	};
	
	requestAnimationFrame(animationLoop);

})();
