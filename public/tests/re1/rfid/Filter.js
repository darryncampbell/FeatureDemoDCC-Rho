if ((navigator.appVersion).match("Chrome") == null)
    objGeneric = new ActiveXObject("PocketBrowser.Generic");
var MAX_FILTERS=2;
var FilterData;
var StateAwareSingulation = new Object();
var singulationSession = 0;
var singulationTagPopulation = 100;
var performStateAwareSingulation = false;

function OnFilterLoad() 
{
	rfid.singulationEvent = 'singulationEvent(%json)';
	rfid.statusEvent = 'statusEventFilter(%json)';
	rfid.antennaSelected = 0;
	rfid.getSingulation();
	if(sessionStorage.FilterData != undefined)
	{
		FilterData = JSON.parse(sessionStorage.FilterData);
		UpdateElements(1);
	}
	else // new object = number of indexes
	{	
		FilterData = new Array(new Object,new Object,new Object,new Object,new Object);
		DefaultStateAware(false);
	}
	document.getElementById("StatusMessagesID").value = "Filter: Loaded";
}

function SetFilterConfiguration() 
{
	var Index = document.getElementById("FilterIndexID").selectedIndex;
	if(Index == 0) {
		deleteAllFilters();
	}
	else if(document.getElementById("MemBankID").selectedIndex == 0 &&
		document.getElementById("TagPatternInID").value == 0 &&
		document.getElementById("OffsetInID").value == 0 && FilterData[Index].valid == true)
	{
		// if all fields are zero and filter exist then set 
		// so delete particular filter
		deleteFilter(Index);
	}
	else 
	{
		if(ValidateInputs())
		{
			rfid.preFilterID = Index;
			rfid.antennaSelected = 0;
			//
			rfid.preFilterMemBank = FilterData[Index].preFilterMemBank = getMemoryBankString(document.getElementById("MemBankID").selectedIndex); 
			rfid.preFilterHexPattern = FilterData[Index].preFilterHexPattern = document.getElementById("TagPatternInID").value;
			rfid.preFilterBitOffset = FilterData[Index].preFilterBitOffset = document.getElementById("OffsetInID").value;
			rfid.preFilterBitCount = FilterData[Index].preFilterBitCount = (document.getElementById("TagPatternInID").value.length)*4;
			// state aware
			SetFilterStateAwareFields(Index);
			// add filter
			rfid.addPreFilter();
			FilterData[Index].valid = true;
			document.getElementById("StatusMessagesID").value = "Filter index# " + Index + " configured";
			objGeneric.Log("AddPreFilter: "+JSON.stringify(FilterData),2);
		}
	}
}

function ClearFilterConfiguration()
{
    //document.getElementById("FilterIndexID").selectedIndex = 1;
    document.getElementById("MemBankID").selectedIndex = 0;
    document.getElementById("TagPatternInID").value = "0";
    document.getElementById("OffsetInID").value = "0";
    document.getElementById("StatusMessagesID").value = "Filter cleared, Press Set to delete";
}

function deleteAllFilters() {
	for (var index=1; index<=MAX_FILTERS;index++)
	{
		deleteFilter(index);
	}
	document.getElementById("StatusMessagesID").value = "All Filters deleted";
}

function deleteFilter(index)
{
	if(FilterData[index].valid == true)	
	{
		objGeneric.Log("Delete Filter index:"+index,2);
		rfid.preFilterID = index;
		rfid.deletePreFilter();
		FilterData[index].valid = false;
		document.getElementById("StatusMessagesID").value = "Filter index# " + index + " deleted";
	}
}

function FilterSelectionUpdate() {
	var selIndex = document.getElementById("FilterIndexID").selectedIndex;
	if(selIndex == 0 )
		document.getElementById("StatusMessagesID").value = "Press set to 'Delete all' Filters";
	else
		UpdateElements(selIndex);
}

function statusEventFilter(statusObject) 
{
    objGeneric.Log("statusEventFilter fired", 2);
    objGeneric.Log(JSON.stringify(statusObject), 2);
    // check success
    if(statusObject.method == "addPreFilter")
    {
	    if(statusObject.errorCode == "0")
		{
	    	for (var index=1; index<=MAX_FILTERS;index++)
	    	{
	    		if(FilterData[index].valid == true)
	    		{
	    			performStateAwareSingulation = FilterData[index].performStateAwareSingulation;
	    		}
	    	}			
	    	document.getElementById("StatusMessagesID").value = "Successfully filter set";
		}
	    else
	    	document.getElementById("StatusMessagesID").value = "Failed to set Filter check params";
    }
}

function onBackButtonFilter()
{
	sessionStorage.FilterData = JSON.stringify(FilterData);
	window.location.href='Main.html';
}

function onTabChange()
{
	sessionStorage.FilterData = JSON.stringify(FilterData);
}

function UpdateElements(index) {
	document.getElementById("FilterIndexID").selectedIndex = index;
	if(FilterData[index].valid == true)
	{
		document.getElementById("MemBankID").selectedIndex = FilterData[index].preFilterMemBank;
		document.getElementById("TagPatternInID").value = FilterData[index].preFilterHexPattern;
		document.getElementById("OffsetInID").value = FilterData[index].preFilterBitOffset;
		UpdateStateAwareElements(index,true);
	}
	else
	{
		document.getElementById("MemBankID").selectedIndex = 0;
		document.getElementById("TagPatternInID").value = 0;
		document.getElementById("OffsetInID").value = 0;
		UpdateStateAwareElements(index,false);
	}
}

function UpdateStateAwareElements(Index,Valid) 
{
	if(Valid)
	{
		var selectObj = document.getElementById("ActionSelectID");
		for (var i=0;i<selectObj.childElementCount;i++) 
		{
			selectObj.children[i].style.display = "none";
		}
		var ele = selectObj.children[FilterData[Index].ActionElementNode];
		ele.style.display = "";
		ele.selectedIndex = FilterData[Index].ActionSelectEle;
		var obj = document.getElementById("TargetIndexID");
		obj.selectedIndex = FilterData[Index].TargetSelectEle;
		if(FilterData[Index].StAw) 
		{
			document.getElementById("StateAwareCheckID").checked = true;
			document.getElementById("StateUnAwareCheckID").checked = false;
			document.getElementById("TargetIndexID").disabled = false;
		}
		else 
		{
			document.getElementById("StateUnAwareCheckID").checked = true;
			document.getElementById("StateAwareCheckID").checked = false;
			document.getElementById("TargetIndexID").disabled = true;
		}
		document.getElementById("ActionIndexSL").disabled = false;
	}
	else {
		DefaultStateAware(false); //unaware
		if(!CheckFiltersAreSame()) 
		{
			DefaultStateAware(true); //aware
		}
	}
}

function StateAwareUpdate ()
{
	var StAw = document.getElementById("StateAwareCheckID").checked;
	if(CheckFiltersAreSame())
	{
		if(StAw) 
		{
			DefaultStateAware(true);
		}
	}
	else {
		document.getElementById("StateAwareCheckID").checked = false;
		document.getElementById("StatusMessagesID").value = "Diffrent state aware Filters not allowed";
	}
}

function StateUnAwareUpdate ()
{
	var StUnAw = document.getElementById("StateUnAwareCheckID").checked;
	if(CheckFiltersAreSame())
	{	
		if(StUnAw)
		{
			DefaultStateAware(false);
		}
	}
	else
	{
		document.getElementById("StateUnAwareCheckID").checked = false;
		document.getElementById("StatusMessagesID").value = "Diffrent state aware Filters not allowed";
	}
}

function TargetSelectionUpdate()
{
	var Index = document.getElementById("TargetIndexID").selectedIndex;
	if(Index == 0)
	{
		document.getElementById("ActionIndexSL").style.display = "";
		document.getElementById("ActionIndexAB").style.display = "none";
		//document.getElementById("ActionIndexUnAware").style.display = "none";
		document.getElementById("ActionIndexSL").selectedIndex=0;
	}
	else
	{
		document.getElementById("ActionIndexSL").style.display = "none";
		document.getElementById("ActionIndexAB").style.display = "";
		//document.getElementById("ActionIndexUnAware").style.display = "none";
		document.getElementById("ActionIndexAB").selectedIndex=0;
	}
}

function DefaultStateAware(AwareUnaware)
{
	if(AwareUnaware == false) {
		document.getElementById("StateUnAwareCheckID").checked = true;
		document.getElementById("StateAwareCheckID").checked = false;
		document.getElementById("ActionIndexAB").style.display = "none";
		document.getElementById("ActionIndexUnAware").style.display = "";	
		document.getElementById("ActionIndexSL").style.display = "none";
		document.getElementById("ActionIndexSL").disabled = true;
		document.getElementById("TargetIndexID").disabled = true;
		document.getElementById("ActionIndexUnAware").selectedIndex = 0;
	}
	else
	{
		document.getElementById("StateUnAwareCheckID").checked = false;
		document.getElementById("StateAwareCheckID").checked = true;
		document.getElementById("ActionIndexAB").style.display = "none";
		document.getElementById("ActionIndexUnAware").style.display = "none";	
		document.getElementById("ActionIndexSL").style.display = "";
		document.getElementById("ActionIndexSL").disabled = false;
		document.getElementById("TargetIndexID").disabled = false;
		document.getElementById("TargetIndexID").selectedIndex = 0;
		document.getElementById("ActionIndexAB").selectedIndex = 0;
	}
}

function CheckFiltersAreSame() 
{
	var ret = true;
	var selIndex = document.getElementById("FilterIndexID").selectedIndex;
	var StAw = document.getElementById("StateAwareCheckID").checked;
	var StUnAw = document.getElementById("StateUnAwareCheckID").checked;
	for (var index=1; index<=MAX_FILTERS;index++)
	{
		if(FilterData[index].valid == true && selIndex!= index)
		{
			if(FilterData[index].StAw == true && StUnAw || FilterData[index].StAw == false && StAw)
				ret = false;
		}
	}
	return ret;
}

function ValidateInputs()
{
	var StAw = document.getElementById("StateAwareCheckID").checked;
	var StUnAw = document.getElementById("StateUnAwareCheckID").checked;
	if(!StAw && !StUnAw) 
	{
		document.getElementById("StatusMessagesID").value = "Select state Aware checkbox !";
		return false;
	}
	return true;
}

function SetFilterStateAwareFields(Index) 
{
	var StAw = document.getElementById("StateAwareCheckID").checked;
	var StUnAw = document.getElementById("StateUnAwareCheckID").checked;
	if(StAw || StUnAw) 
	{
		FilterData[Index].performStateAwareSingulation = false;
		FilterData[Index].StAw = false;
		if(StAw) 
		{
			if(performStateAwareSingulation == false)
			{
				StateAwareSingulation.invState = "INV A";
				StateAwareSingulation.SL = "SL DEASSERTED";
			}
			FilterData[Index].performStateAwareSingulation = true;
			FilterData[Index].StAw = true;
		}
		var selectObj = document.getElementById("ActionSelectID");
		var ActionElementNode=0;
		for (var i=0;i<selectObj.childElementCount;i++) 
		{
			if (selectObj.children[i].style.display != "none")
				ActionElementNode = i;
		}
		var ele = selectObj.children[ActionElementNode];
		var str = ReplaceSpace(ele.options[ele.selectedIndex].text);
		FilterData[Index].ActionElementNode = ActionElementNode;
		FilterData[Index].ActionSelectEle = ele.selectedIndex;
		FilterData[Index].preFilterStateAwUnAwAction = str;
		
		var obj = document.getElementById("TargetIndexID");
		str = ReplaceSpace(obj.options[obj.selectedIndex].text);
		FilterData[Index].TargetSelectEle = obj.selectedIndex;
		FilterData[Index].preFilterTarget = str;
			
		// state aware singulation
		objGeneric.InvokeMETAFunction("rfid","performStateAwareSingulation:" +FilterData[Index].performStateAwareSingulation);
		if(StAw) 
		{
			objGeneric.InvokeMETAFunction("rfid","preFilterStateAwareAction:" + FilterData[Index].preFilterStateAwUnAwAction);
			if(FilterData[Index].preFilterTarget != "SL")
				objGeneric.InvokeMETAFunction("rfid","preFilterTarget:" + "INV_" + FilterData[Index].preFilterTarget);
			else
				objGeneric.InvokeMETAFunction("rfid","preFilterTarget:" + FilterData[Index].preFilterTarget);

			FilterData[Index].singulationSLFlag = ReplaceSpace(StateAwareSingulation.SL);
			FilterData[Index].singulationInventoryState = ReplaceSpace(StateAwareSingulation.invState);

			objGeneric.InvokeMETAFunction("rfid","singulationSLFlag:" + FilterData[Index].singulationSLFlag);
			objGeneric.InvokeMETAFunction("rfid","singulationInventoryState:" + FilterData[Index].singulationInventoryState);
		}
		else
			objGeneric.InvokeMETAFunction("rfid","preFilterStateUnAwareAction:" + FilterData[Index].preFilterStateAwUnAwAction);
		rfid.singulationTagPopulation = singulationTagPopulation; 
		rfid.singulationSession = singulationSession; 
		rfid.setSingulation();
	}
}

function ReplaceSpace(str)
{
	return str.replace(/[\s]/g,"_");
}

function singulationEvent(singulObj)
{
	objGeneric.Log("Filter singulationEvent:" + JSON.stringify(singulObj),2);
	singulationSession = singulObj.singulationSession;
	singulationTagPopulation = singulObj.singulationTagPopulation;
	performStateAwareSingulation = false;
	if(singulObj.performStateAwareSingulation == "true")
		performStateAwareSingulation = true;
	if(performStateAwareSingulation == true)
	{
		StateAwareSingulation.SL = singulObj.singulationSLFlag.replace(/_/g," ");
		StateAwareSingulation.invState = singulObj.singulationInventoryState.replace(/_/g," ");
	}
	document.getElementById("StatusMessagesID").value = "SingulationEvent";
}
