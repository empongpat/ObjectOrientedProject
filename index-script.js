var scrollPos = 0;
var chosenTypeIndex;
var focusPanel;

window.onscroll = function() {
	scrollPos = $(window).scrollTop();
	var logoHeight = document.getElementById("logo").offsetHeight;
	if (scrollPos>=logoHeight) {
		document.getElementById("nav").style.position = "fixed";
		document.getElementById("nav").style.top = "0";
	} else {
		document.getElementById("nav").style.position = "static";
		//document.getElementById("first-row").style.marginTop = "0px";
	}
	
}

function chooseType(e) {
	var types = document.getElementsByClassName("addType");
	for (var i=0; i<types.length; i++) {
		types[i].style.border = "none";
		if (e==types[i]) {
			chosenTypeIndex = i;
		}
	}
	e.style.border = "3px dashed #e86100";
}

function selectedModule(index) {
	var editPanels = document.getElementsByClassName("editPanel");
	var lastRow = editPanels[editPanels.length-1];
	switch(index) {
		case 0: $(lastRow).load("imageModule.html");
				break;
		case 1: $(lastRow).load("textModule.html");
				break;
		case 2: $(lastRow).load("lineModule.html");
				break;
		default:alert("didn't choose anything");
				lastRow.outerHTML = ""; 
	}
}

function editItem(e) {
	var parent = e.parentNode;
	switch (focusPanel.childNodes[0].className) {
		case "image-module": console.log("Image");
							 break;
		case "text-module": console.log("Text");
							break;
		case "line-module": console.log("Line");
							break;
	}
	console.log(focusPanel.childNodes[0].className);
	/*parent.innerHTML = "<textarea id='textInput' class='textInput'></textarea><button onclick='saveItem(this);' id='saveButton' class='saveButton'>Save</button>";
	var saveButton = document.getElementById("saveButton");
	saveButton.addEventListener("click", saveItem,false);*/
}

function addItem(e) {
	toggle('blanket');
	toggle('popupAdd');
	var parent = e.parentNode;
	var container = document.getElementsByClassName("container");
	var addPanel = document.getElementById("addPanel");
	addPanel.outerHTML = "";
	$(container[0]).append("<div class='editPanel' onmousemove='popupOption(this)' onmouseleave='closeOption(this,event)' draggable='true' ondragstart='drag(this,event);'' ondrop='drop(this,event);' ondragover='allowDrop(this,event);' ondragleave='dragLeave(this,event);'ondragend='dragEnd(this,event)'></div>");
	selectedModule(chosenTypeIndex);
	$(container[0]).append("<div id='addPanel'></div>");
	$(document.getElementById("addPanel")).load("addPanel.html");
}

function removeItem(e) {
	var parent = e.parentNode;
	var editPanels = document.getElementsByClassName("editPanel");
	for (var i=0; i<editPanels.length; i++) {
		if (focusPanel==editPanels[i]) {
			editPanels[i].outerHTML = "";
			parent.style.opacity = 0;
			break;
		}
	}
}

function saveItem(e) {
	var parent = e.parentNode;
	var index = 0;
	var buttons = document.getElementsByClassName("saveButton");
	var textAreas = document.getElementsByClassName("textInput");
	for (var i=0; i<buttons.length; i++) {
		if (e==buttons[i]) {
			index = i;
			break;
		}
	}
	
	var text = textAreas[index].value;
	parent.innerHTML = "<p>"+text+"</p>";
}

function uploadImage(input) {
	var file = input.files[0];
	var imageType = /image.*/;
	var parent = input.parentNode;
	parent.innerHTML = "";
	var img = new Image();
	var reader = new FileReader();
	if (file.type.match(imageType)) {
		reader.onloadend = function (evt) {
			img.src = reader.result;
			parent.parentNode.style.height = "auto";
			var editPanels = document.getElementsByClassName("editPanel");
			var editPanelWidth = editPanels[0].clientWidth;
			var imageWidth = 0;
			img.onload = function(evt) {
				imageWidth = img.width;
				if (imageWidth > editPanelWidth) {
					var oldHeight = img.height;
					var newHeight = (editPanelWidth/imageWidth)*oldHeight;
					var newImage = new Image(editPanelWidth,newHeight);
					newImage.src = img.src;
					parent.appendChild(newImage);

				} else {
					parent.appendChild(img);
				}
			}
			

		}

		reader.onerror = function(evt) {
			console.log("error");
		}
		
		reader.readAsDataURL(file);
	} else {
		alert("File not supported.");
	}
}


//Popup menu

function blanket_size(popupDiv) {
	var viewportheight, blanket_height;
	if (typeof window.innerWidth != 'undefined') {
		viewportheight = window.innerHeight;
	} else {
		viewportheight = document.documentElement.clientHeight;
	}
	if ((viewportheight > document.body.parentNode.scrollHeight) && (viewportheight > document.body.parentNode.clientHeight)) {
		blanket_height = viewportheight;
	} else {
		if (document.body.parentNode.clientHeight > document.body.parentNode.scrollHeight) {
			blanket_height = document.body.parentNode.clientHeight;
		} else {
			blanket_height = document.body.parentNode.scrollHeight;
		}
	}
	var blanket = document.getElementById('blanket');
	blanket.style.height = blanket_height + 'px';
	var popup = document.getElementById(popupDiv);
	var popup_height = scrollPos+viewportheight/2-200;
	popup.style.top = popup_height + 'px';
}

function window_pos(popupDiv) {
	var viewportwidth, window_width;
	if (typeof window.innerWidth != 'undefined') {
		viewportwidth = window.innerHeight;
	} else {
		viewportwidth = document.documentElement.clientHeight;
	}
	if ((viewportwidth > document.body.parentNode.scrollWidth) && (viewportwidth > document.body.parentNode.clientWidth)) {
		window_width = viewportwidth;
	} else {
		if (document.body.parentNode.clientWidth > document.body.parentNode.scrollWidth) {
			window_width = document.body.parentNode.clientWidth;
		} else {
			window_width = document.body.parentNode.scrollWidth;
		}
	}
	var popup = document.getElementById(popupDiv);
	window_width = window_width/2-200;
	popup.style.left = window_width + 'px';

}

function toggle(divId) {
	var id = document.getElementById(divId);
	if (id.style.display == 'none') {
		id.style.display = 'block';
	} else {
		id.style.display = 'none';
	}
}


function popup(windowname) {
	blanket_size(windowname);
	window_pos(windowname);
	toggle('blanket');
	toggle(windowname);
}

function closePopup(windowname) {
	toggle(windowname);
	toggle('blanket');
}


function popupOption(editPanel) {
	var panelWidth = editPanel.clientWidth;
	var panelHeight = editPanel.clientHeight;
	var offsetHeight = editPanel.offsetTop;
	var offsetWidth = editPanel.offsetLeft;
	var option = document.getElementById("popupOption");
	option.style.top = offsetHeight+"px";
	option.style.left = (offsetWidth+panelWidth - 100)+"px";
	option.style.opacity = 1;
	focusPanel = editPanel;
}

function closeOption(editPanel,evt) {
	var panelWidth = editPanel.clientWidth;
	var panelHeight = editPanel.clientHeight;
	var mouseX = evt.pageX;
	var mouseY = evt.pageY;
	var offset = $(editPanel).offset();
	var offsetXtoDoc = offset.left;
	var offsetYtoDoc = offset.top;
	var areaX = offsetXtoDoc + panelWidth
	var areaY = offsetYtoDoc + panelHeight;
	if (!(mouseY>offsetYtoDoc && mouseY<areaY && mouseX>offsetXtoDoc && mouseX<areaX)) {
		var option = document.getElementById("popupOption");
		option.style.opacity = 0;
	} 
}

//Drag&Drop functions
var startY, endY;
var dragNode;

function drag(e,ev) {
	e.style.opacity = 0.4;
	ev.dataTransfer.setData("text/html", e.outerHTML);
	startY = ev.clientY;
	ev.dataTransfer.effectAllowed = "move";
	dragNode = e;
	//alert(dragNode);
}

function drop(e,ev) {
	ev.preventDefault;
	endY = ev.clientY;
	var data = ev.dataTransfer.getData("text/html");
	if (e!=dragNode) {
		dragNode.outerHTML = e.outerHTML;
		e.outerHTML = data;
	}

	/*if (Math.abs(startY-endY) > 200) {
		if (startY<endY) {
			dragNode.outerHTML = e.outerHTML;
			e.outerHTML = data;
			//moved down
		} else {
			//move up
			dragNode.outerHTML = e.outerHTML;
			e.outerHTML = data;
		}
	}*/

	
	//ev.target.appendChild(document.getElementById(data));
}

function allowDrop(e,ev) {
	ev.preventDefault();
	e.style.border = "5px dashed #e86100";
}

function dragLeave(e,ev) {
	e.style.border = "1px solid black";
}

function dragEnd(e,ev) {
	var editPanels = document.getElementsByClassName("editPanel");
	for (var i=0; i<editPanels.length; i++) {
		editPanels[i].style.opacity = 1.0;
		editPanels[i].style.border = "1px solid black";
	}
}

