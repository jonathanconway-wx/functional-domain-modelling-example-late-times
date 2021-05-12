import { calculateRouteStatus, parseRouteTimes } from './Routes.functions';
import { RouteStatus } from './Routes.types';

describe('Routes', () => {
  describe('functions', () => {
    describe('calculateRouteStatus', () => {
      test.each`
        scheduledToArriveAtStoreTime            | arrivedAtStoreTime                      | expectedResult             | comment
        ${new Date('2020-01-01T05:30:00.000Z')} | ${new Date('2020-01-01T05:30:00.000Z')} | ${RouteStatus.OnTime}      | ${'Exactly on time'}
        ${new Date('2020-01-01T03:45:00.000Z')} | ${new Date('2020-01-01T03:30:00.000Z')} | ${RouteStatus.OnTime}      | ${'Way ahead of time'}
        ${new Date('2020-01-01T06:00:00.000Z')} | ${undefined}                            | ${RouteStatus.NotArrived}  | ${"Hasn't arrived yet"}
        ${new Date('2020-01-01T06:00:00.000Z')} | ${new Date('2020-01-01T06:05:00.000Z')} | ${RouteStatus.Encroaching} | ${'Is starting to encroach'}
        ${new Date('2020-01-01T06:00:00.000Z')} | ${new Date('2020-01-01T06:06:00.000Z')} | ${RouteStatus.Late}        | ${'Late'}
      `(`$comment`, ({ scheduledToArriveAtStoreTime, arrivedAtStoreTime, expectedResult }) => {
        const inputs = {
          scheduledToArriveAtStoreTime,
          arrivedAtStoreTime,
        };

        const result = calculateRouteStatus(inputs);

        expect(result).toEqual(expectedResult);
      });
    });

    describe('parseRouteTimes', () => {
      test.each`
        arrivedAtStore                | scheduledToArriveAtStore      | arrivedAtStoreTime | scheduledToArriveAtStoreTime
        ${'2020-01-01T05:30:00.000Z'} | ${'2020-01-01T05:30:00.000Z'} | ${0}               | ${0}
        ${'2020-01-01T03:45:00.000Z'} | ${'2020-01-01T03:30:00.000Z'} | ${0}               | ${0}
      `(
        `converts date strings to correct date objects`,
        ({
          arrivedAtStore,
          scheduledToArriveAtStore,
          arrivedAtStoreTime,
          scheduledToArriveAtStoreTime,
        }) => {
          const inputs = {
            arrivedAtStore,
            scheduledToArriveAtStore,
          };

          const result = parseRouteTimes(inputs);

          expect(result).toEqual({
            arrivedAtStoreTime,
            scheduledToArriveAtStoreTime,
          });
        }
      );
    });
  });
});
