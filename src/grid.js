var Grid;

(function () {
	"use strict";
	var memoized_grids = {};

	Grid = function (canvas) {
		/*global document, window, Blob*/

		this.canvas = (canvas.getContext) ? canvas : document.getElementById(canvas);
		this.ctx = this.canvas.getContext('2d');

		function fillContextWithGrid(context, grid, width, height, callback) {
			context.fillStyle = context.createPattern(grid, 'repeat');
			context.fillRect(0, 0, width, height);
		}

		function constructSVGData(color, thickness, width, height) {
			// https://developer.mozilla.org/en-US/docs/HTML/Canvas/Drawing_DOM_objects_into_a_canvas
			return "<svg xmlns='http://www.w3.org/2000/svg' width='" + (width + thickness) + "' height='" + (height + thickness) + "'><foreignObject width='100%' height='100%'>" +
				"<div xmlns='http://www.w3.org/1999/xhtml' style='border-right: " + thickness + "px solid " + color + ";border-bottom: " + thickness + "px solid " + color + ";width:" + width + "px;height:" + height + "px;'></div>" +
				"</foreignObject></svg>";
		}

		this.render = function (color, thickness, width, height, callback) {
			var svg, svgdata, grid, url, DOMURL,
				key = Array.prototype.slice.call(arguments).join('_');

			if (memoized_grids[key]) {
				fillContextWithGrid(this.ctx, memoized_grids[key], this.canvas.width, this.canvas.height);

				if (callback) {
					callback();
				}

				return;
			}

			svgdata = constructSVGData.apply(this, arguments);

			grid = document.createElement('img');

			DOMURL = window.URL || window.webkitURL || window;

			grid.onload = function () {
			    DOMURL.revokeObjectURL(url);
			    fillContextWithGrid(this.ctx, grid, this.canvas.width, this.canvas.height);

			    memoized_grids[key] = grid;

			    if (callback) {
					callback();
				}
			}.bind(this);

			svg = new Blob([svgdata], {
				type: "image/svg+xml;charset=utf-8"
			});

			url = DOMURL.createObjectURL(svg);
			grid.src = url;
		};
	};

}());
