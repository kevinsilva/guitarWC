import { describe, expect, it, vi } from 'vitest';

import Screen from '../Screen.js';
import ScreenManager from '../ScreenManager.js';

describe('Screen Manager', () => {
  const mockElement = vi.fn();
  const start = new Screen(mockElement);
  const ask = new Screen(mockElement);
  const answer = new Screen(mockElement);
  const end = new Screen(mockElement);

  const screens = [start, ask, answer, end];

  const screenManager = new ScreenManager(screens);

  it('initializes with all the screens', () => {
    expect(screenManager.screens).toEqual(screens);
  });

  it('shows input screen at specified index - hides all the others', () => {
    screenManager._showScreen(0);
    expect(screenManager.screens[0].visibility).toEqual('visible');
    expect(screenManager.screens[1].visibility).toEqual('hidden');
    expect(screenManager.screens[2].visibility).toEqual('hidden');
    expect(screenManager.screens[3].visibility).toEqual('hidden');
  });

  it('shows next screen on order and hides all the others', () => {
    screenManager._showScreen(2);
    expect(screenManager.visibleScreenIndex).toEqual(2);
    expect(screenManager.screens[2].visibility).toEqual('visible');

    screenManager.showNext();
    expect(screenManager.visibleScreenIndex).toEqual(3);
    expect(screenManager.screens[2].visibility).toEqual('hidden');
    expect(screenManager.screens[3].visibility).toEqual('visible');
    expect(screenManager.screens[0].visibility).toEqual('hidden');
    expect(screenManager.screens[1].visibility).toEqual('hidden');

    screenManager.showNext();
    expect(screenManager.visibleScreenIndex).toEqual(0);
    expect(screenManager.screens[3].visibility).toEqual('hidden');
    expect(screenManager.screens[0].visibility).toEqual('visible');
    expect(screenManager.screens[1].visibility).toEqual('hidden');
    expect(screenManager.screens[2].visibility).toEqual('hidden');
  });
});
