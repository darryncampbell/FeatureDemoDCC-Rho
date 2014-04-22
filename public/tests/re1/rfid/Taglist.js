var tagList = JSON.parse(sessionStorage.tagData);

function loadInventoryReports() {
    if (sessionStorage.totalTagsRead != 0 && sessionStorage.uniqueTagsRead != 0) {
        FillTagReport();
    }
}

function FillTagReport() 
{
    var i = 1;
    for (var tagID in tagList) 
    {
        addRow(i, tagID, tagList[tagID][0]);
        i++;
    }
}

function singleclick(obj) {
    //objGeneric.Log("singleclick: " + obj.id,2);
    sessionStorage.tagIDSelected = wordUnwrap(obj.childNodes[1].innerText);
    window.location.href = "TagRdWrLoTabsRead.html";
}

function returnMainScreen() {
    window.location.href = "Main.html";
}

function addRow(index, id, count)
{
    tabBody = document.getElementsByTagName("TBODY").item(0);
    row = document.createElement("TR");
    cell1 = document.createElement("TD");
    cell2 = document.createElement("TD");
    cell3 = document.createElement("TD");
    textnode1 = document.createTextNode(index);
    if (id.toString().length > 24)
        textnode2 = document.createTextNode(wordwrap(id, 24, '\n', true));
    else
        textnode2 = document.createTextNode(id);
    textnode3 = document.createTextNode(count);
    cell1.appendChild(textnode1);
    cell2.appendChild(textnode2);
    cell3.appendChild(textnode3);
    cell1.style.fontSize = "small";
    cell3.style.fontSize = "small";
    row.appendChild(cell1);
    row.appendChild(cell2);
    row.appendChild(cell3);
    row.onclick = function() {
        singleclick(this);
    };
    tabBody.appendChild(row);
}
