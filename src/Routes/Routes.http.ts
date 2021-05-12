import {
  Response,
  RouteDetailsRequestParams,
  RouteDetailsResponseData,
  RoutesResponseItemData,
  UUID,
} from './Routes.types';

const MOCK_ROUTES: RoutesResponseItemData[] = [
  {
    id: '1',
    suburb: 'Gosford',
    arrivedAtStore: '2020-01-01 04:30:00 PM',
    scheduledToArriveAtStore: '2020-01-01 04:30:00 PM',
  },
  {
    id: '2',
    suburb: 'Parramatta',
    arrivedAtStore: '2020-01-01 02:30:00 PM',
    scheduledToArriveAtStore: '2020-01-01 02:45:00 PM',
  },
  {
    id: '3',
    suburb: 'Wyong',
    scheduledToArriveAtStore: '2020-01-01 05:00:00 PM',
  },
];

export async function getRoutes() {
  return Promise.resolve({
    status: 'ok',
    data: MOCK_ROUTES,
  });
}

const MOCK_ROUTE_DETAILS: Record<UUID, RouteDetailsResponseData> = {
  '1': {
    ...MOCK_ROUTES[0],
    driverName: 'Jill Smith',
  },
  '2': {
    ...MOCK_ROUTES[1],
    driverName: 'Mary Dusevi',
  },
  '3': {
    ...MOCK_ROUTES[2],
    driverName: 'Ron Singh',
  },
};

export async function getRouteDetails({ id }: RouteDetailsRequestParams) {
  return new Promise<Response<RouteDetailsResponseData>>(resolve =>
    setTimeout(
      () =>
        resolve({
          status: 'ok',
          data: MOCK_ROUTE_DETAILS[id],
        }),
      2000
    )
  );
}
