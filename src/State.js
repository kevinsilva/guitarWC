import QuestionList from './QuestionList';

export default class State {
  constructor() {
    this._round = 1;
    this._points = 0;
    this._questions = new QuestionList().get();
  }

  getRound() {
    return this._round;
  }

  addRound() {
    this._round++;
  }

  getPoints() {
    return this._points;
  }

  addPoints() {
    this._points += 10;
  }

  getQuestions() {
    return this._questions;
  }

  getCurrentQuestion() {
    return this._questions[this._round -1];
  }
}
