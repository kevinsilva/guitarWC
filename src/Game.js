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

  getState() {
    return this._state;
  }

  setNewState() {
    this._state = new State();
  }

  getScreens() {
    return this._screens;
  }

  setScreens(screens) {
    this._screens = screens;
  }

  renderScreen(screenIndex) {
    this.getScreens().forEach((screen, index) => {
      if (screenIndex === index) {
        $(screen.el.screenID).show();
        screen.render(this.getState());
      } else {
        $(screen.el.screenID).hide();
      }
    });
  }

  updateStart() {
    this.renderScreen(1);
  }

  updateAsk(params) {
    const question = this.getState().getCurrentQuestion();

    question.setPicked(params);
    if (question.getAnswerIndex() === question.getPicked()) this.getState().addPoints();
    this.renderScreen(2);
  }

  updateAnswer() {
    if (this.getState().getRound() === 10) {
      this.renderScreen(3);
    } else {
      this.getState().addRound();
      this.renderScreen(1);
    }
  }

  updateEnd() {
    this.setNewState();
    this.renderScreen(1);
  }

  init() {
    this.setNewState();
    this.setScreens([
      new StartScreen(this.updateStart.bind(this)),
      new AskScreen(this.updateAsk.bind(this)),
      new AnswerScreen(this.updateAnswer.bind(this)),
      new EndScreen(this.updateEnd.bind(this)),
    ]);
    this.renderScreen(0);
  }
}

new Game().init();
