import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../Home/Home.jsx";
import NearByMosques from "../NearByMosques/NearByMosques.jsx";
import PlaceDetails from "../PlaceDetails/PlaceDetails.jsx";
import { useState } from "react";
import MapContext from "../../contexts/mapContext.js";
import CurrentLocationContext from "../../contexts/currentLocation.js";
import MarkersContext from "../../contexts/markersContext.js";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "nearbymosques",
        element: <NearByMosques />,
      },
    ],
  },
  {
    path: "/placesdetails/:place_id",
    element: <PlaceDetails />,
  },
]);

function App() {
  const [map, setMap] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [markers, setMarkers] = useState(null);
  return (
    <MapContext.Provider value={[map, setMap]}>
      <CurrentLocationContext.Provider
        value={[currentLocation, setCurrentLocation]}
      >
        <MarkersContext.Provider value={[markers, setMarkers]}>
          <RouterProvider router={router} />
        </MarkersContext.Provider>
      </CurrentLocationContext.Provider>
    </MapContext.Provider>
  );
}

export default App;
