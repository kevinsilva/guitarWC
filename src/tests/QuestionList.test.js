import { describe, it, expect } from 'vitest'
import Question from '../Question'
import QuestionList from '../QuestionList'

describe('Question List', () => {
  it('returns an array with 10 question instances', () => {
    const list = new QuestionList()
    const question = list.get()[0]

    expect(list.get().length).toEqual(10)
    expect(question instanceof Question).toEqual(true)
  })

  it('returns the same array no matter how many times it is called', () => {
    const list = new QuestionList()
    const questions_1 = list._questions
    const list_1 = list.get()
    const questions_2 = list._questions
    const list_2 = list.get()

    expect(questions_1).toEqual(list_1)
    expect(questions_2).toEqual(list_2)
    expect(questions_1).toEqual(list_2)
    expect(questions_2).toEqual(list_1)
  })
})
