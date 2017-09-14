import p5 from 'p5'
import { newPlayer, updatePlayer } from './objects/player.js'
import { cW, cH, KEYS } from './lib/constants.js'
import { newRandomObstacle } from './objects/obstacle.js'
import { newRandomTreat } from './objects/treat.js'
import { wallPath } from './world/walls.js'
import { createVector, magnitude } from './math/vector.js'
import { drawHouse } from './objects/islandmap.js'

const sketch = (p) => {

	let playerColor = [0, 0, 128]
	let obsColor = [139, 69, 19]
	let treatColor = [255, 0, 0]

	let obstacles = []
	let treats = []
	let player = {}
	let initialTreatCount = 0

	const addSkin = (player) => {
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

	const drawObstacle = (obstacle) => {
		p.push()
		p.fill(obsColor)
		// console.log("obstacle", obstacle, )
		let curvature = 0
		if (obstacle.width >= obstacle.height) {
			curvature = obstacle.width * .05
		}
		else {
			curvature = obstacle.height * .05
		}
		p.rect(
			obstacle.pos.x - obstacle.width / 2,
			obstacle.pos.y - obstacle.height / 2,
			obstacle.width,
			obstacle.height, curvature)
		p.pop()
	}

	const drawTreat = (treat, treatx = treat.pos.x, treaty = treat.pos.y) => {
		p.push()
		p.fill(treatColor)
		let curvature = 0
		if (treat.width >= treat.height) {
			curvature = treat.width * .05
		}
		else {
			curvature = treat.height * .05
		}
		p.rect(
			treatx - treat.width / 2,
			treaty - treat.height / 2,
			treat.width,
			treat.height, curvature)
		p.pop()
	}

	const drawPlayer = (player) => {
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
		p.push()
		p.fill(playerColor)
		p.pop()
	}

	const drawInventory = (player, treatCount) => {
		p.fill("black")
		p.beginShape();
		p.vertex(player.pos.x - 100, player.pos.y + 240);
		p.vertex(player.pos.x + 100, player.pos.y + 240);
		p.vertex(player.pos.x + 100, player.pos.y + 280);
		p.vertex(player.pos.x - 100, player.pos.y + 280);
		p.endShape(p.CLOSE);

		p.fill("white")
		p.beginShape();
		p.vertex(player.pos.x - 95, player.pos.y + 245);
		p.vertex(player.pos.x + 95, player.pos.y + 245);
		p.vertex(player.pos.x + 95, player.pos.y + 275);
		p.vertex(player.pos.x - 95, player.pos.y + 275);
		p.endShape(p.CLOSE);

		p.fill("black")
		drawTreat(newRandomTreat(player), player.pos.x - 80, player.pos.y + 260)
		p.textSize(12)
		p.text(treatCount, player.pos.x - 75, player.pos.y + 275)
	}

	p.setup = () => {
		player = newPlayer()
		player = addSkin(player)
		p.createCanvas(cW, cH)
		p.noStroke()
		obstacles = obstacles.concat(drawHouse(createVector(10, 10), 300, 500, "up", player))
		treats = treats.concat(newRandomTreat(player))
		treats = treats.concat(newRandomTreat(player))
		treats = treats.concat(newRandomTreat(player))
		treats = treats.concat(newRandomTreat(player))
		treats = treats.concat(newRandomTreat(player))
		initialTreatCount = 5
	}

	p.draw = () => {
		p.background(255)
		p.color(0)
		p.fill(0)
		p.textSize(20)
		p.text(Math.ceil(p.frameRate()), 50, 50)
		player = updatePlayer(player, obstacles, treats, getKeyboardInput())
		p.translate(-player.pos.x + cW / 2, -player.pos.y + cH / 2)
		obstacles.forEach(e => {
			drawObstacle(e)
		})
		let treatCount = treats.length
		treats = treats.filter(f => {
			return !f.pickedUp
		})
		treats.forEach(e => {
			drawTreat(e)
		})
		drawPlayer(player)
		drawInventory(player, initialTreatCount - treats.length)
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