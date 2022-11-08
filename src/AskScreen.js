import $ from 'jquery';

class AskElements {
  constructor() {
    this.screenID = '#ask-screen';
    this.roundTxtID = 'h3.round';
    this.pointsTxtID = 'h3.points';
    this.questionTxtID = '#question';
    this.guitarID = 'svg.guitar-body';
    this.answerBtnsID = [
      'button.button-0',
      'button.button-1',
      'button.button-2',
    ];
  }
}

class AskScreen {
  constructor(onActionClick) {
    this.el = new AskElements();
    this.onActionClick = onActionClick;
  }

  render(state) {

    $(this.el.roundTxtID).text(`round ${state.getRound()} of 10`);
    $(this.el.pointsTxtID).text(`${state.getPoints()} points`);
    $(this.el.questionTxtID).text(`guess ${state.getCurrentQuestion().getGuitarColor().name}`);
    $(this.el.guitarID).css('fill', state.getCurrentQuestion().getGuitarColor().decimal);
    $('button').removeClass('correct incorrect');

    $(this.el.answerBtnsID).each((i, btn) => {
      $(btn).text(state.getCurrentQuestion().getOptions()[i].decimal);
      $(btn).one('click', () => {
        if ($(btn).hasClass('selected')) return;
        if ($(btn).siblings().hasClass('selected')) return;
        $(btn).addClass('selected');
        this.onActionClick(i);
      });
    });
  }
}

export { AskElements, AskScreen };
