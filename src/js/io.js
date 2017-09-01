const calculateControlVelocityVector = () => {
  let vel = p.createVector(0, 0)

  if (p.keyIsDown(KEYS.UP)) {
    vel.y -= WALKVELOCITY
  }
  if (p.keyIsDown(KEYS.DOWN)) {
    vel.y += WALKVELOCITY
  }
  if (p.keyIsDown(KEYS.LEFT)) {
    vel.x -= WALKVELOCITY
  }
  if (p.keyIsDown(KEYS.RIGHT)) {
    vel.x += WALKVELOCITY
  }

  return vel
}
