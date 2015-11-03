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

function allowDrop(e,ev) {
	ev.preventDefault();
	e.style.border = "5px dashed #d7f1ff";
}

function dragLeave(e,ev) {
	if (dragNode==e) {
		e.style.color = "white";
		e.style.backgroundColor = "rgba(26,70,102,0.8)";
	}
	
}

function dragEnd(e,ev) {
	e.style.opacity = 1.0;
	e.style.backgroundColor = "black";
}