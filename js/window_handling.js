var ext = ".mp4";


var lensHeightMult = .585;
var lensWidthMult  = .34;

$(document).ready(function(){

	// see what browser they're using and add appropriate extension
	if ($.browser.webkit) {
		ext = ".mp4";
	}
	if ($.browser.mozilla) {
		ext = ".webm";
	}
	
});

window.onload = function()
{
	// window has fully loaded
	lensWidth  = $("#lens1").width();
	lensHeight = $("#lens1").height();
	
	//		<canvas id="canvas0" class="canvas" data-processing-sources="anything.pde"></canvas>

$("#lens0").html('<canvas id="canvas0" class="canvas" data-processing-sources="anything.pde"></canvas>');

};

$(window).resize(function() {
	//containerResize();
});


function containerResize() {

}
