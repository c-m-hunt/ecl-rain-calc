import { firstInningsTimeLost } from '../index';

describe('Rain rules', () => {
  describe('2nd XI', () => {
    it('calculates new total after first innings rain break', () => {
      expect(firstInningsTimeLost(203, 45, 41.1, 240, true)).toEqual({
        target: 151,
        overs: 26,
        maxPerBowler: 5,
        powerPlay: 7,
      });

      expect(firstInningsTimeLost(213, 45, 45, 240, true)).toEqual({
        target: 145,
        overs: 23,
        maxPerBowler: 4,
        powerPlay: 6,
      });
    });

    it('throws an exception if not enough time has been lost', () => {
      expect(() => {
        firstInningsTimeLost(203, 45, 41.1, 39, true);
      }).toThrowError();
      expect(() => {
        firstInningsTimeLost(203, 45, 41.1, 21, false);
      }).toThrowError();
    });

    it('throws an exception if game should be abandoned', () => {
      expect(() => {
        firstInningsTimeLost(203, 45, 41.1, 310, true);
      }).toThrowError();
    });
  });
});
