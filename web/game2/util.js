(function() {

	var images = { };

	util = { };

	util.getURLParameter = function(name) {
		var param = (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1];
		return param === null ? null : decodeURI(param);
	};
	
	util.exit = function() {
		window.location.assign('../index.html');
	};

	util.run = function(filename, callback) {
		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.setAttribute('src', filename);
		script.onload = function() {
			document.getElementsByTagName('head')[0].removeChild(script);
			if (typeof callback !== 'undefined') callback();
		};
		document.getElementsByTagName('head')[0].appendChild(script);
	};

	util.getImage = function(filename, completionCallback) {
		if (!images.hasOwnProperty(filename)) {
			images[filename] = new Image();
			images[filename].onload = function() {
				if (typeof completionCallback !== 'undefined') {
					completionCallback();
				}
			};
			images[filename].src = 'images/' + filename;
		}
		return images[filename];
	};

})();
