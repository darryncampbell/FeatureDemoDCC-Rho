var started = false;
var canvas, sigBoxWidth, sigBoxHeight, sigBoxBuffer;
var sigLineBuffer, sigLineStartX, sigLineStartY, sigLineEndX, sigLineEndY, offsetX, offsetY, adjustX, adjustY;
var context;

init = function () {
//     alert("init");
    canvas = document.getElementById('signaturePad');
    context = canvas.getContext('2d');
	
	
    createSignaturePad();
	
    adjustX = 6;  //Some browsers do not return the correct mouse/finger coordinates.  This happens on the platforms that do not support the event.offsetX element.  This corrects it.
    adjustY = 28; //Same as above
}

createSignaturePad = function () {
    // draw Signature Box;
    // alert("CreateSignaturePad");
    
	//I don;t think you need the context.save
	//context.save();

    sigBoxBuffer = 15;
    sigBoxWidth = canvas.width - (sigBoxBuffer * 2);
    sigBoxHeight = canvas.height - (sigBoxBuffer * 2);
	// Drawaing the rectangle seems to cause an issue for RhoE if you try to draw again on top of it
	// I need to look into this more but for now I am drawingthe same thing but as lines.
    //context.strokeRect(sigBoxBuffer, sigBoxBuffer, sigBoxWidth, sigBoxHeight);
    //context.restore();
	
	// I don;t think you really need the begin path. Because you are just doing lineTo 
	// Beginpath is more for drawing closed shapes
	// context.beginPath();
	x1 = sigBoxBuffer;
	y1 = sigBoxBuffer;
	x2 = x1 + sigBoxWidth;
	y2 = y1;
	x3 = x2;
	y3 = y2 + sigBoxHeight;
	x4 = x1;
	y4 = y1 + sigBoxHeight;
    context.moveTo(x1, y1);
    context.lineTo(x2 , y2);
    context.lineTo(x3 , y3);
    context.lineTo(x4 , y4);
    context.lineTo(x1 , y1);
    context.stroke();
    
	// I don;t think you need the restore
	// context.restore();

// draw Signature Line
//  alert("CreateLine");
    
	// I don't think you need the context.save
	// context.save();
	
    sigLineBuffer = 10;
    sigLineStartX = sigBoxBuffer + sigLineBuffer;
    sigLineStartY = canvas.height - sigBoxBuffer - sigLineBuffer;
    sigLineEndX = canvas.width - sigBoxBuffer - sigLineBuffer;
    sigLineEndY = sigLineStartY;
    
    //RG context.beginPath();
    context.moveTo(sigLineStartX, sigLineStartY);
    context.lineTo(sigLineEndX, sigLineEndY);
    context.stroke();
	
	//not needed
	//context.restore();
}
OnMouseDown = function (event) {
    // No need for beginPath
	//
	// context.beginPath();
    if (typeof event.offsetX != 'undefined') {
        offsetX = event.offsetX;
        offsetY = event.offsetY;
    } else {
        offsetX = event.pageX - adjustX;
        offsetY = event.pageY - adjustY;
    }
    context.moveTo(offsetX, offsetY);
//DCC 	document.getElementById('log').innerHTML += '<br>MD:' + offsetX + "," + offsetY;
    started = true;
};

// This function is called every time you move the mouse. Obviously, it only 
// draws if the tool.started state is set to true (when you are holding down 
// the mouse button).
OnMouseMove = function (event) {
    if (started) {
    if (typeof event.offsetX != 'undefined') {
        offsetX = event.offsetX;
        offsetY = event.offsetY;
    } else {
        offsetX = event.pageX - adjustX;
        offsetY = event.pageY - adjustY;
    }
//DCC     	document.getElementById('log').innerHTML += '<br>MM:' + offsetX + "," + offsetY;
    	context.lineTo(offsetX, offsetY);
	    context.stroke();
    }
};


// This is called when you release the mouse button.
OnMouseUp = function (event) {
    if (started) {
    if (typeof event.offsetX != 'undefined') {
        offsetX = event.offsetX;
        offsetY = event.offsetY;
    } else {
        offsetX = event.pageX - adjustX;
        offsetY = event.pageY - adjustY;
    }
 //DCC       document.getElementById('log').innerHTML += '<br>MU:' + offsetX + "," + offsetY;
		//I think this is redundant if you look at the coordinates on the last one
	   //RG  context.lineTo(offsetX, offsetY);
       context.stroke();
       started = false;

		//You don't need this - drawImage is more for using actual images	
		context.drawImage(canvas, 0, 0);
    }
};

OnTouchStart = function (event) {
    var x = event.touches[0].pageX - adjustX;
    var y = event.touches[0].pageY - adjustY;
    event.preventDefault();
    //RG context.beginPath();
    context.moveTo(x, y);
    //document.getElementById('f1:ihMouseMovement').value = document.getElementById('f1:ihMouseMovement').value + "b," + x + "," + y + ",";
    started = true;
};

// This function is called every time you move the mouse. Obviously, it only 
// draws if the tool.started state is set to true (when you are holding down 
// the mouse button).
OnTouchMove = function (event) {
    if (started) {
        var x = event.touches[0].pageX - adjustX;
        var y = event.touches[0].pageY - adjustY;
        event.preventDefault();
        context.lineTo(x, y);
        //document.getElementById('f1:ihMouseMovement').value = document.getElementById('f1:ihMouseMovement').value + "l," + x + "," + y + ",";
        context.stroke();
    }
};

// This is called when you release the mouse button.
OnTouchEnd = function (event) {
    if (started) {
        var x = event.touches[0].pageX - adjustX;
        var y = event.touches[0].pageY - adjustY;
        event.preventDefault();
        context.lineTo(x, y);
        //document.getElementById('f1:ihMouseMovement').value = document.getElementById('f1:ihMouseMovement').value + "l," + x + "," + y + ",e,";
        context.stroke();
        started = false;
        //RG context.drawImage(canvas, 0, 0);
    }
};

resetPad = function () {
      // alert("resetPad");
       //document.getElementById('f1:ihMouseMovement').value = "";
       context.clearRect(0, 0, canvas.width, canvas.height);
       createSignaturePad();
}

capturePad = function () {
      // alert("CapturePad");
       //document.getElementById('f1:ihImagePNG').value = canvas.toDataURL();
//       document.getElementById('f1:ihImageJPG').value = canvas.toDataURL("image/jpg");
       return "returnFromPad";
}