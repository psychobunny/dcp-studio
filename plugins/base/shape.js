var Shape = Shape || {};
var unnamed = {
	'Shape' : []
};


Shape.add = function() {
	deactivateElements();
	var shape = document.createElement('div');

	unnamed['Shape'].push(shape);

	var id = 'shape_' + unnamed['Shape'].length;
	shape.setAttribute('id', id);
	document.getElementById('canvas').appendChild(shape);
	shape.rawcss = "#" + id + "{width: 100px;height: 100px;border: 1px solid black;background: white;position: absolute;top: 50px;left: 50px;}";
	shape.onclick = function(ev) {
		//removeClass(element, 'transition');	
		DCP.updateEditor(shape.rawcss, this);		
		if (activeFrame) {
			//shape.frames[activeFrame].css = shape.rawcss;
			activeFrame.css = shape.rawcss
		}
		
		ev.stopPropagation();
		return false;
	}
	shape.addEventListener('mousedown', function(ev) {
		removeClass(this, 'transition');	
		activateElements([this], (!ev.shiftKey && activeElements.length <= 1));
		animations.showCanvas(this);

		ev.stopPropagation();
	});

	shape.className = 'canvas-element';
	//shape.style.left = '50px';
	//shape.style.top = '50px';
	//shape.style.width = '100px';
	//shape.style.height = '100px';

	Draggable(shape);
	Resizable(shape);

	var pa= document.getElementsByTagName('head')[0];
	var el= document.createElement('style');
	el.type= 'text/css';
	el.media= 'screen';
	if(el.styleSheet) el.styleSheet.cssText= shape.rawcss;
	else el.appendChild(document.createTextNode(shape.rawcss));
	pa.appendChild(el);

	shape.css = el;

};