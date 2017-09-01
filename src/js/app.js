import p5 from 'p5'

import { KEYS, WALKVELOCITY, OBSTACLESIZE } from './constants.js'

const sketch = (p) => {

  let cW = p.windowWidth
  let cH = p.windowHeight
  let playerColor = [0, 0, 128]
  let obsColor = [0, 128, 0]

  let obstacles = []

  let player = {
    pos: p.createVector(cW / 2, cH / 2),
    vel: p.createVector(0, 0),
    acc: p.createVector(0, 0),
    width: 50,
    height: 60
  }

  const randomExcludingRange = (exRangeMin, exRangeMax, totalRangeMin, totalRangeMax) => {
    let posNeg = p.random()
    if (posNeg < .5) {
      return p.random(totalRangeMin, exRangeMin)
    }
    if (posNeg > .5) {
      return p.random(exRangeMax, totalRangeMax)
    }
  }

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

  const drawObstacle = (obstacle) => {
    p.push()
    p.fill(obsColor)
    p.rect(
      obstacle.pos.x - obstacle.width / 2,
      obstacle.pos.y - obstacle.height / 2,
      obstacle.width,
      obstacle.height)
    p.pop()
  }

  const drawPlayer = (player) => {
    p.push()
    p.fill(playerColor)
    p.rect(player.pos.x - player.width / 2,
      player.pos.y - player.height / 2,
      player.width,
      player.height)
    p.pop()
  }

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

  const rangeIntersect = (min0, max0, min1, max1) => {
    return Math.max(min0, max0) >= Math.min(min1, max1) &&
      Math.min(min0, max0) <= Math.max(min1, max1)
  }

  const horizSpaceBetween = (player, ob) => {
    let dist = Math.abs(player.pos.x - ob.pos.x) - Math.abs(player.width / 2 + ob.width / 2)
    if (dist >= 0) {
      return dist
    } else {
      return 0
    }
  }

  const vertSpaceBetween = (player, ob) => {
    let dist = Math.abs(Math.abs(player.pos.y - ob.pos.y) - Math.abs(player.height / 2 + ob.height / 2))
    if (dist >= 0) {
      return dist
    } else {
      return 0
    }
  }

  const detectCollisions = (player, ob) => {
    let vertColl = rangeIntersect(player.pos.x - (player.width / 2), player.pos.x + (player.width / 2),
        ob.pos.x - (ob.width / 2), ob.pos.x + (ob.width / 2)) && (Math.ceil(vertSpaceBetween(player, ob)) <= WALKVELOCITY)
    let horizColl = rangeIntersect(player.pos.y - (player.height / 2), player.pos.y + (player.height / 2),
        ob.pos.y - (ob.height / 2), ob.pos.y + (ob.height / 2)) && (Math.ceil(horizSpaceBetween(player, ob)) <= WALKVELOCITY)

    let collisions = {
      up: false,
      down: false,
      right: false,
      left: false
    }
    if (horizColl && player.pos.x < ob.pos.x) {
      collisions.right = true
    }
    if (horizColl && player.pos.x > ob.pos.x) {
      collisions.left = true
    }
    if (vertColl && player.pos.y < ob.pos.y) {
      collisions.down = true
    }
    if (vertColl && player.pos.y > ob.pos.y) {
      collisions.up = true
    }

    return collisions
  }

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

  const applyCollisions = (vel, collisions) => {
    if (collisions.right) {
      vel.x -= WALKVELOCITY
    }
    if (collisions.left) {
      vel.x += WALKVELOCITY
    }
    if (collisions.up) {
      vel.y += WALKVELOCITY
    }
    if (collisions.down) {
      vel.y -= WALKVELOCITY
    }
    return vel
  }

  p.setup = () => {
    p.createCanvas(cW, cH)
    p.noStroke()
    obstacles.push(newRandomObstacle())
    obstacles.push(newRandomObstacle())
    obstacles.push(newRandomObstacle())
    obstacles.push(newRandomObstacle())
  }

  p.draw = () => {
    player = updatePlayer(player, obstacles)
    p.translate(-player.pos.x + cW / 2, -player.pos.y + cH / 2)
    p.background(255)

    obstacles.forEach(e => {
      drawObstacle(e)
    })

    drawPlayer(player)
  }
}

new p5(sketch) // 2nd param can be a canvas html element
