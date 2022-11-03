import $ from 'jquery';
import State from './State';
import { StartScreen } from './StartScreen';
import { AskScreen } from './AskScreen';
import { AnswerScreen } from './AnswerScreen';
import { EndScreen } from './EndScreen';

export default class Game {
  constructor() {
    this._state = null;
    this._screens = null;
  }

  renderScreen(screenIndex) {
    this._screens.forEach((screen, index) => {
      if (screenIndex === index) {
        $(screen.el.screenID).show();
        screen.render(this._state);
      } else {
        $(screen.el.screenID).hide();
      }
    });
  }

  updateStart() {
    this.renderScreen(1);
  }

  updateAsk(params) {
    const question = this._state._questions[this._state._round - 1];

    question._picked = params;
    this._state._points += question._answer === question._picked ? 10 : 0;
    this.renderScreen(2);
  }

  updateAnswer() {
    if (this._state._round === this._state._questions.length) {
      this.renderScreen(3);
    } else {
      this._state._round++;
      this.renderScreen(1);
    }
  }

  updateEnd() {
    this._state = new State();
    this.renderScreen(1);
  }

  init() {
    this._state = new State();
    this._screens = [
      new StartScreen(this.updateStart.bind(this)),
      new AskScreen(this.updateAsk.bind(this)),
      new AnswerScreen(this.updateAnswer.bind(this)),
      new EndScreen(this.updateEnd.bind(this)),
    ];

    this.renderScreen(0);
  }
}

new Game().init();
