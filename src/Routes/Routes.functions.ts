import { STATUS_COLORS, STATUS_LABELS } from './Routes.constants';
import {
  RouteDetailsResponseData,
  RouteIndicator,
  RoutesResponseItemData,
  RouteStatus,
  Route,
  RouteDetails,
} from './Routes.types';

export function convertRoutesToRouteIndicators(routes: RoutesResponseItemData[]) {
  return routes.map(convertRouteResponseItemDataToRoute).map(convertRouteToRouteIndicator);
}

export function convertRouteDetailsResponseDataToRouteDetails(
  routeDetailsResponseItemData: RouteDetailsResponseData
): RouteDetails {
  const route = convertRouteResponseItemDataToRoute(routeDetailsResponseItemData);
  const routeDetails = {
    ...route,
    driverName: routeDetailsResponseItemData.driverName,
  };

  return routeDetails;
}

export function convertRouteToRouteIndicator(route: Route): RouteIndicator {
  const { status } = route;

  const statusLabel = STATUS_LABELS[status];

  const color = STATUS_COLORS[status];

  return {
    ...route,
    statusLabel,
    color,
  };
}

export function convertRouteResponseItemDataToRoute(route: RoutesResponseItemData): Route {
  const { id, suburb } = route;

  const { arrivedAtStoreTime, scheduledToArriveAtStoreTime } = parseRouteTimes(route);

  const arrivedTime = arrivedAtStoreTime?.toLocaleTimeString() || '';
  const expectedTime = scheduledToArriveAtStoreTime.toLocaleTimeString();

  const status = calculateRouteStatus({
    arrivedAtStoreTime,
    scheduledToArriveAtStoreTime,
  });

  return {
    id,
    suburb,
    arrivedTime,
    expectedTime,
    status,
  };
}

export function calculateRouteStatus({
  arrivedAtStoreTime,
  scheduledToArriveAtStoreTime,
}: {
  arrivedAtStoreTime?: Date;
  scheduledToArriveAtStoreTime: Date;
}) {
  let status: RouteStatus;
  if (!arrivedAtStoreTime) {
    status = RouteStatus.NotArrived;
  } else if (
    arrivedAtStoreTime.getTime() >
    scheduledToArriveAtStoreTime.getTime() + 5 * 60 * 1000
  ) {
    status = RouteStatus.Late;
  } else if (arrivedAtStoreTime.getTime() > scheduledToArriveAtStoreTime.getTime()) {
    status = RouteStatus.Encroaching;
  } else {
    status = RouteStatus.OnTime;
  }

  return status;
}

export function parseRouteTimes(
  route: Pick<RoutesResponseItemData, 'arrivedAtStore' | 'scheduledToArriveAtStore'>
) {
  const arrivedAtStoreTime = route.arrivedAtStore ? new Date(route.arrivedAtStore) : undefined;

  const scheduledToArriveAtStoreTime = new Date(route.scheduledToArriveAtStore);

  return { arrivedAtStoreTime, scheduledToArriveAtStoreTime };
}
