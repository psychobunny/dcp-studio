function Draggable(element) {
	var currentElement;
	
	var ref = function(ev) {
		if (currentElement) {
			currentElement.style.left = ev.clientX - currentElement.originX + 'px';
			currentElement.style.top = ev.clientY - currentElement.originY + 'px';
		}
	};
	element.addEventListener('mousedown', function(ev) {
		Selector.pause = true;
		
		toolsMenu.parentNode.style.opacity = '0';
		if (currentElement != null) return;

		currentElement = ev.target.parentNode;
		currentElement.originX = parseInt(ev.clientX) - parseInt(currentElement.style.left);// - parseInt(currentElement.parentNode.style.left);
		currentElement.originY = parseInt(ev.clientY) - parseInt(currentElement.style.top);// - parseInt(currentElement.parentNode.style.top);

		document.getElementById('container').addEventListener('mousemove', ref);
	});

	document.body.addEventListener('mouseup', function(ev) {
		toolsMenu.parentNode.style.opacity = '0.5';

		if (currentElement) {
			Selector.pause = false;		
			currentElement.rawcss = currentElement.rawcss.replace(/left(.*?)px/g, 'left: ' + currentElement.style.left);
			currentElement.rawcss = currentElement.rawcss.replace(/top(.*?)px/g, 'top: ' + currentElement.style.top);

			document.getElementById('container').removeEventListener('mousemove', ref);
			currentElement = null;	
		}
	});
}