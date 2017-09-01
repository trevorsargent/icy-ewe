import p5 from 'p5'
import { newPlayer, updatePlayer } from './objects/player.js'
import { cW, cH, KEYS } from './lib/constants.js'
import { newRandomObstacle } from './objects/obstacle.js'
import { wallPath } from './world/walls.js'
import { createVector } from './math/vector.js'

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
		p.push()
		p.fill(playerColor)
		p.rect(player.pos.x - player.width / 2,
			player.pos.y - player.height / 2,
			player.width,
			player.height)
		p.pop()
	}

	p.setup = () => {
		player = newPlayer()
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
		player = updatePlayer(player, obstacles, getKeyboardInput())
		p.translate(-player.pos.x + cW / 2, -player.pos.y + cH / 2)
		p.background(255)

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