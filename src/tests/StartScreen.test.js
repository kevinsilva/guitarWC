import $ from 'jquery';
import { describe, it, expect, vi } from 'vitest';
import { StartElements, StartScreen } from '../StartScreen';

describe('Start Screen', () => {
  it('initializes with an instance of start elements as property', () => {
    const start = new StartScreen();
    const elements = start.el;

    expect(elements.__proto__.constructor.name).toEqual('StartElements');
    expect(elements instanceof StartElements).toEqual(true);
  });

  it('calls onActionClick whenever newGameBtn is clicked', () => {
    document.body.innerHTML = '<button id="new-game"></button>';
    const spy = vi.fn();
    new StartScreen(spy);

    $('#new-game').trigger('click');
    expect(spy).toHaveBeenCalled();
  });
});
