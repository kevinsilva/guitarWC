import { describe, it, expect } from 'vitest';
import GuitarColors from '../GuitarColors';

describe('Guitar Colors', () => {
  describe('Prototype / Static', () => {
    it('returns a group of three different random colors from the array of colors', () => {
      expect(GuitarColors.getRandom().length).toEqual(3);
      expect(Array.isArray(GuitarColors.getRandom())).toEqual(true);
      const [color1, color2, color3] = GuitarColors.getRandom();
      expect(GuitarColors.palette.includes(color1)).toEqual(true);
      expect(GuitarColors.palette.includes(color2)).toEqual(true);
      expect(GuitarColors.palette.includes(color3)).toEqual(true);
      expect(color1).not.toEqual(color2);
      expect(color1).not.toEqual(color3);
      expect(color2).not.toEqual(color3);
      expect(GuitarColors.getRandom()).not.toEqual(GuitarColors.getRandom())
    })
  })
});
