import 'babel-polyfill'
import * as V from '../src/js/math/vector.js'
// import { assert } from 'chai'
import assert from 'assert'

describe('vectors', () => {
	const vecPP = V.createVector(2, 5)
	const vecNN = V.createVector(-3, -4)
	const vecZZ = V.createVector(0, 0)

	describe('add()', () => {
		it('adds the values for 2 all positive vectors', () => {
			const add = V.add(vecPP, vecPP)
			const addCorrect = V.createVector(4, 10)
			assert.deepEqual(add, addCorrect)
		})
		it('adds the values for mixed positive and negative vectors', () => {
			const add = V.add(vecPP, vecNN)
			const addCorrect = V.createVector(-1, 1)
			assert.deepEqual(add, addCorrect)
		})
		it('adds the values for 1 positive vector and 1 all zero vector', () => {
			const add = V.add(vecPP, vecZZ)
			const addCorrect = V.createVector(2, 5)
			assert.deepEqual(add, addCorrect)
		})
		it('adds the values for 2 all zero vectors', () => {
			const add = V.add(vecZZ, vecZZ)
			const addCorrect = V.createVector(0, 0)
			assert.deepEqual(add, addCorrect)
		})
	})
})