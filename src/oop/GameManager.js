import Game from './Game.js';

export default class GameManager {
  constructor (screenManager) {
    this.screenManager = screenManager;
    this.game = new Game();
    this.round = 0;
  }

  startGame () {
    this.game.loadQuestions();
    this.nextRound();
  }

  nextRound () {
    this.round++;
    if (this.round >= 11) return;
    this.currentQuestion = this.game.questions[this.round].answer;
    this.currentOptions = this.game.questions[this.round].options;
  }

  checkAnswer (answer) {
    let result;

    if (answer === this.currentQuestion.decimal) {
      result = true;
    } else {
      result = false;
    }

    this.game.addPoints(result);
    return result;
  }

  restartGame () {
    this.round = 0;
    this.startGame();
  }

  loadAskState () {
    const askScreen = this.screenManager.screens[1];

    askScreen.guitarColor = this.currentQuestion;
    askScreen.generatedColors = this.currentOptions;
    askScreen.round = this.round;
    askScreen.points = this.game.points;
  }

  loadAnswerState () {
    const answerScreen = this.screenManager.screens[2];

    answerScreen.guitarColor = this.currentQuestion;
    answerScreen.points = this.game.points;
  }

  loadEndState () {
    const endScreen = this.screenManager.screens[3];

    endScreen.gameScore = this.game.points;
  }

  renderAskScreen () {
    this.screenManager.screens[1].init();
  }

  renderAnswerScreen () {
    this.screenManager.screens[2].init();
  }

  renderEndScreen () {
    this.screenManager.screens[3].init();
  }
}
