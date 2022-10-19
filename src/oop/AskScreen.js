import $ from "jquery";
import Screen from "./Screen.js";

export default class AskScreen extends Screen {
  constructor(input) {
    super({
      elementID: input.elementID,
      onNextClick: input.onAnswerClick,
    });
    this.questionTxt = input.questionTxtID;
    this.guitarColor = input.guitarColor;
    this.guitar = input.guitarID;
    this.generatedColors = input.generatedColors;
    this.answerBtns = input.answerBtnsID;
    this.roundTxt = input.roundTxtID;
    this.round = input.round;

    this.init();
  }

  _renderQuestion() {
    if (!this.questionTxt) return;
    if (!this.guitarColor) return;

    $(this.questionTxt).text("guess " + this.guitarColor.name);
  }

  _renderGuitarColor() {
    if (!this.guitar) return;
    if (!this.guitarColor) return;

    $(this.guitar).css("fill", this.guitarColor.decimal);
  }

  _renderAnswerBtns() {
    if (!this.answerBtns || !this.generatedColors) return;

    for (const [index, entry] of this.generatedColors.entries()) {
      $(this.answerBtns[index]).text(entry.decimal);
    }
  }
  _setAnswerBtnsEvents() {
    if (!this.answerBtns) return;

    for (const btn of this.answerBtns) {
      $(btn).on(
        "click",
        function () {
          if (!this.onNextClick) return;
          if ($(btn).hasClass("selected")) return;
          if ($(btn).siblings().hasClass("selected")) return;

          $(btn).addClass("selected");
          this.onNextClick($(`${this.element} ${btn}`).text());
        }.bind(this)
      );
    }
  }

  _renderRound() {
    if (!this.roundTxt) return;

    $(this.roundTxt).text(`round ${this.round} of 10`);
  }

  init() {
    this._renderQuestion();
    this._renderGuitarColor();
    this._renderAnswerBtns();
    this._setAnswerBtnsEvents();
    this._renderRound();
  }
}
