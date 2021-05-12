/**
 * General
 */

export type UUID = string;

export type IsLoading = undefined;

export interface Response<T> {
  readonly data: T;
  readonly status: 'ok' | 'error';
}

/**
 * GET Routes
 */

export interface RoutesResponseItemData {
  readonly id: UUID;
  readonly suburb: string;
  readonly arrivedAtStore?: string;
  readonly scheduledToArriveAtStore: string;
}

/**
 * GET RouteDetails
 */

export interface RouteDetailsRequestParams {
  readonly id: UUID;
}

export interface RouteDetailsResponseData {
  readonly id: UUID;
  readonly suburb: string;
  readonly arrivedAtStore?: string;
  readonly scheduledToArriveAtStore: string;
  readonly driverName: string;
}

/**
 * Route
 */

export enum RouteStatus {
  NotArrived = 'NotArrived',
  Late = 'Late',
  Encroaching = 'Encroaching',
  OnTime = 'OnTime',
}

export interface Route {
  readonly id: UUID;
  readonly suburb: string;
  readonly status: RouteStatus;
  readonly expectedTime: TimeString;
  readonly arrivedTime: TimeString;
}

/**
 * Route Indicator
 */

export type TimeString = string;

export type StatusColor = 'charcoal' | 'red' | 'orange' | 'darkGreen';

export type RouteIndicator = Route & {
  readonly statusLabel: string;
  readonly color: StatusColor;
};

/**
 * Route Details
 */

export type RouteDetails = Route & {
  readonly driverName: string;
};

/**
 * Routes App State
 */

export interface RoutesState {
  routeIndicators?: readonly RouteIndicator[];
  selectedRouteId?: UUID;
}
