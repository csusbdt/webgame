getURLParameter = function(name) {
	var param = (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1];
	return param === null ? null : decodeURI(param);
};
