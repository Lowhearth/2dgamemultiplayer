module.exports = function collider (pivot){
  return ({
    top: pivot.y,
    bot: pivot.y + 20,
    right: pivot.x +20,
    left: pivot.x,
    collisionTop: false,
    collisionBot: false,
    collisionRight: false,
    collisionLeft: false

  })

}
