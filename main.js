import $ from "jquery";
window._$ = $;
import ScreenManager from "./src/oop/ScreenManager.js";
import StartScreen from "./src/oop/StartScreen.js";
import AskScreen from "./src/oop/AskScreen.js";
import AnswerScreen from "./src/oop/AnswerScreen.js";
import EndScreen from "./src/oop/EndScreen.js";
import GameManager from "./src/oop/GameManager.js";

const startScreen = new StartScreen({
  elementID: "#start-screen",
  newGameBtn: "#new-game",
});

const askScreen = new AskScreen({
  elementID: "#ask-screen",
  questionTxtID: "#question",
  guitarID: "svg.guitar-body",
  answerBtnsID: [".button-0", ".button-1", ".button-2"],
  roundTxtID: "h3.round",
});

const answerScreen = new AnswerScreen({
  elementID: "#answer-screen",
  answerTxtID: "#answer",
  guitarID: "#answer-screen.guitar",
  answerBtnsID: [".button-0", ".button-1", ".button-2"],
  nextQuestionBtn: "#next-question",
  pointsTxtID: "h3.points",
});

const endScreen = new EndScreen({
  elementID: "#end-screen",
  endMessageTxtID: "#end-message",
  endScoreTxtID: "#end-score",
  restartGameBtnID: "#restart-game",
});

const screenManager = new ScreenManager([
  startScreen,
  askScreen,
  answerScreen,
  endScreen,
]);

const gameManager = new GameManager(screenManager);
gameManager.startGame();

startScreen.setOnNextClick(() => {
  gameManager.loadAskState();
  gameManager.renderAskScreen();
  gameManager.loadAnswerState();
  gameManager.renderAnswerScreen();

  screenManager.showNext();
});

askScreen.setOnNextClick((answer) => {
  $("button").removeClass("correct incorrect");
  let result = gameManager.checkAnswer(answer);
  answerScreen.isAnswerCorrect = result;
  gameManager.loadAnswerState();
  gameManager.renderAnswerScreen();

  screenManager.showNext();
});

answerScreen.setOnNextClick(() => {
  gameManager.nextRound();

  $("button").removeClass("selected");
  gameManager.loadAskState();
  gameManager.renderAskScreen();
  gameManager.loadEndState();
  gameManager.renderEndScreen();


  if (gameManager.round > 10) {
    screenManager._showScreen(3);
  } else {
    screenManager._showScreen(1);
    console.log(gameManager.currentQuestion);
  }
});

endScreen.setOnNextClick(() => {
  gameManager.restartGame();
  gameManager.loadAskState();
  gameManager.renderAskScreen();

  screenManager._showScreen(1);
});
