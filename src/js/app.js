import p5 from 'p5'

import {
	KEYS,
	WALKVELOCITY,
	OBSTACLESIZE
} from './constants.js'

const sketch = (p) => {

	let cW = p.windowWidth
	let cH = p.windowHeight

	let player = {
		pos: p.createVector(cW / 2, cH / 2),
		vel: p.createVector(0, 0),
		size: 50
	}

	const updatePlayer = (player) => {
		player.pos.add(player.vel)
		return player
	}

	const newObstacle = () => {
		return {
			pos: p.createVector(p.random(cW), p.random(cH)),
			size: OBSTACLESIZE
		}
	}

	const drawObstacle = (pos, size) => {
		p.push()
		p.fill(0, 128, 0)
		p.rect(pos.x - size / 2, pos.y - size / 2, size, size)
		p.pop()
	}

	const drawPlayer = (pos, size) => {
		p.push()
		p.fill(0, 0, 128)
		p.rect(pos.x - size / 2, pos.y - size / 2, size, size)
		p.pop()
	}

	const detectCollision = (player, obstacles) => {
		let collisions = {
			up: false,
			down: false,
			right: false,
			left: false

		}

		obstacles.forEach(e => {
			// 'conflict' in this context means that both objects occupy a given pixel row (horz) or collumn (vert) 

			// check if they conflict horizontally
			// if an obstacle is s close enough on the right, set right to true
			// if an obstacle is s close enough on the left, set left to true

			// check if they conflict vertically
			// if an obstacle is s close enough on top, set up to true
			// if an obstacle is close enough on the bottom, set down to true
		})

		return collisions

	}

	let obstacles = []

	p.setup = () => {
		p.createCanvas(cW, cH)
		p.noStroke()
		obstacles.push(newObstacle())
		obstacles.push(newObstacle())
		obstacles.push(newObstacle())
		obstacles.push(newObstacle())
	}

	p.draw = () => {
		player = updatePlayer(player)
		p.translate(-player.pos.x + cW / 2, -player.pos.y + cH / 2)
		p.background(255)

		obstacles.forEach(e => {
			drawObstacle(e.pos, e.size)
		})

		drawPlayer(player.pos, player.size)
	}

	p.keyPressed = () => {
		switch (p.keyCode) {
			case KEYS.RIGHT:
				player.vel.x += WALKVELOCITY;
				break
			case KEYS.LEFT:
				player.vel.x -= WALKVELOCITY;
				break
			case KEYS.UP:
				player.vel.y -= WALKVELOCITY
				break
			case KEYS.DOWN:
				player.vel.y += WALKVELOCITY
				break
			default:

		}
	}

	p.keyReleased = () => {
		switch (p.keyCode) {
			case KEYS.RIGHT:
				player.vel.x -= WALKVELOCITY
				break
			case KEYS.LEFT:
				player.vel.x += WALKVELOCITY
				break
			case KEYS.UP:
				player.vel.y += WALKVELOCITY
				break
			case KEYS.DOWN:
				player.vel.y -= WALKVELOCITY
				break
			default:
		}
	}
}

new p5(sketch) // 2nd param can be a canvas html element