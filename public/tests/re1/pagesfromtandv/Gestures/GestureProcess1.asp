<html>
<head>
<title>Gesture Rendering</title>
<!--<META HTTP-Equiv="gesture-detected" Content="url('Javascript:onGesture('%s','%s');')">-->
<!--<META HTTP-Equiv="gesture-detected" Content="url('http://157.235.207.79/pb3.x/NavigateTest.html')">-->


</head>

        <body onload="interval();">
        <form name="frmGes" id="frmGes" action="">
        
        <input type="hidden" name="GType" id="GType" value="<%=Request.Form("txtType")%>">
        <input type="hidden" name="LinearID" id="LinearID" value="<%=Request.Form("txtLinearID")%>">
        <input type="hidden" name="LinearPreset" id="LinearPreset" value="<%=Request.Form("dropdownLinearPreset")%>">
        <input type="hidden" name="Diagonstics" id="Diagonstics" value="<%=Request.Form("dropdownDiagonstics")%>">
        <input type="hidden" name="startx" id="startx" value="<%=Request.Form("txtstartx")%>">
        <input type="hidden" name="starty" id="starty" value="<%=Request.Form("txtstarty")%>">
        
        <input type="hidden" name="endx" id="endx" value="<%=Request.Form("txtendx")%>">
        <input type="hidden" name="endy" id="endy" value="<%=Request.Form("txtendy")%>">
        <input type="hidden" name="tolerance" id="tolerance" value="<%=Request.Form("txttolerance")%>">
        <input type="hidden" name="sensitivity" id="sensitivity" value="<%=Request.Form("txtsensitivity")%>">
        <input type="hidden" name="skew" id="skew" value="<%=Request.Form("txtskew")%>">
        <input type="hidden" name="deviation" id="deviation" value="<%=Request.Form("txtdeviation")%>">
        <input type="hidden" name="regionwidth" id="regionwidth" value="<%=Request.Form("txtregionwidth")%>">
        <input type="hidden" name="group1" id="group1" value="<%=Request.Form("mydropdown1")%>">
        <input type="hidden" name="Number" id="Number" value="<%=Request.Form("txtNumber")%>">
        
        
        
        
        
        
        
        <br><br>
        <input type="button" onclick="QuitPB();" value="Quit"/>
	<input type="button" onclick="DeleteGesture();" value="Delete"/>
	<input type="button" onclick="DeAttachEvent();" value="DeAttachEvent"/>
        
        
    </form>
    Gesture JSObject
     <a href=GestureIndex.html>Gesture Index</a><br>
    <a href=LinearGesture1.html>Back</a>
    
    <div id="myDiv">Gesture Detection:-</div>
	<div id="myDiv1">Count:-</div>
     



</body>
</html>

<script language="javascript" type="text/javascript">

var generic = new ActiveXObject("PocketBrowser.generic");
try
{
var generic = new ActiveXObject("PocketBrowser.Generic");
}
catch(err)
{
var GenericPlugin = document.createElement('embed'); 
GenericPlugin.setAttribute('id',"embed1"); 
GenericPlugin.setAttribute('type',"application/x-wtg-legacy-generic"); 
GenericPlugin.setAttribute('hidden',"true"); 

// Attach the plugin embed tags to the body 
var theBody = document.getElementsByTagName('body')[0]; 
theBody.appendChild(GenericPlugin); 
}


var EventCounter=1;


function interval()
{
    setTimeout("performGesture()",2000);
    //setTimeout("LoopPerformGesture()",2000);
}


function LoopPerformGesture()
{
for(var counter=0;counter<2000;counter++)
{
performGesture();
}
}


function performGesture()
{
var Gesturetype;
var GestureID;
var LinearPreset;
var LinearDiagonstics;
var LinearStartx;
var LinearStarty;
var LinearEndx;
var LinearEndy;
var LinearTolerance;
var LinearSensitivity;
var LinearSkew;
var LinearDeviation;
var LinearRegionWidth;
var SelectedItem="";
var NumberOfGestures;



Gesturetype = document.frmGes.GType.value;
GestureID = document.frmGes.LinearID.value;
LinearPreset = document.frmGes.LinearPreset.value;
LinearDiagonstics = document.frmGes.Diagonstics.value;
LinearStartx = document.frmGes.startx.value;
LinearStarty = document.frmGes.starty.value;
LinearEndx = document.frmGes.endx.value;
LinearEndy = document.frmGes.endy.value;
LinearTolerance = document.frmGes.tolerance.value;
LinearSensitivity = document.frmGes.sensitivity.value;
LinearSkew = document.frmGes.skew.value;
LinearDeviation = document.frmGes.deviation.value;
LinearRegionWidth = document.frmGes.regionwidth.value;
SelectedItem = document.frmGes.group1.value;

NumberOfGestures= document.frmGes.Number.value;


//alert(""+Gesturetype+GestureID+LinearPreset);




if(Gesturetype!="NULL")
{

if(SelectedItem=="HTML")
{
    gesture.setEMML("detected:url('http://192.168.6.18/Navigate.html?ID=%s&COUNT=%s')");
}
else if(SelectedItem=="JSON")
{
gesture.detected='onGestureJSON(%json);';
}
else if(SelectedItem=="DETACHEVENT")
{
gesture.detected='';
}
else if(SelectedItem=="EMPTYEVENT")
{
gesture.setEMML("detected:");
}
else
{  
    gesture.detected="onGesture('%s','%s');";
}



    //generic.InvokeMETAFunction("gesture","type:" + Gesturetype);
    gesture.type=Gesturetype;
    if(LinearPreset!="NULL")
    {
     //LinearPreset="top-bottom";
     //
       //generic.InvokeMETAFunction("gesture","preset:"+LinearPreset);
       gesture.preset=LinearPreset;
    }
    if(GestureID!="NULL")
    {
       gesture.id=GestureID;
       //generic.InvokeMETAFunction("gesture","id:"+GestureID);
    }
    if(LinearDiagonstics!="NULL")
    {
        gesture.diagnostics=LinearDiagonstics;
       //generic.InvokeMETAFunction("gesture","diagnostics:"+LinearDiagonstics);
    }
    if(LinearStartx!="NULL")
    {
        gesture.startX=LinearStartx;
       //generic.InvokeMETAFunction("gesture","start-x:"+LinearStartx);
    }
    if(LinearStarty!="NULL")
    {
       gesture.startY=LinearStarty;
       //generic.InvokeMETAFunction("gesture","start-y:"+LinearStarty);
    }
    if(LinearEndx!="NULL")
    {
        gesture.endX=LinearEndx;
       //generic.InvokeMETAFunction("gesture","end-x:"+LinearEndx);
    }
    if(LinearEndy!="NULL")
    {
       //generic.InvokeMETAFunction("gesture","end-y:"+LinearEndy);
       gesture.endY=LinearEndy;
    }
    if(LinearTolerance!="NULL")
    {
       //generic.InvokeMETAFunction("gesture","tolerance:"+LinearTolerance);
       gesture.tolerance=LinearTolerance;
    }
    if(LinearSensitivity!="NULL")
    {
       //generic.InvokeMETAFunction("gesture","sensitivity:"+LinearSensitivity);
       gesture.sensitivity=LinearSensitivity;
    }
    if(LinearSkew!="NULL")
    {
       //generic.InvokeMETAFunction("gesture","skew:"+LinearSkew);
       gesture.skew=LinearSkew;
    }
    if(LinearDeviation!="NULL")
    {
       //generic.InvokeMETAFunction("gesture","deviation:"+LinearDeviation);
       gesture.deviation=LinearDeviation;
    }
    if(LinearRegionWidth!="NULL")
    {
       //generic.InvokeMETAFunction("gesture","region-width:"+LinearRegionWidth);
       gesture.regionWidth=LinearRegionWidth;
   }
   //generic.InvokeMETAFunction("gesture", "create");
    for(var i = 0; i<NumberOfGestures; i++)
    {
    		//generic.InvokeMETAFunction("gesture","type:linear");
    		//generic.InvokeMETAFunction("gesture","Diagnostics:TRUE");
    		//generic.InvokeMETAFunction("gesture","create");
    		 //alert("here");
    		 gesture.create();
    		myDiv1.innerHTML = i;
    }
  
}

   

}

function DeAttachEvent()
{
//generic.InvokeMETAFunction("gesture-detected", "url('')");
gesture.detected='';
}

function DeleteGesture()
{ 
//generic.InvokeMETAFunction("gesture","delete");
//alert("hi");
//gesture.type='Linear';
//gesture.diagnostics='true';
//gesture.create();
gesture.delete();
} 

 function onGesture(id,count)
 {
      
      myDiv.innerHTML = "Gesture detected for "+EventCounter+"th time.<br>Gesture ID: " + id + ", Count: " + count;
      EventCounter++;
      
      if(id=="Scan")
      {
      generic.InvokeMETAFunction("Scanner","enabled;start");
      }
      if(id=="Signal")
      {
      generic.InvokeMETAFunction("Signal","visibility:visible");
      }
      if(id=="Battery")
      {
      generic.InvokeMETAFunction("battery","visibility:visible");
      }
      
      
     
 }
 
 function onGestureJSON(jsonobject)
 {
      
      myDiv.innerHTML = "Gesture detected for "+EventCounter+"th time.<br>Gesture ID: " + jsonobject.id + ", Count: " + jsonobject.count;
      EventCounter++;
      
      if(id=="Scan")
      {
      generic.InvokeMETAFunction("Scanner","enabled;start");
      }
      if(id=="Signal")
      {
      generic.InvokeMETAFunction("Signal","visibility:visible");
      }
      if(id=="Battery")
      {
      generic.InvokeMETAFunction("battery","visibility:visible");
      }
      
      
     
 }
 
 function QuitPB()
 {
  generic.InvokeMETAFunction("Application","Quit");
 }

</script>
