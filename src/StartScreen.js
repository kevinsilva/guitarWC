import $ from 'jquery';

class StartElements {
  constructor() {
    this.screenID = '#start-screen';
    this.newGameBtnID = '#new-game';
  }
}

class StartScreen {
  constructor(onActionClick) {
    this.el = new StartElements();
    this.onActionClick = onActionClick;
    this.render();
  }

  render() {
    $(this.el.newGameBtnID).one('click', this.onActionClick);
  }
}

export { StartElements, StartScreen };
