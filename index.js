  var app = require('express')();
    var https = require('https');
    var fs = require( 'fs' );
    var io = require('socket.io')(server,{
        ca: fs.readFileSync('../../ssl/certs/softawork1_xyz_c7134_54c59_1653350399_6440d4861951d27a84606cb966f24c4a.crt')
    });

    var options = {
        key: fs.readFileSync('../../ssl/keys/c7134_54c59_41b15e3ee55db58c80bc051d580622eb.key'),
        cert: fs.readFileSync('../../ssl/certs/softawork1_xyz_c7134_54c59_1653350399_6440d4861951d27a84606cb966f24c4a.crt'),
        ca: fs.readFileSync('../../ssl/certs/softawork1_xyz_c7134_54c59_1653350399_6440d4861951d27a84606cb966f24c4a.crt'),

        requestCert: false,
        rejectUnauthorized: false
    }

    var server = https.createServer(options, app);
    server.listen(8089);
    

app.get('/', (req, res) => {
    res.send("Node Server is running. Yay!!")
})
  io.on("connect_error", (err) => {
  console.log(`connect_error due to ${err.message}`);
});
//console.log('check 1', socket.connected);


// io.on('connection', socket => {

// });
// https.createServer(options, (req, res) => {}).listen(8082);
//http.listen(process.env.PORT || 8081)