import { WALKVELOCITY } from '../lib/constants.js'

export const detectCollisions = (player, ob) => {
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

export const isNear = (player, ob) => {
	return vertSpaceBetween(player, ob) < 50 || horizSpaceBetween(player, ob) < 50
}

export const applyCollisions = (vel, collisions) => {
	if (collisions.right) {
		vel.x = vel.x > 0 ? 0 : vel.x
	}
	if (collisions.left) {
		vel.x = vel.x < 0 ? 0 : vel.x
	}
	if (collisions.up) {
		vel.y = vel.y < 0 ? 0 : vel.y
	}
	if (collisions.down) {
		vel.y = vel.y > 0 ? 0 : vel.y
	}
	return vel
}
