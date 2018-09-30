module.exports = function physics (player){
  if(player.isJumping){
    player.y = player.y - player.jumpingForce
    player.jumpingForce = player.jumpingForce * 0.95
  }
  if(player.movingLeft){
    player.x = player.x - player.speed
    if(player.x <= 0){
      player.x = 0
    }
  }
  if(player.movingRight){
    player.x = player.x + player.speed
    if(player.x >= 480){
      player.x = 480
    }
  }

  if(player.y < 480 && !player.isJumping){
  player.y = player.y + player.gravity
    if(player.y > 480){
      player.y = 480
    }
  player.gravity = player.gravity * 1.05

  }
  else if (player.y >= 480){
    player.isGrounded = true
  }

}
