(function() {

	input = { };

	input.nullHandler = function(e) { };

	input.handlerStack = [ input.nullHandler ];
	
	// TODO: Verify that event handlers on the window object work
	// in all browsers of interest.

	document.getElementsByTagName('html')[0].onkeyup = function(e) {
		if (input.handlerStack.length === 0) return;
		input.handlerStack[input.handlerStack.length - 1](e);
	};

	document.getElementsByTagName('html')[0].onmousedown = function(e) {
		if (input.handlerStack.length === 0) return;
		input.handlerStack[input.handlerStack.length - 1](e);
	};

})();
