/* Module dependencies */
var fs = require('fs'),
	stdin = process.stdin,
	stdout = process.stdout;
	
/* Main program logic */
fs.readdir(process.cwd(), function(err, files) {
	var filename,
		length = files.length,
		stats = [];
	if(!length) {
		return console.log('No files to show!\n');
	}
	console.log('Select the file or directory that you want to see:\n');
	
	function file(i) {  //displays each file in current directory
		filename = files[i];
		fs.stat(__dirname + '/' + filename, function(err, stat) {
			stats[i] = stat;
			if(stat.isDirectory()) {
				console.log(' '+i+' \033[36m'+ filename + '/\033[39m');
			}
			else {
				console.log(' '+i+' \033[90m' + filename + '\033[39m');
			}
			if( ++i == length) {
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
		var numData = Number(data);
		if(!files[numData]) {
			stdout.write('Enter your choice: ');
		}
		else {
			stdin.pause();
			filename = files[numData];
			if(stats[numData].isDirectory()) {
				fs.readdir(__dirname + '/' + filename, function(err, fls) {
					console.log('');
					console.log(' (' + fls.length + ' files)');
					fls.forEach(function(file) {
						console.log(' - ' + file);
					});
					console.log('');
				});
			}
			else {
				fs.readFile(__dirname + '/' + filename, 'utf8', function(err, data) {
					console.log('');
					console.log(data.replace(/(.*)/g, ' $1'));
				});
			}
		}
	}
	
	file(0);
});
