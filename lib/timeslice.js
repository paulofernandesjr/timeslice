var request = require('request');
var fs = require('fs');

function get_key (){
	var key = fs.readFileSync(process.env['HOME']+'/.timeslice-key', 'utf8');
	key = key.replace(" ", "");
	key = key.replace("\n", "");
	return key;
}

exports.get_projects = function(){
	request.post(
		'https://timeslice.azurewebsites.net/Integration/CostCenters',
	    { form: { key: get_key() } },
	    function (error, response, body) {
	        if (!error && response.statusCode == 200) {
	            var data = JSON.parse(body);
	            var projetos = data.Data;
	            if( projetos.length > 0 ){
	            	console.log("ID => COST CENTER - PROJECT NAME");
	            } else {
	            	console.log("COST CENTERS/PROJECTS NOT FOUND");
	            }
	            
	            for(var i=0;i<projetos.length;i++){
	            	console.log( projetos[i].Id + " => " + projetos[i].Name );
	            }
	        }
	    }
	);	
};
	
exports.report_hours = function(){
	var args = process.argv.slice(3);
	var total_args = args.length;
	var array = [];
	for(var x=0;x<total_args;x++){
		array[args[x++]] = args[x];
	}
	
	var data='';
	var comentario='';
	var projeto='';
	var hora = '';
	
	if( array['-d'] != undefined ){
		data = array['-d'];
	}
	if( array['-c'] != undefined ){
		comentario = array['-c'];
	}
	if( array['-p'] != undefined ){
		projeto = array['-p'];
	}
	if( array['-h'] != undefined ){
		hora = array['-h'];
	}
	var msg = "";
	if( hora == "" ){
		msg += "Hours is not an optional field [-h HH:MI] \n";
	}
	if( projeto == "" ){
		msg += "Cost Center/Project is not an optional field [-p NUMBER] \n";
	}
	if( data == "" ){
		msg += "Date is not an optional field [-d DD/MM/AAAA] \n";
	}
	
	if( msg == "" ){
		request.post(
		    'https://timeslice.azurewebsites.net/Integration/Report',
		    { form: 
			{ key: get_key(), 
			  hours: hora, // hh:mm
			  date: data, // dd/mm/aaaa
			  comment: comentario, 
			  projectid: projeto
			} },
		    function (error, response, body) {
		        if (!error && response.statusCode == 200) {
		            var data = JSON.parse(body);
		            if( data.Error == undefined ){
		            	console.log('Hours reported with successful!');
		            } else {
		            	console.log('ERROR: ' + data.Error);
		            }
		        }
		    }
		);
	} else {
		console.log(msg);
	}
};