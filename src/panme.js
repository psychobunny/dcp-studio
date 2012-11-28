
// requires Mousetrap.js
function PanMe(element) {
	var element = document.getElementById(element);
	element.style.left = '50px';
	element.style.top = '50px';

	element.temp = {
		'cursor' : element.style.cursor,
		'pannable' : false,
		'mouse' : 0
	};

	Mousetrap.bind('space', function() {
		Selector.pause = true; // todo: hax

		element.pannable = true;
		element.style.cursor = "pointer";
		element.onmousedown = function(ev) {
			this.temp.button = 1;
			this.temp.left = ev.clientX - parseInt(this.style.left);
			this.temp.top = ev.clientY - parseInt(this.style.top);
		}
		element.onmouseup = function() {
			this.temp.button = 0;

		}

		element.onmousemove = function(ev) {
			if (this.temp.button > 0) {
				this.style.left = ev.clientX - this.temp.left + 'px';
				this.style.top = ev.clientY - this.temp.top + 'px';
			}
		}
	}, 'keydown');

	Mousetrap.bind('space', function() {
		Selector.pause = false; // todo: hax

		element.pannable = false;
		element.style.cursor = element.temp.cursor;
		element.temp.button = 0;
		element.onmousedown = null;
		element.onmouseup = null;
	}, 'keyup');
}
