var page = require('webpage').create();
var system = require('system');
page.open(system.args[1], function (status) {
	    console.log("Status: " + status);
	    if (status === "success") {
		            page.render('example.png');
		        }
	    phantom.exit();
});
