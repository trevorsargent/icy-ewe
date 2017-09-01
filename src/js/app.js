import p5 from 'p5'

const sketch = (p) => {

  let cW = p.windowWidth
  let cH = p.windowHeight
  let playerColor = [0, 0, 128]
  let obsColor = [0, 128, 0]

  let obstacles = []

  let player = newPlayer()

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
