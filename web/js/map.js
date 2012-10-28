define(['jquery'], function ($) {
	var map = { };
	map.init = function() {
		$(document).ready(function() {
			var numCols = 5;
			var numRows = 10;

			var $container = $('<div></div>');
			$('body').append($container);
			
			var $table = $('<div></div>');
			$table.addClass('table');
			$container.append($table);

			for (j = 0; j < numRows; ++j) {
				var $row = $('<div></div>');
				$row.addClass('row');
				$table.append($row);
				for (var i = 0; i < numCols; ++i) {
					var $cell = $('<div></div>');
					$cell.html('me');
					$cell.addClass('cell');
					$row.append($cell);
				}
			}
			
			$container.append(
				$('<div></div>').html('EXIT').click(function() {
					$container.fadeOut(500, function() {
						window.location = 'select.html';
					})
				})
			);

			$container.hide();
			$container.fadeIn(2000);
		});

	};
	return map;
});