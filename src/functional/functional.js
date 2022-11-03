import $ from 'jquery';
import { randomNumber } from '../utilities.js';
import ConfettiGenerator from 'confetti-js';

// SCREENS
const startScreenID = '#start-screen';
const askScreenID = '#ask-screen';
const answerScreenID = '#answer-screen';
const endScreenID = '#end-screen';
// BUTTONS
const newGameBtnID = '#new-game';
const answerBtnsID = ['.button-0', '.button-1', '.button-2'];
const nextQuestionBtnID = '#next-question';
const restartGameBtnID = '#restart-game';
// TEXTS
const questionTxtID = '#question';
const roundTxtID = 'h3.round';
const answerTxtID = '#answer';
const pointsTxtID = 'h3.points';
const endMessageTxtID = '#end-message';
const endScoreTxtID = '#end-score';
// GUITAR
const guitarID = 'svg.guitar-body';

const screensArr = [startScreenID, askScreenID, answerScreenID, endScreenID];

function getRandomColors() {
  const colors = [
    { name: 'White Blonde', decimal: 'rgb(218, 209, 202)' },
    { name: 'Lake Placid Blue', decimal: 'rgb(56, 94, 130)' },
    { name: 'Navy Blue Metallic', decimal: 'rgb(6, 25, 44)' },
    { name: 'Olympic White', decimal: 'rgb(221, 218, 209)' },
    { name: 'Flat White', decimal: 'rgb(236, 230, 215)' },
    { name: 'Black', decimal: 'rgb(8, 1, 1)' },
    { name: 'Flat Black', decimal: 'rgb(27, 27, 29)' },
    { name: 'Vintage Blonde', decimal: 'rgb(229, 198, 126)' },
    { name: 'Ocean Turquoise', decimal: 'rgb(40, 106, 111)' },
    { name: 'Candy Apple Red', decimal: 'rgb(125, 0, 3)' },
    { name: 'Metallic Blue', decimal: 'rgb(12, 43, 115)' },
    { name: 'Mystic Black', decimal: 'rgb(27, 27, 27)' },
    { name: 'Arizona Sun', decimal: 'rgb(189, 73, 6)' },
    { name: 'Candy Cola', decimal: 'rgb(77, 4, 12)' },
    { name: 'Hot Hot Red', decimal: 'rgb(178, 0, 26)' },
    { name: 'Sage Green Metallic', decimal: 'rgb(109, 145, 86)' },
    { name: 'Natural', decimal: 'rgb(199, 170, 129)' },
    { name: 'Olympic Pearl', decimal: 'rgb(224, 224, 209)' },
    { name: 'Pearl White', decimal: 'rgb(208, 208, 199)' },
    { name: 'Inca Silver', decimal: 'rgb(139, 138, 123)' },
    { name: 'Metallic Red', decimal: 'rgb(93, 8, 15)' },
    { name: 'Violet', decimal: 'rgb(16, 17, 56)' },
    { name: 'Blaze Gold', decimal: 'rgb(210, 136, 9)' },
    { name: 'Firemist Silver', decimal: 'rgb(177, 188, 199)' },
    { name: 'Fiesta Red', decimal: 'rgb(208, 67, 68)' },
    { name: 'Vintage White', decimal: 'rgb(255, 243, 187)' },
    { name: 'Pewter', decimal: 'rgb(79, 77, 82)' },
    { name: 'Shoreline Gold', decimal: 'rgb(163, 147, 111)' },
    { name: 'Sherwood Green Metallic', decimal: 'rgb(60, 84, 71)' },
    { name: 'Sonic Gray', decimal: 'rgb(120, 145, 145)' },
    { name: 'Sea Foam Green', decimal: 'rgb(176, 208, 184)' },
    { name: 'Surf Pearl', decimal: 'rgb(166, 200, 175)' },
    { name: 'Butterscotch Blonde', decimal: 'rgb(253, 167, 51)' },
    { name: 'Mercedes Blue', decimal: 'rgb(19, 21, 24)' },
    { name: 'Metallic KO', decimal: 'rgb(71, 17, 1)' },
    { name: 'Mystic Aztec Gold', decimal: 'rgb(174, 140, 80)' },
    { name: 'Firemist Gold', decimal: 'rgb(143, 97, 60)' },
    { name: 'Dakota Red', decimal: 'rgb(135, 0, 9)' },
    { name: 'Shell Pink', decimal: 'rgb(228, 188, 167)' },
    { name: 'Surf Green', decimal: 'rgb(151, 203, 163)' },
    { name: 'Torino Red', decimal: 'rgb(182, 0, 12)' },
    { name: 'Tungsten', decimal: 'rgb(119, 119, 119)' },
    { name: 'Mystic Ice Blue', decimal: 'rgb(159, 181, 189)' },
    { name: 'Yellow White', decimal: 'rgb(228, 204, 152)' },
    { name: 'Burgundy Mist Metallic', decimal: 'rgb(131, 95, 102)' },
    { name: 'Burgundy Mist', decimal: 'rgb(186, 145, 159)' },
    { name: 'Honey Blonde', decimal: 'rgb(213, 169, 105)' },
    { name: 'Charcoal Frost Metallic', decimal: 'rgb(58, 59, 55)' },
    { name: 'Pink', decimal: 'rgb(184, 120, 138)' },
    { name: 'Race Red', decimal: 'rgb(231, 0, 20)' },
    { name: 'Sonic Blue', decimal: 'rgb(153, 192, 199)' },
    { name: 'Faded Sonic Blue', decimal: 'rgb(206, 215, 206)' },
    { name: 'Midnight Blue', decimal: 'rgb(23, 21, 28)' },
    { name: 'Midnight Wine', decimal: 'rgb(50, 8, 11)' },
    { name: 'Flame Orange', decimal: 'rgb(118, 22, 2)' },
    { name: 'Antique Olive', decimal: 'rgb(81, 93, 69)' },
    { name: 'Frost Gold', decimal: 'rgb(216, 186, 126)' },
    { name: 'Arctic White', decimal: 'rgb(227, 221, 206)' },
    { name: 'Ghost Silver', decimal: 'rgb(174, 166, 155)' },
    { name: 'Slick Silver', decimal: 'rgb(102, 108, 108)' },
    { name: 'Capri Orange', decimal: 'rgb(217, 114, 8)' },
    { name: 'Ice Blue Metallic', decimal: 'rgb(136, 169, 181)' },
    { name: 'Classic Copper', decimal: 'rgb(77, 26, 22)' },
    { name: 'Mystic Seafoam', decimal: 'rgb(17, 125, 122)' },
    { name: 'Imperial Blue', decimal: 'rgb(0, 0, 103)' },
    { name: 'Desert Sand', decimal: 'rgb(213, 183, 145)' },
    { name: 'Silver', decimal: 'rgb(195, 196, 181)' },
    { name: 'Race Green', decimal: 'rgb(14, 109, 97)' },
    { name: 'Oxblood', decimal: 'rgb(27, 1, 9)' },
    { name: 'Mystic Blue', decimal: 'rgb(42, 57, 140)' },
    { name: 'Metallic Blue', decimal: 'rgb(10, 41, 112)' },
    { name: 'Autumn Blaze Metallic', decimal: 'rgb(140, 56, 28)' },
    { name: 'Competition Orange', decimal: 'rgb(252, 101, 46)' },
    { name: 'Tropical Turquoise', decimal: 'rgb(123, 179, 203)' },
    { name: 'Olive', decimal: 'rgb(47, 54, 34)' },
    { name: 'HLE Gold', decimal: 'rgb(152, 100, 37)' },
    { name: 'Lucerne Aqua Firemist', decimal: 'rgb(51, 108, 120)' },
    { name: 'Dodgem Blue', decimal: 'rgb(39, 68, 71)' },
    { name: 'Frost', decimal: 'rgb(214, 205, 196)' },
    { name: 'Golden Mesa', decimal: 'rgb(179, 120, 59)' },
    { name: 'Midnight Rose', decimal: 'rgb(108, 62, 60)' },
    { name: 'Moc Sand Satin', decimal: 'rgb(191, 168, 152)' },
    { name: 'Orien Green', decimal: 'rgb(72, 79, 52)' },
    { name: 'Polar Blue', decimal: 'rgb(104, 113, 113)' },
    { name: 'Roxy Pink', decimal: 'rgb(218, 117, 133)' },
    { name: 'Gold Top', decimal: 'rgb(142, 86, 24)' },
    { name: 'TV Yellow', decimal: 'rgb(215, 156, 62)' },
    { name: 'Vintage Cherry', decimal: 'rgb(150, 34, 27)' },
    { name: 'Ebony', decimal: 'rgb(26, 26, 24)' },
    { name: 'Olive Drab', decimal: 'rgb(57, 59, 31)' },
    { name: 'Cherry Red', decimal: 'rgb(121, 0, 18)' },
  ];
  const palette = [...colors];
  const randomColors = [];

  while (randomColors.length < 3) {
    const randomColor = palette[randomNumber(1, palette.length) - 1];

    if (!randomColors.includes(randomColor)) randomColors.push(randomColor);
  }
  return randomColors;
}

function generateQuestions() {
  const questions = [];

  while (questions.length < 10) {
    const colors = getRandomColors();
    const random = randomNumber(1, 3);
    const question = {
      guitarColor: colors[random - 1],
      options: [...colors],
      picked: -1,
    };
    question.answer = question.options.findIndex(
      (option) => option === question.guitarColor
    );
    questions.push(question);
  }
  return questions;
}

function showOnlyScreen(screenIndex, screensArrID) {
  screensArrID.forEach((screen, index) => {
    screenIndex === index ? $(screen).show() : $(screen).hide();
  });
}

const SCREENS = {
  startScreen: function _renderStartScreen(_, onActionClick) {
    showOnlyScreen(0, screensArr);

    $(newGameBtnID).one('click', () => {
      onActionClick();
    });
  },
  askScreen: function _renderAskScreen(
    { questions, round, points },
    onActionClick
  ) {
    const question = questions[round - 1];
    showOnlyScreen(1, screensArr);
    $(roundTxtID).text(`round ${round} of 10`);
    $(pointsTxtID).text(`${points} points`);
    $(questionTxtID).text(`guess ${question.guitarColor.name}`);
    $(guitarID).css('fill', question.guitarColor.decimal);
    $('button').removeClass('correct incorrect');

    $(answerBtnsID).each((i, btn) => {
      $(btn).text(question.options[i].decimal);
      $(btn).one('click', () => {
        if ($(btn).hasClass('selected')) return;
        if ($(btn).siblings().hasClass('selected')) return;
        $(btn).addClass('selected');
        onActionClick(i);
      });
    });
  },
  answerScreen: function _renderAnswerScreen(
    { questions, round, points },
    onActionClick
  ) {
    const question = questions[round - 1];
    showOnlyScreen(2, screensArr);
    $(pointsTxtID).text(`${points} points`);
    $(answerTxtID).text(
      `${question.picked === question.answer ? 'correct' : 'incorrect'}`
    );

    $(answerBtnsID).each((_, btn) => {
      if (
        $(`${answerScreenID} ${btn}`).text() === question.guitarColor.decimal
      ) {
        $(`${answerScreenID} ${btn}`).addClass('correct');
      } else {
        $(`${answerScreenID} ${btn}`).addClass('incorrect');
      }
    });

    $(nextQuestionBtnID).one('click', () => {
      $('button').removeClass('selected');
      onActionClick();
    });
  },
  endScreen: function _renderEndScreen({ points, round }, onActionClick) {
    const confettiElement = document.getElementById('confetti');
    const confettiSettings = { target: confettiElement };
    const confetti = new ConfettiGenerator(confettiSettings);

    showOnlyScreen(3, screensArr);

    let msg = '';

    if (points <= 40) {
      msg = 'need more practice...';
    } else if (points <= 80) {
      msg = 'you got some chops!';
    } else {
      msg = 'rgb legend.';

      confetti.render();
    }

    $(endMessageTxtID).text(msg);
    $(endScoreTxtID).text(`${points} points`);

    $(restartGameBtnID).one('click', () => {
      confetti.clear();
      onActionClick();
    });
  },
};

function init() {
  const state = {
    round: 1,
    points: 0,
    questions: generateQuestions(),
    currentScreen: SCREENS.startScreen,
  };

  function updateState(params) {
    switch (state.currentScreen) {
      case SCREENS.startScreen:
        state.currentScreen = SCREENS.askScreen;
        break;

      case SCREENS.askScreen:
        const question = state.questions[state.round - 1];
        question.picked = params;
        state.points += question.answer === question.picked ? 10 : 0;
        state.currentScreen = SCREENS.answerScreen;
        break;

      case SCREENS.answerScreen:
        if (state.round === state.questions.length) {
          state.currentScreen = SCREENS.endScreen;
        } else {
          state.round++;
          state.currentScreen = SCREENS.askScreen;
        }
        break;

      case SCREENS.endScreen:
        state.round = 1;
        state.points = 0;
        state.questions = generateQuestions();
        state.currentScreen = SCREENS.askScreen;
        break;

      default:
        throw new Error(
          `Invalid state. Unknown screen: ${state.currentScreen}`
        );
    }
    state.currentScreen(state, updateState);
  }
  state.currentScreen(state, updateState);
}

init();
