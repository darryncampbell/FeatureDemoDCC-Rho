if ((navigator.appVersion).match("Chrome") == null)
    objGeneric = new ActiveXObject("PocketBrowser.Generic");

var TagID = "";

function OnReadLoad() 
{
    TagID = sessionStorage.tagIDSelected;
    objGeneric.Log("OnReadLoad: " + TagID, 2);
    document.getElementById("TagID").childNodes[3].innerText = wordwrap(TagID, 24, '\n', true);
    document.getElementById("MemBankID").selectedIndex = 0;
    document.getElementById("DataReadID").childNodes[3].innerText = "";
    //
    rfid.tagEvent = 'ReadtagEvent(%json)';
    rfid.statusEvent = 'onReadStatus(%json)';
    //
    rfid.useAccessFilter = 'false'; // default
    //rfid.tagPassword = 0; // default
    rfid.tagByteOffset = 0; // default
    rfid.tagReadSize = 0; // default - read all
    document.getElementById("StatusMessagesID").value = "Read loaded..";
}

function ReadTagData() 
{
    //objGeneric.Log("ReadTagData " + TagID + ' ' + getMemoryBankString(document.getElementById("MemBankID").selectedIndex),2);
    rfid.tagID = TagID;
    rfid.tagMemBank = getMemoryBankString(document.getElementById("MemBankID").selectedIndex);
    rfid.tagRead();
    document.getElementById("StatusMessagesID").value = "Reading Tag Data !";
}

function ReadtagEvent(tagObj) 
{
    objGeneric.Log("ReadtagEvent fired: ", 2);
    for (index in tagObj.TagData) 
    {
        readData = tagObj.TagData[index];
        objGeneric.Log(JSON.stringify(readData), 2);
        document.getElementById("DataReadID").childNodes[3].innerText = wordwrap(readData.memoryBankData, 30, '\n', true);
        document.getElementById("StatusMessagesID").value = "Reading: Tag data received.";
    }
}

function ReadClearFields() 
{
    document.getElementById("MemBankID").selectedIndex = 0;
    document.getElementById("DataReadID").childNodes[3].innerText = "";
	document.getElementById("StatusMessagesID").value = "Read Clear fields";
}

function OnWriteLoad() 
{
    TagID = sessionStorage.tagIDSelected;
    //objGeneric.Log("OnWriteLoad: " + TagID,2);
    if(TagID.length > 24)
    	document.getElementById("TagID").childNodes[3].style.fontSize = 'small';
    document.getElementById("TagID").childNodes[3].innerText = wordwrap(TagID, 24, '\n', true);
    document.getElementById("MemBankID").selectedIndex = 0;
    rfid.statusEvent = 'writeStatus(%json)';
    //
    rfid.useAccessFilter = false; // default
    rfid.tagPassword = 0; // default
    rfid.tagMemBank = getMemoryBankString(document.getElementById("MemBankID").selectedIndex);
    rfid.tagByteOffset = 0; // default
    document.getElementById("StatusMessagesID").value = "Write loaded.. Clear fields";
}

function WriteTagData() 
{
    rfid.tagID = TagID;
    rfid.tagMemBank = getMemoryBankString(document.getElementById("MemBankID").selectedIndex);
    rfid.tagPassword = document.getElementById("AccessPasswordID").value;
    rfid.tagByteOffset = document.getElementById("ByteOffsetID").value;
    rfid.tagWriteData = document.getElementById("DataWriteInID").value;
    rfid.tagWrite();
    document.getElementById("StatusMessagesID").value = "Writing Tag Data !";
}

function WriteClearFields() 
{
    document.getElementById("MemBankID").selectedIndex = 0;
    document.getElementById("AccessPasswordID").value = 0;
    document.getElementById("ByteOffsetID").value = 0;
    document.getElementById("DataWriteInID").value = 0;
	document.getElementById("StatusMessagesID").value = "Write Clear fields";
}

function onReadStatus(status) 
{
    objGeneric.Log("onReadStatus fired: " + JSON.stringify(status), 2);
    document.getElementById("StatusMessagesID").value = status.method + status.vendorMessage;
}

function writeStatus(status) 
{
    objGeneric.Log("writeStatus fired: " + JSON.stringify(status), 2);
    document.getElementById("StatusMessagesID").value = status.method + status.vendorMessage;
}
