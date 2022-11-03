import $ from 'jquery';
import { describe, it, expect, vi } from 'vitest';
import { EndElements, EndScreen } from '../EndScreen';
import State from '../State';

describe('End Screen', () => {
  it('initializes with an instance of end elements as property', () => {
    const screen = new EndScreen();
    const elements = screen.el;

    expect(elements.__proto__.constructor.name).toEqual('EndElements');
    expect(elements instanceof EndElements).toEqual(true);
  });

  it('renders state values on dom elements', () => {
    document.body.innerHTML = `
    <h1 id='end-message'></h1>
    <h3 id='end-score'></h3>
    `;

    const screen = new EndScreen();
    const state = new State();
    state._points = 100;

    screen.render(state);

    expect($(screen.el.endScoreTxtID).text()).toEqual(`100 points`);
    expect($(screen.el.endMessageTxtID).text()).toEqual(`rgb legend.`);
  });

  it('calls cb when restart game button is clicked', () => {
    document.body.innerHTML = `
    <button id='restart-game'></button>
    `;
    const spy = vi.fn();
    const state = new State();
    const screen = new EndScreen(spy);
    screen.render(state);

    $(screen.el.restartGameBtnID).trigger('click');
    expect(spy).toHaveBeenCalled();
  });
});
