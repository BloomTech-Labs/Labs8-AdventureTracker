//date 12-24-2039
import isDateValid from '../isDateValid';

describe.skip('checks if the input is a valid date', () => {
  it('returns true when date is valid', () => {
    expect(isDateValid('12-14-2018')).toBeTruthy();
    expect(isDateValid('12-15-2019')).toBeTruthy();
    expect(isDateValid('12-14-2018')).toBeTruthy();
  });

  it('returns false when date is not valid', () => {
    //test year
    expect(isDateValid('12-32-2019')).toBeFalsy();
    //test month
    expect(isDateValid('11-16-2018')).toBeFalsy();
    //test day
    expect(isDateValid('12-15-2018')).toBeFalsy();
  });
});
