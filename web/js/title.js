define(['jquery'], function ($) {
	var title = { };
	title.init = function() {
		$('body').append('<div><a href="select.html">select</a></div>');
	};
	return title;
});