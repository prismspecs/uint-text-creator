// just two colors for now, unless we wanna do some half brightness stuff
var colors = ["black","white"];
var color_count = 2;

// rows and columns of matrix... 16 high
var rows = 16;
var columns = 6;

// set size of boxes array
var boxes  = [];
var total_dots = 96;

// check for mousedown
var mouseDown = 0;

// quick indent code
var indent = "&nbsp;&nbsp;&nbsp;&nbsp;";
// var type as in uint16_t or 8_t
var vartype = "uint16_t";

$(document).ready(function(){
	// check for mouse down, set flag
	document.body.onmousedown = function() { 
	  ++mouseDown;
	}
	document.body.onmouseup = function() {
	  --mouseDown;
	}

	// check for mouseenter/leave for border change and if mouse is down, toggle box
	$(document).on("mouseenter",".colorBox",function(){
		if(mouseDown){
			var clicked = $(this).attr("id");
			var clicked = clicked.substring('box'.length);
			next_color(clicked);
			make_code();
  		}  		
		$(this).css("border-color","#ff0");
		}).on("mouseleave", ".colorBox", function() {
		$(this).css("border-color","#aaa");
    });

    // if user clicks a single box, toggle it
	$(document).on("click",".colorBox",function(){
		var clicked = $(this).attr("id");
		var clicked = clicked.substring('box'.length);
		next_color(clicked);
		make_code();
	});
});

function next_color(i) {
	// loop colors
	boxes[i] ++;
	if (boxes[i] > color_count - 1) { boxes[i] = 0; }
	
	// set color
	$("#box" + i).css("background-color",colors[boxes[i]]);
}
function adjust_array() {
	//columns = columns_;
	total_dots = rows*columns;
	
	// populate array with new number of total_dots
	for (var i = 0; i < total_dots; i++ ) {
		boxes[i] = 0;
	}
	
	return false;
}

function form_submit() {
	// delete the divs
	$("#container").empty();
	
	// set columns and rows to text field values
	columns = document.form_a.column_box.value;
	rows = document.form_a.row_box.value;
	adjust_array();
	
	// adjust variable type (uint16_t or 8_t) accordingly
	if(rows < 9){vartype = "uint8_t"} else {vartype = "uint16_t"};
	// create array of colorBox divs
    for (var i=0; i < total_dots; i++ ) {
    	$('#container').append('<div class="colorBox" id="box'+i+'"></div>');
	}
	
	// set container width accordingly
	$('#container').width(columns * $('.colorBox').outerWidth());
}

function isNumber(evt) {
	// make sure user is typing only numbers into the text box
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

function make_code() {
	$("#code").empty();
	var charname = document.form_a.charname_box.value;
	// first line
	$('#code').append(vartype+ ' _' + charname +'[' + columns + '] = {');
	
	// DO ROW
	for (var offset = 0; offset < columns; offset++) {
		// DO COLUMN
		// every line after, form: 0b0000000000000011
		// set first part of string "0b"
		var bytestring = "0b";
		for (var i = rows - 1; i >= 0; i-- ) {
			// add numbers
			bytestring += boxes[(i*columns) + offset];
		}
		$('#code').append('<br>' + indent + bytestring + ';');
	}
	
	$('#code').append('<br>}');
}