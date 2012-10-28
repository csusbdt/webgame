define(['jquery'], function ($) {
	var select = { };
	select.init = function() {
		$('body').append('<div><a href="title.html">title</a></div>');
		$('body').append('<div><a href="map.html">map</a></div>');
	};
	return select;
});