
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
		code = code.replace(/;}/g, '}');
		code = code.replace(/}/g, '\r\n}');
		code = code.replace(/;/g, ';\r\n\t');
		code = code.replace(/{/g, '{\r\n\t');

		editor.setValue(code);
		editor.gotoLine(0);

		editor.commands.addCommand({
		    name: 'myCommand',
		    bindKey: {win: 'Ctrl-Alt-S',  mac: 'Command-M'},
		    exec: function(editor) {
		        var el = element.css;
			    if(el.styleSheet) el.styleSheet.cssText= editor.getValue();
				else el.appendChild(document.createTextNode(editor.getValue()));

				var rawcss = editor.getValue();
				rawcss = rawcss.replace(/\r\n}/g, '}');
				rawcss = rawcss.replace(/;\r\n\t/g, ';');
				rawcss = rawcss.replace(/{\r\n\t/g, '{');
				element.rawcss = rawcss;

				return false;
		    }
		});
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