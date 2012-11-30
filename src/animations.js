var animations = animations || {};
var activeFrame;


(function() {
	var anicanvas;
	var activeElement;

	animations.init = function() {
		anicanvas = document.getElementById('anicanvas');
		
		
		Mousetrap.bind('x', function() {
			
			if (activeElements.length === 1) {
				animations.addFrame(activeElements[0]);
			}

		}, 'keypress');

	}

	animations.showCanvas = function(element) {
		anicanvas.style.opacity = 1;		

		if (activeElement !== element) {
			element.frames = element.frames || [];

			var frames = document.createElement('ul');
			anicanvas.innerHTML = "";

			anicanvas.appendChild(frames);

			for (var f in element.frames) {
				frames.appendChild(buildFrame(element, frames.children.length + 1));
			}
			
			element.ul = frames;

			activeElement = element;
			//if (element.frames[0]) {
				//activateFrame(element.frames[0]);
			//}
			
		}	
	}


	function activateFrame(frame) {
		var element = frame.element;
		addClass(element, 'transition');
		
		activeFrame = frame;
		removeClassFromElements(anicanvas.getElementsByClassName('active'), 'active');
		addClass(frame, 'active');


		var pa= document.getElementsByTagName('head')[0];
		var el= document.createElement('style');
		el.type= 'text/css';
		el.media= 'screen';
		if(el.styleSheet) el.styleSheet.cssText= frame.css;
		else el.appendChild(document.createTextNode(frame.css));
		pa.appendChild(el);

		frame.element.css = el;
		
		removeClass(element, 'transition');	
		
	}

	function buildFrame(element, frameCount) {		
		var frame = document.createElement('li');
		frame.element = element;
		frame.innerHTML = 0.5 * (frameCount) + 's';
		frame.onclick = function() {
			activateFrame(this);
		}
		frame.css = element.rawcss;
		return frame;
	}


	animations.hideCanvas = function(element) {
		anicanvas.style.opacity = 0;
	}

	animations.addFrame = function(element) {

		var frame = element.rawcss;
		element.frames.push(frame);



		var frame = document.createElement('li');
		
		frame.innerHTML = 0.5 * (element.frames.length) + 's';
		element.ul.appendChild(buildFrame(element, element.frames.length));
	}



}());