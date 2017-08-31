import p5 from 'p5'

import {
	KEYS,
	WALKVELOCITY,
	OBSTACLESIZE
} from './constants.js'

const sketch = (p) => {

	let cW = p.windowWidth
	let cH = p.windowHeight
	let playerColor = [0, 0, 128]
	let obsColor = [0, 128, 0]

	let player = {
		pos: p.createVector(cW / 2, cH / 2),
		vel: p.createVector(0, 0),
		size: 50
	}

	const newObstacle = () => {
		return {
			pos: p.createVector(p.random(cW), p.random(cH)),
			size: OBSTACLESIZE
		}
	}

	const drawObstacle = (pos, size) => {
		p.push()
		p.fill(obsColor)
		p.rect(pos.x - size / 2, pos.y - size / 2, size, size)
		p.pop()
	}

	const drawPlayer = (pos, size) => {
		p.push()
		p.fill(playerColor)
		p.rect(pos.x - size / 2, pos.y - size / 2, size, size)
		p.pop()
	}

	let collisions = []

	const updatePlayer = (player, obstacles) => {
		obstacles = obstacles.filter(f => {
			return player.pos.dist(f.pos) < player.size * 2
		})
		for (var e of obstacles) {
			collisions = detectCollision(player, e)
			if (collisions.right || collisions.left) {
				player.vel.add(p.createVector(-player.vel.x, 0))
			}
			if (collisions.up || collisions.down) {
				player.vel.add(p.createVector(0, -player.vel.y))
			}
		}
		player.pos.add(player.vel)
		return player
	}

	const rangeIntersect = (min0, max0, min1, max1) => {
		return Math.max(min0, max0) >= Math.min(min1, max1) &&
			Math.min(min0, max0) <= Math.max(min1, max1)
	}

	const horizSpaceBetween = (player, ob) => {
		let dist = Math.abs(player.pos.x - ob.pos.x) - Math.abs(player.size / 2 + ob.size / 2)
		if (dist > 0) {
			return dist
		}
		else {
			return 0
		}
	}

	const vertSpaceBetween = (player, ob) => {
		let dist = Math.abs(Math.abs(player.pos.y - ob.pos.y) - Math.abs(player.size / 2 + ob.size / 2))
		if (dist > 0) {
			return dist
		}
		else {
			return 0
		}
	}

	const detectCollision = (player, ob) => {
		let vertColl = rangeIntersect(player.pos.x - (player.size / 2), player.pos.x + (player.size / 2),
			ob.pos.x - (ob.size / 2), ob.pos.x + (ob.size / 2)) && (Math.ceil(vertSpaceBetween(player, ob)) <= WALKVELOCITY)
		let horizColl = rangeIntersect(player.pos.y - (player.size / 2), player.pos.y + (player.size / 2),
			ob.pos.y - (ob.size / 2), ob.pos.y + (ob.size / 2)) && (Math.ceil(horizSpaceBetween(player, ob)) <= WALKVELOCITY)

		playerColor = [0, 0, 128]

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

		// 'conflict' in this context means that both objects occupy a given pixel row (horz) or collumn (vert) 

		// check if they conflict horizontally
		// if an obstacle is s close enough on the right, set right to true
		// if an obstacle is s close enough on the left, set left to true

		// check if they conflict vertically
		// if an obstacle is s close enough on top, set up to true
		// if an obstacle is close enough on the bottom, set down to true
	}

	let obstacles = []

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
		player = updatePlayer(player, obstacles)
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