import $ from 'jquery';

export default class Screen {
  constructor(input) {
    this.element = input.elementID;
    this.nextBtn = input.nextBtn;
    this.onNextClick = input.onNextClick;
    this._initEventListeners();
  }

  hide() {
    $(this.element).hide();
    this.visibility = 'hidden';
  }

  show() {
    $(this.element).show();
    this.visibility = 'visible';
  }

  setOnNextClick(cb) {
    this.onNextClick = cb;
  }

  _initEventListeners() {
    if (!this.nextBtn) return;
    $(this.nextBtn).on('click', () => {
      if (!this.onNextClick) return;
      this.onNextClick();
    });
  }
}
