import p5 from 'p5'
import { createVector, add, dist, normalize, scale } from '../math/vector.js'
import { wallPath } from '../world/walls.js'

export const drawHouse = (c, h, w, entSide, player) => {
    const ul = createVector(c.x - (w / 2), c.y - (h / 2))
    const ur = createVector(c.x + (w / 2), c.y - (h / 2))
    const ll = createVector(c.x - (w / 2), c.y + (h / 2))
    const lr = createVector(c.x + (w / 2), c.y + (h / 2))
    switch (entSide) {
        case "left":
            if (ll.y - ul.y > player.height) {
                const start = createVector(c.x - (w / 2), c.y - (player.height * .7))
                const end = createVector(c.x - (w / 2), c.y + (player.height * .7))
                console.log(end.y - start.y)
                return wallPath([start, ul, ur, lr, ll, end])
            }
        case "right":
            if (lr.y - ur.y > player.height) {
                const start = createVector(c.x + (w / 2), c.y + (player.height * .7) + 2)
                const end = createVector(c.x + (w / 2), c.y - (player.height * .7) - 2)
                return wallPath([start, lr, ll, ul, ur, end])
            }
        case "up":
            if (ur.x - ul.x > player.width) {
                const start = createVector(c.x + (player.height * .7) + 2, c.y - (h / 2))
                const end = createVector(c.x - (player.height * .7) - 2, c.y - (h / 2))
                return wallPath([start, ur, lr, ll, ul, end])
            }
        case "down":
            if (lr.x - ll.x > player.width) {
                const start = createVector(c.x - (player.height * .7) - 2, c.y + (h / 2))
                const end = createVector(c.x + (player.height * .7) + 2, c.y + (h / 2))
                return wallPath([start, ll, ul, ur, lr, end])
            }
    }
    console.log("DIDNT WORK")
}


