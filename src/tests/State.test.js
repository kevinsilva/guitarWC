import { describe, it, expect } from 'vitest';
import Question from '../Question';
import State from '../State';

describe('State', () => {
  it('starts with the round property set to 1', () => {
    const state = new State();
    expect(state._round).toEqual(1);
  });
  it('starts with the points property set to 0', () => {
    const state = new State();
    expect(state._points).toEqual(0);
  });
  it('starts with a list of questions as the questions property', () => {
    const state = new State();
    const question = state._questions[0];

    expect(question instanceof Question).toEqual(true);
    expect(state._questions.length).toEqual(10);
  });
});
