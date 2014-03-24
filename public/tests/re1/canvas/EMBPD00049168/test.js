
var canvas="";
var ctx="";

function getContext()
{
canvas=document.querySelector("canvas");
ctx=canvas.getContext("2d");
}

function createRectArea()
{
ctx.fillStyle='rgb(0,255,0)';
ctx.lineWidth=2;
ctx.fillRect(10,20,50,50);
//ctx.strokeStyle='rgb(255,0,0)';  
ctx.strokeStyle="#FF0000";
ctx.strokeRect(20,20,70,70);

}

function createLinearGrad()
{
ctx.fillStyle='rgb(0,0,0)';
var grd=ctx.createLinearGradient(0,0,canvas.width,canvas.height);
grd.addColorStop(0.3,"red");
grd.addColorStop(0.7,"green");
ctx.fillStyle=grd;
ctx.fillRect(0,0,canvas.width,canvas.height);

}

function createRadialGrad()
{
ctx.fillStyle='rgb(0,0,0)';
var grd=ctx.createRadialGradient(100,50,1,100,100,80);
grd.addColorStop(0,"red");
grd.addColorStop(1,"white");
ctx.fillStyle=grd;
ctx.fillRect(0,0,canvas.width,canvas.height);
}

function createPattern()
{
var img=document.getElementById("myImage")
var pat=ctx.createPattern(img,no-repeat);
ctx.fillStyle=pat;
ctx.fillRect(0,0,canvas.width,canvas.height);
}

function selectLineIndex()
{
var index=myLine.selectedIndex;
var LineCap=myLine.options[index].value;
createLine(LineCap);
}

function createLine(mylinecap)
{
clearCanvas();
ctx.lineWidth=10;	
ctx.lineCap=mylinecap;	
ctx.moveTo(20,20);
ctx.lineTo(200,200);
ctx.stroke();
}

function clearCanvas()
{
ctx.clearRect(0,0,300,300);
}



function buildSpinner(data) {
  
//  var canvas = document.createElement('canvas');
//  canvas.height = 100;
//  canvas.width = 300;
//  document.getElementsByTagName('article')[0].appendChild(canvas);
//  var ctx = canvas.getContext("2d"),
    i = 0, degrees = data.degrees, loops = 0, degreesList = [];
    
  for (i = 0; i < degrees; i++) {
    degreesList.push(i);
  }
  
  // reset
  i = 0;
  
  // so I can kill it later
  window.canvasTimer = setInterval(draw, 1000/degrees);  

  function reset() {
    ctx.clearRect(0,0,100,100); // clear canvas
    
    var left = degreesList.slice(0, 1);
    var right = degreesList.slice(1, degreesList.length);
    degreesList = right.concat(left);
  }
  
  function draw() {
    var c, s, e;

    var d = 0;

    if (i == 0) {
      reset();
    }

    ctx.save();

    d = degreesList[i];
    c = Math.floor(255/degrees*i);
    ctx.strokeStyle = 'rgb(' + c + ', ' + c + ', ' + c + ')';
    ctx.lineWidth = data.size;
    ctx.beginPath();
    s = Math.floor(360/degrees*(d));
    e = Math.floor(360/degrees*(d+1)) - 1;

    ctx.arc(data.x, data.y, data.size, (Math.PI/180)*s, (Math.PI/180)*e, false);
    ctx.stroke();

    ctx.restore();

    i++;
    if (i >= degrees) {
      i = 0;
    }
  }  
}



