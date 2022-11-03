import { describe, it, expect } from 'vitest';
import Question from '../Question';
import GuitarColors from '../GuitarColors';

describe('Question', () => {
  it('returns three different colors from the GuitarColors class', () => {
    const question = new Question();
    const options = question.getOptions();
    const guitarColors = new GuitarColors();

    expect(options.length).toEqual(3);
    expect(Array.isArray(options)).toEqual(true);
    expect(guitarColors._palette).toContainEqual(options[0]);
    expect(guitarColors._palette).toContainEqual(options[1]);
    expect(guitarColors._palette).toContainEqual(options[2]);
  });

  it('returns one of the option colors as the guitar color', () => {
    const question = new Question();
    const answer = question.getGuitarColor();

    expect(question._options).toContainEqual(answer);
  });

  it('returns the index position of the guitar color in the option colors', () => {
    const question = new Question();
    const answer = question.getAnswer();

    expect(question._options[answer]).toEqual(question.getGuitarColor());
  });

  it('sets a value between 0 and 3 inclusive as picked property', () => {
    const question = new Question();
    question.setPicked(10);
    expect(question._picked).toEqual(-1);

    question.setPicked(1);
    expect(question._picked).toEqual(1);
  });

  it('returns the picked property value', () => {
    const question = new Question();
    question.setPicked(2);
    const result = question.getPicked();

    expect(result).toEqual(2);
  });
});
