var collider = require ('./Collider')

module.exports = function player (id) {
  var self = {
      id: id,
      pivot: {x:0,
              y:0},
      speed:5,
      jumpingForce:10,
      movingLeft:false,
      movingRight:false,
      movingUp:false,
      movingDown:false,
      isJumping:false,
      gravity:5,
      isGrounded:false,
      playerCollider: null,
      name: 'newPlayer'
    }

    self.playerCollider = collider(self.pivot)
  return self;
}
