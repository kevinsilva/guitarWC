import $ from 'jquery';
import State from './State';
import { StartScreen } from './StartScreen';
import { AskScreen } from './AskScreen';
import { AnswerScreen } from './AnswerScreen';
import { EndScreen } from './EndScreen';

export default class Game {
  constructor () {
    this.state = null;
    this.screens = null;
  }

  showOnly (screenIndex) {
    this.screens.forEach((screen, index) => {
      screenIndex === index
        ? $(screen.el.screenID).show()
        : $(screen.el.screenID).hide();
    });
  }

  renderScreen (screenIndex) {
    this.screens.forEach((screen, index) => {
      if (screenIndex === index) {
        $(screen.el.screenID).show();
        screen.render(this.state);
      } else {
        $(screen.el.screenID).hide();
      }
    });
  }

  updateStart () {
    this.screens[1].render(this.state);
    this.showOnly(1);
  }

  updateAsk (params) {
    const question = this.state._questions[this.state._round - 1];

    question._picked = params;
    this.state.points += question._answer === question._picked ? 10 : 0;
    this.screens[2].render(this.state);
    this.showOnly(2);
  }

  updateAnswer () {
    if (this.state._round === this.state._questions.length) {
      this.screens[3].render(this.state);
      this.showOnly(3);
    } else {
      this.state._round++;
      this.screens[1].render(this.state);
      this.showOnly(1);
    }
  }

  updateEnd () {
    this.init();
  }

  init () {
    this.state = new State();
    this.screens = [
      new StartScreen(this.updateStart.bind(this)),
      new AskScreen(this.updateAsk.bind(this)),
      new AnswerScreen(this.updateAnswer.bind(this)),
      new EndScreen(this.updateEnd.bind(this))
    ];
    this.showOnly(0);
    // this.state.currentScreen = this.screens[0].render();
  }
}

const game = new Game();
game.init();
console.log(game.screens[0]);
