import { describe, expect, it, vi } from "vitest";
import Game from "./Game.js";
import GameManager from "./GameManager.js";

describe("Game Manager", () => {
  it("initializes with a new game", () => {
    const gameManager = new GameManager();
    const game = new Game();

    expect(gameManager.game).toEqual(game);
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
});
