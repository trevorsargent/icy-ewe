import { WALLTHICKNESS } from '../lib/constants.js'
import { createVector } from '../math/vector.js'

export const wall = (begin, end) => {
	if (begin.x === end.x) {
		// VERTICAL WALL
		const x = begin.x
		const y = (begin.y + end.y) / 2
		const width = WALLTHICKNESS
		const height = Math.abs(begin.y - end.y) + WALLTHICKNESS
		return { pos: createVector(x, y), width, height }
	}

	if (begin.y === end.y) {
		// HORIZONTAL WALL
		const x = (begin.x + end.x) / 2
		const y = begin.y
		const width = Math.abs(begin.x - end.x) + WALLTHICKNESS
		const height = WALLTHICKNESS
		return { pos: createVector(x, y), width, height }
	}
	console.error('DIAGON ALLEY 😠 : Please supply a coordinates for either a horizontal or vertical wall')
	return null
}

export const wallPath = (verts) => {
	let walls = []
	for (var i = 0; i < verts.length - 1; i++) {
		walls.push(wall(verts[i], verts[i + 1]))
	}
	return walls
}
