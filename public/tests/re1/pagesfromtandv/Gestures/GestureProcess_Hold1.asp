<html>
<head>
<title>Gesture Rendering</title>
</head>

<body onload="interval();">
    <form name="frmGes" id="frmGes" action="">
       
       
       
         <input type="hidden" name="GType" id="GType" value="<%=Request.Form("txtType")%>">
         <input type="hidden" name="GestureID" id="GestureID" value="<%=Request.Form("txtHoldID")%>">
         <input type="hidden" name="Preset" id="Preset" value="<%=Request.Form("cmdPreset")%>">
         <input type="hidden" name="Diagonstics" id="Diagonstics" value="<%=Request.Form("cmdDiagonstics")%>">
         <input type="hidden" name="centerx" id="centerx" value="<%=Request.Form("txtcenterx")%>">
         <input type="hidden" name="centery" id="centery" value="<%=Request.Form("txtcentery")%>">
         <input type="hidden" name="radius" id="radius" value="<%=Request.Form("txtradius")%>">
         <input type="hidden" name="delay" id="delay" value="<%=Request.Form("txtdelay")%>">
         <input type="hidden" name="interval" id="interval" value="<%=Request.Form("txtinterval")%>">
         <input type="hidden" name="group1" id="group1" value="<%=Request.Form("mydropdown1")%>">
         <input type="hidden" name="Number" id="Hidden11" value="<%=Request.Form("txtNumber")%>">






	     <input type="button" onclick="DeleteGesture();" value="Delete"/>

        
        
    </form>
    <div id="myDiv">Gesture Detection:-</div>
    <div id="myDiv1">Count:-</div>
     <a href="GestureIndex.html">Gesture Index</a><br />
    <a href="HoldGesture.html">Back</a>
</body>
</html>


<script language="javascript" type="text/javascript">

//var generic = new ActiveXObject("PocketBrowser.Generic");

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

var Gesturetype = document.frmGes.GType.value;
var GestureID = document.frmGes.GestureID.value;
var Preset = document.frmGes.Preset.value;
var Diagonstics = document.frmGes.Diagonstics.value;
var Centerx = document.frmGes.centerx.value;
var Centery = document.frmGes.centery.value;
var Radius = document.frmGes.radius.value;
var Delay = document.frmGes.delay.value;
var Interval = document.frmGes.interval.value;
var SelectedItem = document.frmGes.group1.value;

var NumberOfGestures;
NumberOfGestures= document.frmGes.Number.value;



    if(Gesturetype!="NULL")
    {
    if(SelectedItem=="HTML")
    {
     //alert("1");
    //generic.InvokeMETAFunction("gesture-detected", "url('http://192.168.6.18/Navigate.html?ID=%s&COUNT=%s')");
    gesture.setEMML("detected:url('http://192.168.6.18/Navigate.html?ID=%s&COUNT=%s')");
    }
    else if(SelectedItem=="JSON")
	{
	//generic.InvokeMETAFunction("gesture-detected","url('Javascript:onGestureJSON(%json);')");
    gesture.detected='onGestureJSON(%json);';
	}
    else
    {
    //alert("2");
      //generic.InvokeMETAFunction("gesture-detected","url('Javascript:onGesture('%s','%s');')");
       gesture.detected="onGesture('%s','%s');";
     //generic.InvokeMETAFunction("gesture-detected","url('Javascript:onGestureJSON(%json);')");
    //generic.InvokeMETAFunction("gesture-detected","url('http://157.235.207.79/pb3.x/NavigateTest.html')");
    }
    
       //generic.InvokeMETAFunction("gesture","type:" + Gesturetype);
       gesture.type=Gesturetype;
       
        if(GestureID!="NULL")
        {
           //generic.InvokeMETAFunction("gesture","id:"+GestureID);
            gesture.id=GestureID;
        }
        if(Preset!="NULL")
        {
           //generic.InvokeMETAFunction("gesture","preset:"+Preset);
            gesture.preset=Preset;
        }
        if(Diagonstics!="NULL")
        {
          // generic.InvokeMETAFunction("gesture","diagnostics:"+Diagonstics);
                gesture.diagnostics=Diagonstics;
        }
        if(Centerx!="NULL")
        {
           //generic.InvokeMETAFunction("gesture","center-X:"+Centerx);
           gesture.centerX=Centerx;
        }
        if(Centery!="NULL")
        {
           //generic.InvokeMETAFunction("gesture","center-Y:"+Centery);
           gesture.centerY=Centery;
        }
        if(Radius!="NULL")
        {
           //generic.InvokeMETAFunction("gesture","radius:"+Radius);
            gesture.radius=Radius;
        }
        if(Delay!="NULL")
        {
           //generic.InvokeMETAFunction("gesture","delay:"+Delay);
           gesture.delay=Delay;
        }
        
        if(Interval!="NULL")
        {
          // generic.InvokeMETAFunction("gesture","interval:"+Interval);
            gesture.interval=Interval;
        }


        //generic.InvokeMETAFunction("gesture", "create");
  	 for(var i = 0; i<NumberOfGestures; i++)
  	  {
    		//generic.InvokeMETAFunction("gesture","type:linear");
    		//generic.InvokeMETAFunction("gesture","Diagnostics:TRUE");
    		//generic.InvokeMETAFunction("gesture","create");
    		gesture.create();
    		myDiv1.innerHTML = i;
   	 }


	//generic.InvokeMETAFunction("gesture", "");


//        for (var i = 0; i < 1000; i++) 
//        {
//            generic.InvokeMETAFunction("gesture", "type:HOLD");
//            generic.InvokeMETAFunction("gesture", "Diagnostics:TRUE");
//            generic.InvokeMETAFunction("gesture", "create");
//            myDiv1.innerHTML = i;
//        }
        
    }

    
}


function DeleteGesture()
{ 
//generic.InvokeMETAFunction("gesture","delete");
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
      
      myDiv.innerHTML = "Gesture with json event detected for "+EventCounter+"th time.<br>Gesture ID: " + jsonobject.id + ", Count: " + jsonobject.count;
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
