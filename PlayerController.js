module.exports = function controller (socket, newPlayer) {

  return(
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
  )
}
