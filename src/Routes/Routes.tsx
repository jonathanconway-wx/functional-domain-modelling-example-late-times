import React, { useState, useEffect } from 'react';

import { getRoutes } from './Routes.http';
import { convertRoutesToRouteIndicators } from './Routes.functions';
import { RouteIndicator } from './Routes.types';
import './Routes.css';

function Routes() {
  const [routeIndicators, setRouteIndicators] = useState<RouteIndicator[]>([]);

  useEffect(() => {
    async function fetchRoutes() {
      const fetchedRoutesResponse = await getRoutes();

      const newRouteIndicators = convertRoutesToRouteIndicators(fetchedRoutesResponse.data || []);

      setRouteIndicators(newRouteIndicators);
    }

    fetchRoutes();
  }, []);

  return (
    <div className="container">
      <table>
        <thead>
          <tr>
            <th key="suburb">Suburb</th>
            <th key="expectedTime">Expected time</th>
            <th key="arrivedTime">Arrived time</th>
            <th key="status">Status</th>
          </tr>
        </thead>

        <tbody>
          {routeIndicators.map(({ id, suburb, arrivedTime, expectedTime, statusLabel, color }) => (
            <tr key={id}>
              <td>{suburb}</td>
              <td>{arrivedTime}</td>
              <td>{expectedTime}</td>
              <td style={{ color }}>⬤ {statusLabel}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export { Routes };
