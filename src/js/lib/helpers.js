export const random = (a , b) => {
  if (a === undefined) {
    return Math.random()
  }
  if (b === undefined) {
    return Math.random() * a
  }
  return Math.random() * Math.abs(a - b) + a
}

export const randomExcludingRange = (exRangeMin, exRangeMax, totalRangeMin, totalRangeMax) => {
  let posNeg = random()
  if (posNeg < .5) {
    return random(totalRangeMin, exRangeMin)
  }
  if (posNeg > .5) {
    return random(exRangeMax, totalRangeMax)
  }
}
