
var grid, container, canvas;

function init() {
	"use strict";
	/*global Ruler, document, window*/

	var canvas = document.getElementById('ruler'),
		ruler;

	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	ruler = new Ruler("ruler");

	ruler.render('#aaa', 'pixels', 100);

	window.onresize = function() {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;		
		ruler.render('#aaa', 'pixels', 100);
	}

	grid = new Grid('grid');
	grid.render("#ddd", 1, 10, 10);

	Selector('container');

	PanMe('canvas');
	DCP.loadControls();
	container = document.getElementById('container');
	canvas = document.getElementById('canvas');

	container.addEventListener('click', function() {
		
	});	
	container.onclick = function() {
		DCP.updateEditor("body {padding: 0;margin: 0}");
	}

}


var DCP = {};
var toolsMenu;
(function() {
	
	var controls = {};
	DCP.registerControl = function(name, description, icon, src, addMethod) {
		controls[name] = {description: description, icon: icon, src: src, addMethod: addMethod};		
	};

	DCP.loadControls = function() {
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


	DCP.updateEditor = function(code, element) {
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

var mouse = {};
mouse.button = false;

window.onload = init;
