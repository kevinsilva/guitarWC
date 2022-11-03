import Question from './Question.js';

export default class Game {
  constructor() {
    this.points = 0;
  }

  loadQuestions() {
    const questions = {};
    const question = new Question();
    let counter = 1;

    while (counter <= 10) {
      questions[counter] = {
        options: question.getOptions(),
        answer: question.getCorrectAnswer(),
      };
      counter++;
    }
    this.questions = questions;
    this.points = 0;
  }

  addPoints(answer) {
    if (this.points >= 100) return;
    if (answer) this.points += 10;
  }
}
