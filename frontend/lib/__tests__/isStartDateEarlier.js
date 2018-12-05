//date 12-24-2039
import isStartDateEarlier from '../isStartDateEarlier';
describe('the starting date should be earlier than the ending date', () => {
  it('returns true when starting date is earlier than ending date', () => {
    expect(isStartDateEarlier('12-14-2018', '12-16-2018')).toBeTruthy();
    expect(isStartDateEarlier('12-15-2018', '12-16-2018')).toBeTruthy();
    expect(isStartDateEarlier('12-14-2018', '12-16-2018')).toBeTruthy();
  });

  it('returns false when starting date is later than ending date', () => {
    //test year
    expect(isStartDateEarlier('12-16-2019', '12-16-2018')).toBeFalsy();
    //test month
    expect(isStartDateEarlier('11-16-2018', '10-16-2018')).toBeFalsy();
    //test day
    expect(isStartDateEarlier('12-15-2018', '12-14-2018')).toBeFalsy();
  });
});
