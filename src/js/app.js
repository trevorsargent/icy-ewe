import p5 from 'p5'
import { newPlayer, updatePlayer } from './objects/player.js'
import { cW, cH, KEYS } from './lib/constants.js'
import { newRandomObstacle } from './objects/obstacle.js'
import { wallPath } from './world/walls.js'
import { createVector, magnitude } from './math/vector.js'

const sketch = (p) => {

	let playerColor = [0, 0, 128]
	let obsColor = [0, 128, 0]

	let obstacles = []

	let player = {}

	const drawObstacle = (obstacle) => {
		p.push()
		p.fill(obsColor)
		// console.log("obstacle", obstacle, )
		p.rect(
			obstacle.pos.x - obstacle.width / 2,
			obstacle.pos.y - obstacle.height / 2,
			obstacle.width,
			obstacle.height)
		p.pop()
	}

	const drawPlayer = (player) => {
		let walkCycle = 0;
		if (player.vel.x < 0) {
			walkCycle = (Math.floor(p.frameCount / 10) % 4)
		} else if (player.vel.x > 0) {
			walkCycle = 3 - (Math.floor(p.frameCount / 10) % 4)
		}

		p.image(player.skin.walk[walkCycle], player.pos.x - player.width / 2, player.pos.y - player.height / 2)
		p.push()
		p.fill(playerColor)
		p.pop()
	}

	p.setup = () => {
		player = newPlayer()
		player.skin.walk[0] = p.loadImage('./src/textures/player.walk.0.jpeg')
		player.skin.walk[1] = p.loadImage('./src/textures/player.walk.1.jpeg')
		player.skin.walk[2] = p.loadImage('./src/textures/player.walk.2.jpeg')
		player.skin.walk[3] = p.loadImage('./src/textures/player.walk.3.jpeg')

		p.createCanvas(cW, cH)
		p.noStroke()
		obstacles.push(newRandomObstacle(player))
		obstacles.push(newRandomObstacle(player))
		obstacles.push(newRandomObstacle(player))
		obstacles.push(newRandomObstacle(player))

		const A = createVector(200, 100)
		const B = createVector(200, 300)
		const C = createVector(100, 200)
		const D = createVector(300, 200)
		obstacles = obstacles.concat(wallPath([A, B]))
		obstacles.push.apply(obstacles, wallPath([A, B]))
		obstacles = obstacles.concat(wallPath([C, D]))
	}

	p.draw = () => {
		p.background(255)
		p.color(0)
		p.fill(0)
		p.textSize(20)
		p.text(Math.ceil(p.frameRate()), 50, 50)

		player = updatePlayer(player, obstacles, getKeyboardInput())
		p.translate(-player.pos.x + cW / 2, -player.pos.y + cH / 2)

		obstacles.forEach(e => {
			drawObstacle(e)
		})

		drawPlayer(player)
	}

	const getKeyboardInput = () => {
		return {
			up: p.keyIsDown(KEYS.UP),
			down: p.keyIsDown(KEYS.DOWN),
			left: p.keyIsDown(KEYS.LEFT),
			right: p.keyIsDown(KEYS.RIGHT)
		}
	}
}

new p5(sketch)