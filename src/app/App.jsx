import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState, useRef } from "react";

import MapContext from "../contexts/mapContext.js";
import CurrentLocationContext from "../contexts/currentLocation.js";
import MarkersContext from "../contexts/markersContext.js";

import RootLayout from "../layouts/rootLayout/RootLayout.jsx";
import Map from "../layouts/map/Map.jsx";
import NearByPlacesLayout from "../layouts/nearByPlacesLayout/NearByPlacesLayout.jsx";
import PlaceDetailsLayout from "../layouts/placeDetailsLayout/PlaceDetailsLayout.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/map",
        element: <Map />,
        children: [
          {
            path: "/map/nearbyplaces",
            element: <NearByPlacesLayout />,
          },
        ],
      },
      {
        path: "/placesdetails/:place_id",
        element: <PlaceDetailsLayout />,
      },
    ],
  },
]);

function App() {
  const [map, setMap] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const markersDataRef = useRef(null);

  console.log("App render", map, currentLocation, markersDataRef);

  return (
    <MapContext.Provider value={[map, setMap]}>
      <CurrentLocationContext.Provider
        value={[currentLocation, setCurrentLocation]}
      >
        <MarkersContext.Provider value={markersDataRef}>
          <RouterProvider router={router} />
        </MarkersContext.Provider>
      </CurrentLocationContext.Provider>
    </MapContext.Provider>
  );
}

export default App;
