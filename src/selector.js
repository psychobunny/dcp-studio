var Selector;

(function() {
	var selector_obj;

	Selector = function(canvas) {

		this.canvas = (canvas.getContext) ? canvas : document.getElementById(canvas);
		this.mousedown = 0;
		this.originX = false;
		this.originY = false;

		selector_obj = document.createElement('div');
		selector_obj.className = 'selector';

		this.canvas.appendChild(selector_obj);
		Selector.pause = false;

		this.canvas.addEventListener("mousemove", function(ev) {

			if (this.mousedown === 1) {
				
				if (this.originX < ev.clientX) {
					selector_obj.style.width = (ev.clientX-this.originX) + 'px';					
					selector_obj.style.left = this.originX + 'px';
				} else {					
					selector_obj.style.width = (this.originX-ev.clientX) + 'px';
					selector_obj.style.left = ev.clientX + 'px';
				}

				if (this.originY < ev.clientY) {
					selector_obj.style.height = (ev.clientY-this.originY) + 'px';
					selector_obj.style.top = this.originY + 'px';
				} else {
					selector_obj.style.height = (this.originY-ev.clientY) + 'px';
					selector_obj.style.top = ev.clientY + 'px';
				}
			}
			
		}.bind(this));

		this.canvas.addEventListener("mousedown", function(ev) {
			if (ev.clientX <= 15 || ev.clientY <= 15 || Selector.pause === true) return;

			this.canvas.style.zIndex = 50;
			this.originX = ev.clientX;
			this.originY = ev.clientY;

			selector_obj.style.top = this.originY + 'px';
			selector_obj.style.left = this.originX + 'px';
			selector_obj.style.display = 'block';

			this.mousedown = ev.button + 1;
		}.bind(this));

		this.canvas.addEventListener("mouseup", function(ev) {
			if (Selector.pause === true) return;

			deactivateElements(); // this might not be the best place to put this

			if (Selector.isActive()) {
				//var selectorLeft = (ev.clientX < this.originX) ? ev.clientX : this.originX,
					//selectorTop = (ev.clientY < this.originY) ? (ev.clientY - this.originY) : this.originY,
				var selectorLeft = parseInt(selector_obj.style.left),
					selectorTop = parseInt(selector_obj.style.top),
					selectorRight = selectorLeft + parseInt(selector_obj.style.width),
					selectorBottom = selectorTop + parseInt(selector_obj.style.height);
				
				var elements = document.getElementById('canvas').getElementsByClassName('canvas-element');
				
				for (var el in elements) {
					if (elements.hasOwnProperty(el)) {
						var elementTop = parseInt(elements[el].style.top),
							elementLeft = parseInt(elements[el].style.left),
							elementRight = elementLeft + parseInt(elements[el].style.width),
							elementBottom = elementTop + parseInt(elements[el].style.height);
	//console.log('elementtop: ' + elementTop + ' selector: ' + selectorTop);
	//console.log('elementbottom: ' + elementBottom + ' selector' + selectorBottom);
						if ((selectorTop < elementBottom && selectorTop > elementTop)){// || (selectorBottom > elementBottom && selectorTop < elementTop)) {
							activateElements([elements[el]], false);
						}
					}
				}

			}

			

			this.originX = false;
			this.originY = false;

			this.canvas.style.zIndex = 1;
			selector_obj.style.display = 'none';
			selector_obj.style.width = '0px';
			selector_obj.style.height = '0px';

			this.mousedown = 0;
		}.bind(this));

	};
	Selector.pause = false;

	Selector.isActive = function() {
		return (parseInt(selector_obj.style.width) > 5 || parseInt(selector_obj.style.height) > 5);
	}


}());