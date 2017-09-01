export const createVector = (x = 0 , y = 0 , z = 0) => {
  return {
    x: x,
    y: y,
    z: z
  }
}

export const add = (vec1, vec2) => {
  return {
    x: vec1.x + vec2.x,
    y: vec1.y + vec2.y,
    z: vec1.z + vec2.z
  }
}

export const sub = (vec1, vec2) => {
  return {
    x: vec1.x - vec2.x,
    y: vec1.y - vec2.y,
    z: vec1.z - vec2.z
  }
}

export const dist = (vec1, vec2) => {
  return magnitude(sub(vec1, vec2))
}

export const scale = (vec, scalar) => {
  return {
    x: vec.x * scalar,
    y: vec.y * scalar,
    z: vec.z * scalar
  }
}

export const normalize = (vec) => {
  return {
    x: vec.x / magnitude(vec),
    y: vec.y / magnitude(vec),
    z: vec.z / magnitude(vec)
  }
}

export const magnitude = (vec) => {
  return Math.sqrt(Math.pow(vec.x, 2) + Math.pow(vec.y, 2) + Math.pow(vec.z, 2))
}

export const dotProd = (vec1, vec2) => {
  return (vec1.x * vec2.x) + (vec1.y * vec2.y) + (vec1.z * vec2.z)
}

export const crossProd = (vec1, vec2) => {
  return {
    x: (vec1.y * vec2.z) - (vec1.z * vec2.y),
    y: (vec1.z * vec2.x) - (vec1.x * vec2.z),
    z: (vec1.x * vec2.y) - (vec1.y * vec2.x)
  }
}
