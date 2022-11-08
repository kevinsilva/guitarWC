import $ from 'jquery';
import ConfettiGenerator from 'confetti-js';

class EndElements {
  constructor() {
    this.screenID = '#end-screen';
    this.endMessageTxtID = '#end-message';
    this.endScoreTxtID = '#end-score';
    this.restartGameBtnID = '#restart-game';
  }
}

class EndScreen {
  constructor(onActionClick) {
    this.el = new EndElements();
    this.onActionClick = onActionClick;
  }

  render(state) {
    let confetti;
    const confettiElement = document.getElementById('confetti');
    const confettiSettings = { target: confettiElement };

    if (confettiElement instanceof HTMLCanvasElement) {
      confetti = new ConfettiGenerator(confettiSettings) || true;
    }

    let msg = '';

    if (state.getPoints() <= 40) {
      msg = 'need more practice...';
    } else if (state.getPoints() <= 80) {
      msg = 'you got some chops!';
    } else {
      msg = 'rgb legend.';

      if (confetti) confetti.render();
    }

    $(this.el.endMessageTxtID).text(msg);
    $(this.el.endScoreTxtID).text(`${state.getPoints()} points`);

    $(this.el.restartGameBtnID).one('click', () => {
      if (confetti) confetti.clear();
      this.onActionClick();
    });
  }
}

export { EndElements, EndScreen };
