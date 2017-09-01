import { random, randomExcludingRange } from '../lib/helpers.js'
import { cW, cH, OBSTACLESIZE } from '../lib/constants.js'
import { createVector } from '../math/vectorLib.js'

export const newRandomObstacle = (player) => {
  const w = random(OBSTACLESIZE)
  const h = random(OBSTACLESIZE)
  return newObstacle(w, h, player)
}

const newObstacle = (obstacleWidth, obstacleHeight, player) => {
  let xVal = randomExcludingRange(cW / 2 - player.width / 2 + obstacleWidth,
    cW / 2 + player.width / 2 + obstacleWidth, 0, cW)
  let yVal = randomExcludingRange(cH / 2 - player.height / 2 + obstacleHeight,
    cH / 2 + player.height / 2 + obstacleHeight, 0, cH)
  return {
    pos: createVector(xVal, yVal),
    width: obstacleWidth,
    height: obstacleHeight
  }
}
