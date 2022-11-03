import $ from 'jquery';

class AnswerElements {
  constructor () {
    this.screenID = '#answer-screen';
    this.pointsTxtID = 'h3.points';
    this.answerTxtID = '#answer';
    this.answerBtnsID = [
      'button.button-0',
      'button.button-1',
      'button.button-2'
    ];
    this.nextQuestionBtnID = '#next-question';
  }
}

class AnswerScreen {
  constructor (onActionClick) {
    this.el = new AnswerElements();
    this.onActionClick = onActionClick;
  }

  render (state) {
    const question = state._questions[state._round - 1];
    const picked = question._picked;
    const answer = question._answer;
    const pointsTxt = this.el.pointsTxtID;
    const answerTxt = this.el.answerTxtID;
    const answerBtn = this.el.answerBtnsID;
    const screen = this.el.screenID;
    const guitarColor = question._guitarColor.decimal;
    const nextBtn = this.el.nextQuestionBtnID;

    $(pointsTxt).text(`${state._points} points`);
    $(answerTxt).text(`${picked === answer ? 'correct' : 'incorrect'}`);

    $(answerBtn).each((_, btn) => {
      if ($(`${screen} ${btn}`).text() === guitarColor) {
        $(`${screen} ${btn}`).addClass('correct');
      } else {
        $(`${screen} ${btn}`).addClass('incorrect');
      }
    });

    $(nextBtn).one('click', () => {
      $('button').removeClass('selected');
      this.onActionClick();
    });
  }
}

export { AnswerElements, AnswerScreen };
