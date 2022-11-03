import { randomNumber } from './utilities';
import GuitarColors from './GuitarColors';

export default class Question {
  constructor() {
    this._options = this.getOptions();
    this._guitarColor = this.getGuitarColor();
    this._answer = this.getAnswer();
    this._picked = -1;
  }

  getOptions() {
    if (this._options) return this._options;
    const colors = new GuitarColors();
    return colors.getRandom();
  }

  getGuitarColor() {
    if (this._guitarColor) return this._guitarColor;
    return this._options[randomNumber(1, 3) - 1];
  }

  getAnswer() {
    if (!isNaN(this._answer)) return this._answer;
    return this._options.findIndex((option) => option === this._guitarColor);
  }

  setPicked(pick) {
    if (pick >= 0 && pick <= 2) this._picked = pick;
  }

  getPicked() {
    return this._picked;
  }
}

// export default class Question {
//   constructor() {
//     this._options = this.options();
//     this._guitarColor = this.guitarColor();
//     this._answer = this.answer();
//     this._picked = -1;
//   }

//   options() {
//     if (this._options) return this._options;
//     const colors = new GuitarColors();
//     return colors.getRandom();
//   }

//   guitarColor() {
//     if (this._guitarColor) return this._guitarColor;
//     return this._options[randomNumber(1, 3) - 1];
//   }

//   answer() {
//     if (!isNaN(this._answer)) return this._answer;
//     return this._options.findIndex((option) => option === this._guitarColor);
//   }
// }
