/* Module dependencies */
var fs = require('fs'),
	stdin = process.stdin,
	stdout = process.stdout;

/* Main program logic */
fs.readdir(process.cwd(), function(err, files) {
	if(!files.length) {
		return console.log('No files to show!\n');
	}
	console.log('Select the file or directory that you want to see:\n');
	
	function file(i) {  //displays each file in current directory
		var filename = files[i];
		fs.stat(__dirname + '/' + filename, function(err, stat) {
			if(stat.isDirectory()) {
				console.log(' '+i+' \033[36m'+ filename + '/\033[39m');
			}
			else {
				console.log(' '+i+' \033[90m' + filename + '\033[39m');
			}
			if( ++i == files.length) {
				read();
			}
			else {
				file(i);
			}
		});
	}

	function read() { //reads user input after files are shown
		console.log('');
		stdout.write('Enter your choice: ');
		stdin.resume();
		stdin.setEncoding('utf8');
		stdin.on('data', option);
	}

	function option(data) { //processes user input
		if(!files[Number(data)]) {
			stdout.write('Enter your choice: ');
		}
		else {
			stdin.pause();
		}
	}
	
	file(0);
});
