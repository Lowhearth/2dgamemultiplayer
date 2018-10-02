var collider = require ('./Collider')

module.exports = function collisionDetector (players){

  for(var i=0 ; i< players.length; i++){
      players[i].playerCollider = collider(players[i].pivot)
    }
  for(var i=0 ; i< players.length; i++){
    for(var j=i+1; j< players.length; j++){

      if (players[i].playerCollider.right >= players[j].playerCollider.left && players[i].playerCollider.right <= players[j].playerCollider.right){
        players[i].playerCollider.collisionRight = true;
        players[j].playerCollider.collisionLeft = true;
        console.log("collisionDetected")
        if(players[i].playerCollider.bot <= players[j].playerCollider.top){
          players[i].playerCollider.collisionRight = false;
          players[i].playerCollider.collisionLeft = false;
          players[j].playerCollider.collisionLeft = false;
          players[j].playerCollider.collisionRight = false;
        }
      }
      else {
        players[i].playerCollider.collisionRight = false;
        players[j].playerCollider.collisionLeft = false;

      }

      if (players[i].playerCollider.left <= players[j].playerCollider.right && players[i].playerCollider.left >= players[j].playerCollider.left){
          players[i].playerCollider.collisionLeft = true;
          players[j].playerCollider.collisionRight = true;
          if(players[j].playerCollider.bot <= players[i].playerCollider.top){
            players[i].playerCollider.collisionRight = false;
            players[i].playerCollider.collisionLeft = false;
            players[j].playerCollider.collisionLeft = false;
            players[j].playerCollider.collisionRight = false;
          }

      }
      else{
        players[i].playerCollider.collisionLeft = false;
        players[j].playerCollider.collisionRight = false;
      }


    }
  }

}
