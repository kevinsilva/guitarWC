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

    expect(game.getState()).toEqual(null);
    expect(game.getScreens()).toEqual(null);
  });

  it('renders selected screen index and calls render method', () => {
    document.body.innerHTML = `
    <div id='start-screen'></div>
    <div id='ask-screen'></div>
    <div id='answer-screen'></div>
    <div id='end-screen'></div>
    `;

    const game = new Game();
    game.init();

    const renderSpy = vi.fn();
    const showSpy = vi.fn();
    const hideSpy = vi.fn();
    
    
    game.getScreens()[2].render = renderSpy;
    $.fn.show = showSpy;
    $.fn.hide = hideSpy;
    

    game.renderScreen(2);

    expect(renderSpy).toHaveBeenCalled();
    expect(showSpy).toHaveBeenCalledTimes(1);
    expect(hideSpy).toHaveBeenCalledTimes(3);
  });

  it('assigns new instances to state and screens when init is called', () => {
    const game = new Game();
    game.renderScreen = vi.fn();
    game.init();

    expect(game.getState() instanceof State).toEqual(true);
    expect(game.getScreens()[0] instanceof StartScreen).toEqual(true);
    expect(game.getScreens()[1] instanceof AskScreen).toEqual(true);
    expect(game.getScreens()[2] instanceof AnswerScreen).toEqual(true);
    expect(game.getScreens()[3] instanceof EndScreen).toEqual(true);
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
    const answer = game.getState().getCurrentQuestion().getAnswerIndex();
    game.updateAsk(answer);

    expect(game.getState().getCurrentQuestion().getPicked()).toEqual(answer);
    expect(game.getState().getPoints()).toEqual(10);
    expect(game.renderScreen).toHaveBeenCalledWith(2);
  });

  it('renders askscreen if round is not 10, renders endscreen otherwise', () => {
    const game = new Game();
    game.init();
    game.renderScreen = vi.fn();
    game.updateAnswer();

    expect(game.renderScreen).toHaveBeenCalledWith(1);
    
    while (game.getState().getRound() < 10) {
      game.getState().addRound();
    }

    game.updateAnswer();
    expect(game.renderScreen).toHaveBeenCalledWith(3);
  });

  it('it resets state and renders askscreen when update end is called', () => {
    const game = new Game();
    game.init();

    while (game.getState().getRound() < 10) {
      game.getState().addRound();
    }

    game.renderScreen = vi.fn();
    game.updateEnd();

    expect(game.getState().getRound()).toEqual(1);
    expect(game.renderScreen).toHaveBeenCalledWith(1);
  });
});
