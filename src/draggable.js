function getStyle(element, style) {
	return (window.getComputedStyle ?
	    window.getComputedStyle(element, null).getPropertyValue(style) :
	    element.currentStyle ? element.currentStyle[style] : '0'
	);
}

function Draggable(element) {
	var currentElement; // this should be globally accessible
	
	var ref = function(ev) {
		if (currentElement) {
			var diffX = (parseInt(getStyle(currentElement, 'left')) - ev.clientX + currentElement.originX),
				diffY = (parseInt(getStyle(currentElement, 'top')) - ev.clientY + currentElement.originY);

			currentElement.rawcss = currentElement.rawcss.replace(/left(.*?)px/g, 'left: ' + (ev.clientX - currentElement.originX) + 'px');
			currentElement.rawcss = currentElement.rawcss.replace(/top(.*?)px/g, 'top: ' + (ev.clientY - currentElement.originY) + 'px');
			var el = currentElement.css;
			el.innerHTML = "";
		    if(el.styleSheet) el.styleSheet.cssText= currentElement.rawcss;
			else el.appendChild(document.createTextNode(currentElement.rawcss));

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

		currentElement = ev.target.parentNode;		
		currentElement.originX = parseInt(ev.clientX) - parseInt(getStyle(currentElement, 'left'));
		currentElement.originY = parseInt(ev.clientY) - parseInt(getStyle(currentElement, 'top'));

		document.getElementById('container').addEventListener('mousemove', ref);
	});

	document.body.addEventListener('mouseup', function(ev) {
		if (currentElement) {
			Selector.pause = false;		
			currentElement.rawcss = currentElement.rawcss.replace(/left(.*?)px/g, 'left: ' + getStyle(currentElement, 'left'));
			currentElement.rawcss = currentElement.rawcss.replace(/top(.*?)px/g, 'top: ' + getStyle(currentElement, 'top'));

			document.getElementById('container').removeEventListener('mousemove', ref);
			currentElement = null;	
		}
	});
}