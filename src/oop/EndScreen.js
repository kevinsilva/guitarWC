import $ from 'jquery';
import Screen from './Screen.js';
import ConfettiGenerator from 'confetti-js';

export default class EndScreen extends Screen {
  constructor(input) {
    super({
      elementID: input.elementID,
      nextBtn: input.restartGameBtnID,
      onNextClick: input.onRestartGameClick,
    });
    this.endMessageTxt = input.endMessageTxtID;
    this.endScoreTxt = input.endScoreTxtID;
    this.gameScore = input.gameScore;

    this.init();
  }

  _renderEndGameMsg() {
    if (this.gameScore === undefined) return;

    let msg = '';

    if (this.gameScore <= 40) {
      msg = 'need more practice...';
    } else if (this.gameScore <= 80) {
      msg = 'you got some chops!';
    } else {
      msg = 'rgb legend.';

      const confettiElement = document.getElementById('confetti');
      if (confettiElement instanceof HTMLCanvasElement) {
        const confettiSettings = { target: confettiElement };
        const confetti = new ConfettiGenerator(confettiSettings) || true;

        confetti.render();
      }
    }

    $(this.endMessageTxt).text(msg);
    $(this.endScoreTxt).text(`${this.gameScore} points`);
  }

  init() {
    this._renderEndGameMsg();
  }
}
