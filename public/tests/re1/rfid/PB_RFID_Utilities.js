function getMemoryBankString(memBank) 
{
    switch (memBank) 
    {
        case 0:
            return "EPC";
        case 1:
            return "TID";
        case 2:
            return "User";
        case 3:
            return "Reserved";
        case 4:
            return "Kill Password";
        case 5:
            return "Access Password";
        case 6:
        default:
            return "TagID";
            break;
    }
}
function getMemBankIndex(memBankStr) {
    
    if (memBankStr == "ReservedMemBank") {
        return 0;
    } 
    else if (memBankStr == "EPCMemBank") {
        return 1;
    } 
    else if (memBankStr == "TIDMemBank") {
        return 2;
    } 
    else if (memBankStr == "UserMemBank") {
        return 3;
    } 
    else
        return -1;


}

function setCookie(c_name, value) 
{
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + 7);
    var c_value = escape(value) + ";expires=" + exdate.toUTCString() + ";path=/";
    document.cookie = c_name + "=" + c_value;
}

function getCookie(c_name) 
{
    var i, x, y, ARRcookies = document.cookie.split(";");
    for (i = 0; i < ARRcookies.length; i++) {
        x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
        y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
        x = x.replace(/^\s+|\s+$/g, "");
        if (x == c_name) {
            return unescape(y);
        }
    }
}
function eraseCookie(c_name) {
    
    var exdate = new Date();
    exdate.setDate(exdate.getDate() - 1);
    var c_value = "0;" + "expires=" + exdate.toUTCString() + ";";
    document.cookie = c_name + "=" + c_value;
}
function getShortMemoryBankString(memBank) {
    switch (memBank) {
        case 0:
            return "RSVD";
        case 1:
            return "EPC";
        case 2:
            return "TID";
        case 3:
            return "User";
        default:
            return "None";
            break;
    
    }
}


function wordwrap(str, width, brk, cut) 
{
    brk = brk || '\n';
    width = width || 24;
    cut = cut || false;
    if (!str) {
        return str;
    }
    var regex = '.{1,' + width + '}(\\s|$)' + (cut ? '|.{' + width + '}|.+$' : '|\\S+?(\\s|$)');
    return str.match(RegExp(regex, 'g')).join(brk);
}

function wordUnwrap(str) 
{
	return str.split(/[\n,\s]/g).join("");
} 
