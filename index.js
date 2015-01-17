var cmd;
var platform = process.platform;
if(platform === 'darwin') {
    cmd = './bin/osx/nw-0.11.5-x64.app/Contents/MacOS/node-webkit ./www';
}
else if(/^win/.test(platform)) {
    cmd = './bin/win/nw.exe ./www';
}
else {
    cmd = './bin/linux/nw ./www';
}

var sys = require('sys');
var exec = require('child_process').exec;
function puts(error, stdout, stderr) { sys.puts(stdout) }
exec(cmd, puts);