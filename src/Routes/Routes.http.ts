
const MOCK_ROUTES = [
  {
    id: '1',
    suburb: 'Gosford',
    timeArrivedAtStore: '2020-01-01 04:30:00 PM',
    timeScheduledToArriveAtStore: '2020-01-01 04:30:00 PM',
  },
  {
    id: '2',
    suburb: 'Parramatta',
    timeArrivedAtStore: '2020-01-01 02:30:00 PM',
    timeScheduledToArriveAtStore: '2020-01-01 02:45:00 PM',
  },
  {
    id: '3',
    suburb: 'Wyong',
    timeScheduledToArriveAtStore: '2020-01-01 05:00:00 PM',
  },
];

export async function getRoutes() {
  return Promise.resolve({
    status: 'ok',
    data: MOCK_ROUTES
  });
}