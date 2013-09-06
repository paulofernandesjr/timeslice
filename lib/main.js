var fs = require('fs');
var request = require('request');

function Timeslice(){
	
	this.get_projects = function(){
		request.post(
			    'https://timeslice.azurewebsites.net/Integration/CostCenters',
			    { form: { key: get_key() } },
			    function (error, response, body) {
			        if (!error && response.statusCode == 200) {
			            var data = JSON.parse(body);
			            var projetos = iterate_data(data.Data);
			            for(var i=0;i<projetos.length;i++){
			            	console.log( projetos[i].id + " => " + projetos[i].name );
			            }
			        }
			    }
			);	
	};
	
	this.report_hours = function(){
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
			msg += "Preencha a quantidade de horas [-h HH:II] \n";
		}
		if( projeto == "" ){
			msg += "Preencha o projeto [-p NUMBER] \n";
		}
		if( data == "" ){
			msg += "Preencha a data [-d DD/MM/AAAA] \n";
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
				            console.log(body);
				        }
				    }
				);
		} else {
			console.log(msg);
		}
	};
}


function print_line(){
	console.log("----------------------------------------------");
}

function get_key(){
	return fs.readFileSync('key.txt', 'utf8');
}

function iterate_data(data){
	var ids = [];
	var projetos = [];
	var total = data.length;
	for(var i=0;i<total;i++){
    	var obj = {};
    	obj.id = data[i].Id;
    	obj.name = data[i].Name;
    	if( obj.id > 0 && !inArray(obj.id, ids) )
    		projetos.push(obj);
    	ids.push(obj.id);
    }
	return projetos;
}

function inArray(needle, haystack) {
    var length = haystack.length;
    for(var i = 0; i < length; i++) {
        if(haystack[i] == needle) return true;
    }
    return false;
}



(function(){
	// get method alias
	var args = process.argv.slice(2);
	if( args.length == 0 ){
		console.log("usage:");
		console.log("timeslace gp");
		console.log("timeslice rh args");
		process.exit(1);
	}
	
	var timeslice = new Timeslice();
	
	if( args[0] == "gp" ){
		
		timeslice.get_projects();		
		
	} else if( args[0] == "rh" ){
		
		timeslice.report_hours();
		
	} else {
		console.log( args[0] + " is not a command ");
	}	
	
}).call(this);