import { describe, expect, it, vi } from "vitest";
import Game from "../Game.js";
import Screen from "../Screen.js";
import GameManager from "../GameManager.js";
import ScreenManager from "../ScreenManager.js";

describe("Game Manager", () => {
  it("initializes with a new game", () => {
    const gameManager = new GameManager();
    const game = new Game();

    expect(gameManager.game).toEqual(game);
  });

  it("initializes with a screen manager", () => {
    const mockElement = vi.fn();
    const start = new Screen(mockElement);
    const ask = new Screen(mockElement);
    const answer = new Screen(mockElement);
    const end = new Screen(mockElement);

    const screens = [start, ask, answer, end];

    const screenManager = new ScreenManager(screens);
    const gameManager = new GameManager(screenManager);

    expect(gameManager.screenManager).toEqual(screenManager);
  });

  it("starts with the round set to zero", () => {
    const gameManager = new GameManager();

    expect(gameManager.round).toEqual(0);
  });

  it("starts a game by adding one to the rounds and loading the questions", () => {
    const gameManager = new GameManager();
    const game = gameManager.game;
    const spy = vi.spyOn(game, "loadQuestions");
    gameManager.startGame();

    expect(gameManager.round).toEqual(1);
    expect(spy).toHaveBeenCalledOnce();
  });

  it("has a current question and current options based on the round value", () => {
    const gameManager = new GameManager();
    gameManager.startGame();
    let round = gameManager.round;

    expect(gameManager.currentQuestion).toEqual(
      gameManager.game.questions[round].answer
    );
    expect(gameManager.currentOptions).toEqual(
      gameManager.game.questions[round].options
    );
  });
  it("goes to next round and updates current question and options", () => {
    const gameManager = new GameManager();
    gameManager.startGame();
    expect(gameManager.round).toEqual(1);

    gameManager.nextRound();
    expect(gameManager.round).toEqual(2);

    expect(gameManager.currentQuestion).toEqual(
      gameManager.game.questions[gameManager.round].answer
    );
    expect(gameManager.currentOptions).toEqual(
      gameManager.game.questions[gameManager.round].options
    );
  });

  it("checks if answer is correct by returning true or false, and adds corresponding points", () => {
    const gameManager = new GameManager();
    gameManager.startGame();

    const wrongAnswer = "rgb(1210, 9900, 1008)";
    const expectedFalse = gameManager.checkAnswer(wrongAnswer);

    expect(expectedFalse).toEqual(false);
    expect(gameManager.game.points).toEqual(0);

    const correctAnswer = gameManager.currentQuestion.decimal;
    const spy = vi.spyOn(gameManager.game, "addPoints");
    const expectedTrue = gameManager.checkAnswer(correctAnswer);

    expect(spy).toHaveBeenCalled();

    expect(expectedTrue).toEqual(true);
    expect(gameManager.game.points).toEqual(10);
  });
  it("restarts a game by resetting the round and loading more questions", () => {
    const gameManager = new GameManager();
    gameManager.startGame();
    gameManager.round = 10;
    const questions = gameManager.game.questions;

    gameManager.restartGame();
    expect(gameManager.round).toEqual(1);
    expect(gameManager.game.questions).not.toEqual(questions);
  });

  describe("Load States", () => {
    const mockElement = vi.fn();
    const start = new Screen(mockElement);
    const ask = new Screen(mockElement);
    const answer = new Screen(mockElement);
    const end = new Screen(mockElement);

    const screens = [start, ask, answer, end];

    const screenManager = new ScreenManager(screens);
    const gameManager = new GameManager(screenManager);

    gameManager.startGame();

    it("loads state changes to the ask screen", () => {
      gameManager.loadAskState();
      const askScreen = gameManager.screenManager.screens[1];

      expect(askScreen.guitarColor).toEqual(gameManager.currentQuestion);
      expect(askScreen.generatedColors).toEqual(gameManager.currentOptions);
      expect(askScreen.round).toEqual(gameManager.round);
      expect(askScreen.points).toEqual(gameManager.game.points);
    });

    it("loads state changes to the answer screen", () => {
      gameManager.loadAnswerState();
      const answerScreen = gameManager.screenManager.screens[2];

      expect(answerScreen.guitarColor).toEqual(gameManager.currentQuestion);
      expect(answerScreen.points).toEqual(gameManager.game.points);
    });

    it("loads state changes to the answer screen", () => {
      gameManager.loadEndState();
      const endScreen = gameManager.screenManager.screens[3];

      expect(endScreen.gameScore).toEqual(gameManager.game.points);
    });
  });

  describe("Render State", () => {
    const mockElement = vi.fn();
    const start = new Screen(mockElement);
    const ask = new Screen(mockElement);
    const answer = new Screen(mockElement);
    const end = new Screen(mockElement);

    const screens = [start, ask, answer, end];

    const screenManager = new ScreenManager(screens);
    const gameManager = new GameManager(screenManager);

    gameManager.startGame();

    it("renders screen by calling correspondent render method", () => {
      const askScreen = gameManager.screenManager.screens[1];

      askScreen.init = vi.fn();

      gameManager.renderAskScreen();
      expect(askScreen.init).toHaveBeenCalled();

      const answerScreen = gameManager.screenManager.screens[2];

      answerScreen.init = vi.fn();
      gameManager.renderAnswerScreen();

      expect(answerScreen.init).toHaveBeenCalled();

      const endScreen = gameManager.screenManager.screens[3];

      endScreen.init = vi.fn();
      gameManager.renderEndScreen();

      expect(endScreen.init).toHaveBeenCalled();
    });
  });
});
