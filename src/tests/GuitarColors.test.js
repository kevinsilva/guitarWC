import { describe, it, expect } from 'vitest'
import GuitarColors from '../GuitarColors'

describe('Guitar Colors', () => {
  it('initializes with an array of colors', () => {
    const guitarColors = new GuitarColors()
    const isArray = Array.isArray(guitarColors._palette)

    expect(isArray).toBe(true)
  })

  it('returns a group of three different random colors from the array of colors', () => {
    const guitarColors = new GuitarColors()
    const randomColors = guitarColors.getRandom()

    const colorOne = randomColors[0]
    const colorTwo = randomColors[1]
    const colorThree = randomColors[2]

    expect(randomColors.length).toBe(3)
    expect(colorOne.name).not.toEqual(colorTwo.name)
    expect(colorOne.name).not.toEqual(colorThree.name)
    expect(guitarColors._palette.length).toEqual(91)
  })
})
