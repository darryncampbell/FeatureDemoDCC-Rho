if ((navigator.appVersion).match("Chrome") == null)
    objGeneric = new ActiveXObject("PocketBrowser.Generic");
enumReader = undefined;
RFModeText = "";
RFModeTable =  new Array();

function OnRFParamsLoad() 
{
	rfid.rfParamsEvent = 'rfParamsEvent(%json)';
	rfid.statusEvent = 'statusEventRF(%json)';
	rfid.setEMML("rfModeInfoEvent:url('javascript:rfModeInfoEvent(%json)');");	
	rfid.antennaSelected = 1;

	if (sessionStorage.enumObj != undefined) 
    {
        enumReader = JSON.parse(sessionStorage.enumObj);
    }
	if (sessionStorage.RFModeIndexID == undefined)
	{
	    sessionStorage.RFModeIndexID = 0;
	    sessionStorage.TagPopulationID = 100;
	    sessionStorage.TxPowerID = 27.00;
	    sessionStorage.SessionIndexID = 0;
	}
	//
	if (sessionStorage.RFtable == undefined)
    {
		rfid.RFMode = 0;
		rfid.getRFModeInfo();
		for(var num=1;num<enumReader.numberOfRFModes;num++)
    	{
    		rfid.RFMode = num;
    		rfid.getRFModeInfo();
    	}
		setTimeout(function(){PopulateRFModeTable()},3000);
    }
	else
		RFModeTable = JSON.parse(sessionStorage.RFtable);
	//
	var selectBody = document.getElementById("RFModeIndexID");
	for(var num=1;num<enumReader.numberOfRFModes;num++)
	{
		var anOption = document.createElement("OPTION");
		selectBody.appendChild(anOption);
		anOption.innerText = "Mode " + num;
	}
	//populate page fields from session storage
	var Index = sessionStorage.RFModeIndexID;
	var TxRange = '100dbm - 3000dbm';
    TxRange = enumReader.transmitPowerMin + 'dbm - ' + enumReader.transmitPowerMax + 'dbm';
    document.getElementById("RFModeIndexID").selectedIndex = Index;
    document.getElementById("RFModeTableArea").innerText = RFModeText;
    document.getElementById("TxPowerRange").innerText = TxRange;
    document.getElementById("TxPowerID").value = sessionStorage.TxPowerID;
    //update with current RF mode
    rfid.getRFParams();
    if(enumReader.numberOfAntennas == 1) 
    {
    	elem  = document.getElementById("Antenna2CheckID");
    	elem.parentNode.removeChild(elem.parentNode.childNodes[4]);//removes text
    	elem.parentNode.removeChild(elem);// removes antenna 2 check box
    }
    document.getElementById("StatusMessagesID").value = "RF params loaded, set or clear";
}

function SetRFParamsConfiguration() 
{
	objGeneric.Log(document.getElementById("RFModeIndexID").selectedIndex + ' ' +
			document.getElementById("TxPowerID").value,2);
	//
	var ant1 = document.getElementById("Antenna1CheckID").checked;
	if(enumReader.numberOfAntennas == 2)
		var ant2 = document.getElementById("Antenna2CheckID").checked;
	else
		var ant2 = false;
	if( ant1 == true  && ant2 == false)
		rfid.antennaSelected = 1;
	else if( ant2 == true  && ant1 == false)
		rfid.antennaSelected = 2;
	else if (ant1 == true && ant2 == true)
		rfid.antennaSelected = 0;
	else
	{
		document.getElementById("StatusMessagesID").value = "Select antenna !";
		return;
	}
	//
	rfid.RFMode = document.getElementById("RFModeIndexID").selectedIndex;
	// invalid values
	var txPwr = document.getElementById("TxPowerID").value;
	if(parseInt(txPwr) < parseInt(enumReader.transmitPowerMin) || parseInt(txPwr) > parseInt(enumReader.transmitPowerMax)) {
		document.getElementById("StatusMessagesID").value = "Invalid transmit powe value";
		return;
	}
	// rounding as per power step requirement
	rfid.transmitPower = Math.round(txPwr/enumReader.transmitPowerStep)*enumReader.transmitPowerStep;
	rfid.setRFParams();
	
    document.getElementById("StatusMessagesID").value = "Current configurations set";
}

function ClearRFParamsConfiguration() 
{
    document.getElementById("RFModeIndexID").selectedIndex = 0;
    document.getElementById("TxPowerID").value = '27';
    document.getElementById("StatusMessagesID").value = "Configurations cleared to defaults";
}

function rfParamsEvent(rfParamsObject) 
{
    //objGeneric.Log("rfParamsEvent:"+ JSON.stringify(rfParamsObject), 2);
    var Index = rfParamsObject.RFMode;
    document.getElementById("RFModeIndexID").selectedIndex = Index;
	sessionStorage.RFModeIndexID = Index;
	RFModeText = RFModeTable[Index];
	document.getElementById("RFModeTableArea").innerText = RFModeText;
    document.getElementById("TxPowerID").value = rfParamsObject.transmitPower;
	sessionStorage.TxPowerID = rfParamsObject.transmitPower;
}

function rfModeInfoEvent(rfModeInfoObject) 
{
    //objGeneric.Log("rfModeInfoEvent:" + JSON.stringify(rfModeInfoObject), 2);    
	var str = JSON.stringify(rfModeInfoObject);
	str = str.replace(/["{}]/g,"");
	str = str.replace(/,/g,'\n');
    RFModeTable.push(str);
}

function statusEventRF(jsonObject) 
{
    //objGeneric.Log("statusEventRF:" + JSON.stringify(jsonObject), 2);
}

function PopulateRFModeTable()
{
	//objGeneric.Log("PopulateRFModeTable:" + RFModeTable.length , 2);
	sessionStorage.RFtable = JSON.stringify(RFModeTable);
	SelectionUpdate();
}

function SelectionUpdate()
{
	var index  = document.getElementById("RFModeIndexID").selectedIndex;
	RFModeText = RFModeTable[index];
	document.getElementById("RFModeTableArea").innerText = RFModeText;
}


function AntennaSelectUpdate()
{
	var ant1 = document.getElementById("Antenna1CheckID").checked;
	if(enumReader.numberOfAntennas == 2)
		var ant2 = document.getElementById("Antenna2CheckID").checked;
	else
		var ant2 = false;	
	rfid.antennaSelected = 1;
	if( ant2 == true  && ant1 == false)
		rfid.antennaSelected = 2;
	objGeneric.Log("AntennaSelectUpdate:" + ant1 + ant2 , 2);	
    rfid.getRFParams();
}