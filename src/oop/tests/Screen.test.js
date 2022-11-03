import $ from 'jquery';
import { describe, expect, it, vi } from 'vitest';
import Screen from '../Screen.js';

describe('Screen', () => {
  it('accepts element id as argument', () => {
    const screen = new Screen({
      elementID: '#start-screen',
      nextBtn: '#next-screen',
    });

    expect(screen.element).toBe('#start-screen');
  });
  it('hides element and sets the visibility property to hidden', () => {
    const screen = new Screen({
      elementID: '#start-screen',
      nextBtn: '#next-screen',
    });
    screen.hide();

    expect(screen.visibility).toBe('hidden');
  });

  it('shows element and sets the visibility property to visible', () => {
    const screen = new Screen({
      elementID: '#start-screen',
      nextBtn: '#next-screen',
    });
    screen.show();

    expect(screen.visibility).toBe('visible');
  });

  it('calls given callback when new game button is clicked', () => {
    document.body.innerHTML = '<button id="next-screen">new game</button>';

    const input = {
      elementID: '#screen',
      nextBtn: '#next-screen',
      onNextClick: vi.fn(),
    };

    const screen = new Screen(input);
    $('#next-screen').trigger('click');

    expect(screen.onNextClick).toHaveBeenCalled();
  });

  it('calls the set callback function only when the new game button is clicked and the cb is a valid function', () => {
    document.body.innerHTML = '<button id="next-screen">new game</button>';

    const spy = vi.fn();

    const input = {
      elementID: '#screen',
      nextBtn: '#next-screen',
    };

    const screen = new Screen(input);
    $('#next-screen').trigger('click');

    expect(spy).not.toHaveBeenCalled();
    screen.setOnNextClick(spy);
    expect(spy).not.toHaveBeenCalled();
    $('#next-screen').trigger('click');
    expect(spy).toHaveBeenCalled();
    screen.setOnNextClick(undefined);
    $('#next-screen').trigger('click');
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
