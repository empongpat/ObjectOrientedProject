
function determineScreenSize(){
 	var height = window.innerHeight;
 	document.getElementById("content").style.height = height+"px";
 	document.getElementById("toolbox").style.height = height+"px";
 	document.getElementById("webpage-frame").style.height = (height*0.8)+"px";
 	document.getElementById("webpage").style.height = (height*0.8)+"px";
 	determineSizeBox();
}

function determineSizeBox() {
	//position
	var widthWebpage = document.getElementById("body-workspace").offsetWidth;
	var heightWebpage = document.getElementById("body-workspace").offsetHeight;
	var widthSizeBox = document.getElementById("size-box").offsetWidth;
 	document.getElementById("size-box").style.left = ((widthWebpage+(window.innerWidth-widthWebpage)/2)-widthSizeBox)+"px";
 	//size
 	document.getElementById("size-box").innerHTML = widthWebpage+"x"+heightWebpage;
}

function showToolbox() {
	var toolbox = document.getElementById("toolbox");

	if (toolbox.getBoundingClientRect().left==0) {
		$("#toolbox").animate({
			left: "-285px"
		},200);

		$("body").animate({
			left: "0px"
		},200);

		$(".toolbar").animate({
			left: "0px"
		},200);

	} else {
		$("#toolbox").animate({
			left: "0px"
		},200);

		$("body").animate({
			left: "285px"
		},200);

		$(".toolbar").animate({
			left: "285px"
		},200);
	}

}

function hideToolbox() {
	var toolbox = document.getElementById("toolbox");
	$("#toolbox").animate({
		left: "-285px"
	},200);

	$("body").animate({
		left: "0px"
	},200);

	$(".toolbar").animate({
			left: "0px"
	},200);
}

var focusPanel;

function focusImage(e) {
	var editPanel = e.parentNode;
	focusPanel = editPanel;
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
			var bodyWorkspace = document.getElementById("body-workspace");
			//var editPanels = bodyWorkspace.getElementsByClassName("row")[0].getElementsByTagName("div");
			var editPanelWidth = focusPanel.clientWidth;
			var editPanelHeight = focusPanel.clientHeight;
			var imageWidth = 0;
			var imageHeight = 0;
			img.onload = function(evt) {
				imageWidth = img.width;
				imageHeight = img.height;
				if (imageWidth > editPanelWidth && imageHeight > editPanelHeight) {
					var oldHeight = img.height;
					var oldWidth = img.width;
					var newHeight = (editPanelWidth/imageWidth)*oldHeight;
					var newWidth = editPanelWidth;
					var newImage = new Image(newWidth,newHeight);
					newImage.src = img.src;
					parent.appendChild(newImage);
				}
				else if (imageWidth > editPanelWidth && imageHeight < editPanelHeight) {
					var oldWidth = img.width;
					var oldHeight = img.height;
					var newWidth = editPanelWidth;
					var newHeight = (editPanelWidth/imageWidth)*oldHeight;
					var newImage = new Image(newWidth,newHeight);
					newImage.src = img.src;
					parent.appendChild(newImage);
				} 
				else if (imageWidth < editPanelWidth && imageHeight > editPanelHeight) {
					var oldWidth = img.width;
					var oldHeight = img.height;
					var newWidth = editPanelWidth;
					var newHeight = (editPanelWidth/imageWidth)*oldHeight;
					var newImage = new Image(newWidth,newHeight);
					newImage.src = img.src;
					parent.appendChild(newImage);
				}
				else {
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

//Drag&Drop functions
var startX, startY, endX, endY;
var dragNode;

function drag(e,ev) {
	ev.dataTransfer.setData("text/html", e.outerHTML);
	startX = ev.clientX;
	startY = ev.clientY;
	ev.dataTransfer.effectAllowed = "move";
	dragNode = e;
	dragNode.style.color = "gray";
}

function drop(e,ev) {
	ev.preventDefault;
	endX = ev.clientX;
	endY = ev.clientY;
	var data = ev.dataTransfer.getData("text/html");
	if (e!=dragNode) {
		dragNode.outerHTML = e.outerHTML;
		e.outerHTML = data;
	}
}

function dragLeave(e,ev) {
	if (dragNode==e) {
		e.style.color = "white";
		e.style.backgroundColor = "rgba(26,70,102,1.0)";
	}
	
}

function dragEnd(e,ev) {
	e.style.opacity = 1.0;
	e.style.backgroundColor = "black";
}

function allowDrop(e,ev) {
	ev.preventDefault();
	highlight(e);
}

function nodeLeave(e,ev) {
	normal(e);
}

function receiveNode(e,ev) {
	e.style.border = "1px dotted gray";
	e.style.backgroundColor = "white";
	var panel = e;
	switch (dragNode.getElementsByClassName("icon-name")[0].innerHTML) {
		case "Navigation":
			$(e).load("navigationBarModule.html");
			break;
		case "Image":
			$(e).load("imageModule.html");
			break;
		case "Video":
			break;
		case "Text":
			$(e).load("textModule.html");
			break;
		case "Link":
			$(e).load("linkModule.html");
			break;
		case "Comment":
			break;
		case "Form":
			break;
		case "Block":
			$(e).load("blockModule.html");
			break;
		case "Map":
			$(e).load("mapModule.html");
			break;	
		default:
			break;
	}
}

function highlight(e) {
	e.style.opacity = "1.0";
	e.style.backgroundColor = "blue";
}

function normal(e) {
	e.style.opacity = "1.0";
	e.style.backgroundColor = "white";
}

function saveSettings(e) {
	var contentHeight = document.getElementById("content-height");
	var backgroundColor = document.getElementById("background-color");
	var numberOfRows = document.getElementById("num-of-rows");
	var numOfColsPerRow = document.getElementById("num-of-cols-per-row");
	var height = contentHeight.value;
	var color = backgroundColor.value;
	var rows = numberOfRows.value;
	var cols = numOfColsPerRow.value;
	updateSettings(height,color,rows,cols);
}

var rowsHave = 8;
var colsHeight = 96;

function updateSettings(height,color,rows,cols) {
	var widthWebpage = document.getElementById("body-workspace").offsetWidth;
	document.getElementById("body-workspace").style.height = height+"px";
	document.getElementById("body-workspace").style.backgroundColor = color;
	document.getElementById("size-box").innerHTML = widthWebpage+"x"+height;
	document.getElementById("body-workspace").innerHTML = "";
	insertRows(rows);
	insertCols(cols,height);
	rowsHave = rows;
	document.getElementById("edit-body").innerHTML = "";
}

function saveEdit() {
	var editMenu = document.getElementById("edit-modal");
	var inputs = editMenu.getElementsByTagName("input");
	var bodyWorkspace = document.getElementById("body-workspace");
	bodyWorkspace.innerHTML = "";
	insertRows(inputs.length);
	for (var i in inputs) {
		var rows = bodyWorkspace.getElementsByClassName("row");
		adjustCols(inputs[i].value, rows[i]);
	}
	
}

function insertRows(rows) {
	var bodyWorkspace = document.getElementById("body-workspace");
	for (var i=0; i<rows; i++) {
		$(bodyWorkspace).append("<div class='row'></div>");
	}
	
}

function adjustCols(cols,row) {
	switch (cols) {
		case "1": colClass = "col-sm-12";
				break;
		case "2": colClass = "col-sm-6";
				break;
		case "3": colClass = "col-sm-4";
				break;
		case "4": colClass = "col-sm-3";
				break;
		case "6": colClass = "col-sm-2";
				break;
		case "12": colClass = "col-sm-1";
				break;
		default: colClass = "col-sm-2";
		break;
	}
	for (var j=0; j<cols; j++) {
			$(row).append("<div class='"+colClass+"' style='height:"+colsHeight+"px' ondrop='receiveNode(this,event);' ondragover='allowDrop(this,event);' ondragleave='nodeLeave(this,event)'>");
	}
}

function insertCols(cols,height) {
	var bodyWorkspace = document.getElementById("body-workspace");
	var rows = bodyWorkspace.getElementsByClassName("row");
	var colClass;
	switch (cols) {
		case "1": colClass = "col-sm-12";
				break;
		case "2": colClass = "col-sm-6";
				break;
		case "3": colClass = "col-sm-4";
				break;
		case "4": colClass = "col-sm-3";
				break;
		case "6": colClass = "col-sm-2";
				break;
		case "12": colClass = "col-sm-1";
				break;
		default: colClass = "col-sm-2";
		break;
	}
	var colHeight = height/rows.length;
	colsHeight = colHeight;
	for (var i in rows) {
		for (var j=0; j<cols; j++) {
			$(rows[i]).append("<div class='"+colClass+"' style='height:"+colHeight+"px' ondrop='receiveNode(this,event);' ondragover='allowDrop(this,event);' ondragleave='nodeLeave(this,event)'>");
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

function saveLink(e) {
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
	parent.innerHTML = "<a href='#'>"+text+"</a>";
}

function saveMap(e) {
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
	parent.innerHTML = text;
}