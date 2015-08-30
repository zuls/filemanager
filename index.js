//#index.js

/**
* Module dependencies 
*/

var fs = require('fs');
var stdin = process.stdin;
var stdout = process.stdout;

// fs.readdir(__dirname,function(err,files){
// 	console.log(files);
// });

fs.readdir(process.cwd(),function(err,files){
	console.log('');
	if (!files.length){
		return console.log('	\033[31m No files to show!\033[39m\n');
	}

	console.log('	Select which file or diretory you want to see\n');

	function file(i){
		var filename = files[i];

		fs.stat(__dirname + '/' + filename, function(err,stat){
			if (stat.isDirectory()){
				console.log('	'+i+'	\033[36m' + filename + '/\033[39m');
			} else{
				console.log('	'+i+'	\033[90m' + filename + '\033[39m');
			}
			//i++;
			if (++i == files.length) {
				//console.log('');
				//process.stdout.write('	\033[33mEnter your choise: \033[39m');
				//process.stdin.resume();
				read();
			} else{
				file(i);
			}

		});
	}
	//read user input when files are shown 
	function read(){
		console.log('');
		stdout.write('	\033[33mEnter your choise: \033[39m');
		stdin.resume();
		stdin.setEncoding('utf8');
		stdin.on('data', option);
	}

	//called with the option supplied by the user
	function option(data){
		if(!files[Number(data)]){
			stdout.write('	\033[31mEnter your choice: \033[39m');

		}else {
			stdin.pause();
		}
	}
	file(0);
});