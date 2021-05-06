import React from 'react';
import { calculateRouteStatus } from './Routes.functions';
import { RouteStatus } from './Routes.types';

describe('Routes', () => {
  describe('functions', () => {
    test.each`
      timeScheduledToArriveAtStoreTime        | timeArrivedAtStoreTime                  | expectedResult
      ${new Date('2020-01-01T05:30:00.000Z')} | ${new Date('2020-01-01T05:30:00.000Z')} | ${RouteStatus.OnTime}
    `(
      'calculateRouteStatus',
      ({ timeScheduledToArriveAtStoreTime, timeArrivedAtStoreTime, expectedResult }) => {
        const inputs = {
          timeScheduledToArriveAtStoreTime,
          timeArrivedAtStoreTime,
        };

        const result = calculateRouteStatus(inputs);

        expect(result).toEqual(expectedResult);
      }
    );
  });
});
