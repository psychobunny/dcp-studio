var Shape = Shape || {};
var unnamed = {
	'Shape' : []
};


Shape.add = function() {
	console.log('test');
	//document.body.innerHTML = "";
	var shape = document.createElement('div');
	//shape.css = "{}"
	/*shape.style = "width: 100px; height: 100px; border: 1px solid black; background: white; position: absolute; zIndex: 10000";
	shape.style.width = "100px";
	shape.style.height = "100px";
	shape.style.border = "1px solid black";
	shape.style.background = "white";
	shape.style.position = "absolute";
	shape.style.zIndex = "100000";*/
	unnamed['Shape'].push(shape);

	var id = 'shape_' + unnamed['Shape'].length;
	shape.setAttribute('id', id);
	document.getElementById('canvas').appendChild(shape);
	shape.rawcss = "#" + id + "{width: 100px;height: 100px;border: 1px solid black;background: white;position: absolute;top: 50px;left: 50px;}";
	shape.onclick = function(ev) {
		DCP.updateEditor(shape.rawcss, this);
		ev.stopPropagation();
		return false;
	}
	shape.className = 'canvas-element';
	shape.style.left = '50px';
	shape.style.top = '50px';
	Draggable(shape);
	
	var pa= document.getElementsByTagName('head')[0];
	var el= document.createElement('style');
	el.type= 'text/css';
	el.media= 'screen';
	if(el.styleSheet) el.styleSheet.cssText= shape.rawcss;
	else el.appendChild(document.createTextNode(shape.rawcss));
	pa.appendChild(el);

	shape.css = el;

};



var currentElement;

function Draggable(element) {
	var ref = function(ev) {
		currentElement.style.left = ev.clientX - currentElement.originX + 'px';
		currentElement.style.top = ev.clientY - currentElement.originY + 'px';
	};

	element.addEventListener('mousedown', function(ev) {
		Selector.pause = true;
		if (currentElement != null) return;

		currentElement = ev.target;
		currentElement.originX = parseInt(ev.clientX) - parseInt(currentElement.style.left);// - parseInt(currentElement.parentNode.style.left);
		currentElement.originY = parseInt(ev.clientY) - parseInt(currentElement.style.top);// - parseInt(currentElement.parentNode.style.top);

		document.getElementById('container').addEventListener('mousemove', ref);
	});

	document.body.addEventListener('mouseup', function(ev) {
		console.log('test');
		Selector.pause = false;		
		currentElement.rawcss = currentElement.rawcss.replace(/left(.*)px/g, 'left: ' + currentElement.style.left);

		document.getElementById('container').removeEventListener('mousemove', ref);
		currentElement = null;
	});
}