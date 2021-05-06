import { STATUS_COLORS, STATUS_LABELS } from './Routes.constants';
import { RouteIndicator, RoutesResponseItemData, RouteStatus } from './Routes.types';

export function convertRoutesToRouteIndicators(routes: RoutesResponseItemData[]) {
  return routes.map(convertRouteToRouteIndicator);
}

export function calculateRouteStatus({
  timeScheduledToArriveAtStoreTime,
  timeArrivedAtStoreTime,
}: {
  timeScheduledToArriveAtStoreTime: Date;
  timeArrivedAtStoreTime?: Date;
}) {
  let status: RouteStatus;
  if (!timeArrivedAtStoreTime) {
    status = RouteStatus.NotArrived;
  } else if (
    timeArrivedAtStoreTime.getTime() >
    timeScheduledToArriveAtStoreTime.getTime() + 5 * 60 * 1000
  ) {
    status = RouteStatus.Late;
  } else if (timeArrivedAtStoreTime.getTime() > timeScheduledToArriveAtStoreTime.getTime()) {
    status = RouteStatus.Encroaching;
  } else {
    status = RouteStatus.OnTime;
  }

  return status;
}

export function formatRouteTimes(route: RoutesResponseItemData) {
  const timeArrivedAtStoreTime = route.timeArrivedAtStore
    ? new Date(route.timeArrivedAtStore)
    : undefined;

  const timeScheduledToArriveAtStoreTime = new Date(route.timeScheduledToArriveAtStore);

  return { timeArrivedAtStoreTime, timeScheduledToArriveAtStoreTime };
}

export function convertRouteToRouteIndicator(route: RoutesResponseItemData): RouteIndicator {
  const { id, suburb } = route;

  const { timeArrivedAtStoreTime, timeScheduledToArriveAtStoreTime } = formatRouteTimes(route);

  const arrivedTime = timeArrivedAtStoreTime?.toLocaleTimeString() || '';
  const expectedTime = timeScheduledToArriveAtStoreTime.toLocaleTimeString();

  const status = calculateRouteStatus({
    timeArrivedAtStoreTime,
    timeScheduledToArriveAtStoreTime,
  });

  const statusLabel = STATUS_LABELS[status];

  const color = STATUS_COLORS[status];

  return {
    id,
    suburb,
    arrivedTime,
    expectedTime,
    status,
    statusLabel,
    color,
  };
}
