import { randomNumber } from "./utilities.js";
import ColorGenerator from "./ColorGenerator.js";

export default class Question {
  constructor() {
    this.colorGenerator = new ColorGenerator();
  }

  getOptions() {
    this.options = this.colorGenerator.getColors();
    return this.options;
  }

  getCorrectAnswer() {
    if (!this.options) return null;

    const random = randomNumber(1, 3);
    this.correctAnswer = this.options[random - 1];

    return this.correctAnswer;
  }
}
