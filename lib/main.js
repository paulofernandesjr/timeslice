var timeslice = require('./timeslice.js');

(function(){
	// get method alias
	var args = process.argv.slice(2);
	if( args.length == 0 ){
		console.log("usage:");
		console.log("timeslace gp");
		console.log("timeslice rh args");
		process.exit(1);
	}
	
	
	if( args[0] == "gp" ){
		
		timeslice.get_projects();		
		
	} else if( args[0] == "rh" ){
		
		timeslice.report_hours();
		
	} else {
		console.log( args[0] + " is not a command ");
	}	
	
}).call(this);