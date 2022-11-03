import QuestionList from './QuestionList';

export default class State {
  constructor() {
    this._round = 1;
    this._points = 0;
    this._questions = new QuestionList().get();
  }
}
