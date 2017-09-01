const randomExcludingRange = (exRangeMin, exRangeMax, totalRangeMin, totalRangeMax) => {
  let posNeg = p.random()
  if (posNeg < .5) {
    return p.random(totalRangeMin, exRangeMin)
  }
  if (posNeg > .5) {
    return p.random(exRangeMax, totalRangeMax)
  }
}
