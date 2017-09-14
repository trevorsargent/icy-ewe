import { createVector, add, magnitude, normalize, scale } from '../math/vector.js'
import { cW, cH, WALKVELOCITY } from '../lib/constants.js'
import { detectCollisions, applyCollisions, isNear } from '../math/physics.js'

export const makeDrawPlayer = (p) => (player) => {
	let walkCycle = 0;
	let img;
	if (magnitude(player.vel) > 0) {
		walkCycle = (Math.floor(p.frameCount / 2) % 9)
		if (player.vel.x > 0) {
			img = player.skin.walk.right[walkCycle];
			player.prevDirection = "right"
		} else {
			img = player.skin.walk.left[walkCycle];
			player.prevDirection = "left"
		}
	} else {
		if (player.prevDirection == "left") {
			img = player.skin.walk.left[0]
		}
		else {
			img = player.skin.walk.right[0]
		}
	}

	p.image(img, player.pos.x - player.width / 2, player.pos.y - player.height / 2)
}

export const makeAddPlayerSkin = (p) => (player) => {
	player.skin.walk.right[0] = p.loadImage('./src/textures/player/walk/right-0.jpg')
	player.skin.walk.right[1] = p.loadImage('./src/textures/player/walk/right-1.jpg')
	player.skin.walk.right[2] = p.loadImage('./src/textures/player/walk/right-2.jpg')
	player.skin.walk.right[3] = p.loadImage('./src/textures/player/walk/right-3.jpg')
	player.skin.walk.right[4] = p.loadImage('./src/textures/player/walk/right-4.jpg')
	player.skin.walk.right[5] = p.loadImage('./src/textures/player/walk/right-5.jpg')
	player.skin.walk.right[6] = p.loadImage('./src/textures/player/walk/right-6.jpg')
	player.skin.walk.right[7] = p.loadImage('./src/textures/player/walk/right-7.jpg')
	player.skin.walk.right[8] = p.loadImage('./src/textures/player/walk/right-8.jpg')
	player.skin.walk.left[0] = p.loadImage('./src/textures/player/walk/left-0.jpg')
	player.skin.walk.left[1] = p.loadImage('./src/textures/player/walk/left-1.jpg')
	player.skin.walk.left[2] = p.loadImage('./src/textures/player/walk/left-2.jpg')
	player.skin.walk.left[3] = p.loadImage('./src/textures/player/walk/left-3.jpg')
	player.skin.walk.left[4] = p.loadImage('./src/textures/player/walk/left-4.jpg')
	player.skin.walk.left[5] = p.loadImage('./src/textures/player/walk/left-5.jpg')
	player.skin.walk.left[6] = p.loadImage('./src/textures/player/walk/left-6.jpg')
	player.skin.walk.left[7] = p.loadImage('./src/textures/player/walk/left-7.jpg')
	player.skin.walk.left[8] = p.loadImage('./src/textures/player/walk/left-8.jpg')
	return player;
}

export const updatePlayer = (player, obstacles, treats, keys) => {
	obstacles = obstacles.filter(f => {
		return isNear(player, f)
	})

	treats = treats.filter(f => {
		return isNear(player, f)
	})

	let vel = calculateControlVelocityVector(keys)
	obstacles.forEach(e => {
		let collisions = detectCollisions(player, e)
		vel = applyCollisions(vel, collisions)
	})

	treats.forEach(e => {
		let collisions = detectCollisions(player, e)
		if (collisions.up || collisions.down || collisions.left || collisions.right) {
			e.pickedUp = true
			treats.pos = createVector(player.pos.x + 80, player.pos.y + 120)
		}
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
		skin: {
			walk: {
				right: [],
				left: []
			}
		},
		width: 25,
		height: 50,
		prevDirection: "right"
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
