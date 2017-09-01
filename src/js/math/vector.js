export const createVector = (x = 0 , y = 0) => {
  return {
    x,
  y}
}

export const dist = (vecA, vecB) => {
  const a = Math.abs(vecA.x - vecB.x)
  const b = Math.abs(vecA.y - vecB.y)
  return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2))
}

export const add = (vecA, vecB) => {
  return {
    x: vecA.x + vecB.x,
    y: vecA.y + vecB.y
  }
}
