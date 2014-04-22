if ((navigator.appVersion).match("Chrome") == null)
	objGeneric = new ActiveXObject("PocketBrowser.Generic");

var TagID = "";
var canvas;
var ctx;
var img;
var div = 0;
var interval=0;
var WIDTH=50;
var HEIGHT=200;

function OnLocateLoad() 
{
	rfid.tagEvent = 'LocateTagEvent(%json)';
    rfid.statusEvent = 'onLocateStatus(%json)';
	TagID = sessionStorage.tagIDSelected;
    document.getElementById("TagID").innerText = TagID;
    canvas = document.getElementById("BarCanvas");
    ctx = canvas.getContext("2d");
    img = new Image();
    img.src = "bar.png";
    rfid.tagID = TagID;
    rfid.antennaSelected = 1;
    rfid.startTriggerType = 'immediate';
    //rfid.startPeriod = 
    //rfid.stopTriggerType = 
    //rfid.stopDuration =
    //rfid.beepOnRead =
    rfid.locateTag();
    interval = setInterval(function(){animate();} ,1000/60);
}

function animate() 
{
    // clear stage
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //context.drawImage(img,sx,sy,swidth,sheight,dx,dy,dwidth,dheight);	
    ctx.drawImage(img, 0, HEIGHT - div, WIDTH, div, 0, HEIGHT - div, WIDTH, div);
    document.getElementById("RelativeDistanceID").value = Math.round(100 - div / 2);
}

function onLocateStatus(statusObj)
{
	objGeneric.Log(JSON.stringify(statusObj),2);
}

function LocateTagEvent(tagObj)
{
    // update stage
	for (index in tagObj.TagData) 
    {
    	// drawing bar from 0 to 200 and relative distance is 0-100
    	// so multiply by two
    	div = tagObj.TagData[index].relativeDistance*2;
    }
}

function onLocateBackButton()
{
	clearInterval(interval);
	rfid.stop();
	window.location.href='TagList.html';
}

function onTabChange()
{
	clearInterval(interval);
	rfid.stop();
}