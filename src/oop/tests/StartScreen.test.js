import $ from 'jquery'
import { describe, expect, it, vi } from 'vitest'

import StartScreen from '../StartScreen.js'

describe('Start Screen', () => {
  it('calls given callback when new game button is clicked', () => {
    document.body.innerHTML = '<button id="start-game">new game</button>'

    const input = {
      elementID: '#start-screen',
      newGameBtn: '#start-game',
      onNewGameClick: vi.fn()
    }

    const startScreen = new StartScreen(input)
    $('#start-game').trigger('click')

    expect(startScreen.onNextClick).toEqual(input.onNewGameClick)
    expect(startScreen.onNextClick).toHaveBeenCalled()
  })

  it('calls the set callback function only when the new game button is clicked and the cb is a valid function', () => {
    document.body.innerHTML = '<button id="start-game">new game</button>'

    const spy = vi.fn()

    const input = {
      elementID: '#start-screen',
      newGameBtn: '#start-game'
    }

    const startScreen = new StartScreen(input)
    $('#start-game').trigger('click')

    expect(spy).not.toHaveBeenCalled()
    startScreen.setOnNextClick(spy)
    expect(spy).not.toHaveBeenCalled()
    $('#start-game').trigger('click')
    expect(spy).toHaveBeenCalled()
    startScreen.setOnNextClick(undefined)
    $('#start-game').trigger('click')
    expect(spy).toHaveBeenCalledTimes(1)
  })
})
