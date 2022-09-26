import Screen from "./Screen.js";

export default class StartScreen extends Screen {
  constructor(input) {
    super({
      elementID: input.elementID,
      nextBtn: input.newGameBtn,
      onNextClick: input.onNewGameClick,
    });
  }
}
