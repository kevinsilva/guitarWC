import $ from 'jquery';

class AnswerElements {
  constructor() {
    this.screenID = '#answer-screen';
    this.pointsTxtID = 'h3.points';
    this.answerTxtID = '#answer';
    this.answerBtnsID = [
      'button.button-0',
      'button.button-1',
      'button.button-2',
    ];
    this.nextQuestionBtnID = '#next-question';
  }
}

class AnswerScreen {
  constructor(onActionClick) {
    this.el = new AnswerElements();
    this.onActionClick = onActionClick;
  }
  
  render(state) {
    $(this.el.pointsTxtID).text(`${state.getPoints()} points`);
    $(this.el.answerTxtID).text(`${state.getCurrentQuestion().getPicked() === state.getCurrentQuestion().getAnswerIndex() ? 'correct' : 'incorrect'}`);

    $(this.el.answerBtnsID).each((_, btn) => {
      if ($(`${this.el.screenID} ${btn}`).text() === state.getCurrentQuestion().getGuitarColor().decimal) {
        $(`${this.el.screenID} ${btn}`).addClass('correct');
      } else {
        $(`${this.el.screenID} ${btn}`).addClass('incorrect');
      }
    });

    $(this.el.nextQuestionBtnID).one('click', () => {
      $('button').removeClass('selected');
      this.onActionClick();
    });
  }
}

export { AnswerElements, AnswerScreen };
