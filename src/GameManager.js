import Game from "./Game.js";

export default class GameManager {
  constructor() {
    this.game = new Game();
    this.round = 0;
  }

  startGame() {
    this.game.loadQuestions();
    this.nextRound();
  }

  nextRound() {
    if (this.round > 10) return;
    this.round++;
    this.currentQuestion = this.game.questions[this.round].answer;
    this.currentOptions = this.game.questions[this.round].options;
  }

  checkAnswer(answer) {
    let result;

    if (answer === this.currentQuestion.decimal) {
      result = true;
    } else {
      result = false;
    }

    this.game.addPoints(result);
    return result;
  }

  restartGame() {
    this.round = 0;
    this.startGame();
  }
}
