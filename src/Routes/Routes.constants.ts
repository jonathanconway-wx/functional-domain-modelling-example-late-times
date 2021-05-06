import { RouteStatus, StatusColor } from './Routes.types';

export const STATUS_LABELS = {
  [RouteStatus.NotArrived]: 'Not Arrived :|',
  [RouteStatus.Late]: 'Late :(',
  [RouteStatus.Encroaching]: 'Encroaching :S',
  [RouteStatus.OnTime]: 'On Time :)',
};

export const STATUS_COLORS: Record<RouteStatus, StatusColor> = {
  [RouteStatus.NotArrived]: 'charcoal',
  [RouteStatus.Late]: 'red',
  [RouteStatus.Encroaching]: 'orange',
  [RouteStatus.OnTime]: 'darkGreen',
};
