
	var scancounts = 0;
	
	onmessage = function (event) 
	{ 
		postMessage(++scancounts + "/"+ event.data + " Scans");

	};

