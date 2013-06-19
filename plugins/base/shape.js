var Shape = Shape || {};
var unnamed = {
	'Shape' : []
};


Shape.add = function() {
	inactivateElements();
	var shape = document.createElement('div');

	unnamed['Shape'].push(shape);

	var id = 'shape_' + unnamed['Shape'].length;
	shape.setAttribute('id', id);
	document.getElementById('canvas').appendChild(shape);
	shape.rawcss = getStyle('.shape');//"#" + id + "{width: 100px;height: 100px;border: 1px solid black;background: white;position: absolute;top: 50px;left: 50px;}";
	
	shape.onclick = function(ev) {
		studio.updateEditor(shape.rawcss, this);
		ev.stopPropagation();
		return false;
	}

	shape.addEventListener('mousedown', function(ev) {
		studio.updateEditor(shape.rawcss, this);
		activateElements([this], (!ev.shiftKey && activeElements.length <= 1));
		ev.stopPropagation();
	});

	shape.elementClass = 'shape' + unnamed['Shape'].length; //+id part is temp. need to count unique classes.
	shape.rawcss = shape.rawcss.replace('.shape', '.' + shape.elementClass);
	shape.className = 'canvas-element shape ' + shape.elementClass; 
	shape.style.left = '50px';
	shape.style.top = '50px';
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