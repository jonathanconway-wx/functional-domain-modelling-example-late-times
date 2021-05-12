import { useState, useEffect } from 'react';

import { getRouteDetails } from '../Routes.http';
import { convertRouteDetailsResponseDataToRouteDetails } from '../Routes.functions';
import { RouteDetails, IsLoading, UUID } from '../Routes.types';

import './RouteDetailsDialog.css';

type Props = { id?: UUID; onCloseClick: VoidFunction };

function RouteDetailsDialog({ id, onCloseClick }: Props) {
  const [routeDetails, setRouteDetails] = useState<RouteDetails | IsLoading>();

  useEffect(() => {
    async function fetchRouteDetails() {
      if (id) {
        const routeDetailsResponse = await getRouteDetails({ id });

        const newRouteDetails = convertRouteDetailsResponseDataToRouteDetails(
          routeDetailsResponse.data
        );

        setRouteDetails(newRouteDetails);
      }
    }

    setRouteDetails(undefined);

    fetchRouteDetails();
  }, [id]);

  return (
    <dialog open={Boolean(id)}>
      <div className="title-bar">
        <h2>Route details</h2>

        <button title="Close" onClick={onCloseClick}>
          ✖
        </button>
      </div>

      {!routeDetails ? (
        <div className="loader-container">
          <p>Please wait</p>
          <div className="loader"></div>
        </div>
      ) : (
        <table>
          <tbody>
            <tr>
              <th key="suburb">Suburb</th>
              <td>{routeDetails.suburb}</td>
            </tr>
            <tr>
              <th key="expectedTime">Expected time</th>
              <td>{routeDetails.expectedTime}</td>
            </tr>
            <tr>
              <th key="arrivedTime">Arrived time</th>
              <td>{routeDetails.arrivedTime}</td>
            </tr>
            <tr>
              <th key="status">Status</th>
              <td>{routeDetails.status}</td>
            </tr>
            <tr>
              <th key="status">Driver Name</th>
              <td>{routeDetails.driverName}</td>
            </tr>
          </tbody>
        </table>
      )}
    </dialog>
  );
}

export { RouteDetailsDialog };
