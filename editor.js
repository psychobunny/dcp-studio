
var grid, container, canvas, activeElements = [];

function init() {
	"use strict";
	/*global Ruler, document, window*/

	var canvas = document.getElementById('ruler'),
		ruler;

	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	ruler = new Ruler("ruler");

	ruler.render('#aaa', 'pixels', 100);

	window.onresize = function() {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;		
		ruler.render('#aaa', 'pixels', 100);
	}

	grid = new Grid('grid');
	grid.render("#ddd", 1, 10, 10);

	Selector('container');

	PanMe('canvas');
	studio.loadControls();
	container = document.getElementById('container');
	canvas = document.getElementById('canvas');

	container.addEventListener('mouseup', function() {
		studio.updateEditor("body { padding: 0; margin: 0; }");
	});
	container.addEventListener('mousedown', function() {
		inactivateElements();
	});


}

function activateElements(elements, reset) {
	if (reset === true) inactivateElements();

	var element;

	while (element = elements.pop()) {
		if (!hasClass(element, 'active')) {
			activeElements.push(element);
			addClass(element, 'active');
		}		
	}
}

function inactivateElements() {
	var element;

	while (element = activeElements.pop()) {
		removeClass(element, 'active');
	}
}

window.onload = init;
