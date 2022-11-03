var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
    "name": "Keyboardsim",
    "version": "1.0.0",
    "description": "serial port to keyboard input - developed by INFINIA",
    script: 'C:\\keyboardsim\\main.js',
    nodeOptions: [
        '--harmony',
        '--max_old_space_size=4096'
    ]
    //, workingDirectory: '...'
    //, allowServiceLogon: true
});

svc.on('install',function(){
    svc.start();
});

svc.install();