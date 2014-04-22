if ((navigator.appVersion).match("Chrome") == null)
    objGeneric = new ActiveXObject("PocketBrowser.Generic");
var StateAwareSingulation = new Object();
var performStateAwareSingulation = false;
function OnStateAwareSingulationLoad() 
{
	rfid.singulationEvent = 'singulationEvent(%json)';
	rfid.statusEvent = 'statusEventRF(%json)';	
	document.getElementById("SLIndexID").disabled = true;
	document.getElementById("StateIndexID").disabled = true;
	rfid.getSingulation();
}

function SetSingulationConfiguration()
{
	rfid.antennaSelected = 0;
	rfid.singulationTagPopulation = document.getElementById("TagPopulationID").value;
	rfid.singulationSession = document.getElementById("SessionIndexID").selectedIndex;
	//
	objGeneric.InvokeMETAFunction("rfid","performStateAwareSingulation:" +performStateAwareSingulation);
	if(document.getElementById("SLIndexID").disabled == false)
	{
		var eleSel = document.getElementById("StateIndexID");
		var str = eleSel.options[eleSel.selectedIndex].text;
		StateAwareSingulation.invState = str;
		eleSel = document.getElementById("SLIndexID");
		str = eleSel.options[eleSel.selectedIndex].text;
		StateAwareSingulation.SL = str;
		objGeneric.InvokeMETAFunction("rfid","singulationSLFlag:" + StateAwareSingulation.SL.replace(/[\s]/g,"_"));
		objGeneric.InvokeMETAFunction("rfid","singulationInventoryState:" + StateAwareSingulation.invState.replace(/[\s]/g,"_"));
	}
	rfid.setSingulation();
	//
	document.getElementById("StatusMessagesID").value = "Current Singulation set";
}

function singulationEvent(singulObj)
{
	objGeneric.Log("singulationEvent:" + JSON.stringify(singulObj),2);
	document.getElementById("SessionIndexID").selectedIndex = singulObj.singulationSession;
	document.getElementById("TagPopulationID").value  = singulObj.singulationTagPopulation;
	
	performStateAwareSingulation = false;
	if(singulObj.performStateAwareSingulation == "true")
		performStateAwareSingulation = true;
	if(performStateAwareSingulation == true)
	{
		StateAwareSingulation.SL = singulObj.singulationSLFlag.replace(/_/g," ");
		StateAwareSingulation.invState = singulObj.singulationInventoryState.replace(/_/g," ");
    	document.getElementById("SLIndexID").disabled = false;
    	document.getElementById("StateIndexID").disabled = false;
    	
		var eleSel = document.getElementById("StateIndexID");
		eleSel.selectedIndex = 0;
		if(StateAwareSingulation.invState != "INV A")
			eleSel.selectedIndex = 1;
		//
		eleSel = document.getElementById("SLIndexID");
		eleSel.selectedIndex = 0;
		if(StateAwareSingulation.SL != "SL ASSERTED")
			eleSel.selectedIndex = 1;
	}
	document.getElementById("StatusMessagesID").value = "singulationEvent received";
}

function ClearSingulationConfiguration()
{
    document.getElementById("TagPopulationID").value = '100';
    document.getElementById("SessionIndexID").selectedIndex = 0;
	document.getElementById("StatusMessagesID").value = "Singulation settings clear";
}

function onBackButtonSingulation() 
{
	window.location.href='Main.html';
}

function statusEventRF(jsonObject) 
{
    objGeneric.Log("StateAwareSingulation: statusEventRF:" + JSON.stringify(jsonObject), 2);
}

function onTabChange() 
{

}