import $ from 'jquery';
import Screen from './Screen.js';

export default class AnswerScreen extends Screen {
  constructor (input) {
    super({
      elementID: input.elementID,
      nextBtn: input.nextQuestionBtn,
      onNextClick: input.onNextQuestionClick
    });
    this.answerTxt = input.answerTxtID;
    this.isAnswerCorrect = input.isAnswerCorrect;
    this.guitarColor = input.guitarColor;
    this.answerBtns = input.answerBtnsID;
    this.pointsTxt = input.pointsTxtID;
    this.points = input.points;

    this.init();
  }

  _renderAnswerText () {
    if (this.isAnswerCorrect === undefined) return;
    this.isAnswerCorrect === true
      ? $(this.answerTxt).text('correct')
      : $(this.answerTxt).text('incorrect');
  }

  _renderBtnAnswerStyle () {
    if (!this.guitarColor) return;

    const that = this;
    $(this.element + ' ' + 'button:not(#next-question)').each(function (
      _,
      btnEl
    ) {
      const $btn = $(btnEl);

      if ($btn.text() === that.guitarColor.decimal) {
        $btn.addClass('correct');
      } else {
        $btn.addClass('incorrect');
      }
    });
  }

  _renderPoints () {
    if (!this.pointsTxt) return;

    $(this.pointsTxt).text(`${this.points} points`);
  }

  init () {
    this._renderAnswerText();
    this._renderBtnAnswerStyle();
    this._renderPoints();
  }
}
