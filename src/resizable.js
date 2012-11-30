function Resizable(element) {
	var PADDING = 10;
	var currentHandle = null;
	var originX, originY, originWidth, originHeight;

	var ref = function(ev) {
		var element = currentHandle.owner;		
		var currentWidth = parseInt(element.style.width);

		if (currentHandle.handle.indexOf("r") !== -1) {
			element.style.width = ev.clientX - originX + 'px';
			if ((ev.clientX) < parseInt(element.style.left)) {
				element.style.width = '0px';
			}
		}

		if (currentHandle.handle.indexOf("b") !== -1) {
			element.style.height = ev.clientY - originY + 'px';
			if ((ev.clientY) < parseInt(element.style.top)) {
				element.style.height = '0px';
			}
		}

		if (currentHandle.handle.indexOf("l") !== -1) {
			element.style.left = ev.clientX  - parseInt(element.parentNode.style.left) + 'px';
			if ((parseInt(element.style.left) + parseInt(element.parentNode.style.left)) >= (originX + originWidth)) {
				element.style.left = originX + originWidth - parseInt(element.parentNode.style.left) + 'px';
				element.style.width = '0px';
				return;
			}
			element.style.width = (originX + originWidth) - ev.clientX + 'px';			
		}

		if (currentHandle.handle.indexOf("t") !== -1) {
			element.style.top = ev.clientY  - parseInt(element.parentNode.style.top) + 'px';
			if ((parseInt(element.style.top) + parseInt(element.parentNode.style.top)) >= (originY + originHeight)) {
				element.style.top = originY + originHeight - parseInt(element.parentNode.style.top) + 'px';
				element.style.height = '0px';
				return;
			}
			element.style.height = (originY + originHeight) - ev.clientY + 'px';			
		}
	}	

	// only need one of these so make sure its only done once.
	document.body.addEventListener('mouseup', function(ev) {
		if (currentHandle) {
			currentHandle.owner.rawcss = currentHandle.owner.rawcss.replace(/height(.*?)px/g, 'height: ' + currentHandle.owner.style.height);
			currentHandle.owner.rawcss = currentHandle.owner.rawcss.replace(/width(.*?)px/g, 'width: ' + currentHandle.owner.style.width);
			currentHandle.owner.onclick(ev); // this is not the right way to do it
			document.getElementById('container').removeEventListener('mousemove', ref);
			currentHandle = null;	
		}
	});

	function startResize(ev) {
		currentHandle = ev.target;
		
		originHeight = parseInt(currentHandle.owner.style.height);
		originY = parseInt(currentHandle.owner.style.top) + parseInt(currentHandle.owner.parentNode.style.top);
				
		originWidth = parseInt(currentHandle.owner.style.width);
		originX = parseInt(currentHandle.owner.style.left) + parseInt(currentHandle.owner.parentNode.style.left);
		
		document.getElementById('container').addEventListener('mousemove', ref);
	}	

	function createResizeBox(element) {
		this.createHandles = function () {
			var handles = ['tl','tr','bl','br','t','l','r','b'], hdl, div;

			while(hdl = handles.pop()) { // is this any good? andrewsloopexperiments.com
				var div = document.createElement('div');
				div.className = hdl + '-handle handle';
				rbox.appendChild(div);
				div.onmousedown = function(ev) {
					ev.stopPropagation();
					startResize(ev);
					return false;
				}
				div.handle = hdl;
				div.owner = rbox.owner;
			}
		}

		var rbox = document.createElement('div');
		rbox.owner = element;

		rbox.style.width = "100%";
		rbox.style.height = "100%";
		rbox.style.marginTop = - PADDING / 2 - 1 + 'px'
		rbox.style.marginLeft = - PADDING / 2 - 1 + 'px'
		rbox.className = 'resize-box';
		
		element.hasResizeBox = true;
		element.appendChild(rbox);

		this.createHandles();
	}
	createResizeBox(element);

}