import $ from 'jquery';
import { describe, it, expect, vi } from 'vitest';
import { AnswerElements, AnswerScreen } from '../AnswerScreen';
import State from '../State';

describe('Answer Screen', () => {
  it('initializes with an instance of answer elements as property', () => {
    const answer = new AnswerScreen();
    const elements = answer.el;

    expect(elements.__proto__.constructor.name).toEqual('AnswerElements');
    expect(elements instanceof AnswerElements).toEqual(true);
  });

  it('renders state values on dom elements', () => {
    document.body.innerHTML = `
    <div id='answer-screen'>
    <h3 class='points'></h3>
    <h1 id='answer'></h1>
    </div>
    `;

    const screen = new AnswerScreen();
    const state = new State();
    const answer = state._questions[0]._answer;
    state._questions[0].setPicked(answer);
    screen.render(state);

    expect($(screen.el.pointsTxtID).text()).toEqual('0 points');
    expect($(screen.el.answerTxtID).text()).toEqual('correct');
  });

  it('adds correct or incorrect classes to correspondent button elements', () => {
    document.body.innerHTML = `
    <div id='answer-screen'>
    <button class='button-0'></button>
    <button class='button-1'></button>
    <button class='button-2'></button>
    </div>
    `;

    const screen = new AnswerScreen();
    const state = new State();
    const answer = state.getCurrentQuestion().getAnswerIndex();

    $(`button.button-0`).text(state.getCurrentQuestion().getOptions()[0].decimal);
    $(`button.button-1`).text(state.getCurrentQuestion().getOptions()[1].decimal);
    $(`button.button-2`).text(state.getCurrentQuestion().getOptions()[2].decimal);

    state.getCurrentQuestion().setPicked(answer);
    screen.render(state);
    const button = $(`button.button-${answer}`);

    expect((button).hasClass('correct')).toEqual(true);
    expect(button.siblings().hasClass('incorrect')).toEqual(true);
  
  });

  it('when next button is clicked, it removes class selected from buttons and calls cb', () => {
    document.body.innerHTML = `  
    <div id='answer-screen'>
    <button class='button-0 selected'>rgb(23, 21, 28)</button>
    <button class='button-1'>rgb(81, 93, 69)</button>
    <button class='button-2'>rgb(12, 43, 115)</button>
    <button id='next-question'></button>
    </div>  
  `;

    const spy = vi.fn();
    const state = new State();
    const screen = new AnswerScreen(spy);
    screen.render(state);

    expect($('button.button-0').hasClass('selected')).toEqual(true);
    $('#next-question').trigger('click');
    expect(spy).toHaveBeenCalled();
    expect($('button.button-0').hasClass('selected')).toEqual(false);
  });
});
