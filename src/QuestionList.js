import Question from './Question';

export default class QuestionList {
  constructor() {
    this._questions = this.get();
  }
  get() {
    if (this._questions) return this._questions;

    const list = [];
    while (list.length < 10) {
      const question = new Question();
      list.push(question);
    }
    return list;
  }
}

// export default class Questions {
//   constructor() {
//     this._list = this.get();
//   }
//   get() {
//     const list = [];
//     while (list.length < 10) {
//       const question = new Question();
//       list.push(question);
//     }
//     return list;
//   }
// }
