function Draggable(element) {
	var currentElement; // this should be globally accessible
	
	var ref = function(ev) {
		if (currentElement) {
			var diffX = (parseInt(currentElement.style.left) - ev.clientX + currentElement.originX),
				diffY = (parseInt(currentElement.style.top) - ev.clientY + currentElement.originY);

			currentElement.style.left = ev.clientX - currentElement.originX + 'px';
			currentElement.style.top = ev.clientY - currentElement.originY + 'px';

			//move siblings
			for (var active in activeElements) {
				if (activeElements[active] == currentElement) continue;
				activeElements[active].style.left = parseInt(activeElements[active].style.left) - diffX + 'px';
				activeElements[active].style.top = parseInt(activeElements[active].style.top) - diffY + 'px';
			}
		}
	};
	element.addEventListener('mousedown', function(ev) {
		Selector.pause = true;
		
		//if (currentElement != null) return;

		currentElement = ev.target.parentNode;		
		currentElement.originX = parseInt(ev.clientX) - parseInt(currentElement.style.left);
		currentElement.originY = parseInt(ev.clientY) - parseInt(currentElement.style.top);

		document.getElementById('container').addEventListener('mousemove', ref);
	});

	document.body.addEventListener('mouseup', function(ev) {
		if (currentElement) {
			Selector.pause = false;		
			currentElement.rawcss = currentElement.rawcss.replace(/left(.*?)px/g, 'left: ' + currentElement.style.left);
			currentElement.rawcss = currentElement.rawcss.replace(/top(.*?)px/g, 'top: ' + currentElement.style.top);

			document.getElementById('container').removeEventListener('mousemove', ref);
			currentElement = null;	
		}
	});
}