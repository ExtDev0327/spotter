import * as React from "react";
import * as mapboxgl from "mapbox-gl";

import { GetFlightPopup } from "../data/generated-types";
import MapPopup from "../map/MapPopup";
import injectSheet, { StyleCreator, StyledComponentProps } from "react-jss";

export interface IFlightPopupProps extends StyledComponentProps {
  id: string;
}

const FlightPopup: React.FC<IFlightPopupProps> = ({ classes, id }) => {
  return (
    <GetFlightPopup.Component
      variables={{
        input: {
          id
        }
      }}
    >
      {({ data }) => {
        return (
          <MapPopup
            center={
              new mapboxgl.LngLat(
                data.flight.coordinates.longitude,
                data.flight.coordinates.latitude
              )
            }
            options={{
              className: classes.popup,
              closeButton: false,
              closeOnClick: false
            }}
          >
            {data.flight.callsign}
          </MapPopup>
        );
      }}
    </GetFlightPopup.Component>
  );
};

const styles: StyleCreator = () => ({
  popup: {
    fontWeight: "bold",
    fontSize: 11
  }
});

export default injectSheet(styles)(FlightPopup);