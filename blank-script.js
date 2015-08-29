function determineScreenSize(){
 	var height = window.innerHeight;
 	document.getElementById("content").style.height = height+"px";
 	document.getElementById("toolbox").style.height = height+"px";
 	document.getElementById("webpage").style.height = (height-150)+"px";
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