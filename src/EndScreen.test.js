import $ from "jquery";
import { beforeAll, describe, expect, it, vi } from "vitest";

import EndScreen from "./EndScreen.js";

describe("End Screen", () => {
  describe("Render End Message", () => {
    beforeAll(() => {
      document.body.innerHTML =
        '<div id="end-screen">' +
        '<h2 id="end-message"></h2>' +
        '<h3 id="end-score"></h3>' +
        "</div>";
    });
    it("renders 'need more practice' text, when final game score is less than or equal to 40", () => {
      let input = {
        elementID: "#end-screen",
        endMessageTxtID: "#end-message",
        endScoreTxtID: "#end-score",
        gameScore: 40,
      };

      new EndScreen(input);
      expect($("#end-message").text()).toBe("need more practice...");
      expect($("#end-score").text()).toBe("40 points");
    });

    it("renders 'you got some chops!' text, when final game score is between 40 and 80", () => {
      let input = {
        elementID: "#end-screen",
        endMessageTxtID: "#end-message",
        endScoreTxtID: "#end-score",
        gameScore: 80,
      };

      new EndScreen(input);
      expect($("#end-message").text()).toBe("you got some chops!");
      expect($("#end-score").text()).toBe("80 points");
    });

    it.skip("renders 'rgb legend.' text, when final game score is between 90 and 100", () => {
      let input = {
        elementID: "#end-screen",
        endMessageTxtID: "#end-message",
        endScoreTxtID: "#end-score",
        gameScore: 90,
      };

      new EndScreen(input);
      expect($("#end-message").text()).toBe("rgb legend.");
      expect($("#end-score").text()).toBe("90 points");
    });
  });

  it("calls given callback when restart-game button is clicked", () => {
    document.body.innerHTML = '<button id="restart-game" />';

    const input = {
      elementID: "#end-screen",
      restartGameBtnID: "#restart-game",
      onRestartGameClick: vi.fn(),
    };

    const endScreen = new EndScreen(input);
    $("#restart-game").trigger("click");

    expect(endScreen.onNextClick).toEqual(input.onRestartGameClick);
    expect(endScreen.onNextClick).toHaveBeenCalled();
  });

  it("calls the set callback function only when the restart game button is clicked and the cb is a valid function", () => {
    document.body.innerHTML = '<button id="restart-game" />';

    const spy = vi.fn();

    const input = {
      elementID: "#end-screen",
      restartGameBtnID: "#restart-game",
    };

    const endScreen = new EndScreen(input);
    $("#restart-game").trigger("click");

    expect(spy).not.toHaveBeenCalled();
    endScreen.setOnNextClick(spy);
    expect(spy).not.toHaveBeenCalled();
    $("#restart-game").trigger("click");
    expect(spy).toHaveBeenCalled();
    endScreen.setOnNextClick(undefined);
    $("#restart-game").trigger("click");
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
