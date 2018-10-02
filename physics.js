
module.exports = function physics (player){
  if(player.isJumping){
    player.pivot.y = player.pivot.y - player.jumpingForce
    player.jumpingForce = player.jumpingForce * 0.95
  }
  if(player.movingLeft && !player.playerCollider.collisionLeft){
    player.pivot.x = player.pivot.x - player.speed
    if(player.pivot.x <= 0){
      player.pivot.x = 0
    }
  }
  if(player.movingRight &&  !player.playerCollider.collisionRight){
    player.pivot.x = player.pivot.x + player.speed
    if(player.pivot.x >= 480){
      player.pivot.x = 480
    }
  }

  if(player.pivot.y < 480 && !player.isJumping){
  player.pivot.y = player.pivot.y + player.gravity
    if(player.pivot.y > 480){
      player.pivot.y = 480
    }
  player.gravity = player.gravity * 1.05

  }
  else if (player.pivot.y >= 480){
    player.isGrounded = true
  }

}
