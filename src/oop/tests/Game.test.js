import { describe, expect, it } from 'vitest'
import Game from '../Game.js'

describe.only('Game', () => {
  it('starts with points set to zero', () => {
    const game = new Game()
    expect(game.points).toEqual(0)
  })

  it('adds 10 points if answer is correct, 0 points if answer is incorrect', () => {
    const game = new Game()

    game.addPoints(true)
    expect(game.points).toEqual(10)

    game.addPoints(false)
    expect(game.points).toEqual(10)

    game.addPoints(true)
    expect(game.points).toEqual(20)
  })

  it('adds points to a max of 100', () => {
    const game = new Game()
    game.points = 90

    game.addPoints(true)
    expect(game.points).toEqual(100)

    game.addPoints(true)
    expect(game.points).toEqual(100)
  })

  it('loads 10 questions, each with 10 options and 10 answers', () => {
    const game = new Game()
    game.loadQuestions()

    expect(Object.keys(game.questions).length).toEqual(10)
    for (const question in game.questions) {
      expect(game.questions[question]).toHaveProperty('options')
      expect(Array.isArray(game.questions[question].options)).toEqual(true)
      expect(game.questions[question]).toHaveProperty('answer')
      expect(typeof game.questions[question].answer).toEqual('object')
    }
  })
})
