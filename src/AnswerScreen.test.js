import $ from "jquery";
import { describe, expect, it, vi } from "vitest";

import AnswerScreen from "./AnswerScreen.js";

describe("Answer Screen", () => {
  it("adds an answer text, based on correct answer validation, to target element", () => {
    document.body.innerHTML =
      '<div id="game-screen">' + ' <h2 class="title"></h2>' + "</div>";

    const input = {
      elementID: "#game-screen",
      answerTxtID: "h2.title",
      isAnswerCorrect: true,
    };

    new AnswerScreen(input);

    expect($("h2.title").text()).toBe("correct");

    const input2 = {
      elementID: "#game-screen",
      answerTxtID: "h2.title",
      isAnswerCorrect: false,
    };

    new AnswerScreen(input2);
    expect($("h2.title").text()).toBe("incorrect");
  });

  it("adds correct and incorrect style classes to target button elements", () => {
    document.body.innerHTML =
      '<div id="game-screen">' +
      '<button class="button-0">rgb(215, 156, 62)</button>' +
      '<button class="button-1">rgb(125, 0, 3)</button>' +
      '<button class="button-2">rgb(121, 120, 113)</button>' +
      "</div>";

    const input = {
      elementID: "#game-screen",
      answerBtnsID: [".button-0", ".button-1", ".button-2"],
      guitarColor: { name: "TV Yellow", decimal: "rgb(215, 156, 62)" },
    };

    new AnswerScreen(input);

    // console.log(" YOPOOO:" + $(document.body).html());
    const $btn0 = $("#game-screen button").first();
    const $btn1 = $("#game-screen button").eq(1);
    const $btn2 = $("#game-screen button").eq(2);
    // console.log("BTN-0", $btn0);
    // console.log("classes:", $btn0.attr("class"));
    expect($btn0.hasClass("correct")).toBe(true);
    expect($btn1.hasClass("incorrect")).toBe(true);
    expect($btn2.hasClass("incorrect")).toBe(true);
  });

  it("calls given callback when next question button is clicked", () => {
    document.body.innerHTML =
      '<div id="game-screen"><button id="next-question">next question</button></div>';

    const input = {
      elementID: "#game-screen",
      nextQuestionBtn: "#next-question",
      onNextQuestionClick: vi.fn(),
    };

    const answerScreen = new AnswerScreen(input);
    $("#next-question").trigger("click");

    expect(answerScreen.onNextClick).toEqual(input.onNextQuestionClick);
    expect(answerScreen.onNextClick).toHaveBeenCalled();
  });

  it("calls the set callback function only when the next question button is clicked and the cb is a valid function", () => {
    document.body.innerHTML =
      '<div id="game-screen"><button id="next-question">next question</button></div>';

    const spy = vi.fn();

    const input = {
      elementID: "#game-screen",
      nextQuestionBtn: "#next-question",
    };

    const answerScreen = new AnswerScreen(input);
    $("#next-question").trigger("click");

    expect(spy).not.toHaveBeenCalled();
    answerScreen.setOnNextClick(spy);
    expect(spy).not.toHaveBeenCalled();
    $("#next-question").trigger("click");
    expect(spy).toHaveBeenCalled();
    answerScreen.setOnNextClick(undefined);
    $("#next-question").trigger("click");
    expect(spy).toHaveBeenCalledTimes(1);
  });

  // action when where / on
  // calls the givben cb function when next question button is clicked
  // it("sets a click event listener on the next question button and calls callback function", () => {
  //   document.body.innerHTML =
  //     '<button id="next-question">next question</button>';

  //   const input = {
  //     elementID: "#game-screen",
  //     nextQuestionBtn: "#next-question",
  //     onNextQuestionClick: vi.fn(),
  //   };

  //   const answerScreen = new AnswerScreen(input);
  //   $("#next-question").trigger("click");

  //   expect(answerScreen.onNextQuestionClick).toHaveBeenCalled();
  // });

  it("adds the current score to target element", () => {
    document.body.innerHTML =
      '<div id="end-screen">' + '<h2 class="points"></h2>' + "</div>";

    const input = {
      elementID: "#end-screen",
      pointsTxtID: "h2.points",
      points: 0,
    };

    new AnswerScreen(input);

    expect($("h2.points").text()).toBe("0 points");
  });
});
