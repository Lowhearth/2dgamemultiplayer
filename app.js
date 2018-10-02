const PORT = process.env.PORT || 8080

const player = require('./player')
const physics = require('./physics')
const playerController = require('./PlayerController')
const frame = require('./Game')

var express = require('express');
var app = express();
var serv = require('http').Server(app);
var io = require('socket.io')(serv, {});


/* SERVER CONFIGURATION */
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/client/index.html');
});
app.use('/client', express.static(__dirname + '/client'));
serv.listen(PORT);

/* SERVER CONFIGURATION */

/*Game State*/

var STATE = { SOCKET_LIST: {},
              PLAYERS_LIST: [] }

/*Game State*/


io.sockets.on('connection', function (socket) {

    socket.id = Math.random()
    let newPlayer = player(socket.id)

    STATE.SOCKET_LIST[socket.id] = socket;
    STATE.PLAYERS_LIST.push(newPlayer)

    socket.on('changeName', function (date){
      newPlayer.name = date.name
    })
    playerController(socket, newPlayer)

    socket.on('disconnect', function(){
      delete STATE.SOCKET_LIST[socket.id]
    })

})

frame(STATE)
