import * as DateUtils from '@shared/utils/dateUtils';

describe('Date Utils', () => {
  it('should return date', () => {
    const timestamp = 1771068600000;
    expect(DateUtils.formatDate(timestamp)).toEqual('14/02/2026');
  });

  it('should return time', () => {
    const str = '2026-02-14T12:30:00';
    expect(DateUtils.formatTime(str)).toEqual('12:30');
  });

  it('should return date and time', () => {
    const timestamp = 1771068600000;
    expect(DateUtils.formatDateTime(timestamp)).toEqual('14/02/2026 at 12:30');
  });

  it('should return day of week', () => {
    const str = '2026-02-14T12:30:00';
    expect(DateUtils.getDayOfWeek(str)).toEqual('Saturday');
  });
});
