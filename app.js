  var app = require('express')();
    var https = require('https');
    var fs = require( 'fs' );
    var io = require('socket.io')(server);

    var options = {
        key: fs.readFileSync('../../ssl/keys/ae0c9_056c7_e2aaeb9d8497c05323aba0c280274996.key'),
        cert: fs.readFileSync('../../ssl/certs/softawork1_xyz_ae0c9_056c7_1644036973_84ab5f4750fbf9f4274f35dd42547c1f.crt'),
        ca: fs.readFileSync('../../ssl/certs/softawork1_xyz_ae0c9_056c7_1644036973_84ab5f4750fbf9f4274f35dd42547c1f.crt'),

        requestCert: false,
        rejectUnauthorized: false
    }

    var server = https.createServer(options, app);
    server.listen(8089);
    

    
    io.sockets.on('connection', function (socket) {
        // code goes here...
    });
    
    app.get("/", function(request, response){
        // code goes here...
    })