import { createVector, add, dist, normalize, scale } from '../math/vector.js'
import { cW, cH, WALKVELOCITY } from '../lib/constants.js'
import { detectCollisions, applyCollisions, isNear } from '../math/physics.js'

export const updatePlayer = (player, obstacles, keys) => {
	obstacles = obstacles.filter(f => {
		return isNear(player, f)
	})

	let vel = calculateControlVelocityVector(keys)

	obstacles.forEach(e => {
		let collisions = detectCollisions(player, e)
		vel = applyCollisions(vel, collisions)
	})

	vel = normalize(vel)
	vel = scale(vel, WALKVELOCITY)
	player.vel = vel

	player.pos = add(player.pos, player.vel)
	return player
}

export const newPlayer = () => {
	return {
		pos: createVector(cW / 2, cH / 2),
		vel: createVector(0, 0),
		acc: createVector(0, 0),
		width: 50,
		height: 60
	}
}

const calculateControlVelocityVector = (keys) => {
	let vel = createVector()
	if (keys.up) {
		vel.y -= WALKVELOCITY
	}
	if (keys.down) {
		vel.y += WALKVELOCITY
	}
	if (keys.right) {
		vel.x += WALKVELOCITY
	}
	if (keys.left) {
		vel.x -= WALKVELOCITY
	}
	return vel
}
