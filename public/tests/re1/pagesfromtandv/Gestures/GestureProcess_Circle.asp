<html>
<head>
<title>Gesture Rendering</title>
</head>

<body onload="interval();">
    <form name="frmGes" id="frmGes" action="">
    
    
      
      
      
        <input type="hidden" name="GType" id="Hidden1" value="<%=Request.Form("txtType")%>">
        <input type="hidden" name="GestureID" id="Hidden2" value="<%=Request.Form("txtCircleID")%>">
        <input type="hidden" name="Preset" id="Hidden3" value="<%=Request.Form("cmdPreset")%>">
        <input type="hidden" name="Diagonstics" id="Hidden4" value="<%=Request.Form("cmdDiagonstics")%>">
        <input type="hidden" name="centerx" id="Hidden5" value="<%=Request.Form("txtcenterx")%>">
        <input type="hidden" name="centery" id="Hidden6" value="<%=Request.Form("txtcentery")%>">
        <input type="hidden" name="radius" id="Hidden7" value="<%=Request.Form("txtradius")%>">
        <input type="hidden" name="start" id="Hidden8" value="<%=Request.Form("txtstart")%>">
        <input type="hidden" name="end" id="Hidden9" value="<%=Request.Form("txtend")%>">
        <input type="hidden" name="tolerance" id="Hidden10" value="<%=Request.Form("txttolerance")%>">
        <input type="hidden" name="sensitivity" id="Hidden11" value="<%=Request.Form("txtsensitivity")%>">
        <input type="hidden" name="group1" id="Hidden12" value="<%=Request.Form("mydropdown1")%>">
        <input type="hidden" name="Number" id="Number" value="<%=Request.Form("txtNumber")%>">
        
	<input type="button" onclick="DeleteGesture();" value="Delete"/>

        
    </form>
    <div id="myDiv">Gesture Detection:-</div>
    <div id="myDiv1">Count:-</div>
     <a href="GestureIndex.html">Gesture Index</a><br />
    <a href="CircleGesture.html">Back</a>
</body>
</html>



<script language="javascript" type="text/javascript">

//var Generic = new ActiveXObject("PocketBrowser.Generic");
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
NumberOfGestures= document.frmGes.Number.value;

Gesturetype = document.frmGes.GType.value;
GestureID = document.frmGes.GestureID.value;
Preset = document.frmGes.Preset.value;
Diagonstics = document.frmGes.Diagonstics.value;
Centerx = document.frmGes.centerx.value;
Centery = document.frmGes.centery.value;
Radius = document.frmGes.radius.value;
Start = document.frmGes.start.value;
End = document.frmGes.end.value;
Tolerance = document.frmGes.tolerance.value;
Sensitivity = document.frmGes.sensitivity.value;
SelectedItem = document.frmGes.group1.value;


    if(Gesturetype!="NULL")
    {
    
    if(SelectedItem=="HTML")
    {
    generic.InvokeMETAFunction("gesture-detected", "url('http://192.168.6.18/Navigate.html?ID=%s&COUNT=%s')");
   
    }
    else if(SelectedItem=="JSON")
	{
	generic.InvokeMETAFunction("gesture-detected","url('Javascript:onGestureJSON(%json);')");

	}
    else
    {
    generic.InvokeMETAFunction("gesture-detected","url('Javascript:onGesture('%s','%s');')");
    }
    
    
       generic.InvokeMETAFunction("gesture","type:" + Gesturetype);
        if(Preset!="NULL")
        {
           generic.InvokeMETAFunction("gesture","preset:"+Preset);
        }
	if(GestureID!="NULL")
        {
           generic.InvokeMETAFunction("gesture","id:"+GestureID);
        }

        if(Diagonstics!="NULL")
        {
           generic.InvokeMETAFunction("gesture","diagnostics:"+Diagonstics);
        }
        if(Centerx!="NULL")
        {
           generic.InvokeMETAFunction("gesture","centerX:"+Centerx);
        }
        if(Centery!="NULL")
        {
           generic.InvokeMETAFunction("gesture","centerY:"+Centery);
        }
        if(Radius!="NULL")
        {
           generic.InvokeMETAFunction("gesture","radius:"+Radius);
        }
        if(Start!="NULL")
        {
           generic.InvokeMETAFunction("gesture","start:"+Start);
        }
        
        if(End!="NULL")
        {
           generic.InvokeMETAFunction("gesture","end:"+End);
        }
        
        if(Tolerance!="NULL")
        {
           generic.InvokeMETAFunction("gesture","tolerance:"+Tolerance);
        }
        if(Sensitivity!="NULL")
        {
           generic.InvokeMETAFunction("gesture","sensitivity:"+Sensitivity);
        }


       //generic.InvokeMETAFunction("gesture", "create");


	for(var i = 0; i<NumberOfGestures; i++)
    	{
    		//generic.InvokeMETAFunction("gesture","type:linear");
    		//generic.InvokeMETAFunction("gesture","Diagnostics:TRUE");
    		generic.InvokeMETAFunction("gesture","create");
    		myDiv1.innerHTML = i;
    	}

//         for (var i = 0; i < 10000; i++) 
//          {
//              generic.InvokeMETAFunction("gesture", "type:Circle");
//              generic.InvokeMETAFunction("gesture", "Diagnostics:true");
//    	     generic.InvokeMETAFunction("gesture","create");
//        	 myDiv1.innerHTML = i;
//	      }

        
    }


}

function DeleteGesture()
{ 
generic.InvokeMETAFunction("gesture","delete");
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
      
      myDiv.innerHTML = "Gesture with json event detected for "+EventCounter+"th time.<br>Gesture ID: " + jsonobject.iD + ", Count: " + jsonobject.count;
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
</script>
