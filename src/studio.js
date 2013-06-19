
var studio = {};
var toolsMenu;

(function() {
	
	var controls = {};
	studio.registerControl = function(name, description, icon, src, addMethod) {
		controls[name] = {description: description, icon: icon, src: src, addMethod: addMethod};		
	};

	studio.loadControls = function() {
		toolsMenu = toolsMenu || document.getElementById('tools-menu');		
		for (var ct in controls) {			
			var li = document.createElement('li'),
				img = document.createElement('img');

			img.src = 'plugins/' + controls[ct].icon;			
			li.onclick = controls[ct].addMethod;

			toolsMenu.appendChild(li);
			li.appendChild(img);

			var script = document.createElement('script');
			console.log(controls[ct].src);	
			script.src = 'plugins/' + controls[ct].src;

			document.body.appendChild(script);
		}		
	}



	studio.updateEditor = function(code, element) {
		code = code.replace(/;/g, ';\r\n\t').replace(/{/g, '{\r\n\t').replace('\t }', '}');
		editor.setValue(code);
		editor.gotoLine(0);

		document.getElementById('editor').onkeyup = function() {
			if (!element) return;

			element.css = editor.getValue();
			setStyle(element.elementClass, element.css);

			element.rawcss = element.css;
			//update the class as well

			return false;
		}
	}

})();



function addClass(element, classToAdd) {
	if (!hasClass(element, classToAdd)) {
		element.className = element.className + ' ' + classToAdd;
	}
}

function removeClass(element, classToRemove) {	
	if (hasClass(element, classToRemove)) {
		//temp hax b/c I can't remember syntax
		element.className = element.className.replace(classToRemove, '');
	}
}

function hasClass(element, classToFind) {	
	return (element.className.indexOf(classToFind) !== -1);
}

function setStyle(selector, rule) {
	var stylesheet = document.styleSheets[(document.styleSheets.length - 1)];

	// todo: stylesheet.addRule for internet explorer - fn needs to seperate selector from rule
	if(stylesheet.addRule) {
		throw new Error('stylesheet.addRule for IE not implemented yet');
	} else if(stylesheet.insertRule) {
		stylesheet.insertRule(rule, stylesheet.cssRules.length);
	}
};

function getStyle(selector) {
    var classes = document.styleSheets[0].rules || document.styleSheets[0].cssRules;
    for(var x = 0; x < classes.length; x++) {
        if(classes[x].selectorText == selector) {
			return classes[x].cssText ? classes[x].cssText : classes[x].style.cssText;
        }
    }
}