import React, { useState, useEffect } from 'react';

import { getRoutes } from './Routes.http';
import { convertRoutesToRouteIndicators } from './Routes.functions';
import { RoutesState, UUID } from './Routes.types';
import { RouteDetailsDialog } from './RouteDetailsDialog';

import './Routes.css';

function Routes() {
  const [state, setState] = useState<RoutesState>({});

  useEffect(() => {
    async function fetchRoutes() {
      const fetchedRoutesResponse = await getRoutes();

      const routeIndicators = convertRoutesToRouteIndicators(fetchedRoutesResponse.data || []);

      setState(state => ({
        ...state,
        routeIndicators,
      }));
    }

    fetchRoutes();
  }, []);

  function handleRowDetailsClick(selectedRouteId: UUID) {
    setState(state => ({
      ...state,
      selectedRouteId,
    }));
  }

  function handleRowDetailsDialogCloseClick() {
    setState(state => ({
      ...state,
      selectedRouteId: undefined,
    }));
  }

  return (
    <div className="container">
      <table>
        <thead>
          <tr>
            <th key="suburb">Suburb</th>
            <th key="expectedTime">Expected time</th>
            <th key="arrivedTime">Arrived time</th>
            <th key="status">Status</th>
            <th key="actions"></th>
          </tr>
        </thead>

        <tbody>
          {state.routeIndicators?.map(
            ({ id, suburb, arrivedTime, expectedTime, statusLabel, color }) => (
              <tr key={id}>
                <td>{suburb}</td>
                <td>{arrivedTime}</td>
                <td>{expectedTime}</td>
                <td style={{ color }}>⬤ {statusLabel}</td>
                <td>
                  <button title="Details" onClick={handleRowDetailsClick.bind(undefined, id)}>
                    ⋮
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>

      <RouteDetailsDialog
        id={state.selectedRouteId}
        onCloseClick={handleRowDetailsDialogCloseClick}
      />
    </div>
  );
}

export { Routes };
