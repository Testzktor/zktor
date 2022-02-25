const express = require('express');
const app = express();
const http = require('http');
 var https = require('https');
    var fs = require( 'fs' );
    
     ca = [];

  chain = fs.readFileSync("../../ssl/certs/softawork1_xyz_c7134_54c59_1653350399_6440d4861951d27a84606cb966f24c4a.crt", 'utf8');

  chain = chain.split("\n");

  cert = [];

  for (_i = 0, _len = chain.length; _i < _len; _i++) {
    line = chain[_i];
    if (!(line.length !== 0)) {
      continue;
    }
    cert.push(line);
    if (line.match(/-END CERTIFICATE-/)) {
      ca.push(cert.join("\n"));
      cert = [];
    }
  }
      var options = {
        key: fs.readFileSync('../../ssl/keys/c7134_54c59_41b15e3ee55db58c80bc051d580622eb.key', "utf8"),
        cert: fs.readFileSync('../../ssl/certs/softawork1_xyz_c7134_54c59_1653350399_6440d4861951d27a84606cb966f24c4a.crt', "utf8"),
       ca: [

          fs.readFileSync('../../ssl/keys/c7134_54c59_41b15e3ee55db58c80bc051d580622eb.key'),

          fs.readFileSync('../../ssl/certs/softawork1_xyz_c7134_54c59_1653350399_6440d4861951d27a84606cb966f24c4a.crt')

       ],
         requestCert: true,
  //ca: fs.readFileSync('/etc/ssl/certs/ca.crt'),
  rejectUnauthorized: false 
    }
var server = https.createServer(options, app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.send("Node Server is running. Yay!!")
});

io.on('connection', (socket) => {
      console.log('test');
      console.log("url: " + socket.handshake.url);
    //Get the chatID of the user and join in a room of the same chatID
    chatID = socket.handshake.query.chatID
    socket.join(chatID)

    //Leave the room if the user closes the socket
    socket.on('disconnect', () => {
        console.log(chatID);
        socket.leave(chatID)
    })

    //Send message to only a particular user
    socket.on('send_message', message => {
        receiverChatID = message.receiverChatID
        senderChatID = message.senderChatID
        content = message.content

        //Send message to only that particular room
        socket.in(receiverChatID).emit('receive_message', {
            'content': content,
            'senderChatID': senderChatID,
            'receiverChatID':receiverChatID,
        })
    })
});

server.listen(443, () => {
  console.log('listening on *:443');
});