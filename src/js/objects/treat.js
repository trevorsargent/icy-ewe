import { random, randomExcludingRange } from '../lib/helpers.js'
import { cW, cH, TREATSIZE } from '../lib/constants.js'
import { createVector } from '../math/vector.js'

export const newRandomTreat = (player) => {
    const w = (5 * TREATSIZE) / 8
    const h = TREATSIZE
    return newTreat(w, h, player)
}

const newTreat = (treatWidth, treatHeight, player) => {
    let xVal = randomExcludingRange(cW / 2 - player.width / 2 + treatWidth,
        cW / 2 + player.width / 2 + treatWidth, 0, cW)
    let yVal = randomExcludingRange(cH / 2 - player.height / 2 + treatHeight,
        cH / 2 + player.height / 2 + treatHeight, 0, cH)
    return {
        pos: createVector(xVal, yVal),
        width: treatWidth,
        height: treatHeight,
        pickedUp: false
    }
}
