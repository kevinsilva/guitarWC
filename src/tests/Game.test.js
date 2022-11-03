import $ from 'jquery';
import { describe, it, expect, vi } from 'vitest';
import Game from '../Game';
import { StartScreen } from '../StartScreen';
import { AskScreen } from '../AskScreen';
import { AnswerScreen } from '../AnswerScreen';
import { EndScreen } from '../EndScreen';
import State from '../State';

describe('Game', () => {
  it('initializes with the state and screens set to null', () => {
    const game = new Game();

    expect(game._state).toEqual(null);
    expect(game._screens).toEqual(null);
  });

  it('renders selected screen index and calls render method', () => {
    document.body.innerHTML = `
    <div id='start-screen'></div>
    `;

    const game = new Game();
    game.init();

    const renderSpy = vi.fn();
    const showSpy = vi.fn();
    const hideSpy = vi.fn();

    game._screens[0].render = renderSpy;
    $.fn.show = showSpy;
    $.fn.hide = hideSpy;

    game.renderScreen(0);

    expect(renderSpy).toHaveBeenCalled();
    expect(showSpy).toHaveBeenCalled();
    expect(hideSpy).toHaveBeenCalled();
  });

  it('assigns new instances to state and screens when init is called', () => {
    const game = new Game();
    game.renderScreen = vi.fn();
    game.init();

    expect(game._state instanceof State).toEqual(true);
    expect(game._screens[0] instanceof StartScreen).toEqual(true);
    expect(game._screens[1] instanceof AskScreen).toEqual(true);
    expect(game._screens[2] instanceof AnswerScreen).toEqual(true);
    expect(game._screens[3] instanceof EndScreen).toEqual(true);
    expect(game.renderScreen).toHaveBeenCalled();
  });

  it('renders askscreen when update start is called', () => {
    const game = new Game();
    game.init();
    game.renderScreen = vi.fn();
    game.updateStart();

    expect(game.renderScreen).toHaveBeenCalledWith(1);
  });

  it('renders answerscreen, updates picked and points properties to state', () => {
    const game = new Game();
    game.init();
    game.renderScreen = vi.fn();
    game._state._questions[0]._answer = 1;
    game.updateAsk(1);

    expect(game._state._questions[0]._picked).toEqual(1);
    expect(game._state._points).toEqual(10);
    expect(game.renderScreen).toHaveBeenCalledWith(2);
  });

  it('renders askscreen if round is not 10, renders endscreen otherwise', () => {
    const game = new Game();
    game.init();
    game.renderScreen = vi.fn();
    game.updateAnswer();

    expect(game.renderScreen).toHaveBeenCalledWith(1);
    game._state._round = 10;
    game.updateAnswer();
    expect(game.renderScreen).toHaveBeenCalledWith(3);
  });

  it('it resets state and renders askscreen when update end is called', () => {
    const game = new Game();
    game.init();
    game._state._round = 10;
    game.renderScreen = vi.fn();
    game.updateEnd();

    expect(game._state._round).toEqual(1);
    expect(game.renderScreen).toHaveBeenCalledWith(1);
  });
});
