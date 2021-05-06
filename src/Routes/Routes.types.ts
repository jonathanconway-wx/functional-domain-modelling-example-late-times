export interface RoutesResponseItemData {
  readonly id: string;
  readonly suburb: string;
  readonly timeArrivedAtStore?: string;
  readonly timeScheduledToArriveAtStore: string;
}

export enum RouteStatus {
  NotArrived = 'NotArrived',
  Late = 'Late',
  Encroaching = 'Encroaching',
  OnTime = 'OnTime',
}

export type TimeString = string;

export type StatusColor = 'charcoal' | 'red' | 'orange' | 'darkGreen';

export interface RouteIndicator {
  readonly id: string;
  readonly suburb: string;
  readonly status: RouteStatus;
  readonly statusLabel: string;
  readonly expectedTime: TimeString;
  readonly arrivedTime: TimeString;
  readonly color: StatusColor;
}
