import $ from "jquery";
window._$ = $;
import ScreenManager from "./src/ScreenManager.js";
import StartScreen from "./src/StartScreen.js";
import AskScreen from "./src/AskScreen.js";
import AnswerScreen from "./src/AnswerScreen.js";
import EndScreen from "./src/EndScreen.js";
import GameManager from "./src/GameManager.js";

const gameManager = new GameManager();
gameManager.startGame();

const startScreen = new StartScreen({
  elementID: "#start-screen",
  newGameBtn: "#new-game",
});

const askScreen = new AskScreen({
  elementID: "#ask-screen",
  questionTxtID: "#question",
  guitarColor: gameManager.currentQuestion,
  guitarID: "svg.guitar-body",
  generatedColors: gameManager.currentOptions,
  answerBtnsID: [".button-0", ".button-1", ".button-2"],
  roundTxtID: "h3.round",
  round: gameManager.round,
});

const answerScreen = new AnswerScreen({
  elementID: "#answer-screen",
  answerTxtID: "#answer",
  guitarColor: gameManager.currentQuestion,
  guitarID: "#answer-screen.guitar",
  answerBtnsID: [".button-0", ".button-1", ".button-2"],
  nextQuestionBtn: "#next-question",
  pointsTxtID: "h3.points",
  points: gameManager.game.points,
});

const endScreen = new EndScreen({
  elementID: "#end-screen",
  endMessageTxtID: "#end-message",
  endScoreTxtID: "#end-score",
  gameScore: gameManager.game.points,
  restartGameBtnID: "#restart-game",
});

const screenManager = new ScreenManager([
  startScreen,
  askScreen,
  answerScreen,
  endScreen,
]);

startScreen.setOnNextClick(() => {
  screenManager.showNext();
  console.log(gameManager.currentQuestion);
});

askScreen.setOnNextClick((answer) => {
  $("button").removeClass("correct incorrect");
  let result = gameManager.checkAnswer(answer);
  answerScreen.isAnswerCorrect = result;
  answerScreen.guitarColor = gameManager.currentQuestion;
  answerScreen.points = gameManager.game.points;
  answerScreen.init();
  screenManager.showNext();
});

answerScreen.setOnNextClick(() => {
  $("button").removeClass("selected");
  gameManager.nextRound();
  askScreen.round = gameManager.round;
  askScreen.guitarColor = gameManager.currentQuestion;
  askScreen.generatedColors = gameManager.currentOptions;
  askScreen.init();
  endScreen.gameScore = gameManager.game.points;
  endScreen.init();

  if (gameManager.round > 10) {
    screenManager._showScreen(3);
  } else {
    screenManager._showScreen(1);
    console.log(gameManager.currentQuestion);
  }
});

endScreen.setOnNextClick(() => {
  gameManager.restartGame();
  askScreen.round = gameManager.round;
  askScreen.guitarColor = gameManager.currentQuestion;
  askScreen.generatedColors = gameManager.currentOptions;
  askScreen.init();
  screenManager._showScreen(1);
});
