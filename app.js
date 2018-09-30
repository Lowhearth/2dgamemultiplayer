var express = require('express');
var app = express();
var serv = require('http').Server(app);


app.get('/', function(req, res) {
    res.sendFile(__dirname + '/client/index.html');
});
app.use('/client', express.static(__dirname + '/client'));
serv.listen(2000);

var SOCKET_LIST = {}
var PLAYERS_LIST = {}

var io = require('socket.io')(serv, {});
io.sockets.on('connection', function (socket) {
    console.log("new Conections")
    socket.id = Math.random();
    SOCKET_LIST[socket.id] = socket;
    let newPlayer = player(socket.id)
    PLAYERS_LIST[socket.id] = newPlayer

    socket.on('changeName', function (date){
      newPlayer.name = date.name
    })
    socket.on('keyPress', function (data){
      console.log("keypressed" + data.inputId + "  " + data.state)
      if(data.inputId === "jump" && newPlayer.isGrounded){
        newPlayer.isGrounded = false
        newPlayer.isJumping = data.state
        setTimeout(function(){
          newPlayer.isJumping = false
          newPlayer.jumpingForce = 10
          newPlayer.gravity = 5
          console.log(newPlayer.isJumping)
        }, 250)

      }
      if(data.inputId === "up"){
        newPlayer.movingUp = data.state

      }
      if(data.inputId === "down"){
        newPlayer.movingDown = data.state
      }
      if(data.inputId === "left"){
        newPlayer.movingLeft = data.state
      }
      if(data.inputId === "right"){
        newPlayer.movingRight = data.state
      }
    })

    socket.on('disconnect', function(){
      delete SOCKET_LIST[socket.id]
      delete PLAYERS_LIST[socket.id]
    })

})




setInterval(function(){
  var pack = []
  for( var i in PLAYERS_LIST){
    let thePlayer = PLAYERS_LIST[i];
    thePlayer.updatePosition()
    pack.push({
      x:thePlayer.x,
      y:thePlayer.y,
      id:thePlayer.id,
      name:thePlayer.name
    })
  }

  for(var i in SOCKET_LIST){
    let socket = SOCKET_LIST[i];
    socket.emit('newPosition', pack)
  }


}, 1000/75);



var player = function (id) {
  var self = {
      id: id,
      x:0,
      y:0,
      speed:5,
      jumpingForce:10,
      movingLeft:false,
      movingRight:false,
      movingUp:false,
      movingDown:false,
      isJumping:false,
      gravity:5,
      isGrounded:false,
      name: 'newPlayer',
      updatePosition: function (){
        if(this.isJumping){
          this.y = this.y - this.jumpingForce
          this.jumpingForce = this.jumpingForce * 0.95
        }
        if(this.movingLeft){
          this.x = this.x - this.speed
          if(this.x <= 0){
            this.x = 0
          }
        }
        if(this.movingRight){
          this.x = this.x + this.speed
          if(this.x >= 480){
            this.x = 480
          }
        }

        if(this.y < 480 && !this.isJumping){
        this.y = this.y + this.gravity
          if(this.y > 480){
            this.y = 480
          }
        this.gravity = this.gravity * 1.05

        }
        else if (this.y >= 480){
          this.isGrounded = true
        }


      }

  }
  return self;
}
