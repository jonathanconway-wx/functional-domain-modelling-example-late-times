import React, { useState, useEffect } from 'react';

import { getRoutes } from './Routes.http';
import './Routes.css';

function Routes() {
  const [ routes, setRoutes ] = useState<any[]>([]);

  useEffect(() => {
    async function fetchRoutes() {
      const fetchedRoutesResponse = await getRoutes();

      const routes = (fetchedRoutesResponse?.data || []).map(route => {
        const timeArrivedAtStoreTime = route.timeArrivedAtStore ? new Date(route.timeArrivedAtStore) : undefined;
        const timeScheduledToArriveAtStoreTime = new Date(route.timeScheduledToArriveAtStore);

        let status;

        if (!timeArrivedAtStoreTime) {
          status = 'Not arrived'
        } else if (timeArrivedAtStoreTime.getTime() > (timeScheduledToArriveAtStoreTime.getTime() + (5 * 60 * 1000))) {
          status = 'Late';
        } else if (timeArrivedAtStoreTime.getTime() > (timeScheduledToArriveAtStoreTime.getTime())) {
          status = 'Encroaching';
        } else {
          status = 'On Time'
        }

        let color;
        switch (status) {
          case 'Not arrived':
            color = 'charcoal';
            break;
          case 'Late':
            color = 'red';
            break;
          case 'Encroaching':
            color = 'orange';
            break;
          case 'On Time':
            color = 'darkGreen';
            break;
        }

        return {
          ...route,
          timeArrivedAtStoreTime,
          timeScheduledToArriveAtStoreTime,
          status,
          color,
        };
      });

      setRoutes(routes);
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
          {routes.map(({
            id,
            suburb,
            timeArrivedAtStore,
            timeScheduledToArriveAtStore,
            status,
            color
          }) => (
            <tr key={id}>
              <td>{ suburb }</td>
              <td>{ new Date(timeArrivedAtStore).toLocaleTimeString() }</td>
              <td>{ new Date(timeScheduledToArriveAtStore).toLocaleTimeString() }</td>
              <td style={{ color }}>⬤ {status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export { Routes };
