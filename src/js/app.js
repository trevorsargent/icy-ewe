import p5 from 'p5'
import { newPlayer, updatePlayer, makeDrawPlayer, makeAddPlayerSkin } from './objects/player.js'
import { cW, cH, KEYS } from './lib/constants.js'
import { newRandomTreat } from './objects/treat.js'
import { createVector } from './math/vector.js'
import { drawHouse } from './objects/islandmap.js'

const sketch = (p) => {

	let obsColor = [139, 69, 19]
	let treatColor = [255, 0, 0]

	let obstacles = []
	let treats = []
	let player = {}
	let initialTreatCount = 0

	const addPlayerSkin = makeAddPlayerSkin(p)
	const drawPlayer = makeDrawPlayer(p)

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
		player = addPlayerSkin(player)
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