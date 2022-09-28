import $ from "jquery";
import { describe, expect, it, vi } from "vitest";

import AskScreen from "./AskScreen.js";

describe("Ask Screen", () => {
  it("adds a text question based on the guitar color, to target element", () => {
    document.body.innerHTML =
      '<div id="game-screen">' + '<h2 class="title"></h2>' + "</div>";

    const input = {
      elementID: "#game-screen",
      questionTxtID: "h2.title",
      guitarColor: { name: "TV Yellow", decimal: "rgb(215, 156, 62)" },
    };

    new AskScreen(input);

    expect($("h2.title").text()).toBe("guess TV Yellow");
  });

  it("shows current guitar color as the color of the guitar element", () => {
    document.body.innerHTML =
      '<div id="guitar">' + ' <div id="guitar-body"></div>' + "</div>";

    const input = {
      guitarID: "#guitar-body",
      guitarColor: { name: "TV Yellow", decimal: "rgb(215, 156, 62)" },
    };

    new AskScreen(input);

    expect($("#guitar-body").css("fill")).toBe("rgb(215, 156, 62)");
  });

  it("adds text answers based on generated colors, to the button elements", () => {
    document.body.innerHTML =
      '<div id="answers">' +
      ' <button id="button-0" />' +
      ' <button id="button-1" />' +
      ' <button id="button-2" />' +
      "</div>";

    const input = {
      answerBtnsID: ["#button-0", "#button-1", "#button-2"],
      generatedColors: [
        { name: "TV Yellow", decimal: "rgb(215, 156, 62)" },
        { name: "Candy Apple Red", decimal: "rgb(125, 0, 3)" },
        { name: "Metallic Blue", decimal: "rgb(12, 43, 115)" },
      ],
    };

    new AskScreen(input);

    expect($("#button-0").text()).toBe("rgb(215, 156, 62)");
    expect($("#button-1").text()).toBe("rgb(125, 0, 3)");
    expect($("#button-2").text()).toBe("rgb(12, 43, 115)");
  });

  it("calls given callback when answer buttons are clicked", () => {
    document.body.innerHTML =
      '<div id="game-screen">' + '<button id="button-1" />';

    const input = {
      elementID: "#game-screen",
      answerBtnsID: ["#button-0", "#button-1", "#button-2"],
      generatedColors: [
        { name: "TV Yellow", decimal: "rgb(215, 156, 62)" },
        { name: "Candy Apple Red", decimal: "rgb(125, 0, 3)" },
        { name: "Metallic Blue", decimal: "rgb(12, 43, 115)" },
      ],
      onAnswerClick: vi.fn(),
    };

    const askScreen = new AskScreen(input);
    $("#button-1").trigger("click");

    expect(askScreen.onNextClick).toEqual(input.onAnswerClick);
    expect(askScreen.onNextClick).toHaveBeenCalled();
  });

  it("calls the set callback function only when any answer button is clicked and the cb is a valid function", () => {
    document.body.innerHTML =
      '<div id="game-screen">' +
      '<button class="button-0">rgb(215, 156, 62)</button>' +
      '<button class="button-1">rgb(125, 0, 3)</button>' +
      '<button class="button-2">rgb(121, 120, 113)</button>' +
      "</div>";

    const spy = vi.fn();

    const input = {
      elementID: "#game-screen",
      answerBtnsID: ["button.button-0", "button.button-1", "button.button-2"],
      generatedColors: [
        { name: "TV Yellow", decimal: "rgb(215, 156, 62)" },
        { name: "Candy Apple Red", decimal: "rgb(125, 0, 3)" },
        { name: "Metallic Blue", decimal: "rgb(12, 43, 115)" },
      ],
      onAnswerClick: vi.fn(),
    };

    const askScreen = new AskScreen(input);
    $("button.button-0").trigger("click");
    expect(spy).not.toHaveBeenCalled();
    $("button.button-0").removeClass("selected");

    askScreen.setOnNextClick(spy);
    expect(spy).not.toHaveBeenCalled();
    $("button.button-0").trigger("click");
    expect(spy).toHaveBeenCalled();
    $("button.button-0").removeClass("selected");

    askScreen.setOnNextClick(undefined);
    $("button.button-1").trigger("click");
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("allows only one answer button selection - more will be ignored", () => {
    document.body.innerHTML =
      '<div id="game-screen">' +
      '<button class="button-0">rgb(215, 156, 62)</button>' +
      '<button class="button-1">rgb(125, 0, 3)</button>' +
      '<button class="button-2">rgb(121, 120, 113)</button>' +
      "</div>";

    const input = {
      elementID: "#game-screen",
      answerBtnsID: ["button.button-0", "button.button-1", "button.button-2"],
      generatedColors: [
        { name: "TV Yellow", decimal: "rgb(215, 156, 62)" },
        { name: "Candy Apple Red", decimal: "rgb(125, 0, 3)" },
        { name: "Metallic Blue", decimal: "rgb(12, 43, 115)" },
      ],
      onAnswerClick: vi.fn(),
    };

    const askScreen = new AskScreen(input);
    const $btn0 = $("button.button-0");
    const $btn1 = $("button.button-1");
    const $btn2 = $("button.button-2");

    $btn0.trigger("click");
    $btn1.trigger("click");
    $btn2.trigger("click");

    expect(askScreen.onNextClick).toEqual(input.onAnswerClick);
    expect(askScreen.onNextClick).toBeCalledWith("rgb(215, 156, 62)");
    expect($btn0.hasClass("selected")).toBe(true);
    expect(askScreen.onNextClick).not.toBeCalledWith("rgb(125, 0, 3)");
    expect($btn1.hasClass("selected")).toBe(false);
    expect(askScreen.onNextClick).not.toBeCalledWith("rgb(12, 43, 115)");
    expect($btn2.hasClass("selected")).toBe(false);
  });

  it("adds the current round to target element", () => {
    document.body.innerHTML =
      '<div id="end-screen">' + '<h2 class="round"></h2>' + "</div>";

    const input = {
      elementID: "#end-screen",
      roundTxtID: "h2.round",
      round: 0,
    };

    new AskScreen(input);

    expect($("h2.round").text()).toBe("round 0 of 10");
  });
});
