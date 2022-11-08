import { describe, it, expect } from 'vitest';
import Question from '../Question';
import State from '../State';

describe('State', () => {
  it('starts with the round property set to 1', () => {
    const state = new State();
    
    expect(state.getRound()).toEqual(1);
  });

  it('adds one to the round property', () => {
    const state = new State();
    state.addRound();
    expect(state.getRound()).toEqual(2);
  })
  it('starts with the points property set to 0', () => {
    const state = new State();
    expect(state.getPoints()).toEqual(0);
  });

  it('adds ten points to the points property', () => {
    const state = new State();
    state.addPoints();
    expect(state.getPoints()).toEqual(10);
  })
  it('starts with a list of questions as the questions property', () => {
    const state = new State();
    const question = state._questions[0];

    expect(question instanceof Question).toEqual(true);
    expect(state._questions.length).toEqual(10);
  });
  it('returns the list of questions property', () => {
    const state = new State();
    expect(state.getQuestions()[0]).instanceOf(Question);
    expect(state.getQuestions().length).toEqual(10);
  });
  it('returns question correspondent to the current round: question index 0 to round 1', () => {
    const state = new State();
    const question1 = state.getQuestions()[state.getRound() - 1];

    expect(state.getCurrentQuestion()).toEqual(question1);
  })
});
