export enum Period {
  day = 'day',
  week = 'week',
  month = 'month',
}

export const transformPeriodToDate = (period: Period): Date => {
  const now = new Date();

  switch (period) {
    case Period.day:
      return new Date(now.getTime() - 24 * 60 * 60 * 1000);
      break;

    case Period.week:
      return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    case Period.month:
      const minusOneMonth = new Date(now);
      minusOneMonth.setMonth(now.getMonth() - 1);

      return minusOneMonth;
      break;
  }
};
