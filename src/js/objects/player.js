const updatePlayer = (player, obstacles) => {
  obstacles = obstacles.filter(f => {
    return player.pos.dist(f.pos) < Math.max(player.width, player.height) * 2
  })

  let vel = calculateControlVelocityVector()

  obstacles.forEach(e => {
    let collisions = detectCollisions(player, e)
    vel = applyCollisions(vel, collisions)
  })

  player.vel = vel

  player.pos.add(player.vel)
  return player
}

const newPlayer = () => {
  return {
    pos: p.createVector(cW / 2, cH / 2),
    vel: p.createVector(0, 0),
    acc: p.createVector(0, 0),
    width: 50,
    height: 60
  }
}
