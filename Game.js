const physics = require('./physics')

module.exports = function frame (STATE){

   setInterval(function(){
    var statePack = []
    for( var i in STATE.PLAYERS_LIST){
      let thePlayer = STATE.PLAYERS_LIST[i];
      physics(thePlayer)
      statePack.push({
        x:thePlayer.x,
        y:thePlayer.y,
        id:thePlayer.id,
        name:thePlayer.name
      })
    }

    for(var i in STATE.SOCKET_LIST){
      let socket = STATE.SOCKET_LIST[i];
      socket.emit('newPosition', statePack)
    }


  }, 1000/75);

}
