import { describe, expect, it } from 'vitest'
import ColorGenerator from '../ColorGenerator.js'
import Question from '../Question.js'

describe('Question', () => {
  it('starts with an instance of the color generator', () => {
    const colorGen = new ColorGenerator()
    const question = new Question()

    expect(question.colorGenerator).toEqual(colorGen)
  })

  it('returns an array of 3 color objects as the answer options', () => {
    const question = new Question()
    const options = question.getOptions()

    expect(options.length).toEqual(3)
    expect(Array.isArray(options)).toEqual(true)
    expect(question.colorGenerator.colors).toContain(options[0])
    expect(question.colorGenerator.colors).toContain(options[1])
    expect(question.colorGenerator.colors).toContain(options[2])
  })

  it('sets a color from the options as the correct answer', () => {
    const question = new Question()
    question.getOptions()
    const answer = question.getCorrectAnswer()

    expect(question.colorGenerator.colors).toContain(answer)
    expect(question.options).toContain(answer)
  })

  // it("returns true if argument color matches correct answer, false otherwise", () => {
  //   const question = new Question();
  //   question.getOptions();
  //   const answer = question.getCorrectAnswer();

  //   const correct = question.checkAnswer(answer.decimal);
  //   const incorrect = question.checkAnswer("rgb(1210, 9900, 1008)");

  //   expect(correct).toEqual(true);
  //   expect(incorrect).toEqual(false);
  // });
})
// question.getAnswer() // color
// question.getOptions() // array 3 colors includes color
// question.isCorrect(color) // true

// AskScreen.renderQuestion(question)
