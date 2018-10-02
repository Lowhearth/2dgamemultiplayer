const physics = require('./physics')
const collisionDetector = require ('./CollisionDetector')

module.exports = function frame (STATE){

   setInterval(function(){
    var statePack = []
    collisionDetector(STATE.PLAYERS_LIST)
    for( var i in STATE.PLAYERS_LIST){
      let thePlayer = STATE.PLAYERS_LIST[i];
      physics(thePlayer)
      statePack.push({
        x:thePlayer.pivot.x,
        y:thePlayer.pivot.y,
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
