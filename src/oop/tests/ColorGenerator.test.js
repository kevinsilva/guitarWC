import { describe, expect, it } from 'vitest'
import ColorGenerator from '../ColorGenerator.js'

describe('Color Generator', () => {
  it('it starts with an array of color objects as a property', () => {
    const colorGenerator = new ColorGenerator()
    const isArray = Array.isArray(colorGenerator.colors)

    expect(isArray).toBe(true)
  })

  it('returns a random color from the array of color objects', () => {
    const colorGenerator = new ColorGenerator()
    const randomColor = colorGenerator.getRandomColor()

    expect(colorGenerator.colors).toContain(randomColor)
  })

  it('returns a group of three different random color from the array of color objects', () => {
    const colorGenerator = new ColorGenerator()
    const randomColors = colorGenerator.getColors()

    const guitarColor = randomColors[0]
    const colorTwo = randomColors[1]
    const colorThree = randomColors[2]

    expect(randomColors.length).toBe(3)
    expect(guitarColor.name).not.toEqual(colorTwo.name)
    expect(guitarColor.name).not.toEqual(colorThree.name)
    expect(colorGenerator.colors.length).toEqual(91)
  })
})
