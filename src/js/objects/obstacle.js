const newRandomObstacle = () => {
  const w = p.random(OBSTACLESIZE)
  const h = p.random(OBSTACLESIZE)
  return newObstacle(w, h)
}

const newObstacle = (obstacleWidth, obstacleHeight) => {
  let xVal = randomExcludingRange(cW / 2 - player.width / 2 + obstacleWidth,
    cW / 2 + player.width / 2 + obstacleWidth, 0, cW)
  let yVal = randomExcludingRange(cH / 2 - player.height / 2 + obstacleHeight,
    cH / 2 + player.height / 2 + obstacleHeight, 0, cH)
  return {
    pos: p.createVector(xVal, yVal),
    width: obstacleWidth,
    height: obstacleHeight
  }
}
