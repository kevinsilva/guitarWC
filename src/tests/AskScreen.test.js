import $ from 'jquery';
import { describe, it, expect, vi } from 'vitest';
import { AskElements, AskScreen } from '../AskScreen';
import State from '../State';

describe('Ask Screen', () => {
  it('initializes with an instance of ask elements as property', () => {
    const ask = new AskScreen();
    const elements = ask.el;

    expect(elements.__proto__.constructor.name).toEqual('AskElements');
    expect(elements instanceof AskElements).toEqual(true);
  });

  it('renders state values on dom elements', () => {
    document.body.innerHTML = `
    <h3 class='round'></h3>
    <h3 class='points'></h3>
    <h1 id='question'></h1>
    <svg class="guitar-body"></svg>
    <button class='button-0'></button>
    `;

    const ask = new AskScreen();
    const state = new State();
    const guitarName = state._questions[0]._guitarColor.name;
    const guitarColor = state._questions[0]._guitarColor.decimal;
    const option_0 = state._questions[0]._options[0].decimal;
    ask.render(state);

    expect($(ask.el.roundTxtID).text()).toEqual(`round 1 of 10`);
    expect($(ask.el.pointsTxtID).text()).toEqual(`0 points`);
    expect($(ask.el.questionTxtID).text()).toEqual(`guess ${guitarName}`);
    expect($(ask.el.guitarID).css('fill')).toEqual(guitarColor);
    expect($(ask.el.answerBtnsID[0]).text()).toEqual(option_0);
  });

  it('removes any correct or incorrect classes from any button', () => {
    document.body.innerHTML = `    
    <button id='one' class='correct'></button>
    <button id='two' class='incorrect'></button>
    `;

    const ask = new AskScreen();
    const state = new State();
    ask.render(state);

    expect($('#one').hasClass('correct')).toEqual(false);
    expect($('#two').hasClass('incorrect')).toEqual(false);
  });

  it('if there are no buttons with class selected, calls cb and adds class. Otherwise returns nothing', () => {
    document.body.innerHTML = `    
    <button class='button-0'></button>
    <button class='button-1'></button>
    <button class='button-2'></button>
  `;
    const spy = vi.fn();
    const state = new State();
    const ask = new AskScreen(spy);
    ask.render(state);

    $('button.button-1').trigger('click');
    expect(spy).toHaveBeenCalled();
    expect($('button.button-1').hasClass('selected')).toEqual(true);
    $('button.button-2').trigger('click');
    expect(spy).toBeCalledTimes(1);
  });
});
