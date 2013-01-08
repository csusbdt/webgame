runScript = function(filename, callback) {
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.onload = function() {
		document.getElementsByTagName('head')[0].removeChild(script);
		if (typeof callback !== 'undefined') callback();
	};
	script.setAttribute('src', filename);
	document.getElementsByTagName('head')[0].appendChild(script);
};
