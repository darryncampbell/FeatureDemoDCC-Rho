if ((navigator.appVersion).match("Chrome") == null)
    objGeneric = new ActiveXObject("PocketBrowser.Generic");

var totalTagsRead = 0;
var uniqueTagsRead = 0;
var dropReports = 0;
var tagData = null;

//Initializes rfid module on the device.
function InitializeRFID() 
{
	document.getElementById("UniqueTagsID").value = uniqueTagsRead;
    document.getElementById("TotalTagsID").value = totalTagsRead;
    document.getElementById("StatusMessageID").value = "Press the Trigger";
	
    //objGeneric.InvokeMETAFunction("OnTrigger", "javascript:doTrigger('%s')");
    rfid.statusEvent = 'onStatus(%json)';
    rfid.tagEvent = 'tagEvent(%json)';
    rfid.radioPowerStateEvent = 'radioPowerStateEvent(%json)';
    rfid.enumRFIDEvent = 'enumRFIDEvent(%json)';
    //
    if(sessionStorage.enumObj == undefined)
    {
    	rfid.connect();
    	rfid.enumerate();
    }
    rfid.antennaSelected = 0;
    //rfid.startTriggerType = 'triggerPress';
    //rfid.startPeriod = 0;
    //rfid.stopTriggerType = 'triggerRelease';
    //rfid.stopDuration = 0;
    rfid.stopObservationCount = 0;
    rfid.invMemBank = 'None';
    rfid.beepOnRead = true;
    rfid.reportTrigger = 1;
    rfid.reportUniqueTags = false;
    rfid.discardTagsOnInventorystop = true;
}

function doTrigger(state) 
{
    objGeneric.Log("doTrigger" + state, 2);
    if (state == 0) 
    {
        dropReports = 1;
        sessionStorage.totalTagsRead = totalTagsRead;
        sessionStorage.uniqueTagsRead = uniqueTagsRead;
        sessionStorage.tagData = JSON.stringify(tagData);
        rfid.stop();
    } 
    else 
    {
        dropReports = 0;
        if (tagData != null) 
        {
            delete tagData;
        }
        tagData = new Object();
        uniqueTagsRead = 0;
        totalTagsRead = 0;
        rfid.performInventory();
    }
}

function onStatus(status) 
{
	objGeneric.Log("onStatus: " + JSON.stringify(status), 2);
    if (status.method == "performInventory" && status.errorCode == "0")
    {
        document.getElementById("StatusMessageID").value = "Reading tags..";
        document.getElementById("StatusMessageID").style.backgroundColor = "rgb(102,153,0)"; //0x33CC33;
    } 
    else if (status.method == "stop" && status.errorCode == "0") 
    {
        document.getElementById("StatusMessageID").value = "Press Tag List";
        document.getElementById("StatusMessageID").style.backgroundColor = "rgb(204,204,255)"; //0xCCCCFF;
    }
    else if((status.method == "connect" || status.method == "enumerate") && status.errorCode == "2003")
    {
    	document.getElementById("StatusMessageID").value = "Not Connected !";
    	document.getElementById("StatusMessageID").style.backgroundColor = "rgb(255,0,0)"; //0xCCCCFF;
	}
}

// tagData object stores a series of unique tag IDs as properties and associated with each unique tagID
// is an array with the fields TagSeenCount,PCBits and Memory Bank Data.

function readRFIDTagData(tagObj) 
{
    //objGeneric.Log("readRFIDTagData: "+JSON.stringify(tagObj),2);
    if (dropReports == 0) 
    {
        // If the type is "object" that tagID is already available in the database.Hence
        // its Tag Seen count is increment.
        if ("object" == typeof (tagData[tagObj.tagID])) {
            (tagData[tagObj.tagID][0])++;
        } 
        else 
        {
            tagData[tagObj.tagID] = new Array(1, tagObj); // Array(count,tag object)
            uniqueTagsRead++;
        }
        totalTagsRead++;
        document.getElementById("UniqueTagsID").value = uniqueTagsRead;
        document.getElementById("TotalTagsID").value = totalTagsRead;
    }
}

function TagReportsID_onclick() 
{
    if (dropReports == 0 && tagData!=null) 
    {
        document.getElementById("StatusMessageID").value = "Release trigger";
        return;
    }
    else if (tagData==null) 
    {
        document.getElementById("StatusMessageID").value = "Perform Inventory";
        return;
    }
    if (totalTagsRead > 0) 
    {
        window.location.href = "TagList.html";
    }
}

// event capturing

function enumRFIDEvent(enumerateObj) 
{
    objGeneric.Log("enumRFIDEvent fired", 2);
    var str = JSON.stringify(enumerateObj).split(",");
    for (index in str)
        objGeneric.Log(str[index], 2);
    sessionStorage.enumObj = JSON.stringify(enumerateObj);
}

function tagEvent(tagObj) 
{
    //objGeneric.Log("tagEvent fired: "+JSON.stringify(tagObj),2);
    for (index in tagObj.TagData) 
    {
        readRFIDTagData(tagObj.TagData[index]);
    }
}

function radioPowerStateEvent(jsonObject)
{
	objGeneric.Log("radioPowerStateEvent fired",2);
	objGeneric.Log(JSON.stringify(jsonObject),2);
}

function AdvancedOption()
{
    if(sessionStorage.enumObj == undefined)
    {
    	document.getElementById("StatusMessageID").value = "Reader not enumerated";
    }
    else if (dropReports == 0 && tagData!=null) 
    {
        document.getElementById("StatusMessageID").value = "Release trigger";
    }
    else 
    {
    	window.location.href ='RFParamsFilterTabsFilter.html';
    }
}